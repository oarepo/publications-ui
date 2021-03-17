<template lang="pug">
q-input(v-model="doi" label="Enter DOI" :error="doiError" error-message="DOI was not found" @input="doiError=false")
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
  mounted () { // to co se zavola uplne na zacatku
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
      const response = (await axios.post('/articles/from-doi/', { doi: this.doi })).data
      if (response.article) {
        this.$emit('input', this.doi)
        return response.article
      } else {
        this.doiError = true
      }
    }
  }
}
</script>
