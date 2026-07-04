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
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Times New Roman"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.sumi'),
            a: { color: theme('colors.matcha') },
            p: { fontWeight: '500' },
            'h1,h2,h3': { fontFamily: theme('fontFamily.serif').join(', ') },
          },
        },
        lg: {
          css: {
            fontSize: '18px',
            lineHeight: '1.7',
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
