<template lang="pug">
  #q-app
    router-view
</template>
<script>
import { i18n } from 'boot/i18n'
import { BottomSheet } from 'quasar'
import { REDIRECT_LOGIN, usePopupLogin } from '@oarepo/vue-popup-login'

export default {
  name: 'App',
  meta: {
    title: i18n.t('app.productName')
  },
  computed: {
    pageTitle () {
      return i18n.t('app.productName')
    }
  },
  watch: {
    '$route' (to, from) {
      document.title = to.meta.title ? `${to.meta.title} | ${this.pageTitle}` : this.pageTitle
    }
  },
  setup () {
    const api = usePopupLogin({})
    api.check(false)
    api.registerPopupFailedHandler(() => {
      return new Promise((resolve) => {
        BottomSheet.create({
          dark: true,
          title: i18n.t('section.error'),
          message: i18n.t('error.popupLoginFail'),
          actions: [
            {
              label: i18n.t('action.retry'),
              icon: 'vpn_key',
              id: 'retry'
            },
            {
              label: i18n.t('action.altLogin'),
              icon: 'login',
              id: 'redirect'
            }]
        }).onOk(action => {
          if (action.id === 'retry') {
            resolve(api.login())
          } else {
            resolve(REDIRECT_LOGIN)
          }
        })
      })
    })

    api.registerLoginRequiredHandler(() => {
      return new Promise((resolve) => {
        BottomSheet.create({
          dark: true,
          title: i18n.t('section.loginRequired'),
          message: i18n.t('message.authRequired'),
          actions: [{
            label: i18n.t('action.login'),
            icon: 'vpn_key',
            id: 'log-in'
          }]
        }).onOk(() => {
          resolve(api.login())
        })
      })
    })
  }
}
</script>
