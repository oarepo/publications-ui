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
      doi: ''
    }
  },

  methods: {
    async validate () {
      const response = (await axios.post('/articles/draft/from-doi/', { doi: this.doi })).data
      var articleUrl = ''
      try {
        articleUrl = response.links.self
      } catch {

      }

      if (articleUrl !== '' && this.doi !== '') {
        const currentUrl = window.location.pathname
        const host = window.location.host
        const dataSetUrl = host + currentUrl
        const datasetResponse = (await axios.post(`/articles/draft/document/${this.doi}`)).data
        NewArticleDialog.methods.updateDatasetArray(datasetResponse, dataSetUrl, response.links.self)

        window.location.href = response.links.self
      }
      if (response.article && this.doi !== '') {
        this.$emit('input', this.doi)
        console.log(response.article)
        return response.article
      } else {
        this.doiError = true
      }
    }
  }
}
</script>
