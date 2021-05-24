<template lang="pug">
q-page.q-mt-lg.q-mx-lg-xl.full-height(padding)
  .column.justify-center.items-center
    .col.row.q-pb-md
      .text-h3.gt-md
        span {{ $t(header?.title) }}
        q-icon.q-pl-md(color="accent" size="md" :name="header?.icon")
      .text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg
        span {{ $t(header?.title) }}
        q-icon.q-pl-md(color="accent" size="sm" :name="header?.icon")
      .text-h6.lt-md.q-mt-none.q-mb-md
        span {{ $t(header?.title) }}
        q-icon.q-pl-md(color="accent" size="xs" :name="header?.icon")
    .q-separator(spaced)
    create-dataset-form.col.q-pr-md
</template>
<script>
import {computed, defineComponent} from 'vue'
import CreateDatasetForm from '@/components/form/CreateDatasetForm'
import useCollection from '@/composables/useCollection'

export default defineComponent({
  name: 'CreateForm',
  components: {CreateDatasetForm},
  setup () {
    const {isDatasets, isArticles} = useCollection()

    const header = computed(() => {
      if (isDatasets) {
        return {
          title: 'route.title.datasetUpload',
          icon: 'addchart'
        }
      } else if (isArticles) {
        return {
          title: 'route.title.articleUpload',
          icon: 'post_add'
        }
      }
      return null
    })

    return {header}
  }
})
</script>
<style lang="sass">
</style>
