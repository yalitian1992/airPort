<template>
 <!-- eslint-disable  -->
  <!--<div class="rolePerson" v-show="show">-->
    <!--<div class="rolePerson_warp">-->
      <!--<i class="closeIcon" @click="show = false"></i>-->
      <!--<h4><p>{{RoleInfo.ROLE_NAME}}</p></h4>-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <div class="rolePerson_warp_header">
      <div class="SelBox">
        <select v-model="powerPara.TO_ID" @change="depChange">
          <option v-for="(item , index) in deptList" :value="item.ORG_CODE">{{item.ORG_NAME}}</option>
        </select>
      </div>
      <div class="SelBox">
        <select v-model="powerPara.TO_MODULARID">
          <option v-for="(item , index) in modularList" :value="item.ORG_CODE">{{item.ORG_NAME}}</option>
        </select>
      </div>
      <div class="InpBox">
        <p class="placeH" v-show="Focus1">登录账号</p>
        <input type="text" @focus="Focus1 = false" @blur="Blur(powerPara.LOGIN_NAME, 1)" v-model="powerPara.LOGIN_NAME">
      </div>
      <div class="InpBox">
        <p class="placeH" v-show="Focus2">姓名</p>
        <input type="text" @focus="Focus2 = false" @blur="Blur(powerPara.VSERNAME, 2)" v-model="powerPara.VSERNAME">
      </div>
      <span class="btn" @click="personFun()">查询</span>
    </div>
    <div class="rolePerson_warp_content">
      <div class="list pathL">
        <ul class="autoScroll">
          <li v-for="(itemL,indexL) in listL" :key="indexL" v-on:click="SelOption(itemL,indexL,0)">
            <span v-bind:class="{Selected: lDic[indexL]}">{{itemL.VSERNAME}}</span>
          </li>
        </ul>
      </div>
      <div class="list pathR">
        <ul class="autoScroll" id="list-to-top">
          <li v-for="(itemR, indexR) in listR" :key="indexR" @click="SelOption(itemR,indexR,1)">
            <span :class="{Selected: lDicR[indexR]}">{{itemR.VSERNAME}}</span>
          </li>
        </ul>
      </div>
      <div class="optBtn">
        <span class="btn" @click="moveSelL()"> &lt;&lt; </span>
        <span class="btn" @click="moveSelR()"> >> </span>
      </div>
    </div>
    <div class="rolePerson_warp_footerBtn">
      <span class="btn" @click="Save()">确定</span>
      <span class="btn grayBg" @click="ProData.show = false">取消</span>
    </div>
  </Prompt>
    <!--</div>-->
  <!--</div>-->
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
const UserToPowerLike = 'SystemMng/GetUserToPowerLike'
const RoleToUserLike = 'SystemMng/GetRoleToUserLike'
export default {
  data () {
    return {
      Focus1: true,
      Focus2: true,
      deptList: [{ORG_CODE: null, ORG_NAME: '请选择'}], // 部门列表
      modularList: [{ORG_CODE: null, ORG_NAME: '请选择'}], // 部门列表
      // show: false,
      RoleInfo: [], // 当前角色信息
      powerPara: {
        TO_ID: '',
        LOGIN_NAME: '',
        VSERNAME: '',
        TO_MODULARID: ''
      },
      listR: [], // 右侧列表
      listL: [], // 左侧列表
      lDic: {}, // 左侧选中状态
      lDicR: {}, // 右侧选中状态
      saveIdList: [], // 要保存的list
      depNewStruct: [],
      ProData: {
        title: '',
        show: false,
        width: '600px',
        height: '500px'
      }
    }
  },
  components: {
    Prompt
  },
  watch: {
    show () {
      this.powerPara.TO_ID = ''
      this.powerPara.TO_MODULARID = ''
      this.powerPara.LOGIN_NAME = ''
      this.powerPara.VSERNAME = ''
      this.autoDepStruct()
      this.Focus1 = true
      this.Focus2 = true
      this.scrollToTop()
    }
  },
  methods: {
    scrollToTop () {
      var div = document.getElementById('list-to-top')
      div.scrollTop = 0
    },
    Blur (val, num) {
      if (num === 1) {
        if (val === '') {
          this.Focus1 = true
        } else {
          this.Focus1 = false
        }
      } else {
        if (val === '') {
          this.Focus2 = true
        } else {
          this.Focus2 = false
        }
      }
    },
    personChildShow: function (info) {
      this.RoleInfo = info
      this.ProData.title = this.RoleInfo.ROLE_NAME
      this.ProData.show = true
      this.SelectedUser()
      this.personFun()
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      )
    }, // 生成guid
    SelectedUser () {
      var _this = this
      this.post(RoleToUserLike,
        {
          param: JSON.stringify({
            tr_id: _this.RoleInfo.TR_ID
          })
        }, function (res) {
          _this.listR = res
          if (_this.listR.length) {
            for (let i in _this.listR) {
              _this.saveIdList.push(_this.listR[i].TU_ID)
            }
          }
          let temDic = {}
          for (let x in _this.listR) {
            if (temDic[x] === undefined) {
              temDic[x] = false
            }
          }
          _this.lDicR = temDic
        })
    }, // 初始加载选中的用户
    personFun: function () {
      var _this = this
      let temList = {}
      _this.listL = []
      // _this.listR = []
      this.post(UserToPowerLike, {param: JSON.stringify(this.powerPara)}, function (res) {
        temList = res.listData
        if (_this.listR.length !== 0) {
          for (let i in temList) {
            for (let s in _this.listR) {
              if (temList[i].TU_ID === _this.listR[s].TU_ID) {
                temList[i].active = true
              }
            }
          }
          for (let i in temList) {
            if (temList[i].active === undefined) {
              _this.listL.push(temList[i])
            }
          }
        } else {
          _this.listL = res.listData
        }

        let temDic = {}
        for (let x in _this.listL) {
          if (temDic[x] === undefined) {
            temDic[x] = false
          }
        }
        _this.lDic = temDic
      })
    }, // 初始加载用户列表
    SelOption: function (item, idx, is) {
      if (is === 0) {
        this.lDic[idx] = !this.lDic[idx]
      } else {
        this.lDicR[idx] = !this.lDicR[idx]
      }
    }, // 点击选中某个用户
    lDicRest () {
      let temDicL = {}
      for (let i in this.listL) {
        if (temDicL[i] === undefined) {
          temDicL[i] = false
        }
      }
      this.lDic = temDicL
      for (let i in this.lDic) {
        this.lDic[i] = false
      }
      let temDicR = {}
      for (let i in this.listR) {
        if (temDicR[i] === undefined) {
          temDicR[i] = false
        }
      }
      this.lDicR = temDicR
      for (let j in this.lDicR) {
        this.lDicR[j] = false
      }
    }, // 移动后重置选中状态
    moveSelR () {
      let tempL = []
      for (let i in this.lDic) {
        if (this.lDic[i] === true) {
          this.listR.push(this.listL[i])
        } else {
          if (i < this.listL.length) {
            tempL.push(this.listL[i])
          }
        }
      }
      this.listL = tempL
      this.lDicRest()
    },
    moveSelL () {
      let tempR = []
      for (let i in this.lDicR) {
        if (this.lDicR[i] === true) {
          this.listL.push(this.listR[i])
        } else {
          if (i < this.listR.length) {
            tempR.push(this.listR[i])
          }
        }
      }
      this.listR = tempR
      this.lDicRest()
    },
    DelFun (fun) {
      this.post('/CommonMethod/Delete', {
        modelName: 'BciaAuthorityTuserrolerelation',
        deleteData: JSON.stringify({TR_ID: this.RoleInfo.TR_ID})
      }, function (res) {
        if (res.Status === true) {
          fun()
        }
      })
    }, // 删除角色旧数据
    Save () {
      var _this = this
      _this.saveIdList = []
      let savePara = []
      for (let i in _this.listR) {
        savePara.push({
          TUR_ID: _this.guid(),
          TU_ID: _this.listR[i].TU_ID,
          TR_ID: _this.RoleInfo.TR_ID
        })
        _this.saveIdList.push(_this.listR[i].TU_ID)
      }
      _this.DelFun(function () {
        if (savePara.length === 0) {
          _this.ProData.show = false
          _this.layer.msg('设置成功！')
        }
        _this.post('CommonMethod/Save', {
          modelName: 'BciaAuthorityTuserrolerelation',
          saveData: JSON.stringify(savePara)
        },
        function (res) {
          if (!res.Status) {
            _this.layer.msg('设置失败！')
          } else {
            _this.ProData.show = false
            _this.layer.msg('设置成功！')
          }
        })
      })
    }, // 保存设置的角色
    depChange () {
      this.autoDepStruct()
    },
    autoDepStruct: function () {
      let dept = null
      let modular = null
      if (this.powerPara.TO_ID === '' || this.powerPara.TO_ID === undefined || this.powerPara.TO_ID === null) {
        dept = null
      } else {
        dept = this.powerPara.TO_ID
      }
      if (this.powerPara.TO_MODULARID === '' || this.powerPara.TO_MODULARID === undefined || this.powerPara.TO_MODULARID === null) {
        modular = null
      } else {
        modular = this.powerPara.TO_MODULARID
      }
      let state = {
        dept: dept,
        modular: modular
      }
      let depResult = (function (allData, selectState) {
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
        let tempdic = {}
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'dept') {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {result: result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(this.depNewStruct, state)
      this.modularList = depResult.result
      if (!depResult.isExit) {
        this.powerPara.TO_ID = null
      }
      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'modular' && selectState.dept === null) {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          } else if (allData[i].ORG_TYPE === 'modular') {
            if (!tempdic[allData[i].ORG_CODE] && allData[i].DEPT === selectState.dept) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {result: result,
          isExit: tempdic[selectState.modular]}
      })(this.depNewStruct, state)
      this.modularList = moudleResult.result
      if (!moudleResult.isExit) {
        this.powerPara.TO_MODULARID = null
      }
    },
    ListSel () {
      let _this = this
      this.deptList = [{ORG_CODE: null, ORG_NAME: '请选择'}]
      this.post('ModelManage/GetAllOrganization', {
        'param': '{}'
      }, function (res) {
        _this.depNewStruct = res
        for (let i in res) {
          if (res[i].ORG_TYPE === 'dept') {
            _this.deptList.push(res[i])
          }
        }
        _this.autoDepStruct()
      })
    }
  },
  mounted () {
    this.ListSel()
    // this.personFun()
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }

  input::-webkit-input-placeholder{
    color: #fef0f0;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
    color: #fef0f0;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
    color: #fef0f0;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
    color: #fef0f0;
  }

  .SelBox,.InpBox{
    position: relative;
    display: inline-block;
    width: 112px;
    height: 30px;
    overflow: hidden;
  }
  .SelBox:before,.SelBox:after{
    content: "";
    display: inline-block;
    position: absolute;
    top: -10%;
    right: 0;
    width: 32px;
    height: 120%;
  }
  .SelBox:before{
    background: #101431;
    z-index: 100;
  }
  .SelBox:after{
    background: rgba(255, 255, 255, 0.2) url('../../../assets/images/sort-down-active-nomal-icon.png') no-repeat center/contain;
    background-size: 12px 8px;
    z-index: 105;
  }
  .btn{
    display: inline-block;
    height: 30px;
    padding: 0 8px;
    cursor: pointer;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background: #1E9FFF;
  }
  .Selected{
    background: gray;
  }
  .UnSelected{
    background: none;
  }

  .rolePerson_warp_header{
    margin: 8px auto;
    select{
      width: 112px;
      height: 30px;
      padding: 0 5px;
      line-height: 30px;
      color: #fff;
      background: rgba(255, 255, 255, 0.2);
      border: none;
    }
    option{
      padding: 2px;
      line-height: 30px;
      color: #fff;
      background: rgb(64, 67, 90);
      border: none;
    }
    .placeH,input{
      width: 112px;
      height: 30px;
      position: absolute;
      top: 0;
      left: 0;
      padding: 0 5px;
      line-height: 30px;
      font-size: 14px;
      color: #fff;
      border: none;
    }
    input{
      background: rgba(255, 255, 255, 0.2);
    }
    .btn{
      float: right;
    }
  }
  .rolePerson_warp_content{
    margin: 20px auto;
    overflow: hidden;
    .list{
      @include size(40%, 300px);
      overflow: hidden;
      padding: 5px 0;
      font-size: 14px;
      background: rgba(255, 255, 255, 0.2);
      ul{
        li{
          height: 1.6em;
          line-height: 1.6em;
          cursor: pointer;
          span{
            display: block;
            padding: 0 10px;
          }
        }
      }
    }
    .list.pathL{
      float: left;
    }
    .list.pathR{
      float: right;
    }
    .optBtn{
      @include size(10%,100%);
      margin: 20% 0 0 45%;
      span{
        display: block;
        @include size(100%,25px);
        margin: 14px auto;
        line-height: 25px;
        border-radius: 3px;
      }
    }
  }
  .rolePerson_warp_footerBtn{
    text-align: right;
    span{
      margin-left: 10px;
    }
  }

  /*.rolePerson{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    &_warp{
      position: absolute;
      top: 10%;
      left: 30%;
      width: 600px;
      padding: 20px;
      background-color: #101431;
      border-radius: 5px;
      color: white;
      border: 1.5px solid #555c86;
      .closeIcon{
        position: absolute;
        right: 3px;
        top: 3px;
        width: 30px;
        height: 30px;
        cursor: pointer;
        border-radius: 5px;
        background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
      }
      h4{
        width: 100%;
        height: 50px;
        font-size: 18px;
        font-weight: inherit;
        line-height: 50px;
        border-bottom: 1px solid #3f70a2;
        p{
          width: 80%;
          height: 50px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
      }
      &_header{
        margin: 8px auto;
        select{
          width: 112px;
          height: 30px;
          padding: 0 5px;
          line-height: 30px;
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          border: none;
        }
        option{
          padding: 2px;
          line-height: 30px;
          color: #fff;
          background: rgb(64, 67, 90);
          border: none;
        }
        .placeH,input{
          width: 112px;
          height: 30px;
          position: absolute;
          top: 0;
          left: 0;
          padding: 0 5px;
          line-height: 30px;
          font-size: 14px;
          color: #fff;
          border: none;
        }
        input{
          background: rgba(255, 255, 255, 0.2);
        }
        .btn{
          float: right;
        }
      }
      &_content{
        margin: 20px auto;
        overflow: hidden;
        .list{
          @include size(40%, 300px);
          overflow: hidden;
          padding: 5px 0;
          font-size: 14px;
          background: rgba(255, 255, 255, 0.2);
          ul{
            li{
              height: 1.6em;
              line-height: 1.6em;
              cursor: pointer;
              span{
                display: block;
                padding: 0 10px;
              }
            }
          }
        }
        .list.pathL{
          float: left;
        }
        .list.pathR{
          float: right;
        }
        .optBtn{
          @include size(10%,100%);
          margin: 20% 0 0 45%;
          span{
            display: block;
            @include size(100%,25px);
            margin: 14px auto;
            line-height: 25px;
            border-radius: 3px;
          }
        }
      }
      &_footerBtn{
        text-align: right;
        span{
          margin-left: 10px;
        }
      }
    }
  }*/
</style>
