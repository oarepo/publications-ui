<template lang="pug">
  q-card(flat clickable)
    q-toolbar.absolute.q-pt-md.q-pb-sm.justify-end
      dataset-status-ribbon(:article="d" dense)
    q-card-section(horizontal)
      q-card-section
        q-skeleton(v-if="loading" :width="`${imageSize}px`" :height="`${imageSize}px`")
      q-card-section(v-if="loading")
        q-skeleton(type="rect" width="400px" height="40px")
        q-skeleton.q-mt-sm(type="text" width="300px")
        q-skeleton.q-mx-md.q-mb-sm.absolute-bottom.q-card__section--vert(type="text" :width="`${imageSize}px`")
      q-card-section(v-else)
        .text-h5.q-mt-sm.q-mb-xs.gt-xs {{ title }}
        q-separator
        q-card-section
          .text-subtitle1.ellipsis-3-lines
            span(v-html="$sanitize( abstract )")
        q-card-section
          .text-subtitle2.text-grey-8 {{ $t('label.createdAt') }} {{ $d(new Date(d.created)) }}
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

export default @Component({
  name: 'ArticleListEntry',
  props: {
    loading: Boolean,
    item: Object
  },
  components: {
    DatasetStatusRibbon
  }
})
class ItemListEntry extends Vue {
  @Emit('detail')
  detail () {
    return this.item
  }

  keys (data) {
    var keys = []
    for (var k in data) {
      keys.push(k)
    }
    return keys
  }

  get title () {
    var title = this.item.metadata.title
    var langs = this.keys(title)

    if ('en' in langs) {
      return title.en
    } else return title[langs[0]]
  }

  get abstract () {
    var abstract = this.item.metadata.abstract
    if (abstract === '') { // abstract is not required
      return ''
    }
    var langs = this.keys(abstract)

    if ('en' in langs) {
      return abstract.en
    } else return abstract[langs[0]]
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
.highlight em
  font-weight: bolder
  color: #616161 !important
</style>
