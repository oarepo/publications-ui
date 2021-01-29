<template lang="pug">
  router-view
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Navbar from 'components/navigation/Navbar'

export default @Component({
  name: 'DatasetDetailLayout',
  components: {
    Navbar
  }
})
class DatasetDetailLayout extends Vue {
}
</script>
<style lang="sass">
</style>
