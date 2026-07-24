/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        sumi: '#2a2a27',
        'sumi-soft': 'rgb(42 42 39 / 0.7)',
        matcha: '#3d5a3e',
        'matcha-light': '#7a9e7e',
        'warm-white': '#f4f3ef',
        surface: '#ffffff',
        'warm-gray': '#eceae4',
        'warm-gray-mid': '#6b655c',
        border: '#d9d5cc',
        sakura: '#e8c9d0',
        'sakura-light': '#fcf2f5',
        'sakura-deep': '#bc5c6f',
        'sakura-cta': '#f2a8bc',
        'sakura-cta-ink': '#1d1c19',
        ink: '#1d1c19',
        // #727272 on warm-white (#f4f3ef) = 4.5:1+ — the darkest gray that still clears WCAG AA at small text sizes
        'legal-gray': '#727272',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        label: ['"Jost"', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.sumi-soft'),
            a: { color: theme('colors.matcha') },
            'h1,h2,h3': { fontFamily: theme('fontFamily.display').join(', '), fontWeight: '800', color: theme('colors.sumi') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
