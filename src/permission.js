import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar 顶部滚动条 页面加载时动态效果
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', 'auth-redirect'] // no redirect whitelist

// 使用router.beforeEach注册一个全局前置路由
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // determine whether the use has logged in
    const hasToken = getToken()

    if (hasToken) {
        // console.log('hasToken:', hasToken)
        console.log('to.path', to.path)
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done()
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            const hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                next()
            } else {
                try {
                    // get user info
                    // note: roles must be a object array ! such as: ['admin'] or ['developer', 'editor']
                    const { roles } = await store.dispatch('user/getInfo')
                    // console.log('roles:', roles)
                    // generate accessible routes map based on roles
                    const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
                    console.log('accessRoutes:', accessRoutes)
                    // dynamically add accessible routes
                    router.addRoutes(accessRoutes)
                    console.log('router:', router)
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    console.log('to:', to)
                    next({ ...to, replace: true })
                } catch (error) {
                    // remove token and g to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        }
    } else {
        // has no token
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
