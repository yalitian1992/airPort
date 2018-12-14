/* eslint-disable */

import * as API from "../../api/api";
import request from '../../util/request'

const state = {
  defDate: null,
  safeCurveData: null, // 部门统计 安全曲线
  ColsedLoppRateData: null, // 部门统计 异常因子
  AlarmDetailedData: null, // 部门统计 安全明细
  searchParam:{
    StartDate:'',
    EndDate:'',
    Dept:'',
    CoreRiskType:'',
    Modular:''
  },
  SelectData:0,//本日周月年选项卡0：日，1：周，2：月，3：年
  securityState:0,
  securityStateData:[],
  EventRate: Math.floor(Math.random() * 100 + 0),
  exceptionOccurred: Math.floor(Math.random() * 1000 + 50),
  completed: Math.floor(Math.random() * 1000 + 1),
  successRate: Math.floor(Math.random() * 100 + 1),
  AAndRAlertData:{
    alert_totalCounts: Math.floor(Math.random() * 1000 + 1),
    alert_redCounts: Math.floor(Math.random() * 1000 + 1),
    alert_orangeCounts: Math.floor(Math.random() * 1000 + 1)
  },
  relieveData: {
    remissionPercentage: Math.floor(Math.random() * 100 + 1),
    remissionNum: Math.floor(Math.random() * 700 + 1),
    await: Math.floor(Math.random() * 500 + 1)
  },
  securityEventsClosedLoopRateDate: {
    ResponseTimes: Math.floor(Math.random() * 500 + 1),
    MeanResponseTime: Math.floor(Math.random() * 10 + 1),
    securityEventsClosedLoopRate: Math.floor(Math.random() * 100 + 1),
    LowerThanTargetValue: Math.floor(Math.random() * 50 + 1),
    breakdownRisk: Math.floor(Math.random() * 50 + 1),
    HighRisk: Math.floor(Math.random() * 100 + 1),
    timeConsuming:Math.floor(Math.random() * 24 + 0)+'h '+Math.floor(Math.random() * 60 + 0)+'m '+Math.floor(Math.random() * 60 + 0)+'s '
  },
  StatisticalAnalysisRiskRankingData: [],
  // 同比环比分析
  earlyWarningDataDay: [ ],
  earlyWarningDataWeek: [ ],
  earlyWarningDataMonth: [],
  earlyWarningDataYear: [],
  EarlyWarningDataSelect:0,

  // 安全曲线
  safeLineDataDay: [ ],
  safeLineDataWeek: [],
  safeLineDataMonth: [],
  safeLineDataYear: [],
  // 生成报告状态
  presentationStateShow:false,
  //部门组织结构体
  deptStructInfo:[],
  depNewStruct:[],
  rePortCount:0,//点击生成报告
};

const mutations = {
  // 部门统计~安全曲线
  setSafeCurve(state,data){
    state.safeCurveData = data
  },

  //部门统计~异常因子
  setColsedLoppRate(state,data) {
    state.ColsedLoppRateData = data
  },

  //部门统计~安全明细
  setSafetyAlarmDetailed(state,data) {
    state.AlarmDetailedData = data
  },

  setSecurityState(state,data){
    state.securityState = data
  },
  // 头部切换状态
  setReport(state,data){
    state.rePortCount+=1
  },
  setSelectData(state,data){
/*
    switch (data){
      case 0:
        state.searchParam.StartDate=getDay()
        state.searchParam.EndDate=getDay()
        break;
      case 1:
        state.searchParam.StartDate=getWeek().starDate
        state.searchParam.EndDate=getWeek().endDate
        break;
      case 2:
        state.searchParam.StartDate=getMonth().starDate
        state.searchParam.EndDate=getMonth().endDate
        break;
      case 3:
        state.searchParam.StartDate=getYear().starDate
        state.searchParam.EndDate=getYear().endDate
        break;
      default:break;
    }
    */
    state.searchParam.StartDate=transferDate(data[0])
    state.searchParam.EndDate=transferDate(data[1])
  },
  setDept(state,data){
    state.searchParam.Dept=data
  },
  setCoreRiskType(state,data){
    state.searchParam.CoreRiskType=data
  },
  setModule(state,data){
    state.searchParam.Modular=data
  },
  // 生成报告状态
  setPresentationStateShow(state,data){
    console.log(data)
    state.presentationStateShow = data
  },
  setSecurityStateData(state,data){

  },
  setStatisticsData(state,data){
    state.AAndRAlertData=data.AAndRAlertData
    state.relieveData= data.relieveData,
    state.securityEventsClosedLoopRateDate=data.securityEventsClosedLoopRateDate,
    state.StatisticalAnalysisRiskRankingData=data.StatisticalAnalysisRiskRankingData
    // 同比环比分析
    state.earlyWarningDataDay= data.earlyWarningDataDay,
    state.earlyWarningDataWeek= data.earlyWarningDataWeek,
    state.earlyWarningDataMonth= data.earlyWarningDataMonth,
    state.earlyWarningDataYear=data.earlyWarningDataYear
    // 安全曲线
    state.safeLineDataDay= data.safeLineDataDay,
    state.safeLineDataWeek=data.safeLineDataWeek,
    state.safeLineDataMonth= data.safeLineDataMonth,
    state.safeLineDataYear= data.safeLineDataYear
  },
  //设置部门结构体
  setDeptStructInfo(state,data){
    let result={
      self:'0',
      dic:resultHandle(data),
      data:data
    }
    state.deptStructInfo= result
  },
  setNewDeptStruct(state,data){
    state.depNewStruct= data

  }
};

const actions = {
  // 部门统计——安全曲线
  async getSafeCurve({commit},params) {
    const SafeWrap = await API.getSafeCurve(params);
    commit("setSafeCurve", SafeWrap.data);
  },
  //部门统计——异常因子
  async getColsedLoppRate({commit},params) {
    const ColsedLoppWrap = await API.getColsedLoppRate(params);
    commit("setColsedLoppRate", ColsedLoppWrap.data);
  },

  //部门统计——安全明细
  async getSafetyAlarmDetailed({commit},params) {

    const AlarmDetailedWrap = await API.getSafetyAlarmDetailed(params);
    commit("setSafetyAlarmDetailed", AlarmDetailedWrap.data);
  },
  setDeptStructInfo({commit},params){
    request.post('ModelManage/GetOrganization',{
      "param": "{}"
    },function (res) {
      commit("setDeptStructInfo", res)
    })
  },
  setNewDeptStruct({commit},params){
    request.post('ModelManage/GetAllOrganization',{
      "param": "{}"
    },function (res) {
      commit("setNewDeptStruct", res)
    })
  },
  setSelectData(context,data){
    context.commit('setSelectData',data)
  },
  setDatas(context){
    let isOk=0
    let rDic={}
    let okData=function(rData,type){
      switch (type){
        case 0:
          rDic.AAndRAlertData=rData.AAndRAlertData
          break;
        case 1:
          rDic.relieveData=rData.relieveDate
          break;
        case 2:
          rDic.securityEventsClosedLoopRateDate=rData.securtyEventsColsedLoppRateDate
          break;
        case 3:
          rDic.StatisticalAnalysisRiskRankingData=rData.modelRiskRankingData
          break;
        default:break;
      }

      if(isOk===4){
        context.commit('setStatisticsData',rDic)
      }
    }
    request.post('SafeStatistic/GetSafetyAlarmNumberDetail',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
okData(res,0)
    })
    request.post('SafeStatistic/GetSafetyRemissionRisk',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,1)
    })
    request.post('SafeStatistic/GetSafetySecurtyEventsColsedLoppRateDate',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,2)
    })
    request.post('SafeStatistic/GetSafetyModelRiskRankingData',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,3)
    })
  },
  setDept(context,data){
    context.commit('setDept',data)
  },
  setCoreRiskType(context,data){
  context.commit('setCoreRiskType',data)
},
  setSelectData(context,data){
    context.commit('setSelectData',data)
  },
  setDatas(context){
    let isOk=0
    let rDic={}
    let okData=function(rData,type){
      switch (type){
        case 0:
          rDic.AAndRAlertData=rData.AAndRAlertData
          break;
        case 1:
          rDic.relieveData=rData.relieveDate
          break;
        case 2:
          rDic.securityEventsClosedLoopRateDate=rData.securtyEventsColsedLoppRateDate
          break;
        case 3:
          rDic.StatisticalAnalysisRiskRankingData=rData.modelRiskRankingData
          break;
        case 4:
          rDic.safeLineDataDay=rData.safeLineData
          rDic.safeLineDataWeek=rData.safeLineData
          rDic.safeLineDataMonth=rData.safeLineData
          rDic.safeLineDataYear=rData.safeLineData
        break;
        case 5:
          rDic.earlyWarningDataDay=rData.earlyWarningData
          rDic.earlyWarningDataWeek=rData.earlyWarningData
          rDic.earlyWarningDataMonth=rData.earlyWarningData
          rDic.earlyWarningDataYear=rData.earlyWarningData
          break;
        default:break;
      }

      if(isOk===6){
        context.commit('setStatisticsData',rDic)
      }
    }
    //加载告警数量
    request.post('SafeStatistic/GetSafetyAlarmNumberDetail',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
okData(res,0)
    })
   //加载缓解详情
    request.post('SafeStatistic/GetSafetyRemissionRisk',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,1)
    })
   //加载安全事件闭环率和平均响应时间
    request.post('SafeStatistic/GetSafetySecurtyEventsColsedLoppRateDate',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,2)
    })
    //加载模块风险排名
    request.post('SafeStatistic/GetSafetyModelRiskRankingData',{
      "param": JSON.stringify(state.searchParam)
    },function(res){
      isOk+=1
      okData(res,3)
    })
    //加载安全曲线
    request.post('SafeStatistic/GetSafeCurve',{param:JSON.stringify(state.searchParam)},function(res){
      isOk+=1
      okData(res,4)
    })
    //加载同环比分析
    request.post('SafeStatistic/GetAlarmNnm',{param:JSON.stringify(state.searchParam)},function(res){
      isOk+=1
      okData(res,5)
    })
  },
  setDept(context,data){
    context.commit('setDept',data)
  },
  setCoreRiskType(context,data) {
    context.commit('setCoreRiskType', data)
  },
  setModule(context,data){
    context.commit('setModule', data)
  }
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
  }
  function getDay() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}
//本周
function getWeek() {
  //按周日为一周的最后一天计算
  var date = new Date()
  //今天是这周的第几天
  var today = date.getDay()
  //上周日距离今天的天数（负数表示）
  var stepSunDay = -today + 1
  // 如果今天是周日
  if (today == 0) {
    stepSunDay = -7
  }
  // 周一距离今天的天数（负数表示）
  var stepMonday = 7 - today
  var time = date.getTime()
  var monday = new Date(time + stepSunDay * 24 * 3600 * 1000)
  var sunday = new Date(time + stepMonday * 24 * 3600 * 1000)
  //本周一的日期 （起始日期）
  var startDate = transferDate(monday) // 日期变换
  //本周日的日期 （结束日期）
  var endDate = transferDate(sunday)// 日期变换
  return {starDate:startDate,endDate:endDate}
}
//本月
function getMonth() {

  // 获取当前月的第一天
  var start = new Date();
  start.setDate(1);

  // 获取当前月的最后一天
  var date = new Date();
  var currentMonth = date.getMonth();
  var nextMonth = ++currentMonth;
  var nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
  var oneDay = 1000 * 60 * 60 * 24;
  var end = new Date(nextMonthFirstDay - oneDay);

  var startDate = transferDate(start); // 日期变换
  var endDate = transferDate(end); // 日期变换

  return {starDate:startDate,endDate:endDate}
}
//本年
function getYear() {
  var result={}
    var dd = new Date();
    var n =  0;
    var year = dd.getFullYear() + Number(n);
  var day = year + "-01-01/" + year + "-12-31";
  result.starDate=year + "-01-01"
  result.endDate=year + "-12-31"
    return result;
};
//日期转换函数
function transferDate(date) {
    date=new Date(date)
  // 年
  var year = date.getFullYear();
  // 月
  var month = date.getMonth() + 1;
  // 日
  var day = date.getDate();

  if (month >= 1 && month <= 9) {

    month = "0" + month;
  }
  if (day >= 0 && day <= 9) {
    day = "0" + day;
  }
  var dateString = year + '-' + month + '-' + day;
  return dateString;
};
function resultHandle (list) {
  if (list === null) { return false }
  let _list = {}
  for (let i in list) {
    if (_list[list[i].ORG_CODE] === undefined) {
      _list[list[i].ORG_CODE] = {
        self: list[i],
        data: list[i].children,
        dic: resultHandle(list[i].children)
      }
    }
  }
  return _list
}
