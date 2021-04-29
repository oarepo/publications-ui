import Vue from 'vue'
import Component from 'vue-class-component'

@Component
class SearchMixin extends Vue {
  doSearch () {
    this.$emit('search')
  }
}

export { SearchMixin }
