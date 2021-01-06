const path = require('path')
//const { I18n } = require('i18n')

const i18n = require('i18n')

// const i18n = new I18n({
//   locales: ['en', 'el'],
//   header: 'myLanguage',
//   //  queryParameter: 'lang',
//   //  defaultLocale: 'el',
//   directory: path.join(__dirname, '../locales')
// })



i18n.configure({
  locales: ['en', 'el'],
  objectNotation: true,
  header: 'myLanguage',
  directory: path.join(__dirname, '../locales')
})


export {i18n}