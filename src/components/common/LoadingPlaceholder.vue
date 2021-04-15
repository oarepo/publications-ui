<template lang="pug">
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { QSpinnerGrid } from 'quasar'

export default @Component({
  name: 'LoadingPlaceholder'
})
class LoadingPlaceholder extends Vue {
  mounted () {
    this.$q.loading.show({
      spinner: QSpinnerGrid,
      spinnerColor: 'primary',
      spinnerSize: 140,
      backgroundColor: 'white',
      message: `${this.$t('message.loading')}…`,
      messageColor: 'secondary',
      customClass: 'text-h5'
    })
  }

  destroyed () {
    this.$q.loading.hide()
  }
}
</script>

<style lang="sass" scoped>
</style>
