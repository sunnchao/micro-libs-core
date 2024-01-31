const prettyhtml = require('volar-service-prettyhtml');

module.exports = {
  plugins: [
    prettyhtml({
      prettier: {
        useTabs: true,
        tabWidth: 2,
        printWidth: 200,
        singleQuote: true,
      },
      tabWidth: 2,
      printWidth: 200,
      singleQuote: false,
      wrapAttributes: true,
      sortAttributes: false,
      usePrettier: false,
      useTabs: false,
    }),
  ],
};
