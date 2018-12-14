/*eslint-disable*/
import Vue from 'vue'
import vuex from 'vuex'
import RiskStore from '../modules/risk/store.js'
import ModelStore from '../modules/Model/store.js'
import SecurityStore from '../modules/Security/store.js'
import systemStore from '../modules/system/store.js'
import menuAuthor from './menuAuthorStore'
import noticeStore from '../modules/noticeInfo/store'
Vue.use(vuex)

export default new vuex.Store({
  modules: {
    RiskStore,
    ModelStore,
    SecurityStore,
    systemStore,
    menuAuthor,
    noticeStore
  }
})
