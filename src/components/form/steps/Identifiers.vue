<template lang="pug">
.column.q-col-gutter-md
  stepper-nav(has-prev @next="$emit('next')" @prev="$emit('prev')")
</template>
<script>
import {defineComponent} from 'vue'
import StepperNav from "@/components/navigation/StepperNav";

export default defineComponent({
  name: 'BasicInfo',
  components: {StepperNav},
  emits: ['update:modelValue', 'prev', 'next'],
  props: {
    modelValue: Object
  },
  setup () {
    return { }
  }
})
</script>
<style lang="sass" scoped>
</style>
