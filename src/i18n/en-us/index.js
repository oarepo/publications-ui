import { productName } from '../../../package.json'

export default {
  app: {
    productName: productName,
    description: productName,
    copyright: '©  2020 CESNET'
  },
  nav: {
    admin: 'Administration',
    detail: 'Detail'
  },
  error: {
    popupLoginFail: 'We were unable to log you in, please allow pop-ups for this website.',
    validationFail: 'Please correct the errors and try again',
    validation: {
      required: 'This field is required',
      minLength: 'Must be at least {min} characters long'
    }
  },
  action: {
    attachArticle: 'Attach Article',
    submitDataset: 'Submit dataset record',
    addIdentifier: 'Přidat identifikátor',
    retry: 'Retry',
    close: 'Close',
    login: 'Log In',
    altLogin: 'Try alternative Log In',
    logout: 'Log Out',
    openTOS: 'Terms of service',
    openPrivacyPolicy: 'Privacy policy',
    accept: 'Accept',
    decline: 'Decline',
    uploadDataset: 'Upload'
  },
  accessibility: {},
  label: {
    createdAt: 'Created',
    identifierScheme: 'Scheme',
    searchInput: 'Search by title',
    localeSwitcher: 'Language',
    language: 'Language',
    datasetBasicInfo: 'Basic Info',
    titles: 'Titles',
    documentType: 'Document type',
    datasets: 'Datasets',
    role: {
      admin: 'admin',
      curator: 'curator'
    }
  },
  section: {
    datasetList: 'Datasets',
    addFiles: 'Add files',
    datasetDetail: 'Dataset Detail',
    datasetUpload: 'Dataset Upload',
    identifiers: 'Additional Identifiers',
    license: 'License',
    files: 'Attachments',
    size: 'Size',
    loginRequired: 'Authentication required',
    gdpr: 'Terms of Service Consent',
    error: 'Error',
    roles: 'Roles',
    articleList: 'Articles'
  },
  message: {
    noData: 'No data',
    gdprPrompt: 'By clicking on "Accept", you give your consent with our Terms of Service and Privacy Policy for this service.',
    authRequired: 'This page requires authentication.'
  },
  value: {
    lang: {
      csCZ: 'Czech',
      enUS: 'English'
    }
  },
  route: {
    title: {
      datasetList: 'Datasets',
      datasetEdit: 'Edit Dataset',
      datasetUpload: 'Upload dataset',
      datasetDetail: 'Dataset',
      admin: 'Administration',
      articleList: 'Articles'
    }
  }
}
