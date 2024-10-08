/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': {
            transform: 'translateY(-100%)',
          },
          '100%': {
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-down': 'slide-down 0.5s ease-out forwards',
      },
      boxShadow: {
        custom: '-12px 11px 5px 0px rgba(249,140,41,0.82)',
      },
    },
    colors: {
      primary: '#F98C29',
      secondary: '#FFD600',
      tertiary: '#FF2305',
      quaternary: '#8205FF',
      white: '#FFFFFF',
      black: '#000000',
      gray: '#1A1B1C',
      grayOrangeLight: '#ffb55e',
      orangeTranparent: '#361C0599',
    },
    backgroundImage: {
      'bg-btn-gradient':
        'linear-gradient(to bottom, #FFD600 0%, #F98C29 64%, #FF2305 91%, #8205FF 100%)',
      'bg-btn-gradient-reverse':
        'linear-gradient(to bottom, #FFD600 0%, #F98C29 34%, #FF2305 75%, #8205FF 100%)',
      'bg-dark-gradient':
        'linear-gradient(to bottom, #000000 13%, #ffb55e4D 100%)',
      'bg-dark-gradient-Desktop':
        'linear-gradient(to right, #000000 23%, #ffb55e4D 100%)',
    },
  },
  plugins: [],
};
