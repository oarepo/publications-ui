<template lang="pug">
.column.facets
  .col.collection-facets.full-height
    div.q-mx-sm.q-mt-md
      teleport(to="#facets-drawer" v-if="facetsDrawerVisible")
        facets(
          :definition="facetDefinitions"
          :facetLoader="facetLoader"
          @facetSelected="facetSelected")
</template>

<script>
import {defineComponent, ref} from 'vue'
import useFacets from '@/composables/useFacets'
import {useQuery} from "@oarepo/vue-query-synchronizer";

export default defineComponent({
  name: 'FacetList',
  props: {
    collection: Object,
    drawer: String,
    facetsSelected: Boolean
  },
  emits: ['update:activeFacets'],
  setup(props, ctx) {
    const {
      defaults,
      types,
      definitions,
      facetDefinitions,
      facetLoader,
      transformFacet,
      facetsDrawerVisible
    } = useFacets(props.collection)
    const query = useQuery()

    const facetsOptions = ref({
      defaults: defaults,
      types: types
    })

    function facetSelected(facetSelection) {
      for (const [k, v] of Object.entries(facetSelection)) {
        if (!v.size) {
          query[transformFacet(k)] = null
        } else {
          query[transformFacet(k)] = [...v]
        }
      }
      ctx.emit('update:activeFacets', facetSelection)
    }

    return {definitions, facetsOptions, facetSelected, facetLoader, facetDefinitions, facetsDrawerVisible}
  }
})
</script>
<style lang="sass" scoped>
</style>
