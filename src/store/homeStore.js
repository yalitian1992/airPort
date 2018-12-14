/* eslint-disable */

const state = {
    riskfactoryrankConData:[
        { name: '引导员资质', value: Math.floor(Math.random() * 10 + 1) },
        { name: '车辆交通违章率', value: Math.floor(Math.random() * 10 + 1) },
        { name: '廊桥状态', value: Math.floor(Math.random() * 10 + 1) },
        { name: '是否动电', value: Math.floor(Math.random() * 10 + 1) },
        { name: '通话合规性', value: Math.floor(Math.random() * 10 + 1) },
        { name: '车辆速度', value: Math.floor(Math.random() * 10 + 1) },
        { name: '劳保用品适用性', value: Math.floor(Math.random() * 10 + 1) },
        { name: '消防器材配备情况', value: Math.floor(Math.random() * 10 + 1) },
        { name: '天气情况', value: Math.floor(Math.random() * 10 + 1) },
        { name: '电销雷检合规性', value: Math.floor(Math.random() * 10 + 1) },
        {
          name: '工作人员连续工作时间',
          value: Math.floor(Math.random() * 10 + 1)
        }
      ],
      data:[
        { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '02:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '06:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '10:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '14:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '18:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '22:00', value: Math.floor(Math.random() * 10 + 1) }
      ],
      data1:[
        { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '24:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
        { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
      ],
      riskData: [
        { name: '跑道入侵', value: Math.floor(Math.random() * 10 + 1) },
        { name: '应急救援', value: Math.floor(Math.random() * 10 + 1) },
        { name: '消防类', value: Math.floor(Math.random() * 10 + 1) },
        { name: '信息安全', value: Math.floor(Math.random() * 10 + 1) },
        { name: '人伤类', value: Math.floor(Math.random() * 10 + 1) },
        { name: '其他类', value: Math.floor(Math.random() * 10 + 1) },
        { name: '空防反恐', value: Math.floor(Math.random() * 10 + 1) },
        { name: '航空器类', value: Math.floor(Math.random() * 10 + 1) }
      ]
};

const mutations = {
    setRiskfactoryrankConData(state,data){
        state.riskfactoryrankConData= [
            { name: '引导员资质', value: Math.floor(Math.random() * 10 + 1) },
            { name: '车辆交通违章率', value: Math.floor(Math.random() * 10 + 1) },
            { name: '廊桥状态', value: Math.floor(Math.random() * 10 + 1) },
            { name: '是否动电', value: Math.floor(Math.random() * 10 + 1) },
            { name: '通话合规性', value: Math.floor(Math.random() * 10 + 1) },
            { name: '车辆速度', value: Math.floor(Math.random() * 10 + 1) },
            { name: '劳保用品适用性', value: Math.floor(Math.random() * 10 + 1) },
            { name: '消防器材配备情况', value: Math.floor(Math.random() * 10 + 1) },
            { name: '天气情况', value: Math.floor(Math.random() * 10 + 1) },
            { name: '电销雷检合规性', value: Math.floor(Math.random() * 10 + 1) },
            {
              name: '工作人员连续工作时间',
              value: Math.floor(Math.random() * 10 + 1)
            }
          ]
          state.data=[
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '02:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '06:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '10:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '14:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '18:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '22:00', value: Math.floor(Math.random() * 10 + 1) }
          ]
          state.data1=[
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
          ]
          state.riskData= [
            { name: '跑道入侵', value: Math.floor(Math.random() * 10 + 1) },
            { name: '应急救援', value: Math.floor(Math.random() * 10 + 1) },
            { name: '消防类', value: Math.floor(Math.random() * 10 + 1) },
            { name: '信息安全', value: Math.floor(Math.random() * 10 + 1) },
            { name: '人伤类', value: Math.floor(Math.random() * 10 + 1) },
            { name: '其他类', value: Math.floor(Math.random() * 10 + 1) },
            { name: '空防反恐', value: Math.floor(Math.random() * 10 + 1) },
            { name: '航空器类', value: Math.floor(Math.random() * 10 + 1) }
          ]
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
  