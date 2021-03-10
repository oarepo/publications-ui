// Datasets interface routes

import { collection, record } from '@oarepo/invenio-api-vue-composition'
import { ARTICLES_COLLECTION_CODE, ARTICLES_DRAFT_COLLECTION_CODE } from 'src/constants'

const articles = [
  collection(
    {
      path: '/',
      collectionCode: ARTICLES_COLLECTION_CODE,
      name: 'publications/all-articles',
      component: () => import('pages/articles/ArticleList'),
      loadingComponent: 'viewer',
      apiUrl: '/',
      recordRouteName: (record) => {
        if (record.links.self.indexOf('draft') > 0) {
          return 'draft-publications/article/record'
        } else {
          return 'publications/article/record'
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
        title: 'route.title.articleList',
        useFacets: false
      }
    }),
  { /* Dataset detail routes */
    name: 'article-detail',
    path: '/articles/detail',
    component: () => import('layouts/DatasetDetailLayout'),
    meta: {
      title: 'route.title.articleDetail'
    },
    children: [
      record({
        name: 'draft-publications/article/record',
        collectionCode: ARTICLES_DRAFT_COLLECTION_CODE,
        path: ':recordId',
        apiUrl: '/',
        component: () => import('pages/articles/ArticleDraftDetail'),
        loadingComponent: 'viewer',
        httpGetProps: {
          dedupingInterval: 100,
          revalidateDebounce: 0,
          shouldRetryOnError: false
        },
        meta: {
          title: 'route.title.articleDetail'
        }
      })
    ]
  }

]

export default articles
