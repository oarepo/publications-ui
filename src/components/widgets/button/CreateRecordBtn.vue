<template lang="pug">
q-btn.col-auto(
  v-bind="$attrs"
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
import {useContext} from 'vue-context-composition'
import {community} from '@/contexts/community'

export default defineComponent({
  name: 'CreateRecordBtn',
  setup () {
    const {communityId} = useContext(community)
    const {isDatasets, isArticles} = useCollection()

    const createRoute = computed(() => {
      let routeName = 'create'
      let routeArgs = {}

      if (communityId.value) {
        routeName = 'community-create'
        routeArgs = {communityId: communityId.value}
      }

      let model = ''
      if (isDatasets) {
        model = DATASETS_COLLECTION_CODE
      } else if (isArticles) {
        model = ARTICLES_COLLECTION_CODE
      }
      return {
        name: routeName,
        model: model,
        ...routeArgs
      }
    })

    return {createRoute}
  }
})
</script>
