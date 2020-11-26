<template lang="pug">
  q-btn-dropdown.full-height(
    no-caps
    dense
    size="md"
    ripple
    unelevated
    icon="person"
    text-color="white"
    :label="currentUserName"
    v-if="authenticated")
    slot(name="authenticated")
      .bg-white
        .row.no-wrap.q-pa-md.justify-start.q-mr-md
          .col-2.column
            slot.col-auto(name="avatar")
              q-icon.q-my-sm.text-h4.content-center.text-primary(name="face")
          .col-8.q-ml-md.column.no-wrap.justify-start
            .col-auto.text-subtitle1.text-bold.no-wrap.text-dark {{ currentUserInfo.givenName }} {{ currentUserInfo.familyName }}
            .col-3.text-grey.text-caption {{ currentUserInfo.email }}
            .col-auto.q-pt-md
              .row.q-col-gutter-sm
                .col-auto(v-for="role in currentUser.roles" :key="role.id")
                  q-badge {{ $t(`label.role.${role.id}`) }}
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
  q-btn.full-height(v-else :loading="authenticating" flat icon="vpn_key" @click="login")
    template(#loading)
      q-spinner-dots
      span.q-pl-sm.q-pt-xs.disabled {{ $t('action.login') }}
    slot(name="anonymous")
      span.q-pl-sm.q-pt-xs {{ $t('action.login') }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'AccountDropdown',
  props: {
    authenticated: {
      type: Boolean,
      default: false
    }
  }
})
class AccountDropdown extends Vue {
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

  get authState () {
    return this.$auth.state.value
  }

  get currentUser () {
    if (this.authState) {
      return this.authState.user
    }
  }

  get currentUserMenuItems () {
    if (this.currentUser?.roles.find(rol => rol.id === 'admin')) {
      return [
        ...this.adminMenuItems,
        ...this.menuItems
      ]
    }
    return this.menuItems
  }

  get currentUserInfo () {
    if (this.authState) {
      return this.authState.userInfo
    }
  }

  get currentUserName () {
    if (this.authState) {
      return this.authState.userInfo?.givenName || this.authState.user?.email
    }
  }

  login () {
    this.authenticating = true
    this.$auth.login().finally(() => {
      this.authenticating = false
    })
  }

  logout () {
    this.$auth.logout()
  }
}
</script>

<style lang="sass" scoped>
</style>
