<template lang="pug">
  q-layout.bg-grey-1(view="hhh lpR fff")
    landing-header
    q-page-container.no-margin
      router-view
    landing-footer
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import LandingHeader from 'src/components/navigation/LandingHeader'
import LandingFooter from 'src/components/navigation/LandingFooter'

export default @Component({
  name: 'LandingLayout',
  components: {
    LandingHeader,
    LandingFooter
  }
})
class LandingLayout extends Vue {
}
</script>
<style lang="sass">
</style>
