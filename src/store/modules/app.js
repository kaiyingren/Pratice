import Cookies from 'js-cookie'

// 注意不应该在action 中 替换原始的状态对象 - 组件和store需要引用同一个共享对象，mutation才能够被观察
const state = {
    sidebar: {
        opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebrStatus') : true,
        withoutAnmation: false
    },
    device: 'desktop',
    language: Cookies.get('language') || 'en',
    size: Cookies.get('size') || 'medium'
}

const mutations = {
    TOGGLE_SIDEBAR: state => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.withoutAnmation = false
        if (state.sidebar.opened) {
            Cookies.set('sidebarStatus', 1)
        } else {
            Cookies.set('sidebarStatus', 0)
        }
    },
    CLOSE_SIDEBAR: (state, withoutAnmation) => {
        Cookies.set('sidebarStatus', 0)
        state.sidebar.opened = false
        state.sidebar.withoutAnmation = withoutAnmation
    },
    TOGGLE_DEVICE: (state, device) => {
        state.device = device
    },
    SET_LANGUAGE: (state, language) => {
        state.language = language
        Cookies.set('language', language)
    },
    SET_SIZE: (state, size) => {
        state.size = size
        Cookies.set('size', size)
    }
}

// 注意 不应该在action中替换原始的状态对象 组件和store需要引用同一个共享对象， mutation才能被观察
const actions = {
    toggleSideBar ({commit}) {
        commit('TOGGLE_SIDEBAR')
    },
    closeSideBar ({commit}, { withoutAnmation }) {
        commit('CLOSE_SIDEBAR', withoutAnmation)
    },
    toggleDevice ({commit}, device) {
        commit('TOGGLE_DEVICE', device)
    },
    setLanguage ({commit}, language) {
        commit('SET_LANGUAGE', language)
    },
    setSize ({commit}, size) {
        commit('SET_SIZE', size)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
