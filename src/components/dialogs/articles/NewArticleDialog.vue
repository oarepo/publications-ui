<template lang="pug">
q-dialog(ref='dialog' @hide='onDialogHide')
  q-card.q-dialog-plugin
    q-card-section.bg-primary.text-white
      .text-h3 Attach Article
    q-card-section
      q-stepper(v-model="step" flat)
        q-step(name="1" title="Import from DOI" :done="step > 1")
          doi-input(v-model="article.doi" ref="doi") // podle toho co je v ref pak na to odkazuju dole v metodach a btw to doi-input je nazev komponenty z components
        q-step(name="2" title="Details" :done="step > 2")
          q-input(v-model="article.title" label="Title")
          q-input(v-model="article.abstract" label="Abstract")
    //
      ...content
      ... use q-card-section for it?
    // buttons example
    q-card-actions(align='right' v-if="step==='1'")
      q-btn(color='grey' flat label='Skip DOI' @click='skipDOI')
      q-space
      q-btn(color='primary' label='Next' @click='next' :loading="validatingDOI")
    q-card-actions(align='right' v-if="step==='2'")
      q-btn(color='primary' label='Submit' @click='onOKClick')
</template>

<script>
import DOIInput from 'components/inputs/DOIInput'

export default {
  props: {

    // ...your custom props
  },
  components: {
    'doi-input': DOIInput
  },
  data () {
    return {
      step: '1',
      validatingDOI: false,
      article: {
        doi: '',
        title: '',
        abstract: ''
      }
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
    async next () {
      this.validatingDOI = true
      try {
        const article = await this.$refs.doi.validate()
        if (article) {
          this.article = article
          this.step = '2'
        }
      } finally {
        this.validatingDOI = false
      }
    },
    skipDOI () {
      this.step = '2'
    },
    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok', this.article)
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
