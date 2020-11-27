<template lang="pug">
  q-card(flat clickable)
    q-card-section(horizontal)
      q-card-section
        q-skeleton(v-if="loading" :width="`${imageSize}px`" :height="`${imageSize}px`")
      q-card-section(v-if="loading")
        q-skeleton(type="rect" width="400px" height="40px")
        q-skeleton.q-mt-sm(type="text" width="300px")
        q-skeleton.q-mx-md.q-mb-sm.absolute-bottom.q-card__section--vert(type="text" :width="`${imageSize}px`")
      q-card-section(v-else)
        .text-h5.q-mt-sm.q-mb-xs.gt-xs {{ d.titles.cs }}
        .text-bold.q-mt-sm.q-mb-xs.lt-sm {{ d.titles }}
        .text-subtitle2.text-grey-8.absolute-bottom.q-card__section--vert {{ $t('label.createdAt') }} {{ $d(new Date(d.created)) }}
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
// import ItemListThumbnail from 'components/items/list/ItemListThumbnail'
import bleach from 'bleach'
import { sanitize } from 'src/utils/bleach'

const options = {
  mode: 'white',
  list: [
    'em'
  ]
}

export default @Component({
  name: 'DatasetListEntry',
  props: {
    loading: Boolean,
    item: Object
  },
  components: {
    // ItemThumbnail: ItemListThumbnail
  }
})
class ItemListEntry extends Vue {
  @Emit('detail')
  detail () {
    return this.item
  }

  get d () {
    return this.item.metadata || {}
  }

  get highlight () {
    return bleach.sanitize(Object.values(this.item.highlight || {}).flat().join(' ... '), options)
  }

  get hasHighlight () {
    return this.item.highlight && Object.keys(this.item.highlight).length
  }

  get shortDescription () {
    let maxLen = {
      xs: 0,
      sm: 0,
      md: 100,
      lg: 200,
      xl: 700
    }[this.$q.screen.name]
    if (this.$q.screen.md && this.$q.screen.width < 1200) {
      maxLen = 0
    }
    if (maxLen) {
      const ret = ((this.d.description && this.d.description.cs) || '')
      if (ret.length >= maxLen) {
        return sanitize(ret.substr(0, maxLen) + ' ...')
      } else {
        return sanitize(ret)
      }
    } else {
      return ''
    }
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
