import Vue from 'vue'
import Router from 'vue-router'

// Layout
import Layout from '@/layout'

Vue.use(Router)

/**
 * constantRoutes
 * a base page that dose not have permission requirements
 * all roles can be accessed
 */

 export const constantRoutes = [
   {
     path: '/redirect', // 记录用户上次登录停留界面路径 重新登录后还是进入上次页面
     component: Layout,
     hidden: true,
     children: [
       {
         path: 'redeirect/:path*',
         component: () => import('@/views/redirect/index') // 路由懒加载 属于SPA优化方式之一
       }
     ]
   },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login/index')
    },
    {
      path: '/404',
      component: () => import('@/views/errorPage/404'),
      hidden: true
    },
    {
      path: '/401',
      component: () => import('@/views/errorPage/401'),
      hidden: true
    },
    {
      path: '',
      component: Layout,
      redirect: 'dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          name: 'Dashboard',
          meta: {title: 'dashboard', icon: 'dashboard', noCache: true, affix: true}
        }
      ]
    }
 ]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */

export const asyncRoutes = []

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
