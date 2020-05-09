import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // api 的 baes_url
    withCredentials: true, // 跨域请求是否需要使用凭证 默认false 此处跨域请求时发送cookies
    timeout: 5000 // request timeout
})

// 拦截器  在请求或响应被then 或 catch 处理前拦截他们

// request interceptors 请求拦截
service.interceptors.request.use(
    config => {
        // do something before request is sent
        if (store.getters.token) {
            // 让每个请求携带token-- ['X-Token']为自定义key 可以根据实际情况自行修改
            config.headers['X-Token'] = getToken()
        }
        return config
    },
    error => {
        // do something with request error
        console.log(error)
        Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * if you want to get information such as headers or status
     * please return response => responese
     */
    response => {
        const res = response.data
        if (res.code !== 20000) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            })
            // 50008: 非法的token; 50012：其他客户端登录; 50014: token过期
            if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
                MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
                    confirmButtonText: '重新登录',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // 通过store.dispatch触发action
                    store.dispatch('user/resetToken').then(() => {
                        Location.reload() // 为了重新实例化vue-router 避免bug
                    })
                })
            }
            return Promise.reject(new Error('error'))
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service
