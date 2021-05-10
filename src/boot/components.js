import FacetContainer from '@/components/search/facets/FacetContainer'
import MultilingualText from '@/components/i18n/MultilingualText'

export default {
    install (app) {
        app.component('facet-container', FacetContainer)
        app.component('mt', MultilingualText)
    }
}
