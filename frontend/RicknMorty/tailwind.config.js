/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        appBG: '#1c3042',
        rickColor: '#9fded5',
        mortyColor: '#f0e14a',
        cementGray: '#697a82',
        iconColors: '#b94150',
        portalColor: '#5CAD4A',
      },
    },
  },
  plugins: [require('daisyui')],
};
