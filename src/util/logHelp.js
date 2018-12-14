import axios from 'axios/index'
var config = require('../config/config')
var BASE_URL = config.api.baseURL
let DataLogObj = function () {
  let _this = this
  let data = {
    userMessage: JSON.parse(sessionStorage.getItem('userInfo')),
    saveInfo: {
      LOG_ID: '',
      OP_TYPE: '',
      CONTENT: '',
      TU_ID: ''
    }
  }
  this.createLogMessage = function (url) {
    data.userMessage = JSON.parse(sessionStorage.getItem('userInfo'))
    data.saveInfo = {
      OP_TYPE: -1,
      CONTENT: '',
      TU_ID: data.userMessage.TU_ID
    }
    switch (url) {
      case 'UserLogin/Login':
      case '/UserLogin/Login':
        data.saveInfo.OP_TYPE = 1
        data.saveInfo.CONTENT = '登录系统'
        _this.saveLog()
        break
      case '':
      case '/':
        break
      default:break
    }
  }
  this.saveLog = function () {
    axios.post(BASE_URL + 'CommonMethod/Save', {
      'modelName': 'BciaAuthorityTlog',
      'saveData': JSON.stringify(data.saveInfo)
    }, {
      headers: {
        // Accept:'application/json'
      }
    })
      .then()
      .catch(err => {
        console.log('记录日志报错')
        console.log(err)
        return null
      })
  }
}
let dLogObj = new DataLogObj()
let PageLogObj = function () {
  let _this = this
  let data = {
    userMessage: JSON.parse(sessionStorage.getItem('userInfo')),
    saveInfo: {
      LOG_ID: '',
      OP_TYPE: '',
      CONTENT: '',
      TU_ID: ''
    }
  }
  this.createLogMessage = function (url) {
    data.userMessage = JSON.parse(sessionStorage.getItem('userInfo'))
    data.saveInfo = {
      OP_TYPE: -1,
      CONTENT: '',
      TU_ID: data.userMessage.TU_ID
    }
    console.log(url)
    switch (url.path) {
      case '/Application':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '进入主页'
        _this.saveLog()
        break
      case '/Application/security':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '进入安全统计页面'
        _this.saveLog()
        break
      case '/Application/model':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '进入模型管理页面'
        _this.saveLog()
        break
      case '/Application/system':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '进入系统管理页面'
        _this.saveLog()
        break
      case '/Application/noticeInform':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '查看消息列表'
        _this.saveLog()
        break
      case '/Application/Account':
        data.saveInfo.OP_TYPE = 2
        data.saveInfo.CONTENT = '查看账户主页'
        _this.saveLog()
        break
      default:break
    }
  }
  this.saveLog = function () {
    axios.post(BASE_URL + 'CommonMethod/Save', {
      'modelName': 'BciaAuthorityTlog',
      'saveData': JSON.stringify(data.saveInfo)
    }, {
      headers: {
        // Accept:'application/json'
      }
    })
      .then()
      .catch(err => {
        console.log('记录日志报错')
        console.log(err)
        return null
      }
      )
  }
}
let pLogObj = new PageLogObj()
let OperateObj = function () {
  let _this = this
  let data = {
    userMessage: JSON.parse(sessionStorage.getItem('userInfo')),
    saveInfo: {
      LOG_ID: '',
      OP_TYPE: '',
      CONTENT: '',
      TU_ID: ''
    }
  }
  this.createLogMessage = function (content) {
    data.userMessage = JSON.parse(sessionStorage.getItem('userInfo'))
    data.saveInfo.OP_TYPE = 3
    data.saveInfo.CONTENT = content
    data.saveInfo.TU_ID = data.userMessage.TU_ID
    _this.saveLog()
  }
  this.saveLog = function () {
    axios.post(BASE_URL + 'CommonMethod/Save', {
      'modelName': 'BciaAuthorityTlog',
      'saveData': JSON.stringify(data.saveInfo)
    }, {
      headers: {
        // Accept:'application/json'
      }
    })
      .then()
      .catch(err => {
        console.log('记录日志报错')
        console.log(err)
        return null
      })
  }
}
let operateObj = new OperateObj()
export default {
  recordDataLog: dLogObj,
  recordPageLog: pLogObj,
  recordOperateLog: operateObj
}
