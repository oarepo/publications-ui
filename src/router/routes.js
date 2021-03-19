import admin from './admin'
import datasets from './datasets'
import articles from 'src/router/articles'
import { COMMUNITIES } from 'src/constants'

const routes = [
  { /* Dataset collection list routes */
    path: '/',
    component: () => import('layouts/LandingLayout'),
    children: [
      {
        name: 'homepage',
        path: '',
        component: () => import('pages/Homepage')
      },
      admin,
      {
        name: 'logged-out',
        path: 'logged-out',
        component: () => import('pages/Logout.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: COMMUNITIES.map(communityId => {
      return [
        ...datasets(communityId),
        ...articles(communityId)
      ]
    }).flat(1)
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

console.log(routes)

export default routes
