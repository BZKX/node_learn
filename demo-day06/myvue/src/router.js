import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import index from './page/index.vue'
import login from './page/login.vue'
import postList from './page/postList.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path:'/login',
    name:'login',
    component:login
  }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path:'/postList',
          name:'postList',
          component:postList
        }
      ]
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
