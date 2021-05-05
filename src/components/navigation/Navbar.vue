<template lang="pug">
q-header.row.z-top.no-wrap.navbar__header
  q-toolbar.q-pl-xl.col-grow.no-padding
    q-btn.on-right(
      flat
      rounded
      dense
      color="white"
      icon="arrow_back"
    )
    q-btn.q-mx-md(
      v-if="$route.meta.useFacets"
      flat
      @click="facets"
      round
      dense
      icon="menu")
    .col-1(v-else)
    q-btn(
      v-if="mode !== modes.LIST"
      flat
      rounded
      dense
      color="white"
      icon="arrow_back")
    q-btn(stretch flat :to="{ name: 'homepage' }")
      img.navbar__logo.col-auto(
        src="/logos/datacare_White.svg")
    q-toolbar-title.q-py-md.text-uppercase.text-weight-bold {{ productName }}
    //search-input.col-grow(@search="doSearch")
    q-btn(
      stretch
      flat
      icon="cloud_upload"
      :bla="{ name: `cesnet/draft-${collection}/upload`}"
      :label="$t('action.upload')")
      q-tooltip {{ $t(collection === 'datasets' ? 'action.uploadDataset': 'action.uploadArticle') }}
    //q-btn(stretch flat v-if="collection === 'datasets'" :to="{name: `${communityId}/all-articles`}" icon="article")
    //  q-tooltip {{ $t('section.articleList') }}
    q-btn(stretch flat v-if="collection === 'articles'" :to="{name: `${communityId}/all-datasets`}" icon="donut_small")
      q-tooltip {{ $t('section.datasetList') }}
  q-toolbar.col-auto
    q-space.q-ml-xl
    //account-dropdown(:authenticated="authenticated")
</template>

<script>
import {Options, Vue} from 'vue-class-component'
// import AccountDropdown from '@/components/account/AccountDropdown'
// import SearchInput from '@/components/search/SearchInput'
// import { AuthStateMixin } from '@/mixins/AuthStateMixin'

export const Modes = Object.freeze({ INTRO: 'intro', LIST: 'list', DETAIL: 'detail' })

export default @Options({
  name: 'Navbar',
  props: {
    mode: {
      type: String,
      default: Modes.LIST,
      validator: mode => Object.values(Modes).indexOf(mode) > -1
    }
  },
  components: {
    // SearchInput,
    // AccountDropdown
  }
})
class Navbar extends Vue {
  get modes () {
    return Modes
  }

  get productName () {
    return this.$i18n.t('app.productName')
  }

  get collection () {
    if (this.$route.name.includes('dataset')) {
      return 'datasets'
    } else if (this.$route.name.includes('article')) {
      return 'articles'
    }
    return ''
  }

  facets () {
    this.$emit('facets')
  }
}
</script>

<style lang="sass" scoped>
.navbar
  &__header
    background: linear-gradient(145deg, var(--q-primary) 11%, var(--q-secondary) 100%)
  &__logo
    min-height: 50px
    max-height: 50px
</style>
