/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent: '#2563eb',
      },
      fontFamily: {
        sans: ['Inter', 'Source Sans 3', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 10px 24px -20px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
