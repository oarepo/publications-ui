import {ref} from 'vue'

export default function useUploader() {
    function getCookie(name) {
        const nameEQ = name + '='
        const ca = document.cookie.split(';')
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i]
            while (c.charAt(0) === ' ') c = c.substring(1, c.length)
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
        }
        return null
    }

    // TODO: bump to something higher after we fix the single-part uploads
    const multipartTreshold = ref(0)
    const concurrency = ref(10)

    const uploaderHeaders = ref([
        // TODO: check if this is necessary
        {
            name: 'Access-Control-Allow-Origin',
            value: '*'
        },
        {
            name: 'X-CSRFToken',
            value: getCookie('csrftoken')
        }
    ])

    return {getCookie, uploaderHeaders, concurrency, multipartTreshold}
}
