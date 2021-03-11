<template lang="pug">
  q-page.hero.full-height.no-padding.row.overflow-hidden
    .hero-content.text-white.col-12.col-md-7.q-pa-xl
      .column
        h2.col-auto.lt-md.text-bold {{ $t('app.productName') }}
        h1.col-auto.gt-sm.q-px-md-xl.q-mr-xl.text-bold.text-left {{ $t('app.productName') }}
        .text-cesnet.text-bold.text-warning.row.justify-center.justify-md-start.items-center.q-px-md-xl.q-mr-xl.q-gutter-sm.q-mb-lg
          q-icon.col-auto(size="2rem" name="alternate_email")
          p.col-auto.inline-block.q-pt-md CESNET
        q-space
        q-btn-group.col-auto(rounded).q-mt-lg.text-bold.q-mx-md-xl.q-mr-md-xl
          q-btn.full-width.no-box-shadow(
            color="dark"
            rounded
            icon="leaderboard"
            padding="lg"
            :to="{name: 'publications/all-datasets'}"
            :label="$t('section.datasetList')")
          q-btn.full-width.no-box-shadow(
            color="primary"
            rounded
            icon-right="article"
            padding="lg"
            :to="{name: 'all-articles'}"
            :label="$t('section.articleList')")
    .col-0.hero-tiles.gt-sm.q-pt-xl
    .col-5.right-graphic.gt-sm
    .col-0.right-tiles.gt-sm

</template>
<script>
import { Component, Vue } from 'vue-property-decorator'

export default @Component({
  name: 'Homepage',
  components: {
  }
})
class Homepage extends Vue {
}
</script>
<style lang="sass">
.hero
  height: 90vh

  .hero-content
    background: lighten($primary, 5%)
    text-align: center

    h3
      line-height: 4rem

    .text-cesnet
      p
        font-size: 2rem

  .hero-tiles::before
    content: ""
    position: absolute
    width: 550px
    height: 100%
    z-index: 1
    filter: drop-shadow(30px 10px 30px $dark)
    transform: translateX(-46%)
    background: url('../assets/landing/center-tiles.png') no-repeat
    background-size: contain

  .hero-tiles
    position: relative
    background-color: transparent

  .right-graphic::before
    content: ""
    background: url('../assets/landing/right-bg.png') no-repeat
    background-size: cover
    position: absolute
    width: 100%
    height: 100%
    z-index: 0

  .right-graphic
    position: relative
    background-color: transparent

  .right-tiles::before
    content: ""
    position: absolute
    height: 100%
    width: 314px
    opacity: .8
    z-index: 1
    background: url('../assets/landing/right-tiles.png') no-repeat
    background-size: contain
    transform: translateX(-50%) translateY(-15%)
  .right-tiles
    position: relative
    background-color: transparent
</style>
