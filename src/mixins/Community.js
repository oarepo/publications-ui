import { Component, Vue } from 'vue-property-decorator'

@Component
class CommunityMixin extends Vue {
  get communityId () {
    return this.$route.meta.communityId || ''
  }
}

export { CommunityMixin }
