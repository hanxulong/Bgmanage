import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/page/layout.vue'),
      children: [
        {
          path: 'menu/info',
          component:()=>import('../components/page/menuInfo.vue')
        },
        {
          path: 'menu/edit',
          component:()=>import('../components/handle/edit.vue')
        },
        {
          path: 'menu',
          component:()=>import('../components/page/menu')
        },
      ]
    },
    { path: '/login',component:()=>import('../components/page/login.vue') },
  ]
})
