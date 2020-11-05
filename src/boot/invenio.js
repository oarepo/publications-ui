import InvenioApi, { FacetMode } from '@oarepo/invenio-api-vuex'

export default ({ Vue, store }) => {
  Vue.use(InvenioApi, {
    store,
    facetMode: FacetMode.SELECTED_FACETS,
    language: 'cs',
    defaultListRecordPreprocessors: record => {
      if (record.links.self.indexOf('draft') > 0) {
        record.links.ui = {
          name: 'draft-datasets/record',
          params: { recordId: record.id }
        }
      } else {
        record.links.ui = {
          name: 'datasets/record',
          params: { recordId: record.id }
        }
      }
      return record
    }
  })
}
