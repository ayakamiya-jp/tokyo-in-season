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
    provider: z.string(),
    affiliate_url: z.string().url(),
    affiliate_network: z.enum(['getyourguide', 'klook', 'direct']),
    price_jpy: z.number(),
    duration_min: z.number(),
    area: z.enum(['Asakusa', 'Ginza', 'Omotesando', 'Shinjuku', 'Yanaka', 'Hamarikyu', 'Other']),
    english_support: z.boolean(),
    seiza_optional: z.boolean(),
    kimono_addon: z.boolean(),
    private_available: z.boolean(),
    group_size_max: z.number(),
    rating: z.number().min(1).max(5).optional(),
    review_count: z.number().optional(),
    school: z.enum(['Urasenke', 'Omotesenke', 'None stated']).default('None stated'),
    last_checked: z.coerce.date(),
    editor_note: z.string(),
  }),
});

export const collections = { articles, experiences };
