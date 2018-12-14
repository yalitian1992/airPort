/*eslint-disable */
import axios from "axios";

// const baseURL = process.env.NODE_ENV === 'production' ? 'http://192.168.172.204:15521/' : 'http://192.168.172.204:15521/'
//const baseURL = process.env.NODE_ENV === 'production' ? 'http://103.10.87.52:17011/' : 'http://103.10.87.52:17011/'
const config = require('../config/config')
const baseURL = config.api.baseURL

// 首页中拓扑图中管理视图
export async function getManageData(){
  return axios.post(`${baseURL}RiskTopology/GetRiskTopManagerViewByType`);
}

 //首页中拓扑图中风险视图
export async function getRiskViewData(){
  return axios.post(`${baseURL}RiskTopology/GetRiskTopRiskViewByType`);
}


//首页中风险因子排行
export async function getRiskFactor(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskFactor`, {
    params
  });
}


//首页中风险分布  雷达图
export async function getRiskData(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskData`, {
    params
  });
}

//首页中24，48折线图
export async function getRiskSafeCurve(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskSafeCurve`, {
    params
  });
}



//风险拓扑详情  --  雷达图
export async function GetRiskDataDetail(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskDataDetail`, {
    params
  });
}



// 风险拓扑详情页  --  左侧3个状态数据
export async function getRiskfactorCount(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskfactorCount`, {
    params
  });
}


// 风险拓扑详情页  --  24小时，48小时折线图   下侧
export async function getRiskTopDetailSafeCurve(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskTopDetailSafeCurve`, {
    params
  });
}

// 风险拓扑详情页  --  风险因子排行  右侧
export async function getRiskDetailFactor(params) {
  return axios.post(`${baseURL}RiskTopology/GetRiskDetailFactor`, {
    params
  });
}

//  风险拓扑详情页 ---  中点击全部  跳转的页面
export async function getAllRiskDetailFactor(params) {
  return axios.post(`${baseURL}RiskTopology/GetAllRiskDetailFactor`, {
    params
  });
}











//安全统计模块——部门统计（安全曲线）
export async function getSafeCurve(params) {
  return axios.post(`${baseURL}SafeStatistic/GetSafetySafeCurve`, {
    params
  });
}

//安全统计模块——部门统计（异常因子）
export async function getColsedLoppRate(params) {
  return axios.post(`${baseURL}SafeStatistic/GetSafetyAbnormalityFactor`,{params});
}

//安全统计模块——部门统计（安全明细）
export async function getSafetyAlarmDetailed(params) {
  return axios.post(`${baseURL}SafeStatistic/GetSafetyAlarmDetailed`,{
    params
  });
}


















