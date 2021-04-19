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
        title: this.$t('section.articleExistsError'),
        message: this.$t('message.articleExistsError'),
        cancel: true,
        contentStyle: { zIndex: 8000 }
      }).onOk(async () => {
        this.$emit('exists', { links: articleLinks, metadata: article })
        // TODO: move this logic to NewArticleDialog
        this.doiError = false
      }).onCancel(() => {
        this.doiError = false
        this.$emit('resolve', {})
      }).onDismiss(() => {
        this.doiError = false
        this.$emit('resolve', {})
      })
    },
    validate () {
      axios.post(
        `${this.articlesActionUrl('from-doi')}`,
        { doi: this.doi })
        .then((response) => {
          const articleLinks = response.data?.links
          const article = response.data?.article

          if (articleLinks && this.doi !== '') {
            this.confirm(articleLinks, article)
            return
          }
          if (article && this.doi !== '') {
            this.doiError = false
            this.$emit('resolve', article)
          } else {
            this.doiError = true
          }
        }).catch(err => {
          console.log(err)
          this.doiError = true
          this.$emit('invalid', this.doi)
        })
    }
  }
}
</script>
