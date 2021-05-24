import { createI18n } from 'vue-i18n/index'
import messages from '@/i18n'
import { Quasar } from 'quasar'

const defaultLocale = Quasar.lang.isoName
let browserLocale = Quasar.lang.getLocale()

if (browserLocale === 'cs') {
    browserLocale = 'cs-CZ'
} if (browserLocale === 'en') {
    browserLocale = 'en-US'
}

const i18n = createI18n({
    locale: browserLocale,
    fallbackLocale: defaultLocale,
    messages
})

export { i18n }
