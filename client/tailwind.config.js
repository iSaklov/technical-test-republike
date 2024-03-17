/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'tt-firs-neue': ['TT Firs Neue', 'sans-serif'],
      },
      colors: {
        // Main color and its shades with transparency
        primary: '#7B61FF',
        'primary-10': 'rgba(123, 97, 255, 0.1)', // 10% transparency
        'primary-5': 'rgba(123, 97, 255, 0.05)', // 5% transparencyƒ
        // Additional colors
        'dark-blue': '#1A1F36',
        'very-light-gray': '#E8E9EB',
        'light-gray': '#E0E1E4',
        'medium-gray': '#797979',
        'dark-gray': '#9D9D9D',
        'steel-gray': '#6C727E',
        'darker-blue': '#131721',
        'bright-blue': '#0184FF',
      },
    },
  },
  plugins: [],
}
