// Datasets interface routes
import {collection} from '@oarepo/invenio-vue'

export default [
    collection({
        // ALL dataset records in ALL communities
        path: `:model/:state/`,
        name: 'list',
        component: () => import(/* webpackChunkName: 'collections' */ '@/pages/collections/CollectionList')
    }, {
        meta: {
            query: {
                sort: 'string:alphabetical'
            },
            useFacets: true,
        }
    }),
    collection({
        // ALL dataset records in SPECIFIC community
        path: ':communityId/:model/:state/',
        name: 'community-list',
        component: () => import(/* webpackChunkName: 'collections' */ '@/pages/collections/CollectionList')
    }, {
        meta: {
            query: {
                sort: 'string:alphabetical'
            },
            useFacets: true,
        }
    })
]
