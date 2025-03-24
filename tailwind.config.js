/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './js/**/*.js',
    './templates/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00bfa5',
        'primary-dark': '#009688',
        'bg-dark': '#1e1e1e',
        'bg-darker': 'rgba(30, 30, 30, 0.95)',
        text: '#e0e0e0',
      },
      fontFamily: {
        'josefin': ['Josefin Sans', 'sans-serif'],
      },
      borderRadius: {
        'sm': '2px',
        'md': '4px',
        'lg': '4px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  }
}
