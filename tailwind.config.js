/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'xav-bg':         '#04060D',
        'xav-surface':    '#0C1120',
        'xav-gold':       '#C9A84C',
        'xav-gold-light': '#E8C97A',
        'xav-text':       '#E8E0D0',
        'xav-muted':      '#6B6355',
      },
      fontFamily: {
        cairo:    ['var(--font-cairo)',     'Cairo',             'sans-serif'],
        cormorant:['var(--font-cormorant)', 'Cormorant Garamond','serif'],
        cinzel:   ['var(--font-cinzel)',    'Cinzel',            'serif'],
      },
    },
  },
  plugins: [],
}
