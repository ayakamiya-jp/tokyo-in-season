/**
 * update-experiences.ts
 *
 * For each experience where price_note contains "PENDING":
 *   - provider=gyg + official_url present: fetch HTML, read product:price:amount meta tag,
 *     update the data file, set last_checked to today.
 *   - provider=gyg + no official_url: print a warning.
 *   - provider=direct: print to console for manual checking. Never guess prices.
 *
 * Run: npm run update-experiences
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const EXPERIENCES_DIR = './src/content/experiences';
const TODAY = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
const FETCH_DELAY_MS = 2000; // be polite to external servers

// ── Types ────────────────────────────────────────────────────────────────────

interface Experience {
  name: string;
  provider: 'gyg' | 'klook' | 'direct';
  official_url?: string | null;
  price_jpy?: number | null;
  price_usd?: number | null;
  rating?: number | null;
  review_count?: number | null;
  price_note?: string;
  last_checked: string;
  [key: string]: unknown;
}

interface FetchResult {
  price_amount: number | null;
  currency: string | null;
  review_count: number | null;
  rating: number | null;
}

// ── HTML parsing helpers ──────────────────────────────────────────────────────

function extractMeta(html: string, property: string): string | null {
  // Handles both attribute orders: property then content, or content then property
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${property}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = html.match(re);
    if (m) return m[1].trim();
  }
  return null;
}

function extractJsonLd(html: string): FetchResult {
  const result: FetchResult = { price_amount: null, currency: null, review_count: null, rating: null };
  const blocks = html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi) ?? [];

  for (const block of blocks) {
    const json = block.replace(/<\/?script[^>]*>/gi, '').trim();
    try {
      const data = JSON.parse(json);
      const items: unknown[] = Array.isArray(data) ? data : [data];
      for (const item of items) {
        if (typeof item !== 'object' || item === null) continue;
        const obj = item as Record<string, unknown>;

        // Offers / price
        const offers = obj['offers'] as Record<string, unknown> | undefined;
        if (offers?.['price'] !== undefined && result.price_amount === null) {
          const amount = Number(offers['price']);
          if (!isNaN(amount)) {
            result.price_amount = amount;
            result.currency = String(offers['priceCurrency'] ?? '');
          }
        }

        // AggregateRating
        const agg = obj['aggregateRating'] as Record<string, unknown> | undefined;
        if (agg) {
          if (agg['reviewCount'] !== undefined && result.review_count === null)
            result.review_count = Number(agg['reviewCount']);
          if (agg['ratingValue'] !== undefined && result.rating === null)
            result.rating = Number(agg['ratingValue']);
        }
      }
    } catch {
      // invalid JSON block — skip
    }
  }
  return result;
}

// ── Fetch a GYG page and extract price / review data ─────────────────────────

async function fetchGygPage(url: string): Promise<FetchResult> {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; TokyoInSeason-bot/1.0; +https://tokyoinseason.com/llms.txt)',
      'Accept-Language': 'en-US,en;q=0.9',
      Accept: 'text/html',
    },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status} from ${url}`);
  const html = await res.text();

  // 1. Try Open Graph / Facebook product meta tags (most reliable on GYG)
  const metaPrice = extractMeta(html, 'product:price:amount');
  const metaCurrency = extractMeta(html, 'product:price:currency');

  if (metaPrice !== null) {
    const amount = parseFloat(metaPrice);
    if (!isNaN(amount)) {
      // Also try JSON-LD for review data
      const { review_count, rating } = extractJsonLd(html);
      return {
        price_amount: amount,
        currency: metaCurrency ?? null,
        review_count,
        rating,
      };
    }
  }

  // 2. Fallback: JSON-LD structured data
  return extractJsonLd(html);
}

// ── Apply result to an experience object ─────────────────────────────────────

function applyResult(exp: Experience, result: FetchResult, url: string): string {
  const { price_amount, currency, review_count, rating } = result;

  if (price_amount === null) {
    exp.price_note = `PENDING — price meta not found on ${url} (checked ${TODAY}). Check manually.`;
    return '✗ no price meta found';
  }

  if (currency === 'JPY') {
    exp.price_jpy = Math.round(price_amount);
    exp.price_note = `¥${exp.price_jpy.toLocaleString()} — fetched from ${url} on ${TODAY}`;
  } else {
    // USD or unknown currency: store as price_usd, leave price_jpy null for manual JPY entry
    exp.price_usd = price_amount;
    exp.price_jpy = null;
    exp.price_note = `${currency ?? '?'} ${price_amount} — fetched from ${url} on ${TODAY}. Convert to JPY before publishing.`;
  }

  if (review_count !== null && exp.review_count == null) exp.review_count = review_count;
  if (rating !== null && exp.rating == null) exp.rating = rating;

  return currency === 'JPY'
    ? `✓ ¥${exp.price_jpy?.toLocaleString()}`
    : `✓ ${currency ?? '?'} ${price_amount} (JPY pending)`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const files = readdirSync(EXPERIENCES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  const manualFlags: string[] = [];
  let fetched = 0;
  let skipped = 0;

  for (const file of files) {
    const filePath = join(EXPERIENCES_DIR, file);
    const exp: Experience = JSON.parse(readFileSync(filePath, 'utf8'));

    if (!exp.price_note?.includes('PENDING')) continue;

    const id = file.replace('.json', '');

    // Direct provider — flag for manual check, never guess
    if (exp.provider === 'direct') {
      manualFlags.push(
        `  ${id}\n    Name: ${exp.name}\n    URL:  ${exp.official_url ?? '(none)'}`,
      );
      skipped++;
      continue;
    }

    // GYG with no URL — warn and skip
    if (!exp.official_url) {
      console.log(`⚠  ${id} — provider=gyg but no official_url. Add the URL to fetch price.`);
      skipped++;
      continue;
    }

    // GYG with URL — fetch
    process.stdout.write(`Fetching ${id}... `);
    try {
      const result = await fetchGygPage(exp.official_url);
      const msg = applyResult(exp, result, exp.official_url);
      exp.last_checked = TODAY;
      writeFileSync(filePath, JSON.stringify(exp, null, 2), 'utf8');
      console.log(msg);
      fetched++;
    } catch (err) {
      console.log(`✗ ${(err as Error).message}`);
      skipped++;
    }

    await new Promise(r => setTimeout(r, FETCH_DELAY_MS));
  }

  console.log('\n── Summary ─────────────────────────────────────');
  console.log(`Fetched/updated: ${fetched}  Skipped/failed: ${skipped}`);

  if (manualFlags.length > 0) {
    console.log('\n── Manual price checks needed (direct providers) ──');
    console.log('Visit each site, find the price, and update price_jpy in the JSON file.');
    console.log(manualFlags.join('\n\n'));
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
