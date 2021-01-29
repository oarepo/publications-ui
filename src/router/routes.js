import admin from './admin'
import datasets from './datasets'

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
