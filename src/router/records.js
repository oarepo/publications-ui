import {record} from '@oarepo/invenio-vue'

export default {
    path: '',
    component: () => import(/* webpackChunkName: 'layouts' */ '@/layouts/RecordLayout'),
    children: [
        record({
            // Record Detail route
            path: `:communityId/:model/:state/:recordId`,
            name: 'detail',
            component: () => import(/* webpackChunkName: 'collections' */ '@/pages/records/RecordDetail')
        }, {
            meta: {
                useFacets: false,
            }
        })
    ]
}
