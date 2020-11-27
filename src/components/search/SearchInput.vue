<template lang="pug">
  q-input(
    clearable
    type="search"
    clear-icon="clear"
    dark
    hide-bottom-space
    standout
    square
    input-class="full-height"
    @clear="query.q = ''"
    @input="doSearch"
    :debounce="1000"
    :placeholder="$t('label.searchInput') + '…'"
    v-model.trim="query"
    @keydown.enter.prevent="doSearch")
    template(v-slot:append)
      q-icon(name="search")
</template>

<script>
import { Component } from 'vue-property-decorator'
import { SearchMixin } from 'src/mixins/SearchMixin'
import { mixins } from 'vue-class-component'
export default @Component({
  name: 'Searchbar',
  props: {
    query: {
      type: String,
      default: ''
    }
  }
})
class Searchbar extends mixins(SearchMixin) {
}
</script>

<style lang="sass" scoped>
</style>
