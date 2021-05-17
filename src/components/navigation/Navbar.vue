<template lang="pug">
q-header.row.z-top.no-wrap.navbar__header
  q-toolbar.q-pl-xl.col-grow.no-padding
    q-btn.on-right(
      flat
      rounded
      dense
      color="white"
      icon="arrow_back"
      @click="$router.back()"
    )
    q-btn.q-mx-md(
      v-if="$route.meta.useFacets"
      flat
      @click="toggleFacetsSidebar"
      round
      dense
      icon="menu")
    .col-1(v-else)
    q-btn(stretch flat :to="{ name: 'homepage' }")
      img.navbar__logo.col-auto(
        src="/logos/datacare_White.svg")
    q-toolbar-title.q-py-md.text-uppercase.text-weight-bold {{ $t('app.productName') }}
    search-input.col-grow
    q-btn(
      stretch
      flat
      icon="cloud_upload"
      :bla="{ name: `cesnet/draft/upload`}"
      :label="$t('action.upload')")
      //q-tooltip {{ $t(collectionId === DATASETS_COLLECTION_CODE ? 'action.uploadDataset': 'action.uploadArticle') }}
    //q-btn(stretch flat v-if="collectionId === DATASETS_COLLECTION_CODE" :to="{name: 'all-articles'}" icon="article")
    //  q-tooltip {{ $t('section.articleList') }}
    //q-btn(stretch flat v-if="collectionId === ARTICLES_COLLECTION_CODE" :to="{name: `all-datasets`}" icon="donut_small")
    //  q-tooltip {{ $t('section.datasetList') }}
  q-toolbar.col-auto
    q-space.q-ml-xl
    account-dropdown(:authenticated="authenticated")
</template>

<script>
import {ARTICLES_COLLECTION_CODE, DATASETS_COLLECTION_CODE} from '@/constants'
import AccountDropdown from '@/components/account/AccountDropdown'
import {computed, defineComponent} from 'vue'
import useAuth from '@/composables/useAuth'
import SearchInput from '@/components/search/SearchInput'
import {useContext} from 'vue-context-composition'
import {facets} from '@/contexts/facets'
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  components: {
    AccountDropdown,
    SearchInput
  },
  setup() {
    const route = useRoute()
    const {authenticated} = useAuth()
    const toggleFacets = computed(() => {
      if (route.meta.useFacets) {
        const {toggleFacetsSidebar} = useContext(facets)
        return toggleFacetsSidebar
      }
      return null
    })

    return {
      DATASETS_COLLECTION_CODE,
      ARTICLES_COLLECTION_CODE,
      authenticated,
      toggleFacetsSidebar: toggleFacets
    }
  }
})
</script>

<style lang="sass" scoped>
.navbar
  &__header
    background: linear-gradient(145deg, var(--q-primary) 11%, var(--q-secondary) 100%)

  &__logo
    min-height: 50px
    max-height: 50px
</style>
