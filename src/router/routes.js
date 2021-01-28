import { collection } from '@oarepo/invenio-api-vue-composition'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
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
                // collection not changed
                return true
              }
              return false
            }
          }
        },
        {
          meta: {
            useFacets: true
          }
        }),
      {
        name: 'dataset-upload',
        path: 'dataset-upload',
        component: () => import('pages/datasets/DatasetUpload'),
        meta: {
          authorization: {}
        }
      },
      {
        name: 'logged-out',
        path: 'logged-out',
        component: () => import('pages/Logout.vue')
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  }
]

export default routes
