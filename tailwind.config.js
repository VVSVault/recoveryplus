/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        parchment: '#F3EFE0',
        sand: '#C8B88B',
        olive: '#9CAF88',
        sage: '#87986A',
        bark: '#6B5D54',
        olivewood: '#3C3B35',
        primary: {
          50: '#F8F9F5',
          100: '#EEF1E8',
          200: '#DDE4D1',
          300: '#C3CFB0',
          400: '#9CAF88',
          500: '#87986A',
          600: '#6B7A52',
          700: '#555E42',
          800: '#3E4431',
          900: '#2A2D21',
          950: '#1A1C14',
        },
        neutral: {
          50: '#FAF9F7',
          100: '#F3EFE0',
          200: '#E8E2D1',
          300: '#C8B88B',
          400: '#A69875',
          500: '#6B5D54',
          600: '#564A42',
          700: '#433A34',
          800: '#3C3B35',
          900: '#2A2925',
          950: '#1A1915',
        },
        card: 'var(--card)',
        border: 'var(--border)',
        accent: 'var(--accent)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.7s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      backgroundImage: {
        'grid-pattern': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'grid\' width=\'100\' height=\'100\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M 100 0 L 0 0 0 100\' fill=\'none\' stroke=\'rgba(255,255,255,0.02)\' stroke-width=\'1\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width=\'100%25\' height=\'100%25\' fill=\'url(%23grid)\' /%3E%3C/svg%3E")',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};