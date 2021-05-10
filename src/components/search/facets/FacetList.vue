<template lang="pug">
.column.facets
  .col.collection-facets.full-height
    div.q-mx-sm.q-mt-md
      teleport(to="#facets-drawer" v-if="facetsEnabled")
        facets(
          :definition="facetDefinitions"
          :facetLoader="facetLoader"
          :options="facetOptions"
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
      definitions,
      facetDefinitions,
      facetLoader,
      transformFacet,
      facetsEnabled,
    } = useFacets(props.collection)
    const query = useQuery()

    const facetOptions = ref({
      defaults: defaults,
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

    return {definitions, facetOptions, facetSelected, facetLoader, facetDefinitions, facetsEnabled}
  }
})
</script>
<style lang="sass" scoped>
</style>
