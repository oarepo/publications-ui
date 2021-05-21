<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-model="recordSidebarVisible"
  :width="320"
  :breakpoint="700")
  .column.no-wrap.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
    .col-auto.full-width
      sidebar-section-header(label="label.sections" icon="toc")
    .col-auto.full-width
      sidebar-section-header(label="label.actions" icon="published_with_changes")
      .col-auto.full-width.column#record-actions-drawer
</template>

<script>
import {defineComponent} from 'vue'
import {record} from '@/contexts/record'
import {useContext} from 'vue-context-composition'
import SidebarSectionHeader from "@/components/widgets/text/SidebarSectionHeader";
import RecordActions from '@/components/detail/RecordActions'

export default defineComponent({
  name: "RecordSidebar",
  components: {RecordActions, SidebarSectionHeader},
  setup () {
    const {recordSidebarVisible} = useContext(record)
    return {recordSidebarVisible}
  }
})
</script>

<style lang="sass" scoped>
</style>
