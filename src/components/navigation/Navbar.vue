<template lang="pug">
  q-header.row.z-top.no-wrap.navbar__header
    q-toolbar.q-pl-xl.col-grow.no-padding
      q-btn.on-right(
        flat
        rounded
        dense
        v-go-back.single
        color="white"
        icon="arrow_back"
      )
      q-btn.q-mx-md(
        v-if="$route.meta.useFacets"
        flat
        @click="facets"
        round
        dense
        icon="menu")
      .col-1(v-else)
      q-btn(
        v-if="mode !== modes.LIST"
        flat
        rounded
        dense
        v-go-back.single
        color="white"
        icon="arrow_back")
      q-btn(stretch flat :to="{ name: 'all-datasets' }")
        img.navbar__logo.col-auto(
          src="logos/datacare_White.svg")
      q-toolbar-title.q-py-md.text-uppercase.text-weight-bold {{ productName }}
      search-input.col-grow(@search="doSearch")
      q-btn(
        stretch
        flat
        icon="cloud_upload"
        :to="{ name: 'draft-publications/datasets/upload' }"
        :label="$t('action.uploadDataset')")
      router-link(to="/articles") Art
      router-link(to="/datasets") Dat
    q-toolbar.col-auto
      q-space.q-ml-xl
      account-dropdown(:authenticated="authenticated")
</template>

<script>
import { Component, Emit, Mixins } from 'vue-property-decorator'
import AccountDropdown from 'components/account/AccountDropdown'
import SearchInput from 'components/search/SearchInput'
import { SearchMixin } from 'src/mixins/SearchMixin'
import { AuthStateMixin } from 'src/mixins/AuthStateMixin'

export const Modes = Object.freeze({ INTRO: 'intro', LIST: 'list', DETAIL: 'detail' })

export default @Component({
  name: 'Navbar',
  props: {
    mode: {
      type: String,
      default: Modes.LIST,
      validator: mode => Object.values(Modes).indexOf(mode) > -1
    }
  },
  components: {
    SearchInput,
    AccountDropdown
  }
})
class Navbar extends Mixins(SearchMixin, AuthStateMixin) {
  get modes () {
    return Modes
  }

  get productName () {
    return this.$i18n.t('app.productName')
  }

  @Emit('facets')
  facets () { }
}
</script>

<style lang="sass" scoped>
.navbar
  &__header
    background: linear-gradient(145deg, $primary 11%, $secondary 100%)
  &__logo
    min-height: 50px
    max-height: 50px
</style>
