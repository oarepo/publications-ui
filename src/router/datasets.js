// Datasets interface routes

import { DATASETS_COLLECTION_CODE, DATASETS_DRAFT_COLLECTION_CODE } from 'src/constants'
import { collection, record } from '@oarepo/invenio-api-vue-composition'

function datasets (communityId) {
  return [
    collection(
      {
        path: `${communityId}/datasets/all/`,
        collectionCode: `${DATASETS_COLLECTION_CODE}/all/`,
        name: `${communityId}/all-datasets`,
        component: () => import('pages/datasets/DatasetList'),
        loadingComponent: 'viewer',
        apiUrl: `/${communityId}`,
        recordRouteName: (record) => {
          if (record.links.self.indexOf('draft') > 0) {
            return `${communityId}/draft-dataset/record`
          } else {
            return `${communityId}/dataset/record`
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
          useFacets: true,
          communityId: communityId
        }
      }),
    // Published dataset detail
    record({
      name: `${communityId}/dataset/record`,
      collectionCode: DATASETS_COLLECTION_CODE,
      path: `${communityId}/datasets/:recordId`,
      apiUrl: `/${communityId}`,
      component: () => import('pages/datasets/DatasetDraftDetail'),
      loadingComponent: () => import('components/common/LoadingPlaceholder'),
      httpGetProps: {
        dedupingInterval: 100,
        revalidateDebounce: 0,
        shouldRetryOnError: false
      }
    },
    {
      meta: {
        communityId: communityId,
        title: 'route.title.datasetDetail'
      }
    }),
    { /* Dataset editation routes */
      name: `${communityId}/dataset-edit`,
      path: `${communityId}/datasets/edit`,
      component: () => import('layouts/DatasetDetailLayout'),
      meta: {
        authorization: {},
        title: 'route.title.datasetEdit'
      },
      children: [
        record({
          name: `${communityId}/draft-datasets/container`,
          collectionCode: DATASETS_DRAFT_COLLECTION_CODE,
          path: `${communityId}/:recordId/edit`,
          apiUrl: `/${communityId}`,
          component: () => import('pages/datasets/DatasetDraftDetail'),
          loadingComponent: () => import('components/common/LoadingPlaceholder'),
          httpGetProps: {
            dedupingInterval: 100,
            revalidateDebounce: 0,
            shouldRetryOnError: false
          }
        })
      ]
    },
    { /* Dataset detail routes */
      name: `${communityId}/dataset-detail`,
      path: `${communityId}/datasets/draft/`,
      component: () => import('layouts/DatasetDetailLayout'),
      children: [
        // Draft dataset detail
        record({
          name: `${communityId}/draft-dataset/record`,
          collectionCode: DATASETS_DRAFT_COLLECTION_CODE,
          path: ':recordId',
          apiUrl: `/${communityId}`,
          component: () => import('pages/datasets/DatasetDraftDetail'),
          loadingComponent: () => import('components/common/LoadingPlaceholder'),
          httpGetProps: {
            dedupingInterval: 100,
            revalidateDebounce: 0,
            shouldRetryOnError: false
          }
        },
        {
          meta: {
            title: 'route.title.datasetDetail',
            communityId: communityId
          }
        })
      ]
    }
    // collectionApi({
    //   collectionCode: DATASETS_DRAFT_COLLECTION_CODE,
    //   name: `${communityId}/draft-datasets/upload`,
    //   path: `${communityId}/datasets/draft/upload`,
    //   component: () => import('pages/datasets/DatasetUpload'),
    //   loadingComponent: () => import('components/common/LoadingPlaceholder')
    // }, {
    //   meta: {
    //     authorization: {},
    //     title: 'route.title.datasetUpload'
    //   }
    // })
  ]
}

export default datasets
