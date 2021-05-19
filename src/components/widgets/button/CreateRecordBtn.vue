<template lang="pug">
q-btn.col-auto(
  stretch
  flat
  color="dark"
  icon="cloud_upload"
  :to="createRoute"
  :label="$t('action.upload')")
  q-tooltip {{ $t('action.uploadDataset') }}
</template>

<script>
import {computed, defineComponent} from 'vue'
import useCollection from '@/composables/useCollection'
import {ARTICLES_COLLECTION_CODE, DATASETS_COLLECTION_CODE} from '@/constants'

export default defineComponent({
  name: 'CreateRecordBtn',
  setup () {
    const {isDatasets, isArticles} = useCollection()

    const createRoute = computed(() => {
      if (isDatasets) {
        return {
          name: 'create',
          model: DATASETS_COLLECTION_CODE
        }
      } else if (isArticles) {
        return {
          name: 'create',
          model: ARTICLES_COLLECTION_CODE
        }
      }
      return {name: 'list'}
    })

    return {createRoute}
  }
})
</script>
