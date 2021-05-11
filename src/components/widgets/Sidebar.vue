<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-if="facetsEnabled"
  v-model="facetsSidebarVisible"
  :width="320"
  :breakpoint="700")
  .column.no-wrap.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
    .col-auto.full-width
      .text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.filters') }}
    .col-auto.full-width.column(id="facets-drawer")
</template>

<script>
import {defineComponent} from 'vue'
import {facets} from "@/contexts/facets";
import {useContext} from "vue-context-composition";

export default defineComponent({
  name: "Sidebar",
  setup () {
    const { facetsEnabled, facetsSidebarVisible } = useContext(facets)
    return {facetsEnabled, facetsSidebarVisible}
  }
})
</script>

<style lang="sass" scoped>
</style>
