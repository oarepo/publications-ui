<template lang="pug">
q-select(
  v-bind="$attrs"
  :label="label"
  v-model="modelValue"
  :options="options"
  @update:model-value="$emit('update:modelValue', $event)")
</template>

<script>
export default {
  name: 'BaseSelect',
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
