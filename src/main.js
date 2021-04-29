import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'
import { i18n } from '@/boot/i18n'
import addressbarColor from  '@/boot/addressbar-color'

const app = createApp(App)

// Use extensions & boot files
app
    .use(Quasar, quasarUserOptions)
    .use(router)
    .use(i18n)
    .use(addressbarColor)

app.mount('#app')
