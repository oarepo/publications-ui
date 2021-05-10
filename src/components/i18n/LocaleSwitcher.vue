<template lang="pug">
q-select.full-width(
  menu-anchor="bottom left"
  filled
  square
  icon="flag"
  v-model="lang"
  :options="langOptions"
  :label="$t('label.localeSwitcher')"
  :option-label="opt => Object(opt) === opt ? $t(opt.label) : ''"
  dense
  options-cover
  emit-value
  map-options
  options-dense
)
</template>
<script>
import {defineComponent} from 'vue'

export default defineComponent({
  data () {
    return {
      lang: this.$i18n.locale,
      langOptions: [
        { value: 'en-us', label: 'value.lang.enUS' },
        { value: 'cs-cz', label: 'value.lang.csCZ' }
      ]
    }
  },
  watch: {
    lang (lang) {
      this.$i18n.locale = lang
    }
  }
})
</script>
