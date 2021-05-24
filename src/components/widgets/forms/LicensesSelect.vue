<template lang="pug">
chips-select(
  v-bind="$attrs"
  icon="flag"
  v-model="model"
  :options="LICENSES"
  :label="label"
  dense
  options-cover
  emit-value
  map-options
  options-dense
  :rules="rules"
  @update:model-value="onChange($event)")
</template>
<script>
import {defineComponent, ref} from 'vue'
import ValidateMixin from '@/mixins/ValidateMixin'
import {LICENSES} from '@/constants'

export default defineComponent({
  name: 'LanguagesSelect',
  emits: ['update:modelValue'],
  mixins: [ValidateMixin],
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  setup(props, ctx) {
    const model = ref(props.modelValue)

    // TODO: migrate to taxonomy terms
    function onChange(event) {
      event = event.map(l => `${window.location.origin}/2.0/taxonomies/licenses/${l}`)

      ctx.emit('update:modelValue', event)
    }

    return {model, onChange, LICENSES}
  }
})
</script>
