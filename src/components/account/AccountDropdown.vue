<template lang="pug">
  q-btn-dropdown(
    :text-color="dark? 'black': 'white'"
    stretch
    no-caps
    dense
    size="md"
    ripple
    padding="md md"
    unelevated
    icon="person"
    :label="currentUserName"
    v-if="authenticated")
    slot(name="authenticated")
      .bg-white.account
        .row.no-wrap.q-pa-md.justify-start.q-mr-md
          .col-2.column
            slot.col-auto(name="avatar")
              q-icon.q-my-sm.text-h4.content-center.text-primary(name="face")
          .col-8.q-ml-md.column.no-wrap.justify-start
            .col-auto.text-subtitle1.text-bold.no-wrap.text-dark {{ currentUserInfo.givenName }} {{ currentUserInfo.familyName }}
            .col-auto.text-grey.text-caption {{ currentUserInfo.email }}
            .col-auto.q-pt-md
              .row
                q-badge.q-ma-xs(v-for="role in currentUser.roles" :key="role.id") {{ $t(`label.role.${role.label}`).replace('label.role.', '').replace(':', ' > ') }}
        .row.no-wrap.q-px-md.q-pb-md.justify-center
          locale-switcher.col-12
        .row.no-wrap.q-pa-sm.justify-center.bg-grey-3
          q-list.full-width(color="grey")
            q-item(
              v-for="item in currentUserMenuItems"
              :key="item.id"
              clickable
              v-ripple
              @click="item.action() || null"
              :to="item.route || null")
              q-item-section(avatar)
                q-icon(:name="item.icon")
              q-item-section.text-secondary {{ $t(item.label) }}
  q-btn(v-else color="warning" text-color="dark"
    :loading="authenticating" rounded icon="vpn_key" @click="login")
    template(#loading)
      q-spinner-dots
      span.q-pl-sm.q-pt-xs.disabled {{ $t('action.login') }}
    slot(name="anonymous")
      span.q-pl-sm.q-pt-xs {{ $t('action.login') }}
</template>

<script>
import { Component, Mixins } from 'vue-property-decorator'
import LocaleSwitcher from 'components/i18n/LocaleSwitcher'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'

export default @Component({
  name: 'AccountDropdown',
  props: {
    dark: Boolean
  },
  components: {
    LocaleSwitcher
  }
})
class AccountDropdown extends Mixins(AuthStateMixin) {
  authenticating = false

  adminMenuItems = [
    {
      id: 'admin',
      label: 'nav.admin',
      icon: 'settings',
      action: () => this.$router.push({ name: 'administration' })
    }
  ]

  menuItems = [
    {
      id: 'logout',
      label: 'action.logout',
      icon: 'input',
      action: this.logout
    }
  ]
}
</script>

<style lang="sass" scoped>
.account
  max-width: 400px
</style>
