// VUEX
import Vue from 'vue'
import Vuex from 'vuex'
import cart from './modules/cart'
Vue.use(Vuex)
const state = {//要设置的全局访问的state对象
  showFooter: true,
  changableNum: 1
  //要设置的初始属性值
};

const store = new Vuex.Store({
  modules: {
    cart
  },
  state
})

export default store