<template lang="pug">
  q-layout.bg-grey-1(view="hhh lpR lFf")
    q-page-container
      router-view
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'AdminLayout',
  components: {
  }
})
class AdminLayout extends Vue {
}
</script>
<style lang="sass">
</style>
