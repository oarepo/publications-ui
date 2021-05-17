<template lang="pug">
.column
  base-input.col(
    v-model="basicInfo.title"
    :label="$t('label.titles')")
  base-input.col(
    v-model="basicInfo.abstract"
    :label="$t('label.abstract')")
  base-input.col(
    v-model="basicInfo.keywords"
    :label="$t('label.keywords')")
</template>
<script>
import {defineComponent, reactive, watch} from 'vue'

export default defineComponent({
  name: 'BasicInfo',
  emits: ['update:modelValue'],
  props: {
    modelValue: Object
  },
  setup (props, ctx) {
    const basicInfo = reactive({
      title: ''
    })

    watch (basicInfo, () => {
      ctx.emit('update:modelValue', basicInfo)
    })

    return { basicInfo }
  }
})
</script>
<style lang="sass" scoped>
</style>
