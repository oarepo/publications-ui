<template lang="pug">
q-field.row(
  ref="fieldRef"
  v-bind="$attrs"
  :label="label"
  :error="error"
  :error_message="errorMessage"
  borderless)
  template(v-slot:control)
    .row(v-for="(val, idx) in model" :key="idx")
      .row.col-12.no-wrap.justify-between
        locale-select.col.q-mt-md(
          use-input
          v-model="model[idx].lang"
          new-value-mode="add-unique"
          :rules="[required($t('error.validation.required'))]"
          @update:model-value="onChange")
        q-btn.q-mt-md.col-1(round dense flat icon="remove" color="negative"  @click="rmLang(idx)")
          q-tooltip {{ $t('action.rmLang') }}
      q-editor.col-12.q-mt-md.col-12.no-outline(
        :ref="setInputRef"
        flat
        hide-bottom-space
        v-model="model[idx].val"
        @update:model-value="onChange")
  template(v-slot:append)
    q-btn(round dense flat color="positive" icon="add" @click="addLang")
      q-tooltip {{ $t('action.addLang') }}
</template>

<script>
import {computed, onBeforeUpdate, reactive, ref} from 'vue'
import {useI18n} from 'vue-i18n'
import LocaleSelect from '@/components/widgets/forms/LocaleSelect'
import useValidation from '@/composables/useValidation'

export default {
  name: 'MultilingualEditor',
  components: {LocaleSelect},
  emits: ['update:modelValue'],
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    rules: Array,
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  setup(props, ctx) {
    const i18n = useI18n()
    const {error, required, errorMessage, resetValidation} = useValidation()

    const fieldRef = ref(null)
    const inputRefs = ref([])

    const model = ref([])
    if (!Object.keys(props.modelValue).length && !props.empty) {
      model.value.push(reactive({lang: i18n.locale.value, val: ''}))
    } else {
      Object.keys(props.modelValue).forEach(l => {
        model.value.push(reactive({lang: l, val: props.modelValue[l]}))
      })
    }

    const setInputRef = el => {
      if (el) {
        inputRefs.value.push(el)
      }
    }

    onBeforeUpdate(() => {
      inputRefs.value = []
    })

    function validate() {
      let result = true
      resetValidation()
      props.rules.forEach(rule => {
        model.value.forEach((item) => {
          const res = rule(item.val)
          if (res !== true) {
            console.log('fail')
            result = res
          }
        })
      })
      if (result !== true) {
        console.log(result)
        error.value = true
        errorMessage.value = result
      } else {
        resetValidation()
      }
      return result
    }

    function rmLang(idx) {
      model.value.splice(idx, 1)
      onChange()
    }

    function addLang() {
      model.value.push(reactive({lang: '', val: ''}))
    }

    function onChange() {
      resetValidation()
      ctx.emit('update:modelValue', modelExternal.value)
    }

    const modelExternal = computed(() => {
      let values = {}
      model.value.forEach(v => {
        values[v.lang] = v.val !== '<br>'? v.val : ''
      })
      return values
    })

    return {
      model,
      addLang,
      rmLang,
      fieldRef,
      inputRefs,
      setInputRef,
      modelExternal,
      validate,
      error,
      required,
      errorMessage,
      resetValidation,
      onChange
    }
  }
}
</script>

<style scoped>

</style>
