// import admin from './admin'
// import articles from '@/router/articles'
import collections from '@/router/collections'

// Route map (route matched from top to bottom)

// / -> LandingLayout
// |-- . -> Homepage
//
// / -> MainLayout
// |-- datasets/all/ -> DatasetList
// |-- logged-out -> LoggedOut
// |-- not-found -> Error404
// L * -> Error404
//

const routes = [
    { /* Homepage routes */
        path: '/',
        component: () => import(/* webpackChunkName: 'homepage' */ '@/layouts/LandingLayout'),
        children: [
            {
                name: 'homepage',
                path: '',
                component: () => import(/* webpackChunkName: 'homepage' */ '@/pages/Homepage')
            },
            // admin,
        ]
    },
    { /* Record collection routes */
        path: '/',
        component: () => import(/* webpackChunkName: 'layouts' */ '@/layouts/ListLayout'),
        children: [
            /* Dataset collection Routes */
            ...collections,
            { /* Other routes */
                path: 'logged-out',
                name: 'logged-out',
                component: () => import(/* webpackChunkName: 'auth' */ '@/pages/auth/LoggedOut.vue')
            },
            {
                path: ':pathMatch(.*)*',
                name: 'not-found',
                component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
            },
            // Always leave this as last one,
            // but you can also remove it
            {
                path: ':catchAll(.*)*',
                component: () => import(/* webpackChunkName: 'errors' */ '@/pages/errors/Error404.vue')
            }
        ]
    }
]

export default routes
