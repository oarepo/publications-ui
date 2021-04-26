<template lang="pug">
  q-card(flat clickable)
    q-toolbar.absolute.q-pt-md.q-pb-sm.justify-end
      dataset-status-ribbon(v-if="!loading" :dataset="d" dense)
    q-card-section(horizontal)
      q-card-section
        q-skeleton(v-if="loading" :width="`${imageSize}px`" :height="`${imageSize}px`")
      q-card-section(v-if="loading")
        q-skeleton(type="rect" width="400px" height="40px")
        q-skeleton.q-mt-sm(type="text" width="300px")
        q-skeleton.q-mx-md.q-mb-sm.absolute-bottom.q-card__section--vert(type="text" :width="`${imageSize}px`")
      q-card-section(v-else)
        .q-mr-xl.block.text-h5.q-mt-sm.q-mb-xs.gt-xs
          search-highlight(:item="item" :text="d.title._")
        q-separator
        q-card-section
          .text-subtitle1.ellipsis-3-lines
            span(v-html="$sanitize(d.abstract._)")
        q-card-section
          .text-subtitle2.text-grey-8 {{ $t('label.createdAt') }} {{ $d(new Date(dateCreated)) }}
      q-skeleton.absolute-bottom-right.q-px-sm.q-ma-md(
        v-if="loading"
        animation="pulse"
        type="QBtn")
      q-btn.absolute-bottom-right.q-px-sm.q-ma-md(
        v-else
        color="primary"
        rounded
        :label="$t('nav.detail')"
        @click.stop="detail")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
import DatasetStatusRibbon from 'components/datasets/item/DatasetStatusRibbon'
import SearchHighlight from 'components/search/SearchHighlight'

export default @Component({
  name: 'DatasetListEntry',
  props: {
    loading: Boolean,
    item: Object
  },
  components: {
    SearchHighlight,
    DatasetStatusRibbon
  }
})
class DatasetListEntry extends Vue {
  @Emit('detail')
  detail () {
    return this.item
  }

  get dateCreated () {
    return this.d.dates.find((dat) => {
      return dat.type === 'created'
    }).date
  }

  get d () {
    return this.item.metadata || {}
  }

  get imageSize () {
    if (this.$q.screen.lt.sm) {
      return 100
    } else {
      return 200
    }
  }
}
</script>

<style lang="sass">
</style>
