<template lang="pug">
q-chip.term-chip(
  square
  :removable="removable"
  color="primary"
  outline
  @remove="$emit('remove', term)")
  q-avatar.full-width(v-if="term && term.icon")
    q-icon.full-height.term-icon(:name="term.icon")
    q-tooltip
      mt.self-center(:text="term.title")
  term-span.q-pl-sm(
    v-if="term"
    :term="term"
    :taxonomy="taxonomy")
</template>

<script>
import {defineComponent} from 'vue'
import TermSpan from "@/components/widgets/taxonomy/TermSpan";

export default defineComponent({
  name: "TermChip",
  components: {TermSpan},
  emits: ['remove'],
  props: {
    removable: {
      type: Boolean,
      default: false
    },
    term: Object,
    taxonomy: String
  }
})
</script>

<style lang="sass" scoped>
.term-chip
  padding: 0 10px 0 0

  .term-icon
    width: auto
</style>
