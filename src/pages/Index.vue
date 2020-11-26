<template lang="pug">
  q-page.full-height
    .title__stripe.row.justify-center
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Index',
  components: {}
})
class Index extends Vue {
}
</script>
<style lang="sass">

.title
  &__stripe
    background-image: linear-gradient(to bottom, $secondary 60%, transparent 60%, transparent 100%)
    padding-top: 2.2rem

  &__arrow
    font-size: 10rem
    transform: scaleX(0.7) scaleY(1.1)

  &__headline
    transform: scaleY(1.2)
    letter-spacing: -.1rem
    line-height: 4.5rem

.mosaic
  &__arrow
    transform: rotate(90deg) scale(2) scaleX(0.7)

  &__image
    filter: sepia(0.4)
</style>
