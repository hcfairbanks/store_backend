import path from 'path'
import i18n from 'i18n'

i18n.configure({
  locales: ['en', 'el'],
  objectNotation: true,
  directory: path.join(__dirname, '../locales')
})

export {i18n}