<template lang="pug">
q-layout.bg-grey-1(view="hhh lpR lFf")
  navbar(
    @facets="facetsDrawer = !facetsDrawer"
  )
  q-page-container
    router-view
  q-drawer.scrolling-drawer(
    v-if="$route.meta.useFacets"
    v-model="facetsDrawer"
    :width="320"
    :breakpoint="700"
    content-class="bg-grey-3 text-white")
      div(id="facets-drawer")
</template>

<script>
import {Options, Vue} from 'vue-class-component'
import Navbar from '@/components/navigation/Navbar'

export default @Options({
  name: 'MainLayout',
  components: {
    Navbar
  }
})
class MainLayout extends Vue {
  facetsDrawer = true
}
</script>
<style lang="sass">
</style>
