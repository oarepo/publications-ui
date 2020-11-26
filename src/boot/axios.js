import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios

  axios.defaults.headers.common['Content-Type'] = 'application/json'
  axios.defaults.xsrfCookieName = 'csrftoken'
  axios.defaults.xsrfHeaderName = 'X-CSRFToken'
  axios.defaults.withCredentials = true
}

export { axios }
