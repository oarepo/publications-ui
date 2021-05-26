<template lang="pug">
q-chip.text-white(
  color="primary"
  v-bind="$attrs")
  q-avatar(v-if="contributor.person_or_org.identifiers" icon="badge" size="lg")
    q-tooltip {{ contributor.person_or_org.identifiers.find(i => {return i.scheme === 'orcid'}).identifier }}
  span {{ contributor.person_or_org.name }}
    q-tooltip(v-if="contributor.affiliations || contributor.role")
      span {{ contributor.role.map((r => mt(r.title))).join(', ') }} @ {{ contributor.affiliations.map((a => a.name)).join(', ') }}
</template>

<script>
import {defineComponent} from 'vue'
import {useI18n} from 'vue-i18n'
import {useTranslated} from '@/composables/useTranslated'

export default defineComponent({
  name: "ContributorBadge",
  props: {
    contributor: {
      type: Object,
      required: true
    }
  },
  setup () {
    const {locale} = useI18n()
    const {mt} = useTranslated(locale)
    return {mt}
  }
})
</script>

<style scoped>

</style>
