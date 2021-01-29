<template lang="pug">
  q-page.full-height.flex.flex-center
    FormulateForm(
      v-model="values"
      :schema="formSchema")
    .row.full-width.justify-center.q-mt-xl
      .col-11
        .text-h5 DEBUG: form values
        pre.q-pa-md.bg-dark.text-white {{ values }}
</template>
<script>
import { Component, Vue } from 'vue-property-decorator'
import OARepoUploader from '@oarepo/quasar-uploader'

const ID_SCHEMES = {
  doi: 'DOI'
}

const LANG_CODES = {
  cs: 'Czech',
  en: 'English',
  _: 'Unknown'
}

const PERSON_TYPES = {
  personal: 'Person',
  organization: 'Organisation'
}

const PERSON_ROLES = {
  editor: 'Editor',
  curator: 'Data Curator',
  manager: 'Data Manager',
  project: 'Project Manager'
}

const PERSON_ID_SCHEMES = {
  orcid: 'ORCID'
}

export default @Component({
  name: 'DatasetUpload',
  components: {
    'oarepo-uploader': OARepoUploader
  }
})
class DatasetUpload extends Vue {
  values = {}

  personsScheme (name = 'creators') {
    let groupLabel, addLabel = ''
    if (name) {
      groupLabel = 'label.creators'
      addLabel = 'action.addCreator'
    }

    return {
      type: 'group',
      name: name,
      label: this.$t(groupLabel),
      repeatable: true,
      addLabel: `+ ${this.$t(addLabel)}`,
      children: [
        {
          component: 'div',
          class: 'row q-gutter-sm',
          children: [{
            type: 'select',
            class: 'col-auto',
            name: 'type',
            label: this.$t('label.type'),
            validation: 'required',
            value: 'personal',
            options: PERSON_TYPES
          },
          { name: 'family_name', label: this.$t('label.familyName'), class: 'col-auto' },
          { name: 'given_name', label: this.$t('label.givenName'), class: 'col-auto' },
          {
            name: 'role',
            type: 'select',
            label: this.$t('label.personRole'),
            class: 'col-auto',
            value: '',
            options: PERSON_ROLES
          },
          {
            name: 'identifiers',
            type: 'group',
            repeatable: true,
            class: 'self-center col-auto',
            addLabel: `+ ${this.$t('action.addIdentifier')}`,
            label: this.$t('label.identifiers'),
            children: [
              {
                type: 'select',
                class: 'col-auto',
                name: 'scheme',
                label: this.$t('label.scheme'),
                validation: 'required',
                value: 'orcid',
                options: PERSON_ID_SCHEMES
              },
              { name: 'identifier', label: this.$t('label.identifier'), class: 'col-auto' }
            ]
          },
          {
            name: 'affiliations',
            type: 'group',
            repeatable: true,
            addLabel: `+ ${this.$t('action.addAffiliation')}`,
            label: this.$t('label.creatorAffiliations'),
            children: [
              { name: 'name', label: this.$t('label.affiliation'), class: 'col-auto' }
            ]
          }]
        }
      ]
    }
  }

  // TODO(alzpeta): implement form validation
  // TODO(alzpeta): check&fix translations
  // Schema docs: https://vueformulate.com/guide/forms/generating-forms/#schemas
  identifiersScheme = {
    type: 'group',
    name: 'identifiers',
    label: this.$t('label.identifiers'),
    repeatable: true,
    addLabel: `+ ${this.$t('action.addIdentifier')}`,
    value: [{}],
    children: [
      {
        component: 'div',
        class: 'row q-gutter-sm',
        children: [{
          class: 'col-auto',
          type: 'select',
          name: 'scheme',
          label: this.$t('label.identifierScheme'),
          value: 'doi',
          options: ID_SCHEMES
        }, { name: 'identifier', class: 'col-auto self-center' }]
      }
    ]
  }

  titlesScheme = {
    type: 'group',
    name: 'titles',
    label: this.$t('label.titles'),
    repeatable: true,
    addLabel: `+ ${this.$t('action.addTitle')}`,
    children: [
      {
        component: 'div',
        class: 'row q-gutter-sm',
        children: [{
          type: 'select',
          class: 'col-auto',
          name: 'lang',
          label: this.$t('label.language'),
          value: 'cs',
          options: LANG_CODES
        }, { name: 'description', class: 'self-center col-grow' }]
      }
    ]
  }

  descriptionsScheme = {
    label: this.$t('label.abstract'),
    type: 'group',
    name: 'abstract',
    children: [
      {
        component: 'div',
        class: 'row q-gutter-sm',
        children: [{
          type: 'select',
          class: 'col-auto',
          name: 'lang',
          label: this.$t('label.language'),
          value: 'cs',
          options: LANG_CODES
        }, { name: 'description', type: 'textarea', class: 'col-grow self-center' }]
      }
    ]
  }

  basicInfoScheme = {
    type: 'group',
    name: 'basicInfo',
    label: this.$t('label.datasetBasicInfo'),
    repeatable: false,
    value: [{}],
    children: [
      this.titlesScheme,
      this.personsScheme(),
      this.descriptionsScheme
    ]
  }

  formSchema = [
    {
      component: 'h3',
      children: this.$t('section.datasetUpload')
    },
    this.identifiersScheme,
    this.basicInfoScheme,
    {
      type: 'file',
      component: 'OARepoUploader',
      name: 'files',
      label: this.$t('label.addFiles')
    },
    {
      type: 'submit',
      label: this.$t('action.submitDataset')
    }
  ]
}
</script>
<style lang="sass">
</style>
