<template lang="pug">
base-select.full-width(
  v-bind="$attrs"
  standout
  menu-anchor="bottom left"
  icon="flag"
  v-model="model"
  :options="$i18n.availableLocales"
  :label="$t('label.localeSwitcher')"
  :option-label="opt => $t(`value.lang.${opt}`) + ` (${opt})`"
  dense
  options-cover
  emit-value
  stack-label
  map-options
  options-dense
  :rules="rules"
  @update:model-value="$emit('update:modelValue', $event)")
</template>
<script>
import {defineComponent, ref} from 'vue'
import ValidateMixin from '@/mixins/ValidateMixin'

export default defineComponent({
  name: 'LocaleSelect',
  emits: ['update:modelValue'],
  mixins: [ValidateMixin],
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    }
  },
  setup (props) {
    const model = ref(props.modelValue)
    return {model}
  }
})
</script>
