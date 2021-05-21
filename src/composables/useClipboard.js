import {copyToClipboard} from 'quasar'
import useNotify from '@/composables/useNotify'

export default function useClipboard() {
    function copy2clip(data) {
        const {notifySuccess} = useNotify()

        copyToClipboard(JSON.stringify(data, null, 4))
            .then(() => {
                notifySuccess('message.copiedToClip')
            })
    }

    return {copy2clip}
}
