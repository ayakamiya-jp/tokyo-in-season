/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sumi: '#1a1a1a',
        matcha: '#3d5a3e',
        'matcha-light': '#7a9e7e',
        'warm-white': '#faf8f4',
        'warm-gray': '#f0ece4',
        'warm-gray-mid': '#736b61',
        sakura: '#e8bfb8',
        'sakura-light': '#fdf0ed',
        'sakura-deep': '#b87068',
        // #727272 on warm-white (#faf8f4) = 4.54:1 — the darkest gray that still clears WCAG AA (4.5:1) at small text sizes
        'legal-gray': '#727272',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            // Softened from solid sumi (#1a1a1a) — full-strength black at body
            // size read as too dark/heavy next to the rest of the site's
            // text-sumi/70 copy. This keeps body paragraphs in that same
            // family without overriding color utilities per-page.
            color: 'rgb(26 26 26 / 0.8)',
            a: { color: theme('colors.matcha') },
            'h1,h2,h3': { fontFamily: theme('fontFamily.serif').join(', '), fontWeight: '600' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
