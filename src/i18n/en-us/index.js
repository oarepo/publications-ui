import { productName } from '../../../package.json'

export default {
  app: {
    productName: productName,
    description: productName,
    copyrightNotice: 'This service is a part of CESNET e-infrastructure',
    copyright: '©  2020 CESNET a. l. e., Zikova 4, 160 00 Praha 6, Czech Republic'
  },
  icon: {
    request_approval: 'rule',
    approve: 'verified',
    request_changes: 'healing'
  },
  nav: {
    admin: 'Administration',
    detail: 'Detail'
  },
  error: {
    completeSuccess: 'Completed successfully',
    stateChangeFail: 'State change failed',
    stateChangeMessage: 'There was a following error when trying to change the record state',
    popupLoginFail: 'We were unable to log you in, please allow pop-ups for this website.',
    validationFail: 'Please correct the errors and try again',
    validation: {
      required: 'This field is required',
      minLength: 'Must be at least {min} characters long'
    }
  },
  action: {
    approve: 'approve record',
    request_approval: 'request record approval',
    request_changes: 'request changes',
    makeTransition: 'Change state',
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
    upload: 'Upload',
    uploadDataset: 'Upload new dataset',
    uploadArticle: 'Upload new article'

  },
  accessibility: {},
  label: {
    actionApprove: 'Are you sure?',
    createdAt: 'Created',
    identifierScheme: 'Scheme',
    searchInput: 'Search by title',
    localeSwitcher: 'Language',
    language: 'Language',
    datasetBasicInfo: 'Basic Info',
    titles: 'Titles',
    documentType: 'Document type',
    datasets: 'Datasets',
    contact: 'Contact Us',
    filters: 'Filters',
    community: 'Community',
    privacy: 'Privacy Policy',
    docs: 'User Documentation',
    role: {
      admin: 'admin',
      curator: 'curator'
    }
  },
  section: {
    articleList: 'Articles',
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
    roles: 'Roles'
  },
  message: {
    doYRlyWnt: 'Do you really want to',
    noData: 'No data',
    recordNotValid: 'Record is not valid',
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
      articleUpload: 'Upload article',
      datasetDetail: 'Dataset',
      admin: 'Administration',
      articleList: 'Articles'
    }
  }
}
