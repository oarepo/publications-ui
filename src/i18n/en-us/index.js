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
    validationFail: 'Please correct the errors and try again',
    validation: {
      required: 'This field is required',
      minLength: 'Must be at least {min} characters long'
    }
  },
  action: {
    close: 'Close',
    login: 'Log In',
    logout: 'Log Out'
  },
  accessibility: {},
  label: {
    role: {
      admin: 'administrator',
      curator: 'curator'
    }
  },
  section: {
    roles: 'Roles'
  },
  message: {},
  input: {}
}
