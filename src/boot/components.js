import FacetContainer from '@/components/search/facets/FacetContainer'
import MultilingualText from '@/components/i18n/MultilingualText'
import BaseInput from '@/components/widgets/forms/BaseInput'
import BaseSelect from '@/components/widgets/forms/BaseSelect'

export default {
    install (app) {
        app.component('base-input', BaseInput)
        app.component('base-select', BaseSelect)
        app.component('facet-container', FacetContainer)
        app.component('mt', MultilingualText)
    }
}
