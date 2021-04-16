<template lang="pug">
q-input(v-model="doi"
        autofocus
        :label="$t('label.enterArticleDOI')"
        :error="doiError"
        :error-message="$t('message.resolveDOIError')"
        @input="doiError=false")
</template>

<script>
import axios from 'axios'

export default {
  props: {
    value: String
  },
  watch: {
    value: function (val) {
      this.doi = val
    }
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
    articlesActionUrl (action) {
      const articlesApi = this.$router.resolve({
        name: `${this.communityId}/article-detail`
      }).href
      return `${articlesApi}/${action}/`
    },
    confirm (articleLinks, article) {
      this.$q.dialog({
        title: 'DOI already in repository',
        message: 'DOI ' + this.doi + ' already exists in repository, would you like to attach this dataset to existing article?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        this.$emit('exists', { links: articleLinks, metadata: article })
        // TODO: move this logic to NewArticleDialog
        this.doiError = false
      }).onCancel(() => {
        this.doiError = false
      }).onDismiss(() => {
        this.doiError = false
      })
    },
    async validate () {
      const response = (await axios.post(
        `${this.articlesActionUrl('from-doi')}`,
        { doi: this.doi })).data
      let articleLinks = ''
      try {
        articleLinks = response.links
      } catch {
      }
      if (articleLinks && this.doi !== '') {
        this.confirm(articleLinks, response.article)
        return
      }
      if (response.article && this.doi !== '') {
        this.doiError = false
        this.$emit('resolve', response.article)
      } else {
        this.doiError = true
      }
    }
  }
}
</script>
