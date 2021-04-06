import PopupLogin from '@oarepo/vue-popup-login'

export default ({ Vue, router }) => {
  Vue.use(PopupLogin, {
    router,

    // urls
    loginUrl: '/oauth/login/eduid/',
    logoutUrl: '/logout',
    logoutMethod: 'POST',
    completeUrl: '/oauth/complete/',
    stateUrl: '/oauth/state/'
  })
}
