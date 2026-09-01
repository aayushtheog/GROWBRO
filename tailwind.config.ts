import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcddff',
          300: '#8ec7ff',
          400: '#59a7ff',
          500: '#3485fb',
          600: '#1f66f0',
          700: '#1c51dd',
          800: '#1c43b3',
          900: '#1c3b8d',
          950: '#162756',
        },
        accent: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.06)',
        cardhover: '0 10px 25px -5px rgb(0 0 0 / 0.12), 0 4px 10px -4px rgb(0 0 0 / 0.06)',
      },
      animation: {
        fade: 'fade 0.25s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
