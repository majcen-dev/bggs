module.exports = {
  purge: [
    'src/**/*.js',
    'src/**/*.jsx',
    'src/**/*.ts',
    'src/**/*.tsx',
    'public/**/*.html'
  ],
  theme: {
    extend: {
      spacing: {
        '005r': '0.05rem',
        '01r': '0.1rem',
        '13': '3.25rem',
        '72': '18rem',
        '80': '20rem',
        '88': '22rem'
      },
      screens: {
        tny: '265px',
        xs: '380px',
        ms: '480px',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
  },
}
