import * as Sentry from '@sentry/vue'
import { Integrations } from '@sentry/tracing'

export default ({ Vue }) => {
  if (process.env.PROD) {
    Sentry.init({
      Vue,
      release: `publications-ui@${process.env.PACKAGE_VERSION}`,
      environment: process.env.PROD ? 'prod' : 'devel',
      dsn: process.env.VUE_SENTRY_DSN,
      integrations: [new Integrations.BrowserTracing()],
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      beforeSend (event, hint) {
        // Check if it is an exception, and if so, show the report dialog
        if (event.exception) {
          Sentry.showReportDialog({
            title: 'Něco se pokazilo :-(',
            labelClose: 'Zavřít',
            eventId: event.event_id,
            user: {
              email: Vue.prototype.$auth.state.userInfo.email
            }
          })
        }
        return event
      }
    })
  }
}
