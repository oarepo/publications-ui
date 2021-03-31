import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  name: 'transition-mixin',
  props: {
    record: Object,
    recordApi: Object
  }
})
class TransitionMixin extends Vue {
  changingState = false

  get transitions () {
    return Object.entries(this.record?.links?.transitions || {}).map(([code, url]) => ({
      url,
      code: code,
      label: this.$t(`action.${code}`),
      actionLabel: this.$t(`action.${code}`),
      icon: this.$t(`icon.${code}`)
    }))
  }

  makeTransition (transition) {
    this.$q.dialog({
      title: this.$t('label.actionApprove'),
      message: `${this.$t('message.doYRlyWnt')} ${transition.actionLabel}?`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      const validity = this.record?.metadata['oarepo:validity']?.valid
      if (validity !== false || transition.code === 'request_changes') {
        this._makeTransition(transition, false)
      } else {
        this.$q.dialog({
          title: this.$t('label.actionApprove'),
          message: `${this.$t('message.recordNotValid')}. ${this.$t('message.doYRlyWnt')} ${transition.actionLabel}?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          this._makeTransition(transition, true)
        })
      }
    })
  }

  async _makeTransition (transition, force) {
    this.changingState = true
    try {
      await axios.post(transition.url, {
        force
      })
      if (transition.code === 'approve') {
        this.$router.replace({
          name: `${this.communityId}/dataset/record`,
          params: {
            recordId: this.record.id
          }
        })
        return
      }
      if (transition.code === 'unpublish') {
        this.$router.replace({
          name: `${this.communityId}/dataset/record`,
          params: {
            recordId: this.record.id
          }
        })
        return
      }
      if (transition.code === 'delete_draft') {
        this.$router.replace({
          name: `${this.communityId}/all-datasets`
        })
        return
      }
      console.log(this.recordApi)
      this.recordApi.reload()
    } catch (e) {
      console.log(e)
      this.$q.dialog({
        title: this.$t('error.stateChangeFail'),
        message: `${this.$t('error.stateChangeMessage')}: ${e} ${JSON.stringify(e.response.data)}`,
        cancel: true,
        persistent: true
      })
    }
    this.$q.notify({
      message: this.$t('message.completeSuccess'),
      color: 'positive',
      icon: 'published_with_changes'
    })
    this.changingState = false
  }
}

export default TransitionMixin
