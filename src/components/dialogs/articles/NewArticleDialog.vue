<template lang="pug">
q-dialog(ref='dialog' @hide='onDialogHide')
  q-card.q-dialog-plugin
    q-card-section.bg-primary.text-white
      .text-h3 Attach Article
    q-card-section
      q-stepper(v-model="step" flat)
        q-step(name="1" title="Import from DOI" :done="step > 1")
          // i.fas.fa-minus-circle(@click='remove(k)' v-show='k || ( !k && inputs.length > 1)')
          // i.fas.fa-plus-circle(@click='add(k)' v-show='k == inputs.length-1')
          doi-input(v-model="article.doi" ref="doi") // podle toho co je v ref pak na to odkazuju dole v metodach a btw to doi-input je nazev komponenty z components
        q-step(name="2" title="Details" :done="step > 2")
          q-input(v-model="article.title_lang" label="Title language")
          q-input(v-model="article.title[this.article.title_lang]" label="Title value")
          q-input(v-model="article.abstract_lang" label="Abstract language")
          q-input(v-model="article.abstract[this.article.abstract_lang]" label="Abstract value" type="textarea")
          .text Authors
          q-card-section(v-for='(input,k) in authors_inputs' :key='k')
            q-input(type='text' label="Author" :label='String(k + 1)' v-model='input.fullname')
          q-btn( label='Add author' @click='add(k)')
          q-btn( label='Remove author' @click='remove(k)' v-show='authors_inputs.length > 1')
          // q-input(v-model="article.authors" label= "Authors")
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
      author_label: 'Author', // blbost, napsat lidsky
      validatingDOI: false,
      article: {
        doi: '',
        title_lang: '',
        abstract_lang: '',
        title: '',
        abstract: ''
      },
      authors_inputs: [{ fullname: '' }]
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
      this.authors_inputs.push({ fullname: '' })
    },

    remove (index) {
      var lastValue = this.authors_inputs.length - (index + 1)
      this.authors_inputs.splice(lastValue, 1)
    },

    async next () {
      this.validatingDOI = true
      try {
        console.log(this.$refs.doi.doi)
        const article = await this.$refs.doi.validate()
        if (article) {
          this.article = article
          this.article.title_lang = Object.keys(article.title)[0]
          this.article.abstract_lang = Object.keys(article.abstract)[0]

          for (var i = 0; i < article.authors.length; i++) {
            if (i === 0) {
              this.authors_inputs[0].fullname = article.authors[0].full_name
            } else {
              this.authors_inputs.push({ fullname: article.authors[i].full_name })
            }
          }

          // console.log(article.title.titleLang)
          // this.article.title_value = article.title.titleLang
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
    createArticle () {

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
