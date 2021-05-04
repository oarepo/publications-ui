<template lang="pug">
q-page.q-mx-lg-xl
  pre {{ collection }}
</template>
<script>
import {Options, Vue} from 'vue-class-component'

export default @Options({
  name: 'DatasetList',
  props: {
    collection: Object
  },
  components: {
    // Logo,
    // DatasetListEntry,
    // NoDataPlaceholder,
    // FacetList,
    // Pagination
  }
})
class DatasetList extends Vue {

}
</script>
<style lang="sass">
</style>
