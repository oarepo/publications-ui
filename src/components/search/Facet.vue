<template lang="pug">
  q-skeleton.q-my-md.full-width(v-if="isLoading" animation="pulse" type="box" height="30px")
  q-expansion-item.text-black.text-capitalize(
    v-else
    :key="facet.code"
    :icon="facetIcon"
    :label="facet.facet.label"
    v-model="opened"
    @show="$emit('open')"
    @hide="$emit('close')")
    q-card.bg-grey-4.text-dark(v-if="!isLoading && opened")
      q-card-section(v-if="facetBuckets.length === 0")
        span {{ $t('message.noData') }}
      q-card-section(v-for="fb in facetBuckets" :key="fb.code" v-else)
        .row.justify-between.no-wrap
          q-checkbox.col-10(
            dense
            dark
            v-model="model"
            color="primary"
            :val="fb.key.toString()"
            :label="fb.label")
          q-badge.text-white.col-auto(color="secondary") {{ fb.doc_count }}
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { ArrayDatatype } from '@oarepo/vue-query-synchronizer'

export default @Component({
  name: 'Facet',
  props: {
    facet: Object,
    isLoading: Boolean
  }
})
class Facet extends Vue {
  opened = null

  beforeMount () {
    this.opened = this.$query.facets.includes(this.facet.code) || this.$query[this.facet.code].length > 0
    if (this.opened) {
      this.$query.define(this.facet.code, ArrayDatatype, [])
    }
  }

  get model () {
    return this.$query[this.facet.code]
  }

  set model (value) {
    this.$query[this.facet.code] = value
    this.$query.page = 1
  }

  get facetIcon () {
    switch (this.facet.code) {
      case 'creator':
        return 'perm_identity'
      case 'title.lang':
        return 'translate'
      default:
        return 'filter_list'
    }
  }

  get facetBuckets () {
    return (this.facet.buckets || []).map(fb => {
      const translated = (this.facet.translatedValues || {})[fb.key_as_string || fb.key.toString()]
      return {
        ...fb,
        label: translated || fb.key_as_string || fb.key
      }
    })
  }
}
</script>

<style lang="sass" scoped>
</style>
