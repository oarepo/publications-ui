import admin from './admin'
import datasets from './datasets'
import articles from 'src/router/articles'

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
      },
      // Always leave this as last one,
      // but you can also remove it
      {
        path: '*',
        component: () => import('pages/Error404.vue')
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout'),
    children: [
      ...datasets,
      ...articles,
    ]
  }
]

export default routes
