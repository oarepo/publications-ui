import { Component, Vue } from 'vue-property-decorator'

@Component
class NotifyMixin extends Vue {
  notifyError (message) {
    this.$q.notify({
      color: 'negative',
      icon: 'error',
      message: message
    })
  }
}

export { NotifyMixin }
