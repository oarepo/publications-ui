<template lang="pug">
q-field.row(:label="label" borderless)
  template(v-slot:control)
    q-input.col-12.no-outline(
      hide-bottom-space
      v-for="(val, idx) in model" :key="idx"
      v-bind="$attrs"
      :rules="rules"
      v-model="model[idx].val"
      @update:model-value="$emit('update:modelValue', model)")
      template(v-slot:before)
        locale-select.q-mt-md(
          use-input
          v-model="model[idx].lang"
          new-value-mode="add-unique"
          @update:model-value="$emit('update:modelValue', model)")
      template(v-slot:append)
        q-btn(round dense flat icon="remove" color="negative"  @click="rmLang(idx)")
          q-tooltip {{ $t('label.rmLang') }}
  template(v-slot:append)
    q-btn(round dense flat icon="add" @click="addLang")
      q-tooltip {{ $t('label.addLang') }}
</template>

<script>
import {reactive, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import LocaleSelect from '@/components/widgets/forms/LocaleSelect'
import ValidateMixin from '@/mixins/ValidateMixin'

export default {
  name: 'MultilingualInput',
  components: {LocaleSelect},
  mixins: [ValidateMixin],
  emits: ['update:modelValue'],
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: () => { return {} }
    }
  },
  setup (props) {
    const i18n = useI18n()

    const model = ref([])
    if (!Object.keys(props.modelValue).length) {
      model.value.push(reactive({lang: i18n.locale.value, val: ''}))
    } else {
      Object.keys(props.modelValue).forEach(l => {
        model.value.push(reactive({lang: l, val: props.modelValue[l]}))
      })
    }

    function rmLang(idx) {
      model.value.splice(idx, 1)
    }

    function addLang() {
      model.value.push(reactive({lang: '', val: ''}))
    }

    return {model, addLang, rmLang}
  }
}
</script>

<style scoped>

</style>
