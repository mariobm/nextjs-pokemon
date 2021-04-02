module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '2/1': '200%'
      },
      zIndex: {
        1: 1,
        2: 2,
        5: 5
      },
      keyframes: {
        show: {
          '0%, 49.99%': { opacity: 0, zIndex: 1 },
          '50%, 100%': { opacity: 1, zIndex: 5 }
        }
      },
      animation: {
        'show-form': 'show 0.6s'
      },
      transitionDuration: {
        600: '600ms'
      },
      translate: {
        '1/5': '20%',
        205: '-20%'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
