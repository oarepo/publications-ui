<template lang="pug">
  #q-app
    router-view
</template>
<script>
import { i18n } from 'boot/i18n'

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
  }
}
</script>
