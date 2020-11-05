import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from 'src/i18n'
import { Quasar } from 'quasar'

Vue.use(VueI18n)

const defaultLocale = Quasar.lang.isoName
let browserLocale = Quasar.lang.getLocale()

if (browserLocale === 'cs') {
  browserLocale = 'cs-cz'
} if (browserLocale === 'en') {
  browserLocale = 'en-us'
}

const i18n = new VueI18n({
  locale: browserLocale,
  fallbackLocale: defaultLocale,
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

// if you need to import it from
// other files, then:
export { i18n }
