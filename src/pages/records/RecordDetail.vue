<template lang="pug">
q-page(padding)
  q-card.bg-grey-3(bordered flat)
    q-card-section
      .text-h5.no-wrap.row.q-gutter-md
        .col-auto
          span.text-accent {{ md.id }}
        q-separator(color="primary" vertical)
        .col-auto
          span {{ $mt(md.title) }}
        .col-auto.self-baseline
          span {{ md.state }}
          status-ribbon(v-if="!record.loading" :metadata="md" dense)
    q-separator
    q-card-section.q-pa-lg.bg-grey-4
      .row
        .col-auto.text-overline.text-uppercase.text-dark {{ $t('label.authors') }}:
        creator-chips.q-ml-md(:creators="md.creators || []")
    q-card-section.q-pa-lg.bg-white
      .text-overline.text-uppercase.text-accent {{ $t('label.abstract') }}
      p(v-html="$sanitize($mt(md.abstract))")
      .text-overline.text-uppercase.text-accent {{ $t('label.identifiers') }}
      .row
        q-chip(v-for="i in md.additional_identifiers" :key="i.identifier")
          q-avatar(color="primary" font-size="1rem" size="lg")
            strong.text-caption.text-white.text-bold {{ i.scheme }}
          span {{ i.identifier }}
      .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.license') }}
      .row
        q-chip(v-for="r in md.rights || []" :key="r.links.self" )
          span(v-if="!r.is_ancestor") {{ $mt(r.title) }}
      .text-overline.text-uppercase.text-accent.q-mt-md {{ $t('label.files') }}
  record-actions(:record="record")
</template>
<script>
import {computed, defineComponent} from 'vue'
import {useMeta} from 'quasar'
import useCollection from '@/composables/useCollection'
import {useI18n} from 'vue-i18n/index'
import {useTranslated} from '@/i18n/multilingual'
import RecordActions from '@/components/detail/RecordActions'
import StatusRibbon from '@/components/widgets/StatusRibbon'
import CreatorChips from '@/components/widgets/chips/CreatorChips'

export default defineComponent({
  name: 'RecordDetail',
  components: {CreatorChips, RecordActions, StatusRibbon},
  emits: ['reload'],
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {t} = useI18n()
    const {mt} = useTranslated()
    const {isDatasets, isArticles} = useCollection()

    const md = computed(() => {
      return props.record.metadata
    })

    useMeta(() => {
      let titlePath = ''
      if (isDatasets) {
        titlePath = 'route.title.datasetItem'
      } else if (isArticles) {
        titlePath = 'route.title.articleItem'
      }
      return {title: `${mt(props.record.metadata.title)} - ${t(titlePath)}` }
    })

    return {md}
  }
})
</script>
<style scoped>
</style>
