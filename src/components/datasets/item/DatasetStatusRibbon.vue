<template lang="pug">
q-ribbon.absolute(
  v-if="!isApproved"
  :background-color="isPublic ? 'positive' : 'accent'"
  leaf-color="secondary"
  position="right"
  :decoration="dense ? null : 'rounded-in'")
  .text-bold.text-overline(v-if="isEdited") DRAFT
    q-tooltip {{ $t('label.isEdited') }}
  q-icon(:class="dense ? 'q-pa-xs' : 'q-pa-sm'" :size="dense ? 'sm' : 'md'" name="pending_actions" v-if="isPendingApproval")
    q-tooltip {{ $t('label.isPendingApproval') }}
  q-icon(:class="dense ? 'q-pa-xs' : 'q-pa-sm'" :size="dense ? 'sm' : 'md'" name="public" v-if="isPublic")
    q-tooltip {{ $t('label.isPublic') }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { STATE_APPROVED, STATE_EDITING, STATE_PENDING_APPROVAL, STATE_PUBLISHED } from 'src/constants'

export default @Component({
  name: 'DatasetStatusRibbon',
  props: {
    dense: Boolean,
    dataset: Object
  }
})
class DatasetStatusRibbon extends Vue {
  get isDraft () {
    return this.dataset['oarepo:draft']
  }

  get isApproved () {
    return !this.isDraft && this.dataset.state === STATE_APPROVED
  }

  get isEdited () {
    return this.isDraft && (this.dataset.state === STATE_EDITING || !this.dataset.state)
  }

  get isPendingApproval () {
    return this.isDraft && this.dataset.state === STATE_PENDING_APPROVAL
  }

  get isPublic () {
    return this.dataset.state === STATE_PUBLISHED
  }
}
</script>

<style lang="sass">

</style>
