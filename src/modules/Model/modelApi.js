/*eslint-disable */
import axios from "axios";
const config = require('../../config/config')
const baseURL = config.api.baseURL


// 首页中拓扑图中管理视图
export async function modelModifyRecord(modelId){
  let saveData=[]
  saveData.push({
    MM_ID:modelId,
    MM_LAST_MODIFYTIME:(new Date())
  })
  return axios.post(`${baseURL}CommonMethod/Save`,{
    "modelName": "BciaModelMmodel",
    "saveData": JSON.stringify(saveData)
  });
}

export async function getItemRepaireDic(itemId){
  return axios.post(`${baseURL}ModelManage/GetMapItemDic`,{
    "param":JSON.stringify({
      itemId:itemId
    })
  })
}
