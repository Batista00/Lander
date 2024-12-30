/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.2' },
          '50%': { opacity: '0.15' },
        },
        'drift': {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(50px, 50px)' },
        },
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
      animation: {
        'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift': 'drift 20s linear infinite',
        'gradient': 'gradient 8s linear infinite',
      },
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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
