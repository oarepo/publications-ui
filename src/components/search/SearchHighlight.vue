<template lang="pug">
.text-grey-7.highlight(v-html="highlight" v-if="hasHighlight")
span(v-else) {{ text }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'SearchHighlight',
  props: {
    item: Object,
    text: String
  }
})
class SearchHighlight extends Vue {
  get highlight () {
    return this.$sanitize(Object.values(this.item.highlight || {}).flat().join(' ... '), {
      allowedTags: ['em']
    })
  }

  get hasHighlight () {
    return this.item.highlight && Object.keys(this.item.highlight).length
  }
}
</script>

<style lang="sass">
.highlight em
  font-weight: bolder
  color: $accent !important
</style>
