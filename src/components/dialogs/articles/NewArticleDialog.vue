<template lang="pug">
q-dialog(ref='dialog' @hide='onDialogHide')
  q-card.q-dialog-plugin
    q-card-section.bg-primary.text-white
      .text-h3 Attach Article
    q-card-section
      q-stepper(v-model="step" flat)
        q-step(name="1" title="Import from DOI" :done="step > 1")
          doi-input(v-model="article.doi" ref="doi")
        q-step(name="2" title="Details" :done="step > 2")
          q-input(v-model="article.title_lang" label="Title language")
          q-input(v-model="article.title_val" label="Title value")
          q-input(v-model="article.abstract_lang" label="Abstract language")
          q-input(v-model="article.abstract_val" label="Abstract value" type="textarea")
          q-input(v-model="article.document_type" label="Document type")
          .text Authors
          q-card-section(v-for='(input,k) in authors_inputs' :key='k')
            q-input(type='text' label="Author" :label='String(k + 1)' v-model='input.full_name')
          q-btn( label='Add author' rounded @click='add(k)')
            q-space
          q-btn( label='Remove author' rounded  @click='remove(k)' v-show='authors_inputs.length > 1')
    q-card-actions(align='right' v-if="step==='1'")
      q-btn(color='grey' flat label='Skip DOI' @click='skipDOI')
      q-space
      q-btn(color='primary' label='Next' @click='next' :loading="validatingDOI" )
    q-card-actions(align='right' v-if="step==='2'")
      q-btn(color='grey' flat label='Back' @click='back')
      q-space
      q-btn(color='primary' label='Create article' @click='createArticle' :loading="validatingDOI" )

</template>

<script>
import DOIInput from 'components/doi_input/DOIInput'
import axios from 'axios'

export default {
  props: {
    // ...your custom props
  },
  components: {
    'doi-input': DOIInput
  },
  data () {
    return {
      k: 0,
      step: '1',
      validatingDOI: false,
      generated_article: {},
      article: {
        doi: '',
        title_lang: '',
        abstract_lang: '',
        abstract_val: '',
        title_val: '',
        document_type: ''
      },
      authors_inputs: [{ full_name: '' }]
    }
  },

  methods: {
    show () {
      this.$refs.dialog.show()
    },

    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    add (index) {
      this.authors_inputs.push({ full_name: '' })
    },

    remove (index) {
      var lastValue = this.authors_inputs.length - (index + 1)
      this.authors_inputs.splice(lastValue, 1)
    },

    async next () {
      this.validatingDOI = true
      try {
        const article = await this.$refs.doi.validate()
        if (article) {
          this.generated_article = article
          this.article.document_type = article.document_type
          try {
            this.article.abstract_val = article.abstract[Object.keys(article.abstract)[0]]
            this.article.abstract_lang = Object.keys(article.abstract)[0]
          } catch { // article is not required
            this.article.abstract_val = ''
            this.article.abstract_lang = '_' // default language value
          }

          this.article.title_val = article.title[Object.keys(article.title)[0]]
          this.article.doi = this.$refs.doi.doi
          this.article.title_lang = Object.keys(article.title)[0]

          for (var i = 0; i < article.authors.length; i++) {
            if (i === 0) {
              this.authors_inputs[0].full_name = article.authors[0].full_name
            } else {
              this.authors_inputs.push({ full_name: article.authors[i].full_name })
            }
          }

          this.step = '2'
        }
      } finally {
        this.validatingDOI = false
      }
    },
    skipDOI () {
      this.step = '2'
    },
    back () {
      this.step = '1'
    },
    async createArticle () {
      var urlEnd = 'create_article'
      const currentUrl = window.location.pathname
      const host = window.location.host
      const dataSetUrl = host + currentUrl
      if (this.article.doi !== '') {
        await axios.post(`/articles/draft/${urlEnd}/`, { changes: this.article, authors: this.authors_inputs, generated_article: this.generated_article })
        const url = (await axios.post(`/articles/draft/document/${this.article.doi}`)).request.responseURL
        const response = (await axios.post(`/articles/draft/document/${this.article.doi}`)).data
        this.updateDatasetArray(response, dataSetUrl, url)
        window.location.href = url

        this.hide()
      } else {
        urlEnd = 'without_doi'
        const resp = (await axios.post(`/articles/draft/${urlEnd}/`, { changes: this.article, authors: this.authors_inputs, generated_article: this.generated_article })).data
        window.location.href = resp.links.self
        this.hide()
      }
    },
    updateDatasetArray (response, dataSetUrl, url) {
      const datasetsArray = response.metadata.datasets

      if (datasetsArray === undefined) {
        axios.patch(url, [{ op: 'add', path: '/datasets', value: [dataSetUrl] }], { headers: { 'Content-Type': 'application/json-patch+json' } })
      } else { axios.patch(url, [{ op: 'add', path: '/datasets/-', value: dataSetUrl }], { headers: { 'Content-Type': 'application/json-patch+json' } }) }
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>
