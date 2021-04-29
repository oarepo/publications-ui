<template lang="pug">
  router-view
</template>

<script>
import {Options, Vue} from 'vue-class-component'
import Navbar from '@/components/navigation/Navbar'

export default @Options({
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
