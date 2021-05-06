import {computed} from 'vue'
import {useRoute} from 'vue-router'

export default function useCollection() {
    const route = useRoute()

    const collectionId = computed(() => {
        return route.meta.collectionId || ''
    })

    return {collectionId}
}
