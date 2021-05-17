import {useQuasar} from 'quasar'
import {useI18n} from 'vue-i18n/index'

export default function useNotify() {
    const $q = useQuasar()
    const {t} = useI18n()

    function notifyError (msg) {
        $q.notify({message: t(msg), color: 'negative'})
    }

    return {notifyError}
}
