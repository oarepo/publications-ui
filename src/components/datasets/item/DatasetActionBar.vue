<template lang="pug">
q-toolbar.q-pb-lg.justify-end(v-if="authenticated")
  q-space
  q-btn-group.col-auto.q-pr-lg.no-shadow(rounded)
    q-btn.text-black(
      :class="!transitions.length ? 'q-mr-md' : ''"
      v-if="needOwner"
      size="md"
      icon="las la-paperclip"
      rounded
      color="grey-4"
      @click="attachArticle"
      :disabled="changingState"
      :label="$t('action.attachArticle')")
    q-btn-dropdown.q-mr-md.text-black(
      :label="$t('action.makeTransition')"
      color="grey-4"
      rounded
      v-if="transitions.length"
      icon="published_with_changes"
      :disabled="changingState"
      :loading="changingState")
      q-list.q-px-lg.bg-secondary(dark padding separator)
        q-item.q-pa-md(v-for="t in transitions" clickable v-close-popup :key="t.code"
          @click="makeTransition(t)")
          q-item-section(avatar)
            q-icon(:name="t.icon" color="white")
          q-item-section
            q-item-label.text-uppercase.text-caption {{ t.label }}
  dataset-status-ribbon(:dataset="dataset")
</template>

<script>
import { Component } from 'vue-property-decorator'
import NewArticleDialog from 'components/dialogs/articles/NewArticleDialog'
import DatasetStatusRibbon from 'components/datasets/item/DatasetStatusRibbon'
import TransitionMixin from 'src/mixins/TransitionMixin'
import { mixins } from 'vue-class-component'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'

export default @Component({
  name: 'DatasetActionBar',
  props: {
    record: Object,
    recordApi: Object,
    dataset: Object
  },
  components: {
    DatasetStatusRibbon
  }
})
class DatasetActionBar extends mixins(AuthStateMixin, TransitionMixin) {
  get needOwner () {
    // TODO: check if the logged in user is owner of the dataset
    return true
  }

  attachArticle () {
    this.$q.dialog({
      parent: this,
      component: NewArticleDialog
    }).onOk(async article => {
      // TODO(alzpeta): create article record with attached dataset in datasets
      // 1) jako datasetURL pouzij this.dataset.links.self
      // 2) request do kolekce clanku staci udelat proti url /articles (netreba davat https://...)
      // 3) na konci dat this.$router.push({name: 'draft-article/record', params: { recordId: article.id }})

      // var DOI = data
      // var datasetURL = `https://127.0.0.1:5000/datasets/detail/${this.recordId}`
      //
      // var url = (await axios.post(`https://127.0.0.1:5000/api/draft/publications/articles/document/${this.DOI}`)).request.responseURL
      // var response = (await axios.post(`https://127.0.0.1:5000/api/draft/publications/articles/document/${this.DOI}`)).data
      // var datasetsArray = response.metadata.datasets
      //
      // if (datasetsArray === undefined) { axios.patch(url, [{ op: 'add', path: '/datasets', value: [datasetURL] }], { headers: { 'Content-Type': 'application/json-patch+json' } })
      // }
      // else { axios.patch(url, [{ op: 'add', path: '/datasets/-', value: datasetURL }], { headers: {'Content-Type': 'application/json-patch+json' } }) }
      // url = (await axios.post(`https://127.0.0.1:5000/api/draft/publications/articles/document/${this.DOI}`)).request.responseURL
      // // window.location.href = url
      // this.$router.push(url)
    }).onCancel(() => {
      // console.log('>>>> Cancel')
    }).onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    })
  }
}
</script>

<style lang="sass">

</style>
