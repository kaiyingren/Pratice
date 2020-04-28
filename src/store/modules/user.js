// 接口相关
import {login, getInfo, logout} from '@/api/user'
import {getToken, setToken, removeToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

// state 存放的是一些状态， 也是一些数据
const state = {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
}

// mutations 与事件类似，更改的vuex的store中的状态的唯一方法是提交mutation
// 所以mutation上存放的一般就是我们要改变state的一些方法
// mutation 必须同步执行

const mutations = {
    SET_TOKEN: (state, token) => {
        // 更改state中的token
        state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
        state.introduction = introduction
    },
    SET_NAME: (state, name) => {
        state.name = name
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles
    }
}

// action 类似于mutation 不同在于
// action提交的是mutation，而不是直接更改状态
// action可以包含任意异步操作
const actions = {
    // user login
    login ({commit}, userInfo) {
        const {username, password} = userInfo
        console.log(userInfo)
        // 异步操作
        return new Promise((resolve, reject) => {
            login({username: username.trim(), password: password}).then(response => {
                const { data } = response
                // 提交mutation
                commit('SET_TOKEN', data.token)
                // 根据后台返回的token 重设token
                setToken(data.token)
                resolve()
            }).catch(error => {
                reject(new Error(error))
            })
        })
    },

    // get user info
    getInfo ({commit, state}) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response

                if (!data) {
                    reject(new Error('Verification failes, please Login again.'))
                }

                const { roles, name, avatar, introduction } = data

                //  roles must be a non_empty array
                if (!roles || roles.length <= 0) {
                    reject(new Error('getInfo: roles must be a non-null array!'))
                }

                commit('SET_ROLES', roles)
                commit('SET_NAME', name)
                commit('SET_AVATAR', avatar)
                commit('SET_INTRODUCTION', introduction)
                resolve(data)
            }).catch(error => {
                reject(new Error(error))
            })
        })
    },

    logout ({commit, state}) {
        return new Promise((resolve, reject) => {
            logout(state.token).then(() => {
                commit('SET_TOKEN', '')
                commit('SET_ROLES', [])
                removeToken()
                resetRouter()
                // 调用resolve函数将promise状态改为fulfilled
                resolve()
            }).catch(error => {
                reject(new Error(error))
            })
        })
    },

    // remove token
    resetToken ({commit}) {
        return new Promise((resolve) => {
            commit('SET_TOKEN', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
        })
    },

    // Dynamically modify permissions
    changeRoles ({commit, dispatch}, role) {
        return new Promise(async resolve => {
            const token = role + '-token'
            commit('SET_TOKEN', token) // 重设token
            setToken(token)

            // 在不同模块触发多个action函数
            const {roles} = await dispatch('getInfo') // 等待getInfo完成

            resetRouter()

            // generate accessible routes map based on roles
            const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            resolve()
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
