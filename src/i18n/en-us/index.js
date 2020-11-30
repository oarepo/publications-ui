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
    searchInput: 'Search by title',
    localeSwitcher: 'Language',
    role: {
      admin: 'admin',
      curator: 'curator'
    }
  },
  section: {
    datasetList: 'Datasets',
    loginRequired: 'Authentication required',
    gdpr: 'Terms of Service Consent',
    error: 'Error',
    roles: 'Roles'
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
  }
}
