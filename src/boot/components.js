import FacetContainer from '@/components/search/facets/FacetContainer'
import MultilingualText from '@/components/i18n/MultilingualText'
import BaseInput from '@/components/widgets/forms/BaseInput'
import BaseSelect from '@/components/widgets/forms/BaseSelect'
import MultilingualInput from '@/components/widgets/forms/MultilingualInput'
import LocaleSelect from '@/components/widgets/forms/LocaleSelect'
import MultilingualEditor from '@/components/widgets/forms/MultilingualEditor'
import ChipsSelect from '@/components/widgets/forms/ChipsSelect'
import MultilingualEditorList from '@/components/widgets/forms/MultilingualEditorList'

export default {
    install (app) {
        app.component('base-input', BaseInput)
        app.component('multilingual-input', MultilingualInput)
        app.component('multilingual-editor', MultilingualEditor)
        app.component('multilingual-editor-list', MultilingualEditorList)
        app.component('locale-select', LocaleSelect)
        app.component('chips-select', ChipsSelect)
        app.component('base-select', BaseSelect)
        app.component('facet-container', FacetContainer)
        app.component('mt', MultilingualText)
    }
}
