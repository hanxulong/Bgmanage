import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
const router = new Router({
  routes: [{
      path: '/',
      component: () => import('../components/page/layout.vue'),
      meta: {
        selected: '/'
      },
      children: [{
          path: 'menu/add',
          component: () => import('../components/menu/menuInfo.vue'),
          meta: {
            selected: '/menu'
          }
        },
        {
          path: 'menu/:id',
          component: () => import('../components/menu/menuInfo.vue'),
          meta: {
            selected: '/menu'
          }
        },
        {
          path: 'menu',
          component: () => import('../components/menu/menu'),
          meta: {
            selected: '/menu'
          }
        },
        {
          path: 'role',
          component: () => import('../components/user/user'),
          meta: {
            selected: '/role'
          }
        },
        {
          path: 'role/add',
          component: () => import('../components/user/userinfo.vue'),
          meta: {
            selected: '/role'
          }
        },
        {
          path: 'role/:id',
          component: () => import('../components/user/userinfo.vue'),
          meta: {
            selected: '/role'
          }
        },
        {
          path: 'user',
          component: () => import('../components/manage/user'),
          meta: {
            selected: '/user'
          }
        },
        {
          path: 'user/add',
          component: () => import('../components/manage/userinfo.vue'),
          meta: {
            selected: '/user'
          }
        },
        {
          path: 'user/:id',
          component: () => import('../components/manage/userinfo.vue'),
          meta: {
            selected: '/user'
          }
        },
      ]
    },
    {
      path: '/login',
      component: () => import('../components/page/login.vue')
    },
  ]
})
//登陆验证
router.beforeEach((to, from, next) => {
  if (to.fullPath !== '/login') {
    var userinfo = store.state.userinfo; //从仓库中读取数据
    if (userinfo !== null) {
      //验证用户访问的路由规则是否在已有的规则中
      // var nowpath=to.fullPath;
      var nowpath = to.meta.selected;
      var allowpath = userinfo.menus_url;
      if (allowpath.indexOf('/') < 0) {
        allowpath.push('/')
      }
     
      allowpath.indexOf(nowpath)>= 0 ? next() : next('/');
    } else {
      next('/login')
    }
  } else {
    next();
  }
})
export default router;
