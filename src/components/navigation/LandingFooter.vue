<template lang="pug">
  q-footer.row
    .col-12.col-md-7.q-pl-xl.q-pr-xl.q-pr-md-none.q-mt-lg.q-pb-xl
      .links-container.column.no-wrap.row-md.items-start.q-mt-lg.q-pl-md-xl.q-gutter-lg.self-start
        q-item.col-3(
          v-for="item in navItems" :key="item.label"
          clickable v-ripple
          @click="openURL(item.link)")
          q-item-section(avatar).q-pa-md
            q-icon(:name="item.icon")
          q-item-section.q-pl-md {{ $t(item.label) }}
    .col-12.col-md-5.q-pl-xl.q-pl-md-none.q-pr-xl.q-pr-md-none.self-start.q-py-lg.bg-dark-primary
      .copyright-container.q-mt-xl.q-mb-lg.text-caption.text-grey-4.text-center
        p.no-padding.no-margin {{ $t('app.copyrightNotice') }}
        p.no-padding.no-margin.text-warning {{ $t('app.copyright') }}
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import { openURL } from 'quasar'

export default @Component({
  name: 'LandingFooter',
  components: {
  },
  props: {}
})
class LandingFooter extends Vue {
  openURL = openURL
  navItems = [
    {
      label: 'label.contact',
      icon: 'email',
      link: 'mailto:du-support@cesnet.cz'
    },
    {
      label: 'label.docs',
      icon: 'menu_book',
      link: 'https://du.cesnet.cz/cs/navody/start'
    },
    {
      label: 'label.privacy',
      icon: 'policy',
      link: 'https://www.cesnet.cz/sdruzeni/ochrana-osobnich-udaju/'
    }
  ]
}
</script>

<style lang="sass" scoped>
.q-footer
  background: darken($primary, 10%)

.links-container
  .q-item__section--avatar
    background: darken($primary, 13%)
    border-radius: 15px
</style>
