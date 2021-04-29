<template>
<router-view></router-view>
</template>

<script>
import {useMeta} from 'quasar'
import {useI18n} from "vue-i18n/index";

export default {
  name: 'App',
  setup() {
    const {t} = useI18n()

    useMeta(() => {
      return {
        title: t('nav.intro') || ' ',
        titleTemplate: title => `${title !== ' ' ? title + ' - ' : ' '}${t('app.productName')}`,
        meta: {
          description: {name: 'description', content: t('app.description')},
        }
      }
    })
  }
}
</script>
