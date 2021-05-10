<template lang="pug">
q-select.full-width(
  menu-anchor="bottom left"
  filled
  square
  icon="flag"
  v-model="$i18n.locale"
  :options="$i18n.availableLocales"
  :label="$t('label.localeSwitcher')"
  :option-label="opt => $t(`value.lang.${opt}`)"
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
  name: 'LocaleSwitcher'
})
</script>
