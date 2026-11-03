/**
 * Single source for Tokyo Tea Ceremony Price Index numbers.
 *
 * Pages and articles read prices and stats from here instead of hardcoding them, so a
 * quarterly data update flows to every page automatically.
 *
 * Quarterly update:
 *   1. Save the outgoing quarter: data/snapshots/<yyyy>-q<n>.json (src/content/experiences as published).
 *   2. Update src/content/experiences, then bump CURRENT_QUARTER below (and public/llms.txt).
 *   Past quarters are served as frozen archive pages at /tokyo-tea-ceremony-price-index/<yyyy>-q<n>.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export const CURRENT_QUARTER = 'Q4 2026';
export const CURRENT_QUARTER_START = '2026-10-01';
export const CURRENT_QUARTER_END = '2026-12-31';

export type Experience = CollectionEntry<'experiences'>['data'];

export const yen = (n: number) => `¥${n.toLocaleString('en-US')}`;
export const pct = (n: number, of: number) => (of ? Math.round((n / of) * 100) : 0);

// Upper median for even counts — the convention the index has used since Q3 2026.
const median = (sorted: number[]) => sorted[Math.floor(sorted.length / 2)];

export interface AreaStats {
  area: string;
  median: number;
  min: number;
  max: number;
  count: number;
}

export function computeStats(data: Pick<Experience, 'price_jpy' | 'area' | 'seiza_optional' | 'english_support'>[]) {
  const prices = data
    .map(e => e.price_jpy)
    .filter((p): p is number => p != null)
    .sort((a, b) => a - b);

  const byArea: Record<string, number[]> = {};
  for (const e of data) {
    if (e.price_jpy == null) continue;
    (byArea[e.area] ??= []).push(e.price_jpy);
  }
  const areas: AreaStats[] = Object.entries(byArea)
    .map(([area, ps]) => {
      const sorted = [...ps].sort((a, b) => a - b);
      return { area, median: median(sorted), min: sorted[0], max: sorted[sorted.length - 1], count: ps.length };
    })
    .sort((a, b) => a.median - b.median);

  const chairsCount = data.filter(e => e.seiza_optional === true).length;
  const englishCount = data.filter(e => e.english_support === true).length;

  return {
    listings: data.length,
    priced: prices.length,
    median: prices.length ? median(prices) : 0,
    minPrice: prices.length ? prices[0] : 0,
    maxPrice: prices.length ? prices[prices.length - 1] : 0,
    chairsCount,
    englishCount,
    pctChairs: pct(chairsCount, data.length),
    pctEnglish: pct(englishCount, data.length),
    areas,
    area: (name: string) => areas.find(a => a.area === name),
  };
}

export type IndexStats = ReturnType<typeof computeStats>;

// ── Live data ────────────────────────────────────────────────────────────────

const entries = await getCollection('experiences');
const byId = new Map(entries.map(e => [e.id, e.data]));

export const experiences = entries.map(e => e.data);
export const stats = computeStats(experiences);

/** Experience data by file id (e.g. 'maikoya-asakusa'). Throws so a removed venue breaks the build, not the page. */
export function exp(id: string): Experience {
  const e = byId.get(id);
  if (!e) throw new Error(`priceIndex: unknown experience id "${id}"`);
  return e;
}

/** Formatted price for a venue, e.g. '¥7,700'. Throws if the venue has no published price. */
export function price(id: string, field: 'price_jpy' | 'private_price_jpy' | 'solo_price_jpy' = 'price_jpy'): string {
  const p = exp(id)[field];
  if (p == null) throw new Error(`priceIndex: "${id}" has no ${field}`);
  return yen(p);
}

// ── Snapshots (past quarters) ────────────────────────────────────────────────

interface SnapshotFile {
  quarter: string;
  snapshot_date: string;
  experiences: Record<string, Experience>;
}

const snapshotModules = import.meta.glob<SnapshotFile>('../../data/snapshots/*.json', {
  eager: true,
  import: 'default',
});

export interface Snapshot {
  slug: string; // e.g. '2026-q3'
  quarter: string;
  snapshotDate: string;
  experiences: Record<string, Experience>;
  stats: IndexStats;
}

/** Past-quarter snapshots, newest first. Only <yyyy>-q<n>.json files count; history/ is ignored. */
export const snapshots: Snapshot[] = Object.entries(snapshotModules)
  .map(([path, s]) => ({ slug: path.split('/').pop()!.replace('.json', ''), s }))
  .filter(({ slug, s }) => /^\d{4}-q[1-4]$/.test(slug) && s.quarter !== CURRENT_QUARTER)
  .map(({ slug, s }) => ({
    slug,
    quarter: s.quarter,
    snapshotDate: s.snapshot_date,
    experiences: s.experiences,
    stats: computeStats(Object.values(s.experiences)),
  }))
  .sort((a, b) => b.slug.localeCompare(a.slug));

export const previous: Snapshot | undefined = snapshots[0];
