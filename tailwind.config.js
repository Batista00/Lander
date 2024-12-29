/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          DEFAULT: '#00FF7F',
          50: '#F0FFF7',
          100: '#E0FFE9',
          200: '#B3FFD6',
          300: '#85FFC3',
          400: '#4DFF9F',
          500: '#00FF7F',
          600: '#00CC66',
          700: '#009933',
          800: '#006622',
          900: '#003311',
          950: '#001A09',
        },
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
