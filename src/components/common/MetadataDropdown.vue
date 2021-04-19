<template lang="pug">
q-card-actions
  .text-overline.text-uppercase.text-accent.q-my-md.q-px-lg JSON Metadata
  q-space
  q-btn(
    color="grey"
    round
    flat
    icon="content_copy"
    @click="copy2clip")
  q-btn(
    color="grey"
    round
    flat
    dense
    :icon="metadataExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
    @click="metadataExpanded = !metadataExpanded")
  q-slide-transition.full-width
    .q-pa-md.bg-dark(v-show="metadataExpanded")
      pre.text-code.text-white.wrap.overflow-auto {{ metadata }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { copyToClipboard } from 'quasar'

export default @Component({
  name: 'MetadataDropdown',
  props: {
    metadata: Object
  }
})
class MetadataDropdown extends Vue {
  metadataExpanded = false

  copy2clip () {
    copyToClipboard(JSON.stringify(this.metadata, null, 4))
      .then(() => {
        this.$q.notify(this.$t('message.copiedToClip'))
      })
  }
}
</script>

<style lang="sass" scoped>
</style>
