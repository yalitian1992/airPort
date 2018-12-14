<template>
  <div class="depManage">
    <div class="depManage_header">
      <p v-for="(itemH, indexH) in depTitle" :key="indexH">{{itemH}}</p>
    </div>
    <ul class="depManage_center">
      <li>
        <div class="autoScroll" v-if="DbDatas.deptList.length>0">
        <p  v-for="(itemH, indexH) in DbDatas.deptList" :key="indexH" @click="itemclick(itemH,'dept')" v-bind:class="{ active: activeItems.activeDept===itemH.ORG_CODE?true:false }">
          <span class="name">{{itemH.ORG_NAME}} [{{itemH.ORG_CODE}}]</span>
          <span class="span" @click="edit(itemH)" v-show="activeItems.activeDept===itemH.ORG_CODE?true:false">编辑<i  class="el-icon-arrow-right"></i></span>
        </p>
        </div>
        <div class="autoScroll" v-else><p style="text-align: center">无</p></div>
        <p class="lastP" @click="addDept"><i class="el-icon-plus"></i>添加部门</p>
      </li>
      <li>
        <div class="autoScroll" v-if="DbDatas.modularList.length>0">
        <p  v-for="(itemH, indexH) in DbDatas.modularList" :key="indexH" @click="itemclick(itemH,'modular')" v-bind:class="{ active: activeItems.activeModular===itemH.ORG_CODE?true:false }">
          <span class="name">{{itemH.ORG_NAME}} [{{itemH.ORG_CODE}}]</span>
          <span class="span" @click="edit(itemH)" v-show="activeItems.activeModular===itemH.ORG_CODE?true:false">编辑<i  class="el-icon-arrow-right"></i></span>
        </p>
        </div>
        <div class="autoScroll" v-else><p style="text-align: center">无</p></div>
        <p class="lastP" @click="addModular"><i class="el-icon-plus"></i>添加模块</p>
      </li>
      <li>
        <div class="autoScroll" v-if="DbDatas.riskTypeList.length>0">
        <p  v-for="(itemH, indexH) in DbDatas.riskTypeList" :key="indexH" @click="itemclick(itemH,'riskType')" v-bind:class="{ active: activeItems.activeRiskType===itemH.ORG_CODE?true:false }">
          <span class="name">{{itemH.ORG_NAME}}</span>
          <span class="span" @click="edit(itemH)" v-show="activeItems.activeRiskType===itemH.ORG_CODE?true:false">编辑<i  class="el-icon-arrow-right"></i></span>
        </p>
        </div>
        <div class="autoScroll" v-else><p style="text-align: center">无</p></div>
          <p class="lastP" @click="addRiskType"><i class="el-icon-plus"></i>添加风险类型</p>
      </li>
      <li>
        <div class="autoScroll" v-if="DbDatas.factorTypeList.length>0">
        <p  v-for="(itemH, indexH) in DbDatas.factorTypeList" :key="indexH" @click="itemclick(itemH,'factorType')" v-bind:class="{ active: activeItems.activeFactorType===itemH.ORG_CODE?true:false }">
          <span class="name">{{itemH.ORG_NAME}} [{{itemH.ORG_CODE}}]</span>
          <span class="span" @click="edit(itemH)" v-show="activeItems.activeFactorType===itemH.ORG_CODE?true:false">编辑<i  class="el-icon-arrow-right"></i></span>
        </p>
        </div>
        <div class="autoScroll" v-else><p style="text-align: center">无</p></div>
        <p class="lastP" @click="addFactorType(item)"><i class="el-icon-plus"></i>添加因子类型</p>
      </li>
    </ul>
<depAdd ref="AddR" v-on:saveSucess="saveReady"></depAdd>
  </div>
</template>

<script>
import depAdd from '../departMentsManage/depAdd'
export default {
  name: 'depManage',
  components: {
    depAdd
  },
  data () {
    return {
      depTitle: ['部门管理', '模块管理', '风险类型', '因子类型'],
      DbDatas: {
        deptList: [{name: '部门1'}, {name: '部门2'}],
        modularList: [],
        riskTypeList: [],
        factorTypeList: []
      },
      JsonResult: {},
      activeItems: {
        activeDept: 'FA',
        activeModular: '',
        activeRiskType: '',
        activeFactorType: ''
      },
      curItems: {
        cDept: {},
        cModular: {},
        cRiskType: {},
        cFactorType: {}
      },
      deptStructInfo: []

    }
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    activeItems: {
      // 注意：当观察的数据为对象或数组时，curVal和oldVal是相等的，因为这两个形参指向的是同一个数据对象
      handler (curVal, oldVal) {
        let _this = this
        for (var i in curVal) {
          switch (i) {
            case 'activeDept':
              _this.curItems.cDept = {}
              for (let j in _this.DbDatas.deptList) {
                if (_this.DbDatas.deptList[j].ORG_CODE === curVal[i]) {
                  _this.curItems.cDept = _this.DbDatas.deptList[j]
                }
              }
              break
            case 'activeModular':
              _this.curItems.cModular = {}
              for (let j in _this.DbDatas.modularList) {
                if (_this.DbDatas.modularList[j].ORG_CODE === curVal[i]) {
                  _this.curItems.cModular = _this.DbDatas.modularList[j]
                }
              }
              break
            case 'activeRiskType':
              _this.curItems.cRiskType = {}
              for (let j in _this.DbDatas.riskTypeList) {
                if (_this.DbDatas.riskTypeList[j].ORG_CODE === curVal[i]) {
                  _this.curItems.cRiskType = _this.DbDatas.riskTypeList[j]
                }
              }
              break
            case 'activeFactorType':
              _this.curItems.cFactorType = {}
              for (let j in _this.DbDatas.factorTypeList) {
                if (_this.DbDatas.factorTypeList[j].ORG_CODE === curVal[i]) {
                  _this.curItems.cFactorType = _this.DbDatas.factorTypeList[j]
                }
              }
              break
            default:break
          }
        }
      },
      deep: true
    }
  },
  methods: {
    itemclick (item, type) {
      switch (type) {
        case 'dept':
          this.activeItems.activeDept = item.ORG_CODE
          break
        case 'modular':
          this.activeItems.activeModular = item.ORG_CODE
          break
        case 'riskType':
          this.activeItems.activeRiskType = item.ORG_CODE
          break
        case 'factorType':
          this.activeItems.activeFactorType = item.ORG_CODE
          break
        default:

          break
      }
      this.autoSelect()
    },
    addDept () {
      this.$refs.AddR.addChildShow('dept', this.curItems, this.DbDatas.deptList)
    },
    addModular () {
      let _this = this
      this.$refs.AddR.addChildShow('modular', _this.curItems, this.DbDatas.modularList)
    },
    addRiskType () {
      let _this = this
      this.$refs.AddR.addChildShow('riskType', _this.curItems, this.DbDatas.riskTypeList)
    },
    addFactorType () {
      let _this = this
      this.$refs.AddR.addChildShow('factorType', _this.curItems, this.DbDatas.factorTypeList)
    },
    edit (item) {
      this.$refs.AddR.editChildShow(item, this.curItems)
    },
    resultHandle (list) {
      let _this = this
      if (list === null) { return false }
      let _list = {}
      for (let i in list) {
        if (_list[list[i].TO_ID] === undefined) {
          _list[list[i].TO_ID] = {
            self: list[i],
            data: list[i].children,
            dic: _this.resultHandle(list[i].children)
          }
        }
      }
      return _list
    },
    setView () {
      let _this = this
      _this.DbDatas.deptList = _this.JsonResult.data
      _this.itemclick(_this.DbDatas.deptList[0], 'dept')
    },
    saveReady () {
      this.layer.closeAll()
      this.layer.msg('保存成功')
      this.loadAjaxData()
    },
    loadAjaxData () {
      let _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.post('ModelManage/GetAllOrganization', { 'param': '{}'
      }, function (res) {
        _this.layer.closeAll()
        _this.deptStructInfo = res
        _this.autoSelect()
      })
    },
    autoSelect () {
      let _this = this
      let res = _this.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (_this.activeItems.activeDept === '' || _this.activeItems.activeDept === undefined || _this.activeItems.activeDept === null) {
        dept = null
      } else {
        dept = _this.activeItems.activeDept
      }
      if (_this.activeItems.activeModular === '' || _this.activeItems.activeModular === undefined || _this.activeItems.activeModular === null) {
        modular = null
      } else {
        modular = _this.activeItems.activeModular
      }
      if (_this.activeItems.activeRiskType === '' || _this.activeItems.activeRiskType === undefined || _this.activeItems.activeRiskType === null) {
        riskType = null
      } else {
        riskType = _this.activeItems.activeRiskType
      }
      if (_this.activeItems.activeFactorType === '' || _this.activeItems.activeFactorType === undefined || _this.activeItems.activeFactorType === null) {
        factorType = null
      } else {
        factorType = _this.activeItems.activeFactorType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType,
        factorType: factorType
      }
      let depResult = (function (allData, selectState) {
        let result = []
        let tempdic = {}
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'dept') {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {result: result.length === 0 ? [] : result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(res, state)
      _this.DbDatas.deptList = depResult.result
      if (!depResult.isExit) {
        if (depResult.result.length > 0) {
          _this.activeItems.activeDept = depResult.result[0].ORG_CODE
        } else {
          _this.activeItems.activeDept = null
        }

        state.dept = _this.activeItems.activeDept
      }
      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
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
        return {result: result.length === 0 ? [] : result,
          isExit: tempdic[selectState.modular]}
      })(res, state)
      _this.DbDatas.modularList = moudleResult.result
      if (!moudleResult.isExit) {
        if (moudleResult.result.length > 0) {
          _this.activeItems.activeModular = moudleResult.result[0].ORG_CODE
        } else {
          _this.activeItems.activeModular = null
        }
        state.modular = _this.activeItems.activeModular
      }

      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) { flg += 10 }
          if (selectState.modular === null) { flg += 1 }
          switch (flg) {
            case 0:
              if (allData[i].ORG_TYPE === 'riskType' && selectState.dept === allData[i].DEPT && selectState.modular === allData[i].MOUDLAR) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (allData[i].ORG_TYPE === 'riskType' && selectState.dept === allData[i].DEPT) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (allData[i].ORG_TYPE === 'riskType' && selectState.modular === allData[i].MOUDLAR) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 11:
              if (allData[i].ORG_TYPE === 'riskType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            default:break
          }
        }
        return {result: result.length === 0 ? [] : result,
          isExit: tempdic[selectState.riskType]}
      })(res, state)
      _this.DbDatas.riskTypeList = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        if (riskTypeResult.result.length > 0) {
          _this.activeItems.activeRiskType = riskTypeResult.result[0].ORG_CODE
        } else {
          _this.activeItems.activeRiskType = null
        }
        state.riskType = _this.activeItems.activeRiskType
      }

      let factorTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) { flg += 10 }
          if (selectState.modular === null) { flg += 1 }
          if (selectState.riskType === null) { flg += 100 }
          switch (flg) {
            case 0:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.dept === allData[i].DEPT && selectState.modular === allData[i].MOUDLAR && selectState.riskType === allData[i].RISKTYPE) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.dept === allData[i].DEPT && selectState.riskType === allData[i].RISKTYPE) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.modular === allData[i].MOUDLAR && selectState.riskType === allData[i].RISKTYPE) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 11:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.riskType === allData[i].RISKTYPE) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 100:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.dept === allData[i].DEPT && selectState.modular === allData[i].MOUDLAR) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              } break
            case 101:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.dept === allData[i].DEPT) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 110:
              if (allData[i].ORG_TYPE === 'factorType' && selectState.modular === allData[i].MOUDLAR) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 111:
              if (allData[i].ORG_TYPE === 'factorType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            default:break
          }
        }
        return {result: result.length === 0 ? [] : result,
          isExit: tempdic[selectState.factorType]}
      })(res, state)
      _this.DbDatas.factorTypeList = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        if (factorTypeResult.result.length > 0) {
          _this.activeItems.activeFactorType = factorTypeResult.result[0].ORG_CODE
        } else {
          _this.activeItems.activeFactorType = null
        }
      }
    }

  },
  mounted () {
    this.loadAjaxData()
  }
}
</script>

<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }

  .depManage{
    margin: 0 auto;
    width: 97%;
    height: 90%;
    min-width: 800px;
    min-height: 450px;
    overflow: hidden;
    border: 2px solid gray;
    &_header{
      text-align: center;
      width: 100%;
      font-size:16px;
      line-height: 2.5em;
      p{
        display: inline-block;
        @include size(25%, 2.5em);
        text-align: center;
        background: rgba(20, 60, 177, 0.48);
        color: white;
      }
    }
    &_center{
      overflow: hidden;
      height: 92%;
      font-size: 14px;
      li{
        position: relative;
        float: left;
        @include size(25%,100%);
        border-right: 2px solid gray;
        overflow: hidden;
        div{
          overflow-y: scroll;
          height: 100%-11;
        }
        p{
          position: relative;
          padding: 0 10px;
          cursor: pointer;
          height: 2.5em;
          line-height: 2.5em;
          border-bottom: 2px solid gray;
          .name{
            display: inline-block;
            width: 80%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .span{
            position: absolute;
            right: 10px;
            color: #0096ff;
          }
          .tipBox{
            position: absolute;
            top: 90%;
            left: 20%;
            z-index: 1000;
            @include size(100%, 100px);
            background: rgba(255,255,255,1);
            border: 1.5px solid gray;
            span{
              left: 5px;
            }
            i{
              cursor: pointer;
              margin: 0 2%;
            }
          }
        }
        p.active{
          background: rgba(88, 146, 255, 0.6);
        }
        p.lastP{
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          cursor: pointer;
          height: 2.5em;
          line-height: 2.5em;
          text-align: center;
          border: none;
          border-top: 2px solid gray;
        }
      }
      li:last-child{
        border: none;
      }
    }
    &_footer{
      position: relative;

    }
  }
  @media screen and (min-width: 2560px) {
    .depManage{
      &_header{
       font-size: 32px;
      }
      &_center{
        height: 94%;
        font-size:28px;
      }
    }
  }
</style>
