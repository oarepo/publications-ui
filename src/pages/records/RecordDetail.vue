<template lang="pug">
q-page(padding)
  p(v-for="n in 15" :key="n") {{ record }}
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'RecordDetail',
  emits: ['reload'],
  props: {
    record: {
      type: Object,
      required: true
    }
  }
})
</script>
<style scoped>
</style>
