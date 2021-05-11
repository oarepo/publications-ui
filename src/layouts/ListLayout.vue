<template lang="pug">
q-layout.bg-grey-1(view="hhh lpR lFf")
  navbar
  q-page-container
    router-view
  sidebar
</template>

<script>
import Navbar from '@/components/navigation/Navbar'
import {defineComponent} from 'vue'
import Sidebar from '@/components/widgets/Sidebar'
import {facets} from '@/contexts/facets'
import {provideContext, useContext} from 'vue-context-composition'
import {community} from '@/contexts/community'

export default defineComponent({
  name: 'ListLayout',
  components: {
    Sidebar,
    Navbar
  },
  setup () {
    provideContext(facets)
    const {loadCommunities} = useContext(community)

    loadCommunities()
  }
})
</script>
<style lang="sass">
</style>
