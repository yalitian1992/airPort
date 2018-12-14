/*eslint-disable */
import * as API from "../../api/api.js";
const state = {
  // 首页中拓扑图中管理视图
  manageData: null,
  //首页中拓扑图中风险视图
  riskViewData: null,
  // 首页中 0  1 记录
  indexData: 0,
  //treeId
  treeId: "",
  //风险因子排行
  riskfactoryrankConData: [],
  //首页中折线图
  RiskSafeCurve: null,
  //首页中雷达图
  RiskData: null,
  //风险拓扑详情--雷达图
  riskDataDetail: null,
  // 风险拓扑详情页  --  左侧3个状态数据
  RiskfactorCount: null,
  // 风险拓扑详情页  --  24小时，48小时折线图
  riskTopDetailSafeCurve: null,
  // 风险拓扑详情页  --  风险因子排行  右侧
  riskDetailFactor: null,
  //风险详情页面  --点击查看全部  --跳转页面
  allRiskDetailFactor:null
};

const mutations = {
  // 拓扑图中管理视图
  setManageData(state, data) {
    state.manageData = data
  },
  //拓扑图中风险视图
  setRiskViewData(state, data) {
    state.riskViewData = data
  },
  //切换 管理和风险  0  1 
  setIndexData(state, data) {
    state.indexData = data
  },
  setTreeId(state, data) {
    state.treeId = data
  },
  // 风险因子排行
  setRiskfactoryrankConData(state, data) {
    state.riskfactoryrankConData = data;
  },
  // 首页中折线图
  setRiskSafeCurve(state, data) {
    state.RiskSafeCurve = data
  },
  //首页中雷达图
  setRiskData(state, data) {
    state.RiskData = data
  },
  //风险拓扑详情--雷达图
  setriskDataDetail(state, data) {
    state.riskDataDetail = data
  },
  // 风险拓扑详情页  --  左侧3个状态数据
  setRiskfactorCount(state, data) {
    state.RiskfactorCount = data
  },
  // 风险拓扑详情页  --  24小时，48小时折线图
  setriskTopDetailSafeCurve(state, data) {
    state.riskTopDetailSafeCurve = data
  },
  // 风险拓扑详情页  --  风险因子排行  右侧
  setriskDetailFactor(state, data) {
    state.riskDetailFactor = data
  },
    //风险详情页面  --点击查看全部  --跳转页面
    setAllRiskDetailFactor(state, data) {
      state.allRiskDetailFactor = data
    },




};

const actions = {
  // 拓扑图中管理视图
  async getManageData({
    commit
  }) {
    const ManageWrap = await API.getManageData();
    commit("setManageData", ManageWrap.data);
  },
  //拓扑图中风险视图
  async getRiskViewData({
    commit
  }) {
    const RiskViewWrap = await API.getRiskViewData();
    commit("setRiskViewData", RiskViewWrap.data);
  },
  // 风险因子排行
  async getRiskFactor({
    commit
  }, params) {
    const RiskFactor = await API.getRiskFactor(params);
    commit("setRiskfactoryrankConData", RiskFactor.data);
  },
  // 首页中折线图
  async getRiskSafeCurve({
    commit
  }, params) {
    const SafeCurve = await API.getRiskSafeCurve(params);
    commit("setRiskSafeCurve", SafeCurve.data);
  },
  //首页中雷达图
  async getRiskData({
    commit
  }, params) {
    const RiskDataWrap = await API.getRiskData(params);
    commit("setRiskData", RiskDataWrap.data);
  },
  //风险拓扑详情--雷达图
  async getRiskDataDetail({
    commit
  }, params) {
    const RiskDataDetailWrap = await API.GetRiskDataDetail(params);
    commit("setriskDataDetail", RiskDataDetailWrap.data);
  },
  // 风险拓扑详情页  --  左侧3个状态数据
  async getRiskfactorCount({
    commit
  }, params) {
    const RiskfactorCountWrap = await API.getRiskfactorCount(params);
    commit("setRiskfactorCount", RiskfactorCountWrap.data);
  },
  // 风险拓扑详情页  --  24小时，48小时折线图
  async getRiskTopDetailSafeCurve({
    commit
  }, params) {
    const riskTopDetailSafeCurveWrap = await API.getRiskTopDetailSafeCurve(params);
    commit("setriskTopDetailSafeCurve", riskTopDetailSafeCurveWrap.data);
  },
  // 风险拓扑详情页  --  风险因子排行  右侧
  async getRiskDetailFactor({
    commit
  }, params) {
    const riskDetailFactorWrap = await API.getRiskDetailFactor(params);
    commit("setriskDetailFactor", riskDetailFactorWrap.data);
  },
     //风险详情页面  --点击查看全部  --跳转页面
     async getAllRiskDetailFactor({
      commit
    }, params) {
      const allRiskDetailFactorWrap = await API.getAllRiskDetailFactor(params);
      commit("setAllRiskDetailFactor", allRiskDetailFactorWrap.data);
    },




};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
