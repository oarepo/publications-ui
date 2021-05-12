<template lang="pug">
h1 ble
</template>

<script>
import {defineComponent, ref} from 'vue'

export default defineComponent({
  name: "CreateDatasetForm",
  setup () {
    const formData = ref({})

    return {formData}
  }
})
</script>

<style lang="sass" scoped>

</style>
