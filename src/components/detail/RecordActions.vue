<template lang="pug">
teleport(to="#record-actions-drawer" v-if="recordSidebarEnabled")
  q-list(padding separator)
    q-item(clickable v-ripple @click="attachArticle")
      q-item-section(avatar)
        q-icon(name="link")
      q-item-section
        q-item-label.text-uppercase.text-caption {{ $t('action.attachArticle') }}
    q-item.q-pa-md(v-for="t in transitions" clickable v-close-popup :key="t.code"
      @click="makeTransition(t)")
      q-item-section(avatar)
        q-icon(:name="t.icon" color="dark")
      q-item-section
        q-item-label.text-uppercase.text-caption {{ t.label }}
</template>

<script>
import {defineComponent} from 'vue'
import useFSM from '@/composables/useFsm'
import {useContext} from 'vue-context-composition'
import {record} from '@/contexts/record'

export default defineComponent({
  name: 'RecordActions',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  setup (props) {
    const {recordSidebarEnabled} = useContext(record)
    const {transitions, makeTransition} = useFSM(props.record)

    console.log(props.record, transitions.value)
    function attachArticle () {}

    return {attachArticle, transitions, makeTransition, recordSidebarEnabled}
  }
})
</script>

<style scoped>

</style>
