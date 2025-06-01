/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#00ff88',
          bg: '#0a0a0a',
          'second-bg': '#1a1a1a',
          'text-primary': '#fff',
          'text-secondary': '#ccc',
        },
        fontFamily: {
          poppins: ['Poppins', 'sans-serif'],
        },
        fontSize: {
          'big': '5rem',
          'h2': '3rem',
          'p': '1.1rem',
        },
        animation: {
          'scroll-horizontal': 'scroll-horizontal 30s linear infinite',
          'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
          'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
          'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
        },
        keyframes: {
          'scroll-horizontal': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
          'fade-in-up': {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'fade-in-left': {
            '0%': { opacity: '0', transform: 'translateX(-30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          'fade-in-right': {
            '0%': { opacity: '0', transform: 'translateX(30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
        },
      },
    },
    plugins: [],
  }