/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        botanical: {
          50: '#F5F7F4',
          100: '#E6ECE4',
          200: '#CADA84',
          300: '#A1C398',
          400: '#7AA870',
          500: '#4A7C59',
          600: '#386343',
          700: '#2A4A32',
          800: '#1F3424',
          900: '#142217',
          950: '#0B140D',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FFFDF9',
          200: '#FAF7F2',
          300: '#F4EFE6',
          400: '#EBE3D5',
          500: '#DFD3C3',
          900: '#1C1917',
        },
        peach: {
          100: '#FDF0EC',
          200: '#F9DCD3',
          300: '#F2BEB1',
          400: '#E8A598',
          500: '#E07A5F',
          600: '#C75D42',
        },
        sage: {
          100: '#EEF2ED',
          200: '#D8E2D7',
          300: '#BFCFC0',
          400: '#A4BBA6',
          500: '#8FAD88',
        },
        earth: {
          100: '#F7F4EF',
          200: '#EBE4D8',
          300: '#D4C5B0',
          500: '#B09A7A',
          800: '#4A3E31',
          900: '#2C231A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(74, 124, 89, 0.08)',
        'soft-lg': '0 10px 30px -4px rgba(74, 124, 89, 0.12)',
        warm: '0 8px 25px -3px rgba(224, 122, 95, 0.10)',
        glow: '0 0 25px rgba(74, 124, 89, 0.25)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
