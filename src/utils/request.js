import axios from 'axios'
import { MessageBox, Message} from 'element-ui'
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
        if(store.getter.token) {
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
service.interceptors.response.use()

export default service
