<template lang="pug">
q-header.row.z-top.no-wrap
    q-toolbar.col-12.col-md-7.q-py-md.q-px-sm.q-px-sm-xl.bg-primary.justify-between
      q-btn.col-4(flat :to="{ name: 'homepage' }")
        img.logo(src="logos/datacare_White.svg")
      q-space
      //account-dropdown.lt-md.q-mr-sm(:authenticated="authenticated")
    q-toolbar.gt-sm.col-5.q-py-md.q-pr-xl.bg-white.justify-end.items-center
      //account-dropdown.q-mr-sm(dark :authenticated="authenticated")
</template>

<script>
import {Options, Vue} from 'vue-class-component'
// import { AuthStateMixin } from '@/mixins/AuthStateMixin'
import AccountDropdown from '@/components/account/AccountDropdown'

export default @Options({
  name: 'LandingHeader',
  components: {
    AccountDropdown
  }
})
class LandingHeader extends Vue {
}
</script>

<style lang="sass" scoped>
img
  width: 100%

.logo
  max-height: 70px
</style>
