import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#182323',
        moss: '#48635b',
        lagoon: '#0f6f73',
        ochre: '#b65f25',
        clay: '#c9835a',
        bone: '#f7f4ed',
        paper: '#fffdf8'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        soft: '0 14px 40px rgb(24 35 35 / 0.12)'
      }
    }
  },
  plugins: []
} satisfies Config;
