import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
// import a from '@/views/login/a'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
  ]
})