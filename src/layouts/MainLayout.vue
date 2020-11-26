<template lang="pug">
  q-layout(view="hhh Lpr lFf")
    navbar
    q-page-container
      router-view
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
}
</script>
<style lang="sass">
</style>
