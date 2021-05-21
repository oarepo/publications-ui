<template lang="pug">
q-drawer.bg-grey-3.text-dark.scrolling-drawer(
  v-model="visible"
  :width="320"
  :breakpoint="700")
  .column.no-wrap.q-gutter-y-md.q-py-xl.q-px-lg.justify-start.full-height
      .col-auto.full-width
        .text-h7.text-grey-7.text-bold.text-uppercase
          q-icon.q-pr-sm(name="filter_alt" size="sm")
          span {{ $t('label.sections') }}
</template>

<script>
import {defineComponent} from 'vue'
import CommunitySwitcher from '@/components/widgets/select/CommunitySwitcher'

export default defineComponent({
  name: "RecordSidebar",
  components: {CommunitySwitcher},
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  setup () {

  }
})
</script>

<style lang="sass" scoped>
</style>
