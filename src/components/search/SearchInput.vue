<template lang="pug">
  q-input.search(
    clearable
    type="search"
    clear-icon="clear"
    dark
    hide-bottom-space
    standout
    square
    input-class="full-height search__input"
    @clear="query.q = ''"
    @input="doSearch"
    :debounce="1000"
    :placeholder="$t('label.searchInput') + '…'"
    v-model.trim="query"
    @keydown.enter.prevent="doSearch")
    template(v-slot:append)
      q-icon(v-if="query === ''" name="search")
</template>

<script>
import { Component, Emit, Vue } from 'vue-property-decorator'
export default @Component({
  name: 'Searchbar'
})
class SearchInput extends Vue {
  query = ''

  @Emit('search')
  doSearch () {
    console.debug('search query', this.query)
    if (this.$route.name !== 'publications/all-datasets') {
      this.$router.push({ name: 'publications/all-datasets' })
    }
    this.$query.q = this.query
    this.$query.page = 1
    return this.query
  }

  mounted () {
    this.query = this.$query.q || ''
  }
}
</script>

<style lang="sass" scoped>
.search
  &__input
    padding-left: 1rem
</style>
