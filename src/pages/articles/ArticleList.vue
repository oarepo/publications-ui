<template lang="pug">
  q-page.q-mx-lg-xl(padding v-touch-swipe.mouse.right.left="swipePage")
    .row.justify-between.items-center.q-col-gutter-x-lg.q-mt-md.q-mt-lg-xl.q-mb-md
      .col-auto
        .text-h3.gt-md {{ $t('section.articleList') }}
        .text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t('section.articleList') }}
        .text-h6.lt-md.q-mt-none.q-mb-md {{ $t('section.articleList') }}
      .col-auto.items-center
        q-btn(
          stretch
          flat
          color="dark"
          icon="cloud_upload"
          :to="{ name: `cesnet/draft-articles/upload`}"
          :label="$t('action.upload')")
          q-tooltip {{ $t('action.uploadArticle') }}
    .column.q-mt-md.q-gutter-y-md(v-if="items.length")
      div(v-for="item in items" :key="item.id")
        item-list-entry.col.cursor-pointer.non-selectable(
          :loading="!loaded"
          :item="item"
          @detail="navigateDetail"
          @click.native="navigateDetail(item)")
      .row.justify-around
        pagination.q-mt-lg(:query="$query" :pages="pages" v-if="loaded && items.length")
    no-data-placeholder.full-height(v-else)
      .text-h6.text-weight-lighter {{ $t('message.noArticles') }}…
    portal(to="drawer")
      .column.q-gutter-y-md.q-pa-xl.justify-between.full-height
        .col-auto.row.q-mb-xl
          .text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.filters') }}
          facet-list(:facets="facets" v-if="loaded")
        .col-auto.text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.community') }}
          .text-h3.text-weight-thin.text-primary {{ communityId }}
</template>
<script>
import { Component, Mixins } from 'vue-property-decorator'
import ItemListEntry from 'components/articles/list/ArticleListEntry'
import { SearchMixin } from 'src/mixins/SearchMixin'
import NoDataPlaceholder from 'src/components/common/NoDataPlaceholder'
import FacetList from 'components/search/FacetList'
import Pagination from 'components/navigation/Pagination'
import { CommunityMixin } from 'src/mixins/Community'

export default @Component({
  name: 'ArticleList',
  props: {
    records: Array,
    facets: Array,
    filters: Array,
    pages: Number,
    loading: Boolean,
    loaded: Boolean
  },
  components: {
    // Logo,
    ItemListEntry,
    NoDataPlaceholder,
    FacetList,
    Pagination
  }
})
class ArticleList extends Mixins(SearchMixin, CommunityMixin) {
  navigateDetail (item) {
    this.$router.push(item.links.ui)
  }

  get items () {
    if (!this.loaded) {
      return Array.from({ length: this.$query.size }).map(x => ({}))
    }
    return this.records || []
  }

  swipePage (evt) {
    if (evt.direction === 'right') {
      if (this.$query.page < this.pages) {
        this.$query.page++
      }
    } else {
      if (this.$query.page > 1) {
        this.$query.page--
      }
    }
  }
}
</script>
<style lang="sass">
</style>
