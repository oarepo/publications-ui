import admin from './admin'
import datasets from './datasets'
import articles from 'src/router/articles'

const routes = [
  { /* Dataset collection list routes */
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      ...datasets,
      {
        name: 'logged-out',
        path: 'logged-out',
        component: () => import('pages/Logout.vue')
      },
      admin
      // Always leave this as last one,
      // but you can also remove it
      // {
      //   path: '*',
      //   component: () => import('pages/Error404.vue')
      // }
    ]
  },
  { /* Article collection list routes */
    path: '/articles',
    component: () => import('layouts/MainLayout'),
    children: [
      ...articles,
      {
        name: 'logged-out',
        path: 'logged-out',
        component: () => import('pages/Logout.vue')
      },
      admin,
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
