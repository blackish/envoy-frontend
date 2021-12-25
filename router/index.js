import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/node',
    name: 'Node',
    component: () => import(/* webpackChunkName: "node" */ '../views/Node.vue')
  },
  {
    path: '/ratelimits',
    name: 'RateLimitsView',
    component: () => import(/* webpackChunkName: "ratelimitsview" */ '../views/RateLimitsView.vue')
  },
  {
    path: '/authzs3',
    name: 'AuthzS3View',
    component: () => import(/* webpackChunkName: "authzs3view" */ '../views/AuthzS3View.vue')
  },
  {
    path: '/listener',
    name: 'Listener',
    component: () => import(/* webpackChunkName: "listener" */ '../views/Listener.vue')
  },
  {
    path: '/cluster',
    name: 'Cluster',
    component: () => import(/* webpackChunkName: "cluster" */ '../views/Cluster.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
