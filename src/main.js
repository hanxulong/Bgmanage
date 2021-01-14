// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index.js'

Vue.config.productionTip = false
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//一定要引入样式文件
 Vue.use(ElementUI)
/* eslint-disable no-new */
Vue.prototype.Event = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
