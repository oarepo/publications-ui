import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'

import Uppy from '@uppy/core'
import AwsS3Multipart from '@uppy/aws-s3-multipart'
import {onBeforeUnmount, ref} from 'vue'
import {useI18n} from 'vue-i18n/index'
import {axios} from '@/boot/axios'

export default function useUploader() {
    const {locale} = useI18n()

    let langPack = null
    if (locale.value === 'cs' || locale.value === 'cs-CZ') {
        langPack = require('@uppy/locales/lib/cs_CZ')
    }
    if (locale.value === 'en' || locale.value === 'en-US') {
        langPack = require('@uppy/locales/lib/en_US')
    }

    function createMultipartUpload(file) {
        console.log('file', file)
        // TODO: test only
        const url = 'https://127.0.0.1:5000/cesnet/datasets/draft/dat-7hvfv-51836/files/?multipart=true'
        const metadata = {}

        Object.keys(file.meta).map(key => {
            if (file.meta[key] != null) {
                metadata[key] = file.meta[key].toString()
            }
        })
        console.log('metadata', metadata)

        return axios.post(url, {
            key: file.name,
            multipart_content_type: file.type,
            size: file.size,
            ...metadata
        }).then((res) => {
            if (res && res.error) {
                const error = new Error(res.message)
                Object.assign(error, res.error)
                throw error
            }
            console.log(res.data.multipart_upload.uploadId, res.data.key)
            return {uploadId: res.data.multipart_upload.upload_id, key: res.data.key}
        })
    }

    const uppy = ref(new Uppy({
        locale: langPack
    }))
    uppy.value.use(AwsS3Multipart, {
        limit: 4,
        companionUrl: 'http://localhost:3020'
        // createMultipartUpload: createMultipartUpload
    })

    onBeforeUnmount(() => {
        uppy.value.close()
    })

    return {uppy, createMultipartUpload}
}
