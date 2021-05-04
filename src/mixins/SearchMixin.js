import { Options, Vue } from 'vue-class-component'

@Options
class SearchMixin extends Vue {
  doSearch () {
    this.$emit('search')
  }
}

export { SearchMixin }
