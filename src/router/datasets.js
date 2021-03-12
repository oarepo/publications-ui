// Datasets interface routes

import { collection, collectionApi, record } from '@oarepo/invenio-api-vue-composition'

const datasets = [
  collection(
    {
      path: '',
      collectionCode: 'publications/all-datasets',
      name: 'publications/all-datasets',
      component: () => import('pages/datasets/DatasetList'),
      loadingComponent: 'viewer',
      recordRouteName: (record) => {
        if (record.links.self.indexOf('draft') > 0) {
          return 'draft-publications/dataset/record'
        } else {
          return 'publications/dataset/record'
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
        name: 'draft-publications/datasets/container',
        collectionCode: 'draft/publications/datasets',
        path: ':recordId',
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
    path: '/datasets/detail',
    component: () => import('layouts/DatasetDetailLayout'),
    meta: {
      title: 'route.title.datasetDetail'
    },
    children: [
      record({
        name: 'draft-publications/dataset/record',
        collectionCode: 'draft/publications/datasets',
        path: ':recordId',
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
    name: 'draft-publications/datasets/upload',
    path: 'dataset-upload',
    component: () => import('pages/datasets/DatasetUpload')
  }, {
    meta: {
      authorization: {},
      title: 'route.title.datasetUpload'
    }
  })
]

export default datasets
