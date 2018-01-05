import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

// 懒加载方式
const Login = resolve => require(['@/components/Login'],resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
