<template lang="pug">
  .saving.relative-position
    div.relative-top-left(:style="{opacity: (saving || saved) ? 0.0 : 1, transition: 'opacity .2s'}")
      slot
    transition(name='fade')
      div.absolute-top-left.full-width.full-height(v-show="saving")
        q-inner-loading.bg-transparent(showing)
          q-spinner-gears(size="50px" color="primary")
    transition(name='fade')
      div.absolute-top-left.full-width.full-height(v-show="saved")
        slot(name="saved")

</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'SavingSupport',
  props: {
    saving: {
      type: Boolean
    },
    saved: {
      type: Boolean
    }
  }
})
class SavingSupport extends Vue {
}
</script>
