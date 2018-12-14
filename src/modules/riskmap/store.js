/* eslint-disable */

const state = {
  modelState:0,
  blankPageDataState:true
};

const mutations = {
  setModelState(state,data){
    state.modelState = data
  },
  setBlankPageDataState(state,data){
    state.blankPageDataState = data
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
  