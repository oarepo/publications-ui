<template lang="pug">
q-field.fit(
  filled
  borderless
  ref="input"
  :error="error"
  stack-label
  :label="label")
  template(v-slot:control)
    .row.no-wrap.full-width
      author-type-select.col-3(
        ref="authorType"
        v-model="model.person_or_org.type"
        :rules="[required($t('error.validation.required'))]"
        @update:model-value="onChange")
      //base-input.q-ml-sm.col-grow(
      //  autogrow
      //  ref="identifier"
      //  :rules="rules || [required($t('error.validation.required'))]"
      //  v-bind="$attrs"
      //  :label="$t('label.identifier')"
      //  v-model="model.person_or_org"
      //  @update:model-value="onChange")
</template>

<script>
import {reactive, ref} from 'vue'
import ValidateMixin from '@/mixins/ValidateMixin'
import useValidation from '@/composables/useValidation'
import useInputRefs from '@/composables/useInputRefs'
import AuthorTypeSelect from '@/components/widgets/forms/AuthorTypeSelect'

export default {
  name: 'IdentifierInput',
  emits: ['update:modelValue'],
  mixins: [ValidateMixin],
  components: {AuthorTypeSelect},
  props: {
    label: {
      type: String,
      default: ''
    },
    modelValue: {
      type: Object,
      default: () => {
        return {
          person_or_org: {
            name: '',
            type: 'personal',
            given_name: '',
            family_name: '',
            identifiers: []
          }, role: [], affiliations: []
        }
      }
    }
  },
  setup(props, ctx) {
    const {error, required} = useValidation()
    const {input} = useInputRefs()

    const authorType = ref(null)
    const identifier = ref(null)
    const model = reactive(props.modelValue)

    console.log(model, props)

    function onChange() {
      ctx.emit('update:modelValue', model)
    }

    function validate() {
      authorType.value.validate()
      identifier.value.validate()

      if (authorType.value.hasError || identifier.value.hasError) {
        error.value = true
      }
      return error.value ? 'error.validationFail' : true
    }

    return {input, authorType, identifier, error, model, validate, onChange, required}
  }
}
</script>

<style scoped>

</style>
