<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-if="$route.meta.useFacets"
  v-model="facetsDrawerVisible"
  :width="320"
  :breakpoint="700")
  .column.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
    .col-auto.row
      .text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.filters') }}
    .col-auto.column(id="facets-drawer")
</template>

<script>
import {defineComponent, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import useFacets from "@/composables/useFacets";

export default defineComponent({
  name: "Sidebar",
  setup () {
    const route = useRoute()
    const {facetsDrawerVisible} = useFacets()

    watchEffect(() => {
      if (route.meta.useFacets) {
        setTimeout(() => {
          facetsDrawerVisible.value = true
        })
      } else {
        facetsDrawerVisible.value = false
      }
    })

    return {facetsDrawerVisible}
  }
})
</script>

<style lang="sass" scoped>
</style>
