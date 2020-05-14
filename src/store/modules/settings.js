import defaultSettings from '@/settings'
const {showSettings, tagsView, fixHeader, sidebarLogo, theme} = defaultSettings

const state = {
    theme: theme,
    showSettings: showSettings,
    tagsView: tagsView,
    fixHeader: fixHeader,
    sidebarLogo: sidebarLogo
}

const mutations = {
    CHANGE_SETTING: (state, {key, value}) => {
        if (state.hasOwnProperty(key)) {
            state[key] = value
        }
    }
}

const actions = {
    changeSetting ({commit}, data) {
        commit('CHANGE_SETTING', data)
    }
}

export default {
    namespace: true,
    state,
    mutations,
    actions
}
