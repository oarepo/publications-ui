<template lang="pug">
q-layout.bg-grey-1(view="hhh lpR fff")
  landing-header
  q-page-container.no-margin
    router-view
  landing-footer
</template>
<script>
import {Options, Vue} from 'vue-class-component'
import LandingHeader from '@/components/homepage/LandingHeader'
import LandingFooter from '@/components/homepage/LandingFooter'

export default @Options({
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
