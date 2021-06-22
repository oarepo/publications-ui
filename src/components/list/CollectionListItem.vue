<template lang="pug">
q-card.item-card(flat)
  q-card-section(horizontal)
    q-card-section(v-if="loading")
      q-skeleton(:width="`${thumbnailSize}px`" :height="`${thumbnailSize}px`")
    q-card-section(v-if="loading")
      q-skeleton(type="rect" width="400px" height="40px")
      q-skeleton.q-mt-sm(type="text" width="300px")
      q-skeleton.q-mx-md.q-mb-sm.absolute-bottom.q-card__section--vert(type="text" :width="`${thumbnailSize}px`")
    q-card-section.full-width(v-else)
      .row.no-wrap.q-ml-sm.justify-between
        .row.col-fit
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
        .row.col-auto.justify-end
          q-toolbar
            status-ribbon(v-if="!loading" :metadata="m" dense)
      q-separator
      q-card-section.q-pl-sm
        .row.full-width.q-mb-md
          q-chip.col-auto(v-for="(kw, idx) in m.keywords" :key="idx") {{ kw }}
        .row.full-width.text-subtitle1.ellipsis-3-lines
          .col-auto(v-html="$sanitize(mt(m.abstract))")
      q-card-section.q-pl-sm
        .row.full-width
          .col-auto.text-subtitle2.text-grey-8.self-center(v-if="dateCreated") {{ $t('label.createdAt') }} {{ $d(dateCreated) }}
          q-space
          share-menu.col-auto(:record="item")
          q-skeleton.col-2.self-end(
            v-if="loading"
            animation="pulse"
            type="QBtn")
          q-btn.col-auto(
            v-else
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
      const timestamp = Date.parse(m.value.dates?.find((dat) => {
        return dat.type === 'created'
      }).date || m.value.created)

      if (isNaN(timestamp) == false) {
        const d = new Date(timestamp)
        return d
      }
      return false
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
