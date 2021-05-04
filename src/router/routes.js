// import admin from './admin'
// import datasets from './datasets'
// import articles from '@/router/articles'
import {collection} from '@oarepo/invenio-vue'
import {DATASETS_COLLECTION_CODE} from '@/constants'

const routes = [
  { /* Dataset collection list routes */
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
  {
    path: '/',
    component: () => import(/* webpackChunkName: 'layouts' */ '@/layouts/MainLayout'),
    children: [
      collection({
        path: `${DATASETS_COLLECTION_CODE}/all/`,
        name: 'all-datasets',
        component: () => import(/* webpackChunkName: 'datasets' */ '@/pages/datasets/DatasetList')
      }, {
        meta: {
          query: {
            sort: 'string:alphabetical'
          },
          title: 'route.title.datasetList',
          useFacets: true,
        }
      }),
      {
        path: '/logged-out',
        name: 'logged-out',
        component: () => import(/* webpackChunkName: 'auth' */ '@/pages/auth/LoggedOut.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '/:catchAll(.*)*',
        component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
      }
    ]
  }
]

export default routes
