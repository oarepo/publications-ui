<template lang="pug">
  q-header.row.z-top.no-wrap
      q-toolbar.col-12.col-md-7.q-py-md.q-px-sm.q-px-sm-xl.bg-primary.justify-between
        q-btn.col-4(flat :to="{ name: 'homepage' }")
          img.logo(src="logos/datacare_White.svg")
        q-space
        account-dropdown.lt-md.q-mr-sm(:authenticated="authenticated")
      q-toolbar.gt-sm.col-5.q-py-md.q-pr-xl.bg-white.justify-end.items-center
        account-dropdown.q-mr-sm(dark :authenticated="authenticated")
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'
import AccountDropdown from 'src/components/account/AccountDropdown'

export default @Component({
  name: 'LandingHeader',
  components: {
    AccountDropdown
  }
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
