/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Ubuntu', ...defaultTheme.fontFamily.sans],
      serif: ['var(--firaSans-font)', ...defaultTheme.fontFamily.serif],
    },
   
    extend: {
      fontSize: {
        
        base: [
          'clamp(0.75rem, 0.8333vw, 1.75rem)', '1.2',
        ] /** 12 px > 16px (1920) > 16px (large screens) */,
        '2xl': [
          'clamp(1rem, 1.25vw, 1.75rem)', '1.2',
        ] /** 18 px > 24px (1920) > 28px (large screens) */,
        '3xl': [
          'clamp(1.2rem, 1.666vw, 1.75rem)', '1.2',
        ] /** 24 px > 32px (1920) > 34px (large screens) */,
        '6xl': [
          'clamp(2rem, 3.125vw, 4rem)', '1.2',
        ] /** 40 px > 60px (1920) > 64px (large screens) */,
        
      },
      colors: {
        'orangeNew': '#FF7A02',
        'redNew': '#CE190D', 
        'blueNew': '#3448C5',
      },
      screens: {
        '3xl': '1540px',

      },
      
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line import/no-extraneous-dependencies
  plugins: [require("tailwindcss-animate"),],
}
