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
    edit-dataset-form.col.q-pr-md(v-if="record.metadata" :record="record")
</template>
<script>
import {computed, defineComponent, ref} from 'vue'
import EditDatasetForm from '@/components/form/EditDatasetForm'
import useCollection from '@/composables/useCollection'
import {useRoute} from "vue-router";
import {useInvenioRecord} from "@oarepo/invenio-vue";

export default defineComponent({
  name: 'EditForm',
  components: {EditDatasetForm},
  setup() {
    const {isDatasets, isArticles} = useCollection()
    const route = useRoute()
    const record = ref(null)
    record.value = useInvenioRecord(route.path.substring(0, route.path.indexOf('/edit')), {loadInitial: true})

    const header = computed(() => {
      if (isDatasets) {
        return {
          title: 'route.title.datasetEdit',
          icon: 'addchart'
        }
      } else if (isArticles) {
        return {
          title: 'route.title.articleEdit',
          icon: 'post_add'
        }
      }
      return null
    })

    return {header, record}
  }
})
</script>
<style lang="sass">
</style>
