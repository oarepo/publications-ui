<template lang="pug">
base-select(
  ref="input"
  v-bind="$attrs"
  :label="$t('label.scheme')"
  :rules="rules"
  v-model="model"
  :options="options"
  @update:model-value="$emit('update:modelValue', $event)")
</template>

<script>
import {ref} from 'vue'
import ValidateMixin from '@/mixins/ValidateMixin'

export default {
  name: 'SchemaSelect',
  mixins: [ValidateMixin],
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: [String, Number, Array],
      default: ''
    }
  },
  setup(props) {
    const input = ref(null)
    const model = ref(props.modelValue)

    const options = [
      "ark",
      "arxiv",
      "bibcode",
      "doi",
      "ean13",
      "eissn",
      "handle",
      "igsn",
      "isbn",
      "issn",
      "istc",
      "lissn",
      "lsid",
      "pmid",
      "purl",
      "upc",
      "url",
      "urn",
      "w3id"
    ]

    return {model, options, input}
  }
}
</script>

<style scoped>

</style>
