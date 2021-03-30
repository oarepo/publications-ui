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
  meta () {
    return {
      title: this.appTitle,
      titleTemplate: title => this.fullAppTitle,
      meta: {
        twitterTitle: {
          name: 'twitter:title',
          content: this.fullAppTitle
        },
        ogTitle: {
          name: 'og:title',
          content: this.fullAppTitle
        }
      }
    }
  },
  setup () {
    const login = usePopupLogin({})
    login.check(false)
    login.registerPopupFailedHandler(() => {
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
            resolve(login.login())
          } else {
            resolve(REDIRECT_LOGIN)
          }
        })
      })
    })

    login.registerLoginRequiredHandler(() => {
      return new Promise((resolve) => {
        BottomSheet.create({
          class: 'z-top',
          dark: true,
          title: i18n.t('section.loginRequired'),
          message: i18n.t('message.authRequired'),
          actions: [{
            label: i18n.t('action.login'),
            icon: 'vpn_key',
            id: 'log-in'
          }]
        }).onOk(() => {
          resolve(login.login())
        })
      })
    })
  },
  computed: {
    appTitle () {
      return this.$i18n.t('app.productName')
    },
    fullAppTitle () {
      return `${this.appTitle}${this.$route.meta.title ? ' - ' : ''}${this.$t(this.$route.meta.title) || ''}`
    }
  }
}
</script>
