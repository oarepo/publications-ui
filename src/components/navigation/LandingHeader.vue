<template lang="pug">
  q-header.row.z-top.no-wrap
      q-toolbar.col-7.q-pa-md.q-pl-lg-lg.q-pl-xl-xl.bg-primary
        q-btn(flat :to="{ name: 'homepage' }")
          img.logo(src="logos/datacare_White.svg")
      q-toolbar.gt-xs.col-5.q-pa-md.q-pr-lg-lg.q-pr-xl-xl.bg-white.justify-end.items-center
        account-dropdown.q-mr-sm(:authenticated="authenticated")
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'
import AccountDropdown from 'src/components/account/AccountDropdown'

export default @Component({
  name: 'LandingHeader',
  components: {
    AccountDropdown
  },
  props: {}
})
class LandingHeader extends Mixins(AuthStateMixin) {
}
</script>

<style lang="sass" scoped>
img
  width: 100%

.logo
  max-height: 70px
</style>
