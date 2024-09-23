/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      primary: '#F98C29',
      secondary: '#FFD600',
      tertiary: '#FF2305',
      quaternary: '#8205FF',
      white: '#FFFFFF',
      black: '#000000',
      gray: '#1A1B1C',
      orangeTranparent: '361C0599',
    },
    backgroundImage: {
      'bg-btn-gradient': 'linear-gradient(to bottom, #FFD600 0%, #F98C29 64%, #FF2305 91%, #8205FF 100%)',
    },
  },
  plugins: [],
};
