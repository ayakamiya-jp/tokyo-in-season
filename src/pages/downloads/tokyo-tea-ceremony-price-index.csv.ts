import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const columns = [
  'name', 'area', 'price_jpy', 'duration_min', 'practitioner_rating',
  'provider', 'school', 'english_support', 'seiza_optional',
  'kimono_addon', 'private_available', 'last_checked',
] as const;

function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  const s = value instanceof Date ? value.toISOString().slice(0, 10) : String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export const GET: APIRoute = async () => {
  const entries = await getCollection('experiences');
  const rows = entries.map(e => e.data);

  const lines = [
    columns.join(','),
    ...rows.map(row => columns.map(col => csvCell(row[col])).join(',')),
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/csv; charset=utf-8' },
  });
};
