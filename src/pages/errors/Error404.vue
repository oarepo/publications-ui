<template lang="pug">
.fullscreen.bg-accent.text-white.text-center.q-pa-md.flex.flex-center
  div
    div(style="font-size: 30vh") 404
    .text-h2(style="opacity:.4") Oops. Nothing here...
    go-home-btn
</template>

<script>
import GoHomeBtn from '@/components/widgets/GoHomeBtn'

export default {
  name: 'Error404',
  components: {GoHomeBtn}
}
</script>
