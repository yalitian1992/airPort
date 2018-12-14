/* eslint-disable */

const state = {
  modelState:0,
  blankPageDataState:null,
  modelEnterState:0,
  curModelInfo:{}
};

const mutations = {
  setModelState(state,data){
    state.modelState = data
  },
  setBlankPageDataState(state,data){
    state.blankPageDataState = data
  },
  setModelEnterState(state,data){
    state.modelEnterState = data
  },
  setCurModelInfo(state,data){
    state.curModelInfo=data
  }
};

const actions = {

};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
