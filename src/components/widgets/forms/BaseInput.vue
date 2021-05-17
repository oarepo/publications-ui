<template lang="pug">
q-input(
  v-bind="$attrs"
  :label="label"
  v-model="modelValue"
  @update:model-value="$emit('update:modelValue', $event)")
</template>

<script>
export default {
  name: 'BaseInput',
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: ''
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
