<template lang="pug">
  .col
    q-list(padding)
      facet(
        :isLoading="isLoading"
        v-for="facet in facets"
        :facet="facet"
        :key="facet.code"
        @open="openFacet(facet)"
        @close="closeFacet(facet)")
</template>

<script>
import { Component } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import Facet from 'components/search/Facet'
import { LoadingMixin } from 'src/mixins/Loading'

export default @Component({
  name: 'FacetList',
  components: {
    Facet
  },
  props: {
    facets: Array
  }
})
class FacetList extends mixins(LoadingMixin) {
  mounted () {
    this.isLoading = false
  }

  openFacet (facet) {
    if (!this.$query.facets.includes(facet.code)) {
      this.$query.addValue('facets', facet.code)
    }
  }

  closeFacet (facet) {
    if (this.$query.facets.includes(facet.code)) {
      this.$query.removeValue('facets', facet.code)
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
