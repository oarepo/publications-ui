import FacetContainer from '@/components/search/facets/FacetContainer'
import MultilingualText from '@/components/i18n/MultilingualText'
import BaseInput from '@/components/widgets/forms/BaseInput'
import BaseSelect from '@/components/widgets/forms/BaseSelect'
import MultilingualInput from '@/components/widgets/forms/MultilingualInput'
import LocaleSelect from '@/components/widgets/forms/LocaleSelect'
import MultilingualEditor from '@/components/widgets/forms/MultilingualEditor'
import ChipsSelect from '@/components/widgets/forms/ChipsSelect'
import MultilingualEditorList from '@/components/widgets/forms/MultilingualEditorList'
import SchemaSelect from '@/components/widgets/forms/SchemaSelect'
import IdentifierInput from '@/components/widgets/forms/IdentifierInput'
import IdentifierInputList from '@/components/widgets/forms/IdentifierInputList'

export default {
    install (app) {
        app.component('base-input', BaseInput)
        app.component('identifier-input', IdentifierInput)
        app.component('identifier-input-list', IdentifierInputList)
        app.component('multilingual-input', MultilingualInput)
        app.component('multilingual-editor', MultilingualEditor)
        app.component('multilingual-editor-list', MultilingualEditorList)
        app.component('locale-select', LocaleSelect)
        app.component('chips-select', ChipsSelect)
        app.component('base-select', BaseSelect)
        app.component('schema-select', SchemaSelect)
        app.component('facet-container', FacetContainer)
        app.component('mt', MultilingualText)
    }
}
