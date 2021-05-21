<template lang="pug">
q-chip.text-white(
  color="primary"
  v-bind="$attrs")
  q-avatar(v-if="contributor.person_or_org.identifiers" icon="badge" size="lg")
    q-tooltip {{ contributor.person_or_org.identifiers.find(i => {return i.scheme === 'orcid'}).identifier }}
  span {{ contributor.person_or_org.name }}
    q-tooltip(v-if="contributor.affiliations || contributor.role")
      span {{ contributor.role.map((r => $mt(r.title))).join(', ') }} @ {{ contributor.affiliations.map((a => a.name)).join(', ') }}
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "ContributorBadge",
  props: {
    contributor: {
      type: Object,
      required: true
    }
  }
})
</script>

<style scoped>

</style>
