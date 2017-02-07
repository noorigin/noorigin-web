module.exports = config => [
    require('stylelint')(),
    require('postcss-cssnext')({
      browsers: 'last 2 versions',
      features: {
        customProperties: {
          variables: {
            colLink: 'orange',
            colText: '#999',
            colPage: '#222',
            colContentBack: '#111',
          },
        },
      },
    }),
    require('postcss-reporter')(),
    ...!config.production
      ? [
        require('postcss-browser-reporter')(),
      ]
      : [],
  ]
