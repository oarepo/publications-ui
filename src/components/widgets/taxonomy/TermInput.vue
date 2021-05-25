<template lang="pug">
span(v-if="term") {{ $mt(term.title) || term.slug }}
div(v-else)
  slot(name="empty")
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'TermInput',
  props: {
    code: String,
    term: Object,
  }
})
</script>

<style lang="sass" scoped>
</style>
