/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      primary: '#F98C29',
      secondary: '#FFD600',
      tertiary: '#FF2305',
      quaternary: '#8205FF',
    },
    backgroundImage: {
      'bg-btn-gradient': 'linear-gradient(to bottom, #FFD600 0%, #F98C29 64%, #FF2305 91%, #8205FF 100%)',
    },
  },
  plugins: [],
};
