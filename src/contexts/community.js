import {defineContext} from 'vue-context-composition'
import {computed, ref, watch, readonly} from 'vue'
import {useRoute, useRouter} from 'vue-router'
import {useHttp} from '@oarepo/invenio-vue'

export const community = defineContext(() => {
    const route = useRoute()
    const router = useRouter()
    const communities = ref(null)
    const http = useHttp(
        '/communities/',
        '',
        {loadInitial: true, method: 'get'})

    watch(http.data, () => {
        communities.value = (http.data.value || []).map(
            (community) => {
                if (!community.links?.ui && community.links?.self) {
                    community.links.ui = new URL(community.links.self).pathname
                }
                return community
            })
    })

    function loadCommunities() {
        http.load()
    }

    function setCommunity(communityId) {
        let routeParams = {
            model: route.params.model,
            state: route.params.state
        }

        if (communityId) {
            return router.push({
                name: 'community-list',
                params: {
                    communityId: communityId,
                    ...routeParams
                }
            })
        }

        return router.push({name: 'list', params: routeParams})
    }

    const communityId = computed(() => {
        return route.params.communityId
    })

    const currentCommunity = computed(() => {
        return communities.value?.find((c) => c.id === communityId.value)
    })

    return {
        loadCommunities,
        setCommunity,
        communities: readonly(communities),
        communityId: readonly(communityId),
        currentCommunity: readonly(currentCommunity),
        communitiesLoading: readonly(http.loading)
    }
})
