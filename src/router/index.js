import Vue from 'vue'
import Router from 'vue-router'
import RiskDetails from '@/modules/risk/RiskDetails/RiskDetails'
import Riskdisposal from '@/modules/risk/riskdisposal/Riskdisposal'
import RiskXq from '@/modules/risk/riskXq/RiskXq'
import ModelListDetails from '@/modules/Model/modelList/ModelListDetails'
import ModelListEdit from '@/modules/Model/modelList/ModelListEdit'
import addModel from '@/modules/Model/modelList/addModel'
import logObj from '@/util/logHelp'

// import ModelFactor from '@/modules/Model/modelFactor/ModelFactor'
// import ModelRelieveMeasures from '@/modules/Model/modelRelieveMeasures/ModelRelieveMeasures'
Vue.use(Router)

function load (component) {
  return () => import(`./${component}.vue`)
}
var vRouter = new Router({
  routes: [
    {
      path: '/',
      component: load('Login')
    },
    {
      path: '/Application',
      component: load('Application'),
      children: [
        {
          path: '',
          component: load('RiskHome'),
          name: 'index'
        },
        // 风险拓扑
        {
          path: 'risk',
          component: load('RiskHome'),
          name: 'risk'
        },
        {
          path: 'RiskXq',
          component: RiskXq
        },
        {
          path: 'Riskdisposal',
          name: 'Riskdisposal',
          component: Riskdisposal
        },
        // 风险地图
        {
          path: 'riskmap',
          component: load('RiskmapHome'),
          name: 'riskmap'
        },
        {
          path: 'RiskDetails',
          component: RiskDetails
        },
        // 安全统计
        {
          path: 'security',
          component: load('SecurityHome'),
          name: 'security'
        },
        // 模型管理
        {
          path: 'model',
          component: load('ModelHome'),
          name: 'model'
        },
        {
          path: 'ModelListDetails',
          component: ModelListDetails
        },
        {
          path: 'ModelListEdit',
          component: ModelListEdit
        },
        {
          path: 'addModel',
          component: addModel
        },
        // 系统管理
        {
          path: 'system',
          component: load('SystemHome'),
          name: 'system'
        },
        // 账户主页
        {
          path: 'Account',
          component: load('AccountHome'),
          name: 'Account'
        },
        // 通知信息
        {
          path: 'noticeInform',
          component: load('NoticeInformHome'),
          name: 'noticeInform'
        }
      ]
    },
    {
      path: '/test',
      component: load('test'),
      name: 'test'
    }
  ]
})
vRouter.beforeEach((to, from, next) => {
  vRouter.app.$options.store.dispatch('menuAuthor/setMenuDataFromSession', sessionStorage.getItem('menuRight'))
  vRouter.app.$options.store.dispatch('menuAuthor/setUserInforFromSession', sessionStorage.getItem('userInfo'))
  Vue.prototype.userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
  if (to.path === '/') {
    next()
  } else if (JSON.stringify(vRouter.app.$options.store.state.menuAuthor.MenuAuthDic) === '{}') {
    next('/')
  } else {
    logObj.recordPageLog.createLogMessage(to)
    next()
  }
})
export default vRouter
