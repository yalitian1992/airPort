const state = {
  MenuData: ['index', 'model'],
  MenuDic: {
    index: 'risk',
    riskMap: 'riskmap',
    safeStatistics: 'security',
    model: 'model',
    sysmanage: 'system',
    alerInfo: 'noticeInform'
  },
  MenuAuthDic: {},
  logerName: ''
}
const mutations = {
  setMenuData (state, data) {
    state.MenuData = data
    state.MenuAuthDic = {}
    for (let i in data) {
      if (!state.MenuAuthDic[data[i]]) {
        state.MenuAuthDic[data[i]] = true
      }
    }
  },
  setMenuDataFromSession (state, data) {
    data = JSON.parse(data)
    state.MenuData = data
    state.MenuAuthDic = {}
    for (let i in data) {
      if (!state.MenuAuthDic[data[i]]) {
        state.MenuAuthDic[data[i]] = true
      }
    }
  },
  setUserInforFromSession (state, data) {
    data = JSON.parse(data)
    if (data === null) {
      state.logerName = ''
    } else { state.logerName = data.VSERNAME }
  }
}
const actions = {
  setMenuData (context, data) {
    context.commit('setMenuData', data)
  },
  setMenuDataFromSession (context, data) {
    context.commit('setMenuDataFromSession', data)
  },
  setUserInforFromSession (context, data) {
    context.commit('setUserInforFromSession', data)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
