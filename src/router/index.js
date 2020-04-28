import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login/index'
// import a from '@/views/login/a'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that dose not have permission requirements
 * all roles can be accessed
 */

 export const constantRoutes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    }
 ]

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })
const createRouter = () => new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
