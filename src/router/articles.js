// Datasets interface routes

import { collection, record } from '@oarepo/invenio-api-vue-composition'
import { ARTICLES_COLLECTION_CODE, ARTICLES_DRAFT_COLLECTION_CODE } from 'src/constants'

function articles (communityId) {
  return [
    // Published article detail
    record({
      name: `${communityId}/article/record`,
      collectionCode: ARTICLES_COLLECTION_CODE,
      path: `${communityId}/articles/:recordId`,
      apiUrl: `/${communityId}`,
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
        path: `${communityId}/articles/`,
        collectionCode: ARTICLES_COLLECTION_CODE,
        name: `${communityId}/all-articles`,
        component: () => import('pages/articles/ArticleList'),
        loadingComponent: 'viewer',
        apiUrl: `/${communityId}`,
        recordRouteName: (record) => {
          if (record.links.self.indexOf('draft') > 0) {
            return `${communityId}/draft-article/record`
          } else {
            return `${communityId}/article/record`
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
          useFacets: true,
          communityId: communityId
        }
      }),
    { /* Article detail routes */
      name: `${communityId}/article-detail`,
      path: `${communityId}/articles/draft/`,
      // TODO(alzpeta): implement ArticleDetailLayout
      // or a common detail layout for both datasets and articles
      component: () => import('layouts/DatasetDetailLayout'),
      meta: {
        title: 'route.title.articleDetail'
      },
      children: [
        record({
          name: `${communityId}/draft-article/record`,
          collectionCode: ARTICLES_DRAFT_COLLECTION_CODE,
          path: ':recordId',
          apiUrl: `/${communityId}`,
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
}

export default articles
