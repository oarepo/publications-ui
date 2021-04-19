import { Component, Vue } from 'vue-property-decorator'

export default @Component
class UploaderMixin extends Vue {
  getCookie (name) {
    const nameEQ = name + '='
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
    }
    return null
  }

  get uploaderHeaders () {
    return [
      // TODO: check if this is necessary
      {
        name: 'Access-Control-Allow-Origin',
        value: '*'
      },
      {
        name: 'X-CSRFToken',
        value: this.getCookie('csrftoken')
      }
    ]
  }

  fileUploaded (info) {
    this.$refs.uploader.reset()
  }
}
