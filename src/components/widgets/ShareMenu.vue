<template lang="pug">
q-btn.q-mx-md(color="secondary" icon="share" flat round)
  q-menu(
    anchor="center middle"
    transition-show="flip-right"
    transition-hide="flip-left")
    q-list(dense padding style="min-width: 100px")
      q-item(clickable v-close-popup @click="copy2clip(record.links.self.replace(/['\"]+/g, ''))")
        q-item-section(avatar)
          q-icon(name="link")
        q-item-section.no-wrap {{ $t('action.copyPermalink') }}
  q-tooltip {{ $t('action.share') }}
</template>
<script>
import {defineComponent} from 'vue'
import useClipboard from '@/composables/useClipboard'

export default defineComponent({
  name: 'ShareMenu',
  props: {
   record: {
     type: Object,
     required: true
   }
  },
  setup () {
    const {copy2clip} = useClipboard()
    return {copy2clip}
  }
})
</script>
