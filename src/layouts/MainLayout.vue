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
        portal-target(name="drawer")
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Navbar from 'components/navigation/Navbar'

export default @Component({
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
