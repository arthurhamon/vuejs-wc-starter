process.env.VUE_APP_VERSION = process.env.npm_package_version;
process.env.VUE_APP_NAME = process.env.npm_package_name;

module.exports = {
  css: {
    extract: false,
  },
  pluginOptions: {
    i18n: {
      locale: 'us',
      fallbackLocale: 'us',
      localeDir: 'i18n',
      enableInSFC: false,
    },
  },
};
