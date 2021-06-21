import {copyToClipboard} from 'quasar'
import useNotify from '@/composables/useNotify'

export default function useClipboard() {
    const {notifySuccess} = useNotify()

    function copy2clip(data) {
        let content = ''
        if (typeof data === 'string') {
            content = data
        } else {
            content = JSON.stringify(data, null, 4)
        }
        copyToClipboard(content)
            .then(() => {
                notifySuccess('message.copiedToClip')
            })
    }

    return {copy2clip}
}
