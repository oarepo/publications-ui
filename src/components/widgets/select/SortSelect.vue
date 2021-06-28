<template lang="pug">
.column.q-px-sm.justify-start
  .col-3.self-start.text-caption.text-grey-7 {{ $t('action.sort') }}
  q-select.col-auto(
    dense
    filled
    square
    flat
    stack-label
    label-color="primary"
    :options="orderingOptions"
    emit-value
    map-options
    :option-label="opt => $t(opt.label)"
    v-model="query.sort")
      template(v-slot:prepend)
        q-icon(size="xs" name="sort_by_alpha")
      template(v-slot:option="scope")
        q-item(v-bind="scope.itemProps")
          q-item-section
            q-item-label {{ $t(scope.opt.label) }}
          q-item-section(avatar)
            q-icon(:name="scope.opt.icon")
</template>
<script>
import {defineComponent, ref} from 'vue'
import {useQuery} from '@oarepo/vue-query-synchronizer'

export default defineComponent({
  name: 'SortSelect',
  setup () {
    const query = useQuery()

    const orderingOptions = ref(
      [
        {
          icon: 'arrow_upward',
          label: 'label.sort.alphabetical',
          value: 'alphabetical_desc'
        },
        {
          icon: 'arrow_downward',
          label: 'label.sort.alphabetical',
          value: 'alphabetical'
        },
      ]
    )

    return {query, orderingOptions}
  }
})
</script>
