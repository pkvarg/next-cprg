import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '9/16': '56.25%', // 16:9 aspect ratio
      },
      colors: {
        sacred: {
          dark: '#1c1917',
          deep: '#2d1f1a',
          terracotta: '#7a3325',
          gold: '#c9a227',
          'gold-light': '#e8c460',
          cream: '#faf7f2',
          'cream-dark': '#f0ebe1',
          muted: '#9e8a7a',
        },
      },
      fontFamily: {
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
