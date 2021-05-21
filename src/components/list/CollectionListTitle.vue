<template lang="pug">
.column
  .col.text-h3.gt-md {{ $t(title) }}
  .col.text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t(title) }}
  .col.text-h6.lt-md.q-mt-none.q-mb-md {{ $t(title) }}
  .col.q-pl-xs.text-primary.text-subtitle2 {{ $tc('label.recordsFound', collection.recordsCount) }}
</template>
<script>
import {computed, defineComponent} from 'vue'
import useCollection from '@/composables/useCollection'

export default defineComponent({
  name: 'CollectionListTitle',
  props: {
    collection: {
      type: Object,
      required: true
    }
  },
  setup () {
    const {isDatasets, isArticles} = useCollection()

    console.log(isDatasets.value, isArticles.value)

    const title = computed(() => {
      if (isDatasets.value) {
        return 'section.datasetList'
      } else if (isArticles.value) {
        return 'section.articleList'
      }
      return ''
    })

    return {title}
  }
})
</script>
<style lang="sass">
</style>
