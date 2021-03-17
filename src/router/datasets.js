// Datasets interface routes

import { DATASETS_COLLECTION_CODE, DATASETS_DRAFT_COLLECTION_CODE } from 'src/constants'
import { collection, collectionApi, record } from '@oarepo/invenio-api-vue-composition'

const datasets = [
  // Published dataset detail
  record({
    name: 'dataset/record',
    collectionCode: DATASETS_COLLECTION_CODE,
    path: '/datasets/:recordId',
    apiUrl: '/',
    component: () => import('pages/datasets/DatasetDraftDetail'),
    loadingComponent: 'viewer',
    httpGetProps: {
      dedupingInterval: 100,
      revalidateDebounce: 0,
      shouldRetryOnError: false
    },
    meta: {
      title: 'route.title.datasetDetail'
    }
  }),
  collection(
    {
      path: '/datasets',
      collectionCode: DATASETS_COLLECTION_CODE,
      name: 'all-datasets',
      component: () => import('pages/datasets/DatasetList'),
      loadingComponent: 'viewer',
      apiUrl: '/',
      recordRouteName: (record) => {
        if (record.links.self.indexOf('draft') > 0) {
          return 'draft-dataset/record'
        } else {
          return 'dataset/record'
        }
      },
      httpGetProps: {
        dedupingInterval: 100,
        revalidateDebounce: 0,
        shouldRetryOnError: false,
        keepData: (data, error, oldUrl, oldQuery, newUrl, newQuery, options) => {
          if (oldUrl === newUrl) {
            return true // collection not changed
          }
          return false
        }
      }
    },
    {
      meta: {
        title: 'route.title.datasetList',
        useFacets: true
      }
    }),
  { /* Dataset editation routes */
    name: 'dataset-edit',
    path: '/datasets/edit',
    component: () => import('layouts/DatasetDetailLayout'),
    meta: {
      authorization: {},
      title: 'route.title.datasetEdit'
    },
    children: [
      record({
        name: 'draft-datasets/container',
        collectionCode: DATASETS_DRAFT_COLLECTION_CODE,
        path: ':recordId/edit',
        apiUrl: '/',
        component: () => import('pages/datasets/DatasetDraftDetail'),
        loadingComponent: 'viewer',
        httpGetProps: {
          dedupingInterval: 100,
          revalidateDebounce: 0,
          shouldRetryOnError: false
        }
      })
    ]
  },
  { /* Dataset detail routes */
    name: 'dataset-detail',
    path: '/datasets/draft',
    component: () => import('layouts/DatasetDetailLayout'),
    meta: {
      title: 'route.title.datasetDetail'
    },
    children: [
      // Draft dataset detail
      record({
        name: 'draft-dataset/record',
        collectionCode: DATASETS_DRAFT_COLLECTION_CODE,
        path: ':recordId',
        apiUrl: '/',
        component: () => import('pages/datasets/DatasetDraftDetail'),
        loadingComponent: 'viewer',
        httpGetProps: {
          dedupingInterval: 100,
          revalidateDebounce: 0,
          shouldRetryOnError: false
        },
        meta: {
          title: 'route.title.datasetDetail'
        }
      })
    ]
  },
  collectionApi({
    collectionCode: 'draft-publications/datasets', /* Dataset submission route */
    name: 'draft-datasets/upload',
    path: '/datasets/draft/upload',
    component: () => import('pages/datasets/DatasetUpload')
  }, {
    meta: {
      authorization: {},
      title: 'route.title.datasetUpload'
    }
  })
]

export default datasets
