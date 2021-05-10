<template lang="pug">
q-layout.bg-grey-1(view="hhh lpR lFf")
  navbar(@facets="facetsSidebarVisible = !facetsSidebarVisible")
  q-page-container
    router-view
  sidebar
</template>

<script>
import Navbar from '@/components/navigation/Navbar'
import {defineComponent} from 'vue'
import Sidebar from '@/components/widgets/Sidebar'
import useFacets from "@/composables/useFacets";

export default defineComponent({
  name: 'ListLayout',
  components: {
    Sidebar,
    Navbar
  },
  setup () {
    const {facetsSidebarVisible} = useFacets()
    return {facetsSidebarVisible}
  }
})
</script>
<style lang="sass">
</style>
