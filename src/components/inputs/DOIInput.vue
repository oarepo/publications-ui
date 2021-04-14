<template lang="pug">
q-input(v-model="doi" label="Enter DOI" :error="doiError" error-message="DOI was not found" @input="doiError=false")

</template>

<script>
import axios from 'axios'
import NewArticleDialog from 'components/dialogs/articles/NewArticleDialog'

export default {
  props: {
    value: String
  },
  watch: {
    value: function (val) {
      this.doi = val
    }
  },
  components: {
    'article-dialog': NewArticleDialog
  },
  mounted () {
    this.doi = this.value
  },
  data () {
    return {
      doiError: false,
      doi: '',
      communityId: this.$route.meta.communityId
    }
  },

  methods: {
    confirm () {
      this.$q.dialog({
        title: 'DOI already in repository',
        message: 'DOI ' + this.doi + ' already exists in repository, would you like to attach this dataset to existing article?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        this.doiError = false
        const datasetUrl = window.location.href
        const existingArticle = (await axios.post(`/${this.communityId}/articles/draft/document/${this.doi}`)).data
        if (!existingArticle.metadata.datasets.includes(datasetUrl)) {
          axios.patch(existingArticle.links.self,
            [{ op: 'add', path: '/datasets/-', value: datasetUrl }],
            { headers: { 'Content-Type': 'application/json-patch+json' } })
        }

        this.$router.replace({ name: `${this.communityId}/draft-article/record`, params: { recordId: existingArticle.metadata.id } })
      }).onOk(() => {
      }).onCancel(() => {
        this.doiError = false
      }).onDismiss(() => {
        this.doiError = false
      })
    },
    async validate () {
      const response = (await axios.post(`/${this.communityId}/articles/draft/from-doi/`, { doi: this.doi })).data
      var articleUrl = ''
      try {
        articleUrl = response.links.self
      } catch {

      }
      if (articleUrl !== '' && this.doi !== '') {
        this.confirm()
      }
      if (response.article && this.doi !== '') {
        this.doiError = false
        this.$emit('input', this.doi)
        return response.article
      } else {
        this.doiError = true
      }
    }
  }
}
</script>
