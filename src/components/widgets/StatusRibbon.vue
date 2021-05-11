<template lang="pug">
ribbon.absolute(
  text="DRAFT")
  //.text-bold.text-overline(v-if="isEdited")
  //  q-tooltip {{ $t('label.isEdited') }}
  //q-icon(:class="dense ? 'q-pa-xs' : 'q-pa-sm'" :size="dense ? 'sm' : 'md'" name="pending_actions" v-if="isPendingApproval")
  //  q-tooltip {{ $t('label.isPendingApproval') }}
  //q-icon(:class="dense ? 'q-pa-xs' : 'q-pa-sm'" :size="dense ? 'sm' : 'md'" name="public" v-if="isPublic")
  //  q-tooltip {{ $t('label.isPublic') }}
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
    metadata: Object
  },
  setup (props) {
    const {isApproved, isPublic, isEdited} = useState(props.metadata)
    return {isApproved, isPublic, isEdited}
  }
})
</script>
