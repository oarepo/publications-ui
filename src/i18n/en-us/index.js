import { productName } from '@/../package.json'

export default {
  app: {
    productName: productName,
    description: productName,
    copyrightNotice: 'This service is a part of CESNET e-infrastructure',
    copyright: '©  2021 CESNET a. l. e., Zikova 4, 160 00 Praha 6, Czech Republic'
  },
  icon: {
    delete_draft: 'delete_forever',
    revert_approval: 'assignment_return',
    make_public: 'public',
    make_private: 'public_off',
    request_approval: 'rule',
    approve: 'verified',
    request_changes: 'healing'
  },
  nav: {
    intro: '',
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
    delete_draft: 'delete draft record',
    make_private: 'unpublish record',
    make_public: 'publish record',
    approve: 'approve record',
    request_approval: 'request record approval',
    revert_approval: 'revert record approval',
    request_changes: 'request changes',
    makeTransition: 'Change state',
    attachArticle: 'Attach Article',
    submitDataset: 'Submit dataset record',
    addIdentifier: 'Přidat identifikátor',
    addAuthor: 'Add author',
    removeAuthor: 'Remove author',
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
    goHome: 'Back to Homepage',
    back: 'Back',
    authors: 'Authors',
    isPublic: 'Record is public',
    isPendingApproval: 'Record is awaiting curator approval',
    isEdited: 'Record is being edited',
    actionApprove: 'Are you sure?',
    createdAt: 'Created',
    createArticle: 'Create article',
    identifierScheme: 'Scheme',
    searchInput: 'Search by title',
    localeSwitcher: 'Language',
    language: 'Language',
    datasetBasicInfo: 'Basic Info',
    skipDOI: 'Skip Import',
    importFromDOI: 'Import from DOI',
    articleMetadata: 'Article metadata',
    enterArticleDOI: 'Enter article DOI',
    titles: 'Titles',
    documentType: 'Document type',
    datasets: 'Datasets',
    contact: 'Contact Us',
    filters: 'Filters',
    community: 'Community',
    privacy: 'Privacy Policy',
    docs: 'User Documentation',
    role: {
      'system administrator': 'System administrator',
      admin: 'admin',
      curator: 'curator'
    }
  },
  section: {
    articleExistsError: 'Found article with DOI',
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
    notFound: 'Oops. Nothing here',
    errorCreatingArticle: 'There was an error when creating the article',
    articleExistsError: 'An article record with this DOI already exists in this repository.' +
      'Would you like to attach the dataset to this article?',
    creatingArticle: 'Creating article',
    loadingMetadata: 'Loading metadata',
    copiedToClip: 'Copied to clipboard',
    resolveDOIError: 'DOI could not be resolved',
    draftDeleted: 'Draft record was deleted',
    doYRlyWnt: 'Do you really want to',
    noArticles: 'No articles found',
    noDatasets: 'No datasets found',
    noData: 'No data',
    loading: 'Loading',
    loggedOut: 'You have been logged out',
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
