<template lang="pug">
  q-page.q-mx-lg-xl(padding v-touch-swipe.mouse.right.left="swipePage")
    .row.justify-between.items-center.q-col-gutter-x-lg.q-mt-md.q-mt-lg-xl.q-mb-md
      .col-12.col-lg-8
        .text-h3.gt-md {{ $t('section.datasetList') }}
        .text-h4.lt-lg.gt-sm.q-mt-none.q-mb-lg {{ $t('section.datasetList') }}
        .text-h6.lt-md.q-mt-none.q-mb-md {{ $t('section.datasetList') }}
    .column.q-mt-md.q-gutter-y-md(v-if="items.length || loaded")
      div(v-for="item in items" :key="item.id")
        item-list-entry.col.cursor-pointer.non-selectable(
          :loading="!loaded"
          :item="item"
          @detail="navigateDetail"
          @click.native="navigateDetail(item)")
      .row.justify-around
        q-pagination.q-mt-lg(v-model="$query.page" :max="pages" :max-pages="9" color="accent"
          direction-links boundary-numbers size="lg" v-if="loaded && items.length")
    no-data-placeholder.full-height(v-else)
    portal(to="drawer").full-height
      .column.q-gutter-y-md.q-pa-xl.justify-between.full-height
        .col-auto.row.q-mb-xl
          .text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.filters') }}
          facet-list(:facets="facets" v-if="loaded")
        .col-auto.text-overline.text-grey-7.text-bold.text-uppercase {{ $t('label.community') }}
          .text-h3.text-weight-thin.text-primary {{ $route.meta.communityId }}
</template>
<script>
import { Component, Mixins } from 'vue-property-decorator'
import ItemListEntry from 'components/datasets/list/DatasetListEntry'
import { SearchMixin } from 'src/mixins/SearchMixin'
import NoDataPlaceholder from 'src/components/common/NoDataPlaceholder'
import FacetList from 'components/search/FacetList'

export default @Component({
  name: 'DatasetList',
  props: {
    records: Array,
    facets: Array,
    filters: Array,
    pages: Number,
    loading: Boolean,
    loaded: Boolean,
    collectionApi: Object
  },
  components: {
    // Logo,
    ItemListEntry,
    NoDataPlaceholder,
    FacetList
  }
})
class DatasetList extends Mixins(SearchMixin) {
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
