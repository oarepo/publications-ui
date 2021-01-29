// Administration interface routes

const admin = {
  path: '/admin',
  meta: {
    authorization: { /* TODO: add admin role enforcement */ },
    title: 'route.title.admin'
  },
  component: () => import('layouts/AdminLayout'),
  children: [/* TODO: add admin page routes here */]
}

export default admin
