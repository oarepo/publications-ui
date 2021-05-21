<template lang="pug">
q-chip.col-auto.text-white(v-if="creators.length" color="primary" v-for="c in creators" :key="c.person_or_org.name")
  q-avatar.no-padding(v-if="c.person_or_org.identifiers" icon="lab la-orcid" size="xl")
    q-tooltip() {{ c.person_or_org.identifiers.find(i => {return i.scheme === 'orcid'}).identifier }}
  span {{ c.person_or_org.name }}
    q-tooltip(v-if="c.affiliations") {{ c.affiliations.map((a => a.name)).join(', ') }}
  span.on-right.text-overline.text-warning(v-if="c.identifiers") {{ c.identifiers.orcid }}
.text-info.col-auto.self-center(v-else) {{ $t('message.noAuthors') }}
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'CreatorChips',
  props: {
    creators: Array,
    default: () => []
  }
})
</script>

<style scoped>

</style>
