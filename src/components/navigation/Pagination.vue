<template lang="pug">
q-pagination.q-mt-lg(
  :input="true" v-model="query.page" :max="pages" :max-pages="9" color="grey-5"
  direction-links boundary-numbers size="lg")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Pagination',
  props: {
    query: Object,
    pages: Number
  }
})
class Pagination extends Vue {
}
</script>

<style lang="sass" scoped>
</style>
