<template lang="pug">
q-field.row(
  v-bind="$attrs"
  :label="label"
  :error="error"
  :error_message="errorMessage"
  borderless)
  q-list(dense separator).no-margin.q-pt-md
    q-item(v-for="(val,idx) in model" :key="idx")
      q-item-section
        multilingual-editor(
          :label="`${label} #${idx + 1}`"
          :rules="rules"
          :ref="setInputRef"
          v-model="model[idx]"
          @update:model-value="onChange")
  template(v-slot:append)
    q-btn(v-if="model.length" round dense flat color="negative" icon="backspace" @click="rmItem")
      q-tooltip {{ $t('action.addItem') }}
    q-btn(round dense flat color="positive" icon="post_add" @click="addItem")
      q-tooltip {{ $t('action.addItem') }}

</template>

<script>
import {reactive, ref} from 'vue'
import {useI18n} from 'vue-i18n/index'
import MultilingualEditor from "@/components/widgets/forms/MultilingualEditor";
import useValidation from "@/composables/useValidation";

export default {
  name: 'MultilingualEditorList',
  components: {MultilingualEditor},
  emits: ['update:modelValue'],
  props: {
    empty: {
      type: Boolean,
      default: false
    },
    itemLabel: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: ''
    },
    rules: Array,
    modelValue: {
      type: Array,
      default: () => []
    }
  },
  setup (props, ctx) {
    const i18n = useI18n()
    const {error, errorMessage, resetValidation} = useValidation()

    const inputRefs = ref([])
    const model = ref([...props.modelValue] || [])
    if (!Object.keys(props.modelValue).length && !props.empty) {
      let defVal = reactive({})
      defVal[i18n.locale.value] = ''
      model.value.push(defVal)
    } else {
      model.value = reactive([...props.modelValue])
    }

    const setInputRef = el => {
      if (el) {
        inputRefs.value.push(el)
      }
    }

    function validate () {
      // TODO: implement editor validation
      return true
    }

    function addItem () {
      model.value.push(reactive({}))
    }

    function onChange () {
      ctx.emit('update:modelValue', model.value)
    }

    function rmItem () {
      model.value.splice(model.value.length -1, 1)
    }

    return {model, inputRefs, error, errorMessage, setInputRef, addItem, rmItem, validate, onChange, resetValidation}
  }
}
</script>

<style scoped>

</style>
