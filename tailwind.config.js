/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        bebas: ['Bebas Neue', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(251, 146, 60, 0.15)',
      },
    },
  },
  plugins: [],
}
