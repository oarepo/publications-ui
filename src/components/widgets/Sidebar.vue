<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-if="facetsEnabled"
  v-model="facetsSidebarVisible"
  :width="320"
  :breakpoint="700")
  .column.no-wrap.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
    .col-auto.full-width
      .text-h7.text-grey-7.text-bold.text-uppercase
        q-icon.q-pr-sm(name="filter_alt" size="sm")
        span {{ $t('label.filters') }}
    .col-auto.full-width.column(id="facets-drawer")
    .col-auto.full-width.q-mt-lg
      .text-h7.text-grey-7.text-bold.text-uppercase
        q-icon.q-pr-sm(name="groups" size="sm")
        span {{ $t('label.community') }}
    .col-auto.full-width.column
      community-select
</template>

<script>
import {defineComponent} from 'vue'
import {facets} from '@/contexts/facets'
import {community} from '@/contexts/community'
import {useContext} from 'vue-context-composition'
import CommunitySelect from '@/components/widgets/CommunitySelect'

export default defineComponent({
  name: "Sidebar",
  components: {CommunitySelect},
  setup () {
    const {loadCommunities, communities} = useContext(community)
    const {facetsEnabled, facetsSidebarVisible} = useContext(facets)

    if (!communities.value) {
      loadCommunities()
    }

    return {facetsEnabled, facetsSidebarVisible, communities}
  }
})
</script>

<style lang="sass" scoped>
</style>
