<template lang="pug">
q-card.item-card(flat)
  q-toolbar.absolute.q-pt-md.q-pb-sm.justify-end
    status-ribbon(v-if="!loading" :metadata="m" dense)
  q-card-section(horizontal)
    q-card-section
      q-skeleton(v-if="loading" :width="`${thumbnailSize}px`" :height="`${thumbnailSize}px`")
    q-card-section(v-if="loading")
      q-skeleton(type="rect" width="400px" height="40px")
      q-skeleton.q-mt-sm(type="text" width="300px")
      q-skeleton.q-mx-md.q-mb-sm.absolute-bottom.q-card__section--vert(type="text" :width="`${thumbnailSize}px`")
    q-card-section(v-else)
      .row.full-width.q-mt-sm.q-mb-xs
        .col-auto.q-mr-xl.block.text-h5.self-center
          search-highlight.self-center(:item="item" :text="mt(m.title)")
        q-separator.gt-xs.header-separator(vertical spaced inset color="accent" v-if="m.creators?.length")
        .gt-xs.col-auto.block.text-subtitle1.self-center(v-if="m.creators?.length") {{ m.creators.map(c => c.person_or_org.name).join(' · ') }}
          q-tooltip {{ $t('label.author') }}
        q-separator.gt-sm.header-separator(vertical spaced inset color="accent" v-if="m.languages?.length")
        .gt-sm.col-auto.block.text-subtitle2.self-center(v-if="m.languages?.length")
          span {{ m.languages.map(l => mt(l.title)).join(' · ') }}
          q-tooltip {{ $t('label.language') }}
        q-separator.gt-sm.header-separator(vertical spaced inset color="accent" v-if="m._files?.length")
        .gt-sm.col-auto.block.text-subtitle2.self-center(v-if="m._files?.length")
          span.q-px-xs {{ m._files?.length }}
          q-icon(name="attachment")
          q-tooltip {{ $t('label.filesCount') }}
      q-separator
      q-card-section
        .row.q-mb-md
          q-chip(v-for="(kw, idx) in m.keywords" :key="idx") {{ kw }}
        .text-subtitle1.ellipsis-3-lines
          span(v-html="$sanitize(mt(m.abstract))")
      q-card-section
        .text-subtitle2.text-grey-8 {{ $t('label.createdAt') }} {{ $d(new Date(dateCreated)) }}
    q-skeleton.absolute-bottom-right.q-px-sm.q-ma-md(
      v-if="loading"
      animation="pulse"
      type="QBtn")
    .row.absolute-bottom-right.q-pa-md(v-else)
      share-menu(:record="item")
      q-btn(
        padding="sm md"
        color="primary"
        :label="$t('nav.detail')"
        @click.stop="$emit('detail')")
</template>

<script>
import StatusRibbon from '@/components/widgets/StatusRibbon'
import SearchHighlight from '@/components/search/SearchHighlight'

import {computed, defineComponent} from 'vue'
import {useQuasar} from 'quasar'
import {useI18n} from 'vue-i18n'
import {useTranslated} from '@/composables/useTranslated'
import useClipboard from '@/composables/useClipboard'
import ShareMenu from '@/components/widgets/ShareMenu'

export default defineComponent({
  name: 'CollectionListItem',
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['detail'],
  components: {
    ShareMenu,
    SearchHighlight,
    StatusRibbon
  },
  setup(props) {
    const $q = useQuasar()
    const {locale} = useI18n()
    const {copy2clip} = useClipboard()
    const {mt} = useTranslated(locale)

    const m = computed(() => {
      return props.item.metadata || {}
    })

    const dateCreated = computed(() => {
      return m.value.dates?.find((dat) => {
        return dat.type === 'created'
      }).date || m.value.created
    })

    const thumbnailSize = computed(() => {
      if ($q.screen.lt.sm) {
        return 100
      } else {
        return 200
      }
    })

    return {m, mt, dateCreated, thumbnailSize, copy2clip}
  }
})
</script>

<style lang="sass">
.item-card
  border-bottom: 1px solid var(--q-primary)

.header-separator
  opacity: 0.3
</style>
