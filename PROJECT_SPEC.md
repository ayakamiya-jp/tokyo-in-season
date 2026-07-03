# Project Spec v2: Tokyo in Season (tokyoinseason.com)

## Brand
- **Name**: Tokyo in Season
- **Tagline**: "Japanese culture, in its right season — from inside the tea room."
- **Editorial angle**: everything is framed by season. Tea ceremony (ro vs furo hearth, seasonal chabana), wagashi (monthly motifs), later kimono (awase vs hitoe) all share this lens. The quarterly Price Index update is part of the same brand promise: "in season = current".
- **Logo direction**: wordmark in a quiet serif; small seasonal mark (single leaf/blossom that can rotate quarterly). Palette per Tech Stack: sumi ink, warm white, deep matcha green.

## Purpose
An English-language guide for Western FIT travelers (30-50s, willing to pay ¥10,000-30,000 per experience) seeking authentic Japanese cultural experiences in Tokyo. Differentiator: written by an actual Urasenke tea ceremony practitioner.

**v2 strategic shift**: This is NOT a traditional SEO blog. Informational search traffic is collapsing (80%+ zero-click rate when AI Overviews appear; Tripadvisor projects SEO under 10% of experience bookings by end of 2026). The site is designed around three assets that survive that shift:
1. **A proprietary dataset** AI engines must cite (GEO > SEO)
2. **Decision/comparison pages** (the query type that retains clicks)
3. **A first-party email list** (the only channel nobody can take away)

Monetization: GetYourGuide (8%, 31-day cookie) + Klook affiliate at launch → direct partnerships with tea houses / kimono rentals (target 15-25% or per-referral fee) once traffic and data justify negotiation.

Domain covers Japanese culture broadly; first 90 days focus exclusively on tea ceremony.

## Tech Stack
- **Framework**: Astro (static output, Content Collections)
- **Styling**: Tailwind CSS. Quiet, editorial, wabi-sabi aesthetic. Serif display headings, muted palette (sumi ink, warm white, deep matcha green accent). Must NOT look like a generic AI/travel template.
- **Hosting**: Cloudflare Pages (free tier), custom domain
- **Email**: Buttondown or ConvertKit free tier. Lead magnet: "Tea Ceremony Etiquette for First-Time Guests" PDF
- **Analytics**: Plausible or GA4 + Google Search Console from day one. Track AI-referral traffic (ChatGPT/Perplexity/Claude referrers) as a separate segment — it converts far better than organic and is the growth channel.

## Repo Structure
```
/src
  /content
    /articles        # MDX articles
    /experiences     # JSON/YAML: one file per bookable experience
  /components
    ComparisonTable.astro   # sortable table from experiences data
    AffiliateButton.astro   # GYG/Klook link with partner params
    AuthorBio.astro         # practitioner credibility box, every article
    FaqBlock.astro          # FAQ + FAQPage schema
    EmailCapture.astro      # lead magnet opt-in, every article + exit points
    IndexBadge.astro        # "Data: Tokyo Tea Ceremony Index, updated YYYY-MM"
/scripts
  update-experiences.ts     # refresh/flag stale entries
  build-index.ts            # aggregates /experiences into the Price Index page + downloadable CSV
/public
  llms.txt                  # site guide for AI crawlers
```

## Core Asset: Tokyo Tea Ceremony Price Index (quarterly)
The moat. A structured survey of every bookable tea ceremony experience in Tokyo. Nobody else maintains this; AI engines answering "how much does a tea ceremony in Tokyo cost" need a citable source.

Per-experience schema:
name, provider, affiliate_url, price_jpy, duration_min, area, english_support (bool), seiza_optional (bool: chairs available), kimono_addon (bool), private_available (bool), group_size, rating, review_count, school (Urasenke/Omotesenke/none-stated), last_checked (date), editor_note (Ayaka's one-line practitioner verdict — REQUIRED, this cannot be scraped or generated)

Publication requirements:
- Dedicated /tokyo-tea-ceremony-price-index page: headline stats (median price, price range by area, % offering chairs, % with English), quarter-over-quarter changes, methodology section, downloadable CSV
- Every stat rendered as a clean quotable sentence + Dataset/ItemList schema markup
- Quarterly update = recurring citation-bait and newsletter content

## Content Plan — First 90 Days
Ratio shift vs v1: fewer explainers, more decision pages. Explainers exist to earn citations and email opt-ins, not traffic.

### Money/decision pages (priority 1)
1. Tokyo Tea Ceremony Experiences Compared (master comparison table)
2. Tokyo Tea Ceremony Price Index (the dataset page)
3. Private vs Group Tea Ceremony: Which to Book?
4. Tea Ceremony in Asakusa vs Ginza vs Omotesando
5. Best Tea Ceremonies If You Can't Sit Seiza (underserved decision query)

### Citation/list-building pages (priority 2)
6. Tea Ceremony in Tokyo: A Practitioner's Complete Guide (pillar)
7. Tea Ceremony Etiquette for First-Time Guests (mirrors lead magnet)
8. What to Wear to a Tea Ceremony
9. Wagashi 101 (incl. rakugan/higashi)
10. Urasenke vs Omotesenke: Do Schools Matter for Visitors?
11. Is a Tokyo Tea Ceremony Worth It? An Insider's Honest Take

### Article production workflow
1. Claude Code drafts from outline + Ayaka's bullet-point lived-experience notes
2. Ayaka injects first-person practitioner details (mandatory — no article ships without it; original photos from her own practice wherever possible)
3. Every article: AuthorBio, EmailCapture, 1+ internal link to a money page, FAQ block, Article schema

## GEO / AI-Citation Requirements
- schema.org: Article, FAQPage, ItemList, Dataset (Index page), Person (author)
- Clear answer blocks: each page opens with a 2-3 sentence direct answer a model can lift and attribute
- llms.txt in /public describing the site, the Index, and update cadence
- Stats phrased in self-contained sentences ("As of Q3 2026, the median price of a group tea ceremony in Tokyo is ¥X, per the Tokyo Tea Ceremony Price Index")
- Do NOT block AI crawlers — being cited is the strategy
- E-E-A-T: About page establishing Urasenke practice background, consistent author entity across site + X

## Email List (day one, non-negotiable)
- Lead magnet PDF delivered on signup; later sold logic reversed: PDF free, paid product is expanded "First-Timer's Japan Culture Kit" on Gumroad ($9-15)
- Monthly newsletter: Index changes, seasonal tea notes, one practitioner story
- KPI hierarchy: email subscribers > AI citations observed > affiliate revenue > sessions

## Phased Monetization
- **Phase A (launch)**: GYG/Klook affiliate, 15-20 curated experiences, manual data, GYG widgets where useful
- **Phase B (traction)**: URL/price drift checker flags stale entries; Gumroad digital product; Pinterest + helpful Reddit presence for initial traffic
- **Phase C (leverage)**: approach 3-5 top-performing providers with referral data in hand; negotiate direct 15-25% or flat per-booking fee; expand Index + site to kimono pillar

## Explicit Non-Goals (first 90 days)
- No kimono/sweets pillar content (structure reserves space)
- No Japanese-language version, no paid ads, no aggressive scraping (respect provider ToS; manual curation + official widgets)
