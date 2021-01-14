import Vue from 'vue'
// 使用vuex
// 引入、实例化
import Vuex from 'vuex'
Vue.use(Vuex)
// import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
// 初始化仓库
// const store = new Vuex.Store({
export default new Vuex.Store({
  // state : state,
  getters: getters,
  // 只能执行同步操作
  mutations: mutations,
  // 可以异步执行，
  actions: actions,
  modules: {
    back: {},
    front:{}
  }
})