<template lang="pug">
q-select(
  color="primary"
  filled
  square
  clearable
  bottom-slots
  options-cover
  :hint="$t('action.filterByCommunity')"
  hide-hint
  hide-dropdown-icon
  v-model="model"
  :options="communities"
  option-value="id"
  option-label="title"
  :loading="communitiesLoading")
  template(v-slot:selected)
    .row.full-width.q-my-sm(v-if="model")
      .col-auto.self-center.q-pr-md
        q-avatar(size="50px" color="primary" text-color="white" :icon="model.metadata?.logo")
          .text-bold.text-code {{ model?.title[0] }}
      .column.col-8.justify-between
        .col.community-title.text-h6.text-weight-bold.text-primary.q-pb-md(v-if="model") {{ model.title }}
        .col.text-caption {{ model.metadata?.description }}
    .row.justify-between.items-center(v-else)
      .col-auto.text-primary.text-h7 {{ $t('label.noCommunitySelected') }}
      .col-auto
        q-btn(flat :label="$t('action.choose')" @click.native="")
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import {useContext} from 'vue-context-composition'
import {community} from '@/contexts/community'
// import deepcopy from 'deepcopy'

export default defineComponent({
  name: 'CommunitySelect',
  setup () {
    const {communities, currentCommunity, communitiesLoading, setCommunity} = useContext(community)
    const model = ref(currentCommunity.value || null)

    watch(model, (model) => {
      setCommunity(model?.id || null)
    })

    return {model, communities, communitiesLoading, setCommunity}
  }
})
</script>
<style lang="sass">
.community-title
  line-height: unset
</style>
