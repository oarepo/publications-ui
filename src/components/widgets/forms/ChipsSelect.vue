<template lang="pug">
base-select.full-width(
  ref="input"
  v-bind="$attrs"
  v-model="model"
  use-input
  use-chips
  multiple
  clearable
  :rules="rules"
  :options="keywordOptions"
  hide-dropdown-icon
  new-value-mode="add-unique"
  @clear="clear"
  @update:model-value="onChange($event)")
</template>
<script>
import {defineComponent, ref} from 'vue'
import ValidateMixin from '@/mixins/ValidateMixin'

export default defineComponent({
  name: 'ChipsSelect',
  emits: ['update:modelValue'],
  mixins: [ValidateMixin],
  props: {
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const input = ref(null)
    const model = ref(props.modelValue)
    const keywordOptions = ref([])

    function clear (value) {
      console.log(value)
      model.value = []
    }

    function onChange (event) {
      ctx.emit('update:modelValue', event || [])
    }

    return {model, input, keywordOptions, clear, onChange}
  }
})
</script>
