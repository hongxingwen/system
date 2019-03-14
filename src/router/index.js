export default [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index/index.vue')
  },
  {
    path: '/order/trip/list',
    name: 'order',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/order/index.vue')
  },
  {
    path: '/product/trip/list',
    name: 'home',
    component: () => import('../views/product/index.vue')
  }
]
