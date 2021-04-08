import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class CommunityMixin extends Vue {
  get communityId () {
    return this.$route.meta.communityId || ''
  }
}

export { CommunityMixin }
