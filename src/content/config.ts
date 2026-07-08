import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['decision', 'citation', 'pillar']),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
  }),
});

const experiences = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    provider: z.enum(['gyg', 'klook', 'viator', 'direct']),
    affiliate_url: z.string().url().nullable().optional(),
    klook_affiliate_url: z.string().url().nullable().optional(),
    viator_product_url: z.string().url().nullable().optional(),
    viator_variants: z.array(z.object({
      label: z.string(),
      url: z.string().url(),
    })).optional(),
    official_url: z.string().url().nullable().optional(),
    price_jpy: z.number().nullable().optional(),
    duration_min: z.number().nullable().optional(),
    area: z.enum([
      'Asakusa', 'Ginza', 'Omotesando', 'Aoyama', 'Shinjuku', 'Shibuya',
      'Yanaka', 'Hamarikyu', 'Shiodome', 'Nezu', 'Fukagawa',
      'Mita', 'Shirokanedai', 'Sumida', 'Other',
    ]),
    english_support: z.boolean().nullable().optional(),
    seiza_optional: z.boolean().nullable().optional(),
    kimono_addon: z.boolean().nullable().optional(),
    private_available: z.boolean().nullable().optional(),
    group_size: z.string().nullable().optional(),
    rating: z.number().min(1).max(5).nullable().optional(),
    review_count: z.number().nullable().optional(),
    school: z.enum(['Urasenke', 'Omotesenke', 'none-stated']).default('none-stated'),
    practitioner_rating: z.enum(['A', 'B', 'C']),
    last_checked: z.coerce.date(),
    editor_note: z.string(),
    price_usd: z.number().optional(),
    price_note: z.string().optional(),
    notes: z.string().optional(),
    platform_only: z.boolean().optional(),
    wheelchair_accessible: z.boolean().optional(),
  }),
});

export const collections = { articles, experiences };
