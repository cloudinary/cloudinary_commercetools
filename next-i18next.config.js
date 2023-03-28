module.exports = {
  i18n: {
    defaultLocale: process.env.DEFAULTLOCALE,
    locales: process.env.LOCALES.split(','),
  },
  interpolation: false,
  reloadOnPrerender: true,
}
