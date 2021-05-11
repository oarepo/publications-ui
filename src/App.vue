<template lang="pug">
router-view(v-slot="{ Component }")
  transition(name="fade")
    component(:is="Component")
</template>

<script>
import {useMeta, useQuasar} from 'quasar'
import {useI18n} from 'vue-i18n/index'
import {defineComponent} from 'vue'
import {provideContext} from 'vue-context-composition'
import {community} from '@/contexts/community'

export default defineComponent({
  name: 'App',
  setup() {
    provideContext(community)

    const {t, locale} = useI18n({useScope: 'global'})
    const q = useQuasar()
    locale.value = 'cs'
    try {
      import('quasar/lang/cs')
          .then(lang => {
            q.lang.set(lang.default)
          })
    } catch (err) {
      console.log(err)
    }

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
})
</script>
