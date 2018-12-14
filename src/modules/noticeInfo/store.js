/* eslint-disable */

const state = {
  noticeState: 1
};

const mutations = {
  setNoticeState(state, data) {
    state.noticeState = data
  }
};

export default {
  namespaced: true,
  state,
  mutations
};
