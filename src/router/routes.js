// import admin from './admin'
// import datasets from './datasets'
// import articles from '@/router/articles'
import {collection} from '@oarepo/invenio-vue'
import {DATASETS_COLLECTION_CODE} from '@/constants'

// Route map (route matched from top to bottom)

// / -> LandingLayout
// |-- . -> Homepage
//
// / -> MainLayout
// |-- datasets/all/ -> DatasetList
// |-- logged-out -> LoggedOut
// |-- not-found -> Error404
// L * -> Error404
//

const routes = [
  { /* Homepage routes */
    path: '/',
    component: () => import(/* webpackChunkName: 'homepage' */ '@/layouts/LandingLayout'),
    children: [
      {
        name: 'homepage',
        path: '',
        component: () => import(/* webpackChunkName: 'homepage' */ '@/pages/Homepage')
      },
      // admin,
    ]
  },
  { /* Record collection routes */
    path: '/',
    component: () => import(/* webpackChunkName: 'layouts' */ '@/layouts/MainLayout'),
    children: [
      collection({
        path: `${DATASETS_COLLECTION_CODE}/all/`,
        name: 'all-datasets',
        component: () => import(/* webpackChunkName: 'collections' */ '@/pages/collections/CollectionList')
      }, {
        meta: {
          collectionId: DATASETS_COLLECTION_CODE,
          query: {
            sort: 'string:alphabetical'
          },
          title: 'route.title.datasetList',
          useFacets: true,
        }
      }),
      { /* Other routes */
        path: 'logged-out',
        name: 'logged-out',
        component: () => import(/* webpackChunkName: 'auth' */ '@/pages/auth/LoggedOut.vue')
      },
      {
        path: ':pathMatch(.*)*',
        name: 'not-found',
        component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: ':catchAll(.*)*',
        component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
      }
    ]
  }
]

export default routes
