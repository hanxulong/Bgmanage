import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      component: () => import('../components/page/layout.vue'),
      meta:{selected:'/'},
      children: [{
          path: 'menu/add',
          component: () => import('../components/menu/menuInfo.vue'),
          meta:{selected:'/menu'}
        },
        {
          path: 'menu/:id',
          component: () => import('../components/menu/menuInfo.vue'),
          meta:{selected:'/menu'}
        },
        {
          path: 'menu',
          component: () => import('../components/menu/menu'),
          meta:{selected:'/menu'}
        },
        {
          path: 'role',
          component: () => import('../components/user/user'),
          meta:{selected:'/role'}
        },
        {
          path: 'role/add',
          component: () => import('../components/user/userinfo.vue'),
          meta:{selected:'/role'}
        },
        {
          path: 'role/:id',
          component: () => import('../components/user/userinfo.vue'),
          meta:{selected:'/role'}
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/login.vue')
    },
  ]
})
