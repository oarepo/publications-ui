import { Quasar } from 'quasar'
import { createI18n } from 'vue-i18n'

const defaultLocale = 'cs-cz'
let browserLocale = Quasar.lang.getLocale()

if (browserLocale === 'cs') {
    browserLocale = 'cs-cz'
} if (browserLocale === 'en') {
    browserLocale = 'en-us'
}

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
    const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    const messages = {}
    locales.keys().forEach(key => {
        const matched = key.match(/([A-Za-z0-9-_]+)\./i)
        if (matched && matched.length > 1) {
            const locale = matched[1]
            const loc = locales(key).default

            if (locale.length === 5) {
                messages[locale.slice(0,2)] = loc
            }
            messages[locale] = loc
        }
    })
    return messages
}

export default createI18n({
    legacy: false,
    globalInjection: true,
    locale: browserLocale,
    fallbackLocale: defaultLocale,
    messages:  loadLocaleMessages()
})
