<template lang="pug">
span(v-if="term") {{ mt(term.title) || term.slug }}
div(v-else)
  slot(name="empty")
</template>

<script>
import {defineComponent} from 'vue'
import {useI18n} from "vue-i18n";
import {useTranslated} from '@/composables/useTranslated'

export default defineComponent({
  name: 'TermInput',
  props: {
    code: String,
    term: Object,
  },
  setup () {
    const {locale} = useI18n()
    const {mt} = useTranslated(locale)
    return {mt}
  }
})
</script>

<style lang="sass" scoped>
</style>
