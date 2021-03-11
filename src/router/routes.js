import admin from './admin'
import datasets from './datasets'

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
      {
        name: 'datasets',
        path: 'datasets',
        children: [
          ...datasets
        ]
      }
    ]
  }
]

export default routes
