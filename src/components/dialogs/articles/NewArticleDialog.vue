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
          q-input(v-model="article.title_lang" label="Title language *" :error="titleLangError" error-message="Wrong language format" @input="titleLangError=false")
          q-input(v-model="article.title_val" label="Title value *" :error="titleError" error-message="Title can't be empty" @input="titleError=false")
          q-input(v-model="article.abstract_lang" label="Abstract language" :error="abstractLangError" error-message="Wrong language format" @input="abstractLangError=false")
          q-input(v-model="article.abstract_val" label="Abstract value" :error="abstractError" error-message="Abstract can't be empty, if abstract language is filled" @input="abstractError=false" type="textarea")
          q-input(v-model="article.document_type" label="Document type *" :error="doctypeError" error-message="Document type can't be empty" @input="doctypeError=false")
          q-input(v-model="article.publication_year" type="number" label="Publication year *" :error="yearError" error-message="Publication year is required and must be valid year" @input="yearError=false")
          .text Authors *
          q-card-section(v-for='(input,k) in authors_inputs' :key='k' )
            q-input(type='text' label="Author" :label='String(k + 1)' v-model='input.full_name' :error="authorError[k]" error-message="Authors name can't be empty" @input="authorError[k]=false")
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
      q-btn(color='primary' label='Create article' @click='createArticle')

</template>

<script>
import DOIInput from 'components/inputs/DOIInput'
import axios from 'axios'
import DatasetDraftDetail from 'pages/datasets/DatasetDraftDetail'

export default {
  props: {
    // ...your custom props
  },
  components: {
    'doi-input': DOIInput,
    DatasetDraftDetail
  },
  data () {
    return {
      k: 0,
      step: '1',
      validatingDOI: false,
      authorError: [false],
      generated_article: {},
      article: {
        doi: '',
        title_lang: '',
        abstract_lang: '',
        abstract_val: '',
        title_val: '',
        document_type: '',
        publication_year: ''
      },
      authors_inputs: [{ full_name: '' }],
      titleError: false,
      titleLangError: false,
      abstractError: false,
      abstractLangError: false,
      doctypeError: false,
      yearError: false,
      communityId: this.$route.meta.communityId

    }
  },

  methods: {
    validate () {
      for (var k = 0; k < this.authors_inputs.length; k++) {
        if (this.authors_inputs[k].full_name === '') {
          this.authorError[k] = true
        }
      }
      if (this.article.title_val === '') {
        this.titleError = true
      }
      if (this.article.document_type === '') {
        this.doctypeError = true
      }
      const langRegex = /^([a-z][a-z])$|^([a-z][a-z]-[a-z][a-z])$|^_$/

      if (this.article.title_lang === '' || !(this.article.title_lang.match(langRegex))) {
        this.titleLangError = true
      }
      if ((this.article.abstract_lang === '' && this.article.abstract_val !== '') ||
        (!(this.article.abstract_lang.match(langRegex)) && this.article.abstract_lang !== '')) {
        this.abstractLangError = true
      }
      if (this.article.abstract_lang !== '' && this.article.abstract_val === '') {
        this.abstractError = true
      }
      if (this.article.publication_year === '' || isNaN(this.article.publication_year)) {
        this.yearError = true
      }
    },
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
      this.authorError.push(false)
    },

    remove (index) {
      var lastValue = this.authors_inputs.length - (index + 1)
      this.authors_inputs.splice(lastValue, 1)

      var lastErrorValue = this.authorError.length - (index + 1)
      this.authorError.splice(lastErrorValue, 1)
    },

    async next () {
      this.titleError = false
      this.abstractLangError = false
      this.titleLangError = false
      this.doctypeError = false
      this.abstractError = false
      this.yearError = false
      this.validatingDOI = true
      try {
        const article = await this.$refs.doi.validate()
        if (article) {
          this.generated_article = article
          this.article.document_type = article.document_type
          this.article.publication_year = article.publication_year
          try {
            this.article.abstract_val = article.abstract[Object.keys(article.abstract)[0]]
            this.article.abstract_lang = Object.keys(article.abstract)[0]
          } catch { // abstract is not required
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
              this.authorError.push([false])
            }
          }
          this.step = '2'
        }
      } finally {
        this.validatingDOI = false
      }
    },
    async skipDOI () {
      this.step = '2'
    },
    back () {
      this.step = '1'
    },
    async createArticle () {
      this.titleError = false
      this.abstractLangError = false
      this.titleLangError = false
      this.doctypeError = false
      this.abstractError = false
      this.yearError = false
      for (var k = 0; k < this.authorError.length; k++) {
        this.authorError[k] = false
      }
      this.validate()
      var authorErr = false
      for (k = 0; k < this.authorError.length; k++) {
        if (this.authorError[k] === true) {
          authorErr = true
          break
        }
      }
      if (this.titleError || authorErr || this.titleLangError || this.abstractLangError || this.doctypeError || this.yearError) { // if errors in validation

      } else {
        const datasetUrl = window.location.href
        if (this.article.doi !== '') {
          this.updateArticle() // set changes
          this.updateDatasetArray(this.generated_article, datasetUrl) // set datasets
          const data = (await axios.post(`${this.communityId}/articles/draft/`, this.generated_article)).data
          const articleId = data.metadata.id
          this.$router.replace({ name: `${this.communityId}/draft-article/record`, params: { recordId: articleId } })
        } else {
          const data = (await axios.post(`${this.communityId}/articles/draft/without_doi/`,
            { changes: this.article, authors: this.authors_inputs, datasetUrl: datasetUrl })).data
          const articleId = data.metadata.id
          this.$router.replace({ name: `${this.communityId}/draft-article/record`, params: { recordId: articleId } })
        }
        this.hide()
      }
    },
    updateDatasetArray (article, datasetUrl) {
      const datasetsArray = article.datasets
      if (datasetsArray === undefined) {
        article.datasets = [datasetUrl]
      }
    },
    updateArticle () {
      var newAbstract = JSON.parse('{}')
      newAbstract[this.article.abstract_lang] = this.article.abstract_val
      var newTitle = JSON.parse('{}')
      newTitle[this.article.title_lang] = this.article.title_val
      this.generated_article.title = newTitle
      this.generated_article.abstract = newAbstract
      this.generated_article.authors = this.authors_inputs
      this.generated_article.document_type = this.article.document_type
      this.generated_article._primary_community = this.communityId
      this.generated_article.access_right_category = 'success'
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
