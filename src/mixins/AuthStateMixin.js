import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class AuthStateMixin extends Vue {
  get authenticated () {
    return this.$auth.state.value.loggedIn
  }

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
    this.$gdpr.showGdprPrompt(this)
      .then(() => { this.$auth.login() })
      .catch(() => {})
      .finally(() => {
        this.authenticating = false
      })
  }

  logout () {
    this.$auth.logout()
    // TODO: update when https://github.com/oarepo/vue-popup-login/issues/170 resolved
    this.$router.push({ name: 'logged-out' })
  }
}

export { AuthStateMixin }
