<template lang="pug">
teleport(to="#record-actions-drawer" v-if="recordSidebarEnabled")
  q-list(padding separator)
    q-item(clickable v-ripple @click="edit" v-if="canEdit")
      q-item-section(avatar)
        q-icon(name="edit")
      q-item-section
        q-item-label.text-uppercase.text-caption {{ $t('action.edit') }}
    q-item(clickable v-if="canAttachArticle" v-ripple @click="attachArticle")
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
import {computed, defineComponent} from 'vue'
import useFSM from '@/composables/useFsm'
import {useContext} from 'vue-context-composition'
import {record} from '@/contexts/record'
import {useRouter} from 'vue-router'
import {community} from '@/contexts/community'
import useCollection from '@/composables/useCollection'
import {STATE_APPROVED, STATE_PUBLISHED} from '@/constants'
import NewArticleDialog from "@/components/widgets/dialogs/NewArticleDialog";
import {useQuasar} from "quasar";
import useAuth from "@/composables/useAuth";

export default defineComponent({
  name: 'RecordActions',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const $q = useQuasar()
    const {recordSidebarEnabled} = useContext(record)
    const {transitions, makeTransition} = useFSM(props.record)
    const router = useRouter()
    const {communityId} = useContext(community)
    const {model, isDatasets} = useCollection()
    const {authenticated} = useAuth()

    function attachArticle() {
      $q.dialog({
        component: NewArticleDialog,
        // Pass current dataset object to dialog
        componentProps: {
          dataset: props.record,
          datasetLinks: props.record.http.data.links
        }
      }).onOk(async () => {
      }).onCancel(() => {
      }).onDismiss(() => {
      })
    }

    const canEdit = computed(() => {
      return ![STATE_APPROVED, STATE_PUBLISHED].includes(props.record.metadata.state) && authenticated
    })

    const canAttachArticle = computed(() => {
      return canEdit.value && isDatasets.value
    })

    function edit() {
      router.push({
        name: 'edit',
        params: {
          communityId: communityId.value,
          model: model.value,
          recordId: props.record.metadata.id
        }
      })
    }

    return {
      attachArticle,
      transitions,
      makeTransition,
      recordSidebarEnabled,
      isDatasets,
      edit,
      canEdit,
      canAttachArticle,
      STATE_APPROVED,
      STATE_PUBLISHED
    }
  }
})
</script>

<style scoped>

</style>
