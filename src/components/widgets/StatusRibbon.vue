<template lang="pug">
q-chip.status-chip
  .text-accent.text-overline.text-bold(v-if="isDraft") DRAFT
  div(v-if="isEdited")
    .text-accent.text-overline.text-bold
    q-tooltip {{ $t('label.isEdited') }}
  div(v-if="isPendingApproval")
    q-icon(
      :class="dense ? 'q-pa-xs' : 'q-pa-sm'"
      :size="dense ? 'sm' : 'md'"
      name="pending_actions")
    q-tooltip {{ $t('label.isPendingApproval') }}
  div(v-if="isPublic")
    q-icon(
      :class="dense ? 'q-pa-xs' : 'q-pa-sm'"
      :size="dense ? 'sm' : 'md'"
      name="public" )
    q-tooltip {{ $t('label.isPublic') }}
  div(v-if="isApproved")
    q-icon(
      :class="dense ? 'q-pa-xs' : 'q-pa-sm'"
      :size="dense ? 'sm' : 'md'"
      name="verified" )
    q-tooltip {{ $t('label.isApproved') }}
</template>
<script>
import {defineComponent} from 'vue'
import useState from '@/composables/useState'

export default defineComponent({
  name: 'StatusRibbon',
  props: {
    dense: {
      type: Boolean,
      default: true
    },
    metadata: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {isApproved, isPendingApproval, isDraft, isPublic, isEdited} = useState(props.metadata)
    return {isApproved, isPendingApproval, isDraft, isPublic, isEdited}
  }
})
</script>
<style lang="sass">
.status-chip
  z-index: 10
</style>
