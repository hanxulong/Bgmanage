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
          path: 'student',
          component:()=>import('../components/page/student.vue')
        },
        {
          path: 'course',
          component:()=>import('../components/page/course.vue')
        },
      ]
    },
    { path: '/login',component:()=>import('../components/page/login.vue') },
  ]
})
