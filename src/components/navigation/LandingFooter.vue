<template lang="pug">
  q-footer.q-pa-md
    .links-container.column.row-md.items-center.q-mt-lg.q-pl-md-xl.q-ml-xl
      q-item.col.col-md-2(v-for="item in navItems" :key="item.label"
             clickable v-ripple @click="openURL(item.link)")
        q-item-section(avatar).q-pa-md
          q-icon(:name="item.icon")
        q-item-section.q-pl-md {{ $t(item.label) }}
      q-space.gt-sm
      .gt-sm.col-md-5.self-md-end
        .copyright-container.q-mb-lg.text-center.text-caption.text-grey-4
          p.no-padding.no-margin {{ $t('app.copyrightNotice') }}
          p.text-warning {{ $t('app.copyright') }}
    .lt-md.copyright-container.q-mt-xl.text-center.text-caption.text-grey-4
      p.no-padding.no-margin {{ $t('app.copyrightNotice') }}
      p.text-warning {{ $t('app.copyright') }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { openURL } from 'quasar'

export default @Component({
  name: 'LandingHeader',
  components: {
  },
  props: {}
})
class LandingHeader extends Vue {
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
