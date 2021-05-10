<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-if="$route.meta.useFacets"
  v-model="facetsSidebarVisible"
  :width="320"
  :breakpoint="700")
  .column.no-wrap.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
    .col-auto.full-width
      .text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.filters') }}
    .col-auto.full-width.column(id="facets-drawer")
</template>

<script>
import {defineComponent, watchEffect} from 'vue'
import {useRoute} from 'vue-router'
import useFacets from '@/composables/useFacets'

export default defineComponent({
  name: "Sidebar",
  setup () {
    const route = useRoute()
    const {facetsEnabled, facetsSidebarVisible} = useFacets()

    watchEffect(() => {
      if (route.meta.useFacets) {
        setTimeout(() => {
          facetsEnabled.value = true
        })
      } else {
        facetsEnabled.value = false
      }
    })

    return {facetsEnabled, facetsSidebarVisible}
  }
})
</script>

<style lang="sass" scoped>
</style>
