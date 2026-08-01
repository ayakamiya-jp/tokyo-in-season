import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  integrations: [mdx(), tailwind(), sitemap()],
  site: 'https://tokyoinseason.com',
  output: 'static',
});
