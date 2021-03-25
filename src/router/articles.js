// Datasets interface routes

import { collection, record } from '@oarepo/invenio-api-vue-composition'
import { ARTICLES_COLLECTION_CODE, ARTICLES_DRAFT_COLLECTION_CODE } from 'src/constants'

const articles = [
  // Published article detail
  record({
    name: 'article/record',
    collectionCode: ARTICLES_COLLECTION_CODE,
    path: '/articles/:recordId',
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
  }),
  collection(
    {
      path: '/articles',
      collectionCode: ARTICLES_COLLECTION_CODE,
      name: 'all-articles',
      component: () => import('pages/articles/ArticleList'),
      loadingComponent: 'viewer',
      apiUrl: '/',
      recordRouteName: (record) => {
        if (record.links.self.indexOf('draft') > 0) {
          return 'draft-article/record'
        } else {
          return 'article/record'
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
  {
    name: 'article-detail',
    path: '/articles/draft',
    component: () => import('layouts/DatasetDetailLayout'),
    meta: {
      title: 'route.title.articleDetail'
    },
    children: [
      record({
        name: 'draft-article/record',
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
