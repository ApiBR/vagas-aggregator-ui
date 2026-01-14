/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Base colors
        white: '#fff',
        black: '#000',
        gray: {
          100: '#f8f9fa',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#adafae',
          500: '#888',
          600: '#555',
          700: '#282828',
          800: '#222',
          900: '#212529',
        },
        // Theme colors
        primary: '#2a9fd6',
        secondary: '#555',
        success: '#77b300',
        info: '#9933cc',
        warning: '#ff8800',
        danger: '#cc0000',
        light: '#f8f9fa',
        dark: '#212529',
        
        // Additional colors
        blue: '#2a9fd6',
        indigo: '#6610f2',
        purple: '#6f42c1',
        pink: '#e83e8c',
        red: '#cc0000',
        orange: '#fd7e14',
        yellow: '#ff8800',
        green: '#77b300',
        teal: '#20c997',
        cyan: '#9933cc',
      },
      fontFamily: {
        sans: ['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'h1': '4rem',
        'h2': '3rem',
        'h3': '2.5rem',
        'h4': '2rem',
        'h5': '1.5rem',
      },
      backgroundColor: {
        body: {
          light: '#ffffff',
          dark: '#060606',
        },
      },
    },
  },
  plugins: [],
};