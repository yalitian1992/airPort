/* eslint-disable */

import request from "../../util/request";

const state = {
  systemState:1,
  MenuData:{
    menuTree: [{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1'
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1'
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1'
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1'
        }]
      }]
    }],
    systemMenuTitle: [
      '菜单名称',
      '链接地址',
      '状态',
      '创建者',
      '创建时间',
      '操作'
    ],
    curNodeInfo:{},
    defaultProps: {}
  },
UserData:{
  systemUserTitle:{},
  systemUserData:[],
  pageTotal: ''
}

};

const mutations = {
  setSystemState(state,data){
    state.systemState = data
  },
  loadMenuTree(state){
    request.post('SystemMng/GetMenuList',{params:{}},function(res){
      state.MenuData.menuTree=[res]
    })
  },
  setCurNodeInfo(state,data){
    state.MenuData.curNodeInfo=data
  },
  loadUserInfo(state,data){
    console.log(data)
   state.UserData.systemUserTitle=data.listTile
    state.UserData.systemUserData=data.listData
    state.UserData.pageTotal=data.totalCount
  }

};

const actions = {
 LoadUserData(context,data){
  request.post('SystemMng/GetUserLike',data,function (res) {
    context.commit('loadUserInfo',res)
  })
}
};

export default {
    namespaced: true,
    state,
    actions,
    mutations
};
