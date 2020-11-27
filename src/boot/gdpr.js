import { Cookies, openURL } from 'quasar'

// TODO: make this a generic library for oarepo?
const
  TOS = 'https://du.cesnet.cz/en/provozni_pravidla/start',
  PRIVACY_POLICY = 'https://www.cesnet.cz/cesnet/personal-data-protection/?lang=en'

class Gdpr {
  isGdprAccepted () {
    return Cookies.has('gdpr') === true
  }

  showGdprPrompt (app) {
    return new Promise((resolve, reject) => {
      if (this.isGdprAccepted()) {
        resolve()
        return
      }
      app.$q.bottomSheet({
        title: app.$t('section.gdpr'),
        message: app.$t('message.gdprPrompt'),
        dark: true,
        persistent: true,
        icon: 'policy',
        actions: [
          {
            id: 'tos',
            label: app.$t('action.openTOS'),
            size: 'sm',
            icon: 'launch',
            noDismiss: true,
            color: 'grey-3'
          },
          {
            id: 'privacy',
            label: app.$t('action.openPrivacyPolicy'),
            size: 'sm',
            icon: 'launch',
            noDismiss: true,
            color: 'grey-3'
          },
          {
            id: 'accept',
            icon: 'check',
            label: app.$t('action.accept'),
            color: 'yellow'
          },
          {
            id: 'decline',
            icon: 'close',
            label: app.$t('action.decline'),
            color: 'red'
          }
        ]
      }).onOk((action) => {
        switch (action.id) {
          case 'accept':
            Cookies.set('gdpr', 'true', { expires: 5 * 365 })
            resolve()
            break
          case 'decline':
            reject()
            break
          case 'tos':
            console.log('tos')
            openURL(TOS)
            break
          case 'privacy':
            openURL(PRIVACY_POLICY)
            break
        }
      }).onCancel(() => reject())
        .onDismiss(() => reject())
    })
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$gdpr = new Gdpr()
}
