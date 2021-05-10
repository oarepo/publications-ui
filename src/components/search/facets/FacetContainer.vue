<template lang="pug">
//q-skeleton.q-my-md.full-width(v-if="isLoading" animation="pulse" type="box" height="30px")
q-expansion-item.text-black.text-capitalize(
  expand-icon="svguse:/icons.svg#arrow-right"
  expanded-icon="svguse:/icons.svg#arrow-down"
  @show="$emit('open')"
  @hide="$emit('close')")
  template(v-slot:header)
    q-item-section.facet-name
      span {{ label }}
  template(v-slot="slotData")
    slot(v-bind="slotData")
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'FacetContainer',
  emits: ['open', 'close'],
  props: {
    label: String
  }
})
</script>
