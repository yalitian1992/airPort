<template>
  <div>
    <div id="_treePanel"></div>
    <!--节点编辑-->
    <ProBox ref="child"></ProBox>
    <ProBoxChild ref="nodeChild"></ProBoxChild>
  </div>
</template>

<script>
import * as Api from '../Model/modelApi'
import './../../../static/tree/jquery-1.10.2.min'
import './../../../static/tree/d3-v3/d3-v3.js'
import './../../../static/tree/d3-v3/d3-tree-skin.css'
import TreeObj from './../../../static/tree/TreeObj.js'
import layer from './../../../static/layer/layer'
import ProBox from '../model-1/proBox'
import ProBoxChild from '../model-1/proBoxChild'
export default {
  name: 'Tree',
  components: {
    ProBox: ProBox,
    ProBoxChild
  },
  props: ['modelInfo'],
  data () {
    return {
      nodeID: '', // 子节点
      selectInfo: {
        deptStructInfo: [],
        activeItems: {
          dept: '',
          modular: '',
          riskType: '',
          factorType: ''
        },
        selectList: {
          deptList: [],
          modularList: [],
          riskTypeList: [],
          factorTypeList: []
        }
      }
    }
  },
  methods: {
    autoSelect () {
      let _this = this
      let res = _this.selectInfo.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (_this.selectInfo.activeItems.dept === '' || _this.selectInfo.activeItems.dept === undefined || _this.selectInfo.activeItems.dept === null) {
        dept = null
      } else {
        dept = _this.selectInfo.activeItems.dept
      }
      if (_this.selectInfo.activeItems.modular === '' || _this.selectInfo.activeItems.modular === undefined || _this.selectInfo.activeItems.modular === null) {
        modular = null
      } else {
        modular = _this.selectInfo.activeItems.modular
      }
      if (_this.selectInfo.activeItems.riskType === '' || _this.selectInfo.activeItems.riskType === undefined || _this.selectInfo.activeItems.riskType === null) {
        riskType = null
      } else {
        riskType = _this.selectInfo.activeItems.riskType
      }
      if (_this.selectInfo.activeItems.factorType === '' || _this.selectInfo.activeItems.factorType === undefined || _this.selectInfo.activeItems.factorType === null) {
        factorType = null
      } else {
        factorType = _this.selectInfo.activeItems.factorType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType,
        factorType: factorType
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(res, state)
      _this.selectInfo.selectList.deptList = depResult.result
      if (!depResult.isExit) {
        _this.selectInfo.activeItems.dept = depResult.result[0].ORG_CODE
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.modular]}
      })(res, state)
      _this.selectInfo.selectList.modularList = moudleResult.result
      if (!moudleResult.isExit) {
        _this.selectInfo.activeItems.modular = moudleResult.result[0].ORG_CODE
      }

      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.riskType]}
      })(res, state)
      _this.selectInfo.selectList.riskTypeList = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.selectInfo.activeItems.riskType = riskTypeResult.result[0].ORG_CODE
      }

      let factorTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.factorType]}
      })(res, state)
      _this.selectInfo.selectList.factorTypeList = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.selectInfo.activeItems.factorType = factorTypeResult.result[0].ORG_CODE
      }
    },
    riskViewAutoSelect () {
      let _this = this
      let res = _this.selectInfo.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (_this.selectInfo.activeItems.dept === '' || _this.selectInfo.activeItems.dept === undefined || _this.selectInfo.activeItems.dept === null) {
        dept = null
      } else {
        dept = _this.selectInfo.activeItems.dept
      }
      if (_this.selectInfo.activeItems.modular === '' || _this.selectInfo.activeItems.modular === undefined || _this.selectInfo.activeItems.modular === null) {
        modular = null
      } else {
        modular = _this.selectInfo.activeItems.modular
      }
      if (_this.selectInfo.activeItems.riskType === '' || _this.selectInfo.activeItems.riskType === undefined || _this.selectInfo.activeItems.riskType === null) {
        riskType = null
      } else {
        riskType = _this.selectInfo.activeItems.riskType
      }
      if (_this.selectInfo.activeItems.factorType === '' || _this.selectInfo.activeItems.factorType === undefined || _this.selectInfo.activeItems.factorType === null) {
        factorType = null
      } else {
        factorType = _this.selectInfo.activeItems.factorType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType,
        factorType: factorType
      }
      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) { flg += 10 }
          if (selectState.modular === null) { flg += 1 }
          switch (flg) {
            case 0:
              if (allData[i].ORG_TYPE === 'riskType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (allData[i].ORG_TYPE === 'riskType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (allData[i].ORG_TYPE === 'riskType') {
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.riskType]}
      })(res, state)
      _this.selectInfo.selectList.riskTypeList = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.selectInfo.activeItems.riskType = riskTypeResult.result[0].ORG_CODE
        state.riskType = _this.selectInfo.activeItems.riskType
      }
      let depResult = (function (allData, selectState) {
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
        let tempdic = {}
        let flg = 0
        if (selectState.riskType === null) { flg += 10 }
        switch (flg) {
          case 0:
            for (let i in allData) {
              if (allData[i].ORG_TYPE === 'factorType' && allData[i].RISKTYPE === selectState.riskType) {
                if (!tempdic[allData[i].DEPT]) {
                  for (let j in allData) {
                    if (allData[j].ORG_TYPE === 'dept' && allData[j].ORG_CODE === allData[i].DEPT) {
                      result.push(allData[j])
                      tempdic[allData[j].ORG_CODE] = true
                    }
                  }
                }
              }
            }
            break
          case 10:
            for (let i in allData) {
              if (allData[i].ORG_TYPE === 'dept') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
            }
            break
          default:break
        }
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(res, state)
      _this.selectInfo.selectList.deptList = depResult.result
      if (!depResult.isExit) {
        _this.selectInfo.activeItems.dept = depResult.result[0].ORG_CODE
      }
      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
        let flag = 0
        if (selectState.riskType === null) {
          flag += 1
        }
        if (selectState.dept === null) {
          flag += 10
        }
        switch (flag) {
          case 0:
            for (let i in allData) {
              if (!tempdic[allData[i].MOUDLAR] && allData[i].DEPT === selectState.dept && allData[i].RISKTYPE === selectState.riskType && allData[i].ORG_TYPE === 'factorType') {
                for (let j in allData) {
                  if (allData[j].DEPT === selectState.dept && allData[j].MOUDLAR === allData[i].MOUDLAR && allData[j].ORG_TYPE === 'modular') {
                    result.push(allData[j])
                    tempdic[allData[j].ORG_CODE] = true
                  }
                }
              }
            }
            break
          case 1:
            for (let i in allData) {
              if (!tempdic[allData[i].ORG_CODE] && allData[i].DEPT === selectState.dept && allData[i].ORG_TYPE === 'modular') {
                result.push(allData[i])
                tempdic[allData[i].ORG_CODE] = true
              }
            }
            break
          case 10:
            for (let i in allData) {
              if (!tempdic[allData[i].MOUDLAR] && allData[i].RISKTYPE === selectState.riskType && allData[i].ORG_TYPE === 'factorType') {
                for (let j in allData) {
                  if (allData[j].ORG_TYPE === 'modular' && allData[j].ORG_CODE === allData[i].MOUDLAR) {
                    result.push(allData[j])
                    tempdic[allData[j].ORG_CODE] = true
                  }
                }
              }
            }
            break
          case 11:
            for (let i in allData) {
              if (!tempdic[allData[i].ORG_CODE] && allData[i].ORG_TYPE === 'modular') {
                result.push(allData[i])
                tempdic[allData[i].ORG_CODE] = true
              }
            }
            break
          default:break
        }
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.modular]}
      })(res, state)
      _this.selectInfo.selectList.modularList = moudleResult.result
      if (!moudleResult.isExit) {
        _this.selectInfo.activeItems.modular = moudleResult.result[0].ORG_CODE
      }

      let factorTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: null, ORG_NAME: '请选择'}]
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
        return {result: result.length === 0 ? [{ORG_CODE: null, ORG_NAME: '请选择'}] : result,
          isExit: tempdic[selectState.factorType]}
      })(res, state)
      _this.selectInfo.selectList.factorTypeList = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.selectInfo.activeItems.factorType = factorTypeResult.result[0].ORG_CODE
      }
    }
  },
  mounted: function () {
    var _this = this
    var Tree = new TreeObj('_treePanel')
    Tree.AddNode = function (id, cur, that) {
      _this.selectInfo.activeItems.dept = cur.MT_DEPT
      _this.selectInfo.activeItems.modular = cur.MT_MODULE
      _this.selectInfo.activeItems.riskType = cur.MT_CORERISKTYPE
      _this.selectInfo.activeItems.factorType = cur.MT_SMALLRISKTYPE
      let _curPart = {
        dept: {},
        modular: {},
        riskType: {},
        factorType: {}
      }
      let optionStr = ''
      function curPartReset () {
        _curPart = {
          dept: {value: null, text: null},
          modular: {value: null, text: null},
          riskType: {value: null, text: null},
          factorType: {value: null, text: null}
        }
      }
      function add (curPart, ytext) {
        var ck = 0// 防止双击确定保存两次数据
        layer.prompt({title: '输入新节点名称，并确认',
          formType: 2,
          maxlength: 50,
          value: ytext
        }, function (text, index) {
          if (ck === 0) {
            ck += 1
            Tree.newNodeInfo =
              {
                name: text,
                MT_ID: id,
                MT_MMID: cur.MT_MMID,
                MT_PARENTID: cur.MT_ID,
                MT_NAME: text,
                MT_ISLEAF: 1,
                MT_VIEWTYPE: cur.MT_VIEWTYPE,
                MT_ASSOCIATIONTYPE: cur.MT_ASSOCIATIONTYPE,
                MT_DEPT: curPart.dept.value,
                MT_MODULE: curPart.modular.value,
                MT_CORERISKTYPE: curPart.riskType.value,
                MT_SMALLRISKTYPE: curPart.factorType.value

              }// 设置前端新节点信息
            // 保存新节点信息
            _this.post('CommonMethod/Save', {
              modelName: 'BciaModelMtree',
              saveData: JSON.stringify({
                MT_ID: id,
                MT_MMID: cur.MT_MMID,
                MT_PARENTID: cur.MT_ID,
                MT_NAME: text,
                MT_ISLEAF: 1,
                MT_VIEWTYPE: cur.MT_VIEWTYPE,
                MT_ASSOCIATIONTYPE: cur.MT_ASSOCIATIONTYPE,
                MT_DEPT: curPart.dept.value,
                MT_MODULE: curPart.modular.value,
                MT_CORERISKTYPE: curPart.riskType.value,
                MT_SMALLRISKTYPE: curPart.factorType.value
              })
            }, function (result) {
              console.log('新节点保存：')
              console.log(result)
              // 更新父节点状态
              _this.post('CommonMethod/Save', {
                modelName: 'BciaModelMtree',
                saveData: JSON.stringify({
                  MT_ID: cur.MT_ID,
                  MT_MMID: cur.MT_MMID,
                  MT_PARENTID: cur.MT_PARENTID,
                  MT_ISLEAF: 0
                })},
              function (result2) {
                console.log('父节点保存：')
                console.log(result2)
                // 保存默认扩展信息
                _this.post('CommonMethod/Save', {
                  modelName: 'BciaModelMtreeextend',
                  saveData: JSON.stringify({
                    MTE_ID: id,
                    MTE_PERCENTAGE: 0,
                    MTE_RULETYPE: 1,
                    MTE_VARYINGWEIGHT: 0.1,
                    MTE_PTREEID: cur.MT_ID
                  })
                }, function (tresult) {
                  if (tresult.Status) {
                    cur.MT_ISLEAF = 0
                    Tree.addSubTable(cur)
                    layer.close(index)
                  }
                })
              }
              )
            })
            Api.modelModifyRecord(cur.MT_MMID)
          }
        })
      }
      function isNull (obj) {
        if (obj === null || obj === undefined || obj === '') { return true } else { return false }
      }
      switch (cur.MT_VIEWTYPE) {
        case '0':
        case 0:
          _this.autoSelect()
          if (isNull(cur.MT_DEPT)) {
            // 接下来添加部门
            optionStr = ''
            for (let j in _this.selectInfo.selectList.deptList) {
              if (_this.selectInfo.selectList.deptList[j].ORG_CODE === null) { continue }
              optionStr += '<option value="' + _this.selectInfo.selectList.deptList[j].ORG_CODE + '">' + _this.selectInfo.selectList.deptList[j].ORG_NAME + '</option>'
            }
            _this.layer.open({
              type: 1,
              title: '选择部门继续添加',
              skin: 'layer-ext-myskin', // 样式类名
              shadeClose: false,
              content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curDept" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
              btn: ['确定', '取消'],
              yes: function (index) {
                curPartReset()
                _curPart.dept = getSelectVal('curDept')
                _this.layer.close(index)
                add(_curPart, _curPart.dept.text)
              }
            })
          } else {
            if (isNull(cur.MT_MODULE) && isNull(cur.MT_CORERISKTYPE)) {
              // 添加模块或者风险类型
              if (_this.selectInfo.selectList.modularList[(_this.selectInfo.selectList.modularList.length - 1)].ORG_CODE === null) {
                // 跳过模块直接添加风险类型
                optionStr = ''
                if (_this.selectInfo.selectList.riskTypeList[(_this.selectInfo.selectList.riskTypeList.length - 1)].ORG_CODE === null) {
                  _this.layer.msg('无法添加!!</br>无模块和风险类型数据</br>请先维护数据')
                  return false
                }
                for (let j in _this.selectInfo.selectList.riskTypeList) {
                  if (_this.selectInfo.selectList.riskTypeList[j].ORG_CODE === null) { continue }
                  optionStr += '<option value="' + _this.selectInfo.selectList.riskTypeList[j].ORG_CODE + '">' + _this.selectInfo.selectList.riskTypeList[j].ORG_NAME + '</option>'
                }
                _this.layer.open({
                  type: 1,
                  title: '选择风险类型继续添加',
                  skin: 'layer-ext-myskin', // 样式类名
                  shadeClose: false,
                  content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curRiskType" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
                  btn: ['确定', '取消'],
                  yes: function (index) {
                    curPartReset()
                    _curPart.riskType = getSelectVal('curRiskType')
                    _curPart.dept.value = isNull(cur.MT_DEPT) ? null : cur.MT_DEPT
                    _curPart.modular.value = null
                    _this.layer.close(index)
                    add(_curPart, _curPart.riskType.text)
                  }
                })
              } else {
                // 添加模块
                optionStr = ''
                if (_this.selectInfo.selectList.modularList[(_this.selectInfo.selectList.modularList.length - 1)].ORG_CODE === null) {
                  _this.layer.msg('无模块数据无法添加</br>请先维护模块数据')
                  return false
                }
                for (let j in _this.selectInfo.selectList.modularList) {
                  if (_this.selectInfo.selectList.modularList[j].ORG_CODE === null) { continue }
                  optionStr += '<option value="' + _this.selectInfo.selectList.modularList[j].ORG_CODE + '">' + _this.selectInfo.selectList.modularList[j].ORG_NAME + '</option>'
                }
                _this.layer.open({
                  type: 1,
                  title: '选择模块继续添加',
                  skin: 'layer-ext-myskin', // 样式类名
                  shadeClose: false,
                  content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curModular" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
                  btn: ['确定', '取消'],
                  yes: function (index) {
                    curPartReset()
                    _curPart.modular = getSelectVal('curModular')
                    _curPart.dept.value = isNull(cur.MT_DEPT) ? null : cur.MT_DEPT
                    _this.layer.close(index)
                    add(_curPart, _curPart.modular.text)
                  }
                })
              }
            } else {
              if (isNull(cur.MT_CORERISKTYPE) && isNull(cur.MT_SMALLRISKTYPE)) {
                // 添加风险类型
                optionStr = ''
                if (_this.selectInfo.selectList.riskTypeList[(_this.selectInfo.selectList.riskTypeList.length - 1)].ORG_CODE === null) {
                  _this.layer.msg('无风险列表数据无法添加</br>请先维护风险类型数据')
                  return false
                }
                for (let j in _this.selectInfo.selectList.riskTypeList) {
                  if (_this.selectInfo.selectList.riskTypeList[j].ORG_CODE === null) { continue }
                  optionStr += '<option value="' + _this.selectInfo.selectList.riskTypeList[j].ORG_CODE + '">' + _this.selectInfo.selectList.riskTypeList[j].ORG_NAME + '</option>'
                }
                _this.layer.open({
                  type: 1,
                  title: '选择风险类型继续添加',
                  skin: 'layer-ext-myskin', // 样式类名
                  shadeClose: false,
                  content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curDept" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
                  btn: ['确定', '取消'],
                  yes: function (index) {
                    curPartReset()
                    _curPart.riskType = getSelectVal('curDept')
                    _curPart.dept.value = isNull(cur.MT_DEPT) ? null : cur.MT_DEPT
                    _curPart.modular.value = isNull(cur.MT_MODULE) ? null : cur.MT_MODULE
                    _this.layer.close(index)
                    add(_curPart, _curPart.riskType.text)
                  }
                })
              } else {
                // 添加风险因子类型
                _curPart.dept.value = cur.MT_DEPT
                _curPart.modular.value = cur.MT_MODULE
                _curPart.riskType.value = cur.MT_CORERISKTYPE
                _curPart.factorType.value = 'ENDFLAG'
                add(_curPart, '新节点')
              }
            }
          }
          break
        case '1':
        case 1:
          _this.riskViewAutoSelect()
          if (isNull(cur.MT_CORERISKTYPE)) {
            // 接下来添加风险类型
            optionStr = ''
            if (_this.selectInfo.selectList.riskTypeList[(_this.selectInfo.selectList.riskTypeList.length - 1)].ORG_CODE === null) {
              _this.layer.msg('无法添加</br>无风险类型数据</br>请先维护数据')
              return false
            }
            for (let j in _this.selectInfo.selectList.riskTypeList) {
              if (_this.selectInfo.selectList.riskTypeList[j].ORG_CODE === null) { continue }
              optionStr += '<option value="' + _this.selectInfo.selectList.riskTypeList[j].ORG_CODE + '">' + _this.selectInfo.selectList.riskTypeList[j].ORG_NAME + '</option>'
            }
            _this.layer.open({
              type: 1,
              title: '选择风险类型添加',
              skin: 'layer-ext-myskin', // 样式类名
              shadeClose: false,
              content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curRiskType" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
              btn: ['确定', '取消'],
              yes: function (index) {
                curPartReset()
                _curPart.riskType = getSelectVal('curRiskType')
                _this.layer.close(index)
                add(_curPart, _curPart.riskType.text)
              }
            })
          } else {
            // 添加部门
            if (isNull(cur.MT_DEPT)) {
              // 接下来添加部门
              optionStr = ''
              for (let j in _this.selectInfo.selectList.deptList) {
                if (_this.selectInfo.selectList.deptList[j].ORG_CODE === null) { continue }
                optionStr += '<option value="' + _this.selectInfo.selectList.deptList[j].ORG_CODE + '">' + _this.selectInfo.selectList.deptList[j].ORG_NAME + '</option>'
              }
              _this.layer.open({
                type: 1,
                title: '选择部门继续添加',
                skin: 'layer-ext-myskin', // 样式类名
                shadeClose: false,
                content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curDept" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
                btn: ['确定', '取消'],
                yes: function (index) {
                  curPartReset()
                  _curPart.dept = getSelectVal('curDept')
                  _curPart.riskType.value = cur.MT_CORERISKTYPE
                  _this.layer.close(index)
                  add(_curPart, _curPart.dept.text)
                }
              })
            } else {
              // 添加模块
              if (isNull(cur.MT_MODULE)) {
                // 添加模块或者风险类型
                if (_this.selectInfo.selectList.modularList[(_this.selectInfo.selectList.modularList.length - 1)].ORG_CODE === null) {
                  // 跳过模块直接添加因子类型
                  _curPart.dept.value = cur.MT_DEPT
                  _curPart.modular.value = null
                  _curPart.riskType.value = cur.MT_CORERISKTYPE
                  _curPart.factorType.value = 'ENDFLAG'
                  add(_curPart, '新节点')
                } else {
                  // 添加模块
                  optionStr = ''
                  if (_this.selectInfo.selectList.modularList[(_this.selectInfo.selectList.modularList.length - 1)].ORG_CODE === null) {
                    _this.layer.msg('无模块数据无法添加</br>请先维护模块数据')
                    return false
                  }
                  for (let j in _this.selectInfo.selectList.modularList) {
                    if (_this.selectInfo.selectList.modularList[j].ORG_CODE === null) { continue }
                    optionStr += '<option value="' + _this.selectInfo.selectList.modularList[j].ORG_CODE + '">' + _this.selectInfo.selectList.modularList[j].ORG_NAME + '</option>'
                  }
                  _this.layer.open({
                    type: 1,
                    title: '选择模块继续添加',
                    skin: 'layer-ext-myskin', // 样式类名
                    shadeClose: false,
                    content: ' <div class=" posirelative select-out-div" style="margin: 1em">    <select id="curModular" class="m-wrap  "  style="width: 180px; padding: 6px 0;"> ' + optionStr + ' </select> <span class="select-hide-span" >  <b class="select-show-b"  ></b></span> </div> ',
                    btn: ['确定', '取消'],
                    yes: function (index) {
                      curPartReset()
                      _curPart.modular = getSelectVal('curModular')
                      _curPart.dept.value = isNull(cur.MT_DEPT) ? null : cur.MT_DEPT
                      _curPart.riskType.value = cur.MT_CORERISKTYPE
                      _this.layer.close(index)
                      add(_curPart, _curPart.modular.text)
                    }
                  })
                }
              } else {
                if (isNull(cur.MT_SMALLRISKTYPE)) {
                  // 添加风险因子类型
                  _curPart.dept.value = cur.MT_DEPT
                  _curPart.modular.value = cur.MT_MODULE
                  _curPart.riskType.value = cur.MT_CORERISKTYPE
                  _curPart.factorType.value = 'ENDFLAG'
                  add(_curPart, '新节点')
                } else {
                  // 添加风险因子类型
                  _curPart.dept.value = cur.MT_DEPT
                  _curPart.modular.value = cur.MT_MODULE
                  _curPart.riskType.value = cur.MT_CORERISKTYPE
                  _curPart.factorType.value = 'ENDFLAG'
                  add(_curPart, '新节点')
                }
              }
            }
          }

          break
        default:break
      }
    }
    Tree.DelNode = function (curnode, that) {
      var delArry = []// 要删除的节点
      var nodes = Tree.CurnodeAndChildrens(curnode)
      for (var i in nodes) {
        delArry.push({
          MT_ID: nodes[i].MT_ID
        })
      }
      console.log(delArry)
      layer.confirm('确认删除此节点及其所有子节点信息？', {
        title: '提示',
        icon: 3,
        skin: 'layer-ext-myskin',
        btn: ['删除', '取消']
      }, function (Index) {
        layer.close(Index)
        if (!curnode.parent) {
          layer.msg('根节点无法删除')
          return false
        }
        if (curnode.parent.children.length > 1) {
          // 如果父节点还有子节点就无需修改叶子状态
        } else {
          curnode.parent.MT_ISLEAF = 1
          _this.post('CommonMethod/Save',
            {
              modelName: 'BciaModelMtree',
              saveData: JSON.stringify({
                MT_ID: curnode.parent.MT_ID,
                MT_PARENTID: curnode.parent.MT_PARENTID,
                MT_MMID: curnode.parent.MT_MMID,
                MT_ISLEAF: 1,
                MT_NAME: curnode.parent.MT_NAME
              })
            },
            function (result) {
            })
        }
        _this.post('CommonMethod/Delete', {
          modelName: 'BciaModelMtree',
          deleteData: JSON.stringify(delArry)
        }, function (result2) {
          layer.msg('删除成功')
          Api.modelModifyRecord(curnode.MT_MMID)
          Tree.removeTable(curnode)
        })
      })
    }
    Tree.NodeDbClick = function (curnode) {
      layer.prompt({ title: '输入节点新名称，并确认', formType: 2, maxlength: 50, value: curnode.MT_NAME }, function (text, index) {
        curnode.MT_NAME = text
        curnode.name = text
        _this.post('CommonMethod/Save', {
          modelName: 'BciaModelMtree',
          saveData: JSON.stringify({
            MT_ID: curnode.MT_ID,
            MT_PARENTID: curnode.MT_PARENTID,
            MT_MMID: curnode.MT_MMID,
            MT_NAME: curnode.MT_NAME
          })
        }, function (dresult) {
          Tree.Refresh(curnode)
          Api.modelModifyRecord(curnode.MT_MMID)
          layer.close(index)
        })
      })
    }
    Tree.NodeClick = function (curnodeinfo) {
      if (curnodeinfo.MT_SMALLRISKTYPE !== null && (curnodeinfo.MT_VIEWTYPE === 1 || curnodeinfo.MT_VIEWTYPE === '1')) {
        layer.msg('请在管理视图中做相关配置')
        return false
      }
      if (curnodeinfo.MT_ISLEAF == null || curnodeinfo.MT_ISLEAF === undefined) {
        alert('未找到区分是否叶子节点的标识：MT_ISLEAF')
      } else {
        switch (curnodeinfo.MT_ISLEAF) {
          case '0':
          case 0 :
            _this.$refs.nodeChild.Hide()
            _this.$refs.child.Show(curnodeinfo)
            break
          case '1':
          case 1:
            _this.$refs.child.Hide()
            _this.$refs.nodeChild.Show(curnodeinfo)
            console.log('子节点')
            break
          default:
            alert('未知状态')
            break
        }
      }
    }
    // TreeObj()
    _this.layer.load(1, {content: '<div style="width:100px;height:100px;position:relative;left:-0.5em;z-index:-100;top:2.5em">加载中...</div>'})
    _this.post('ModelManage/GetTreeList', {param: JSON.stringify({ModelId: _this.modelInfo})}, function (tdata) {
      for (var i in tdata) {
        tdata[i].id_ = tdata[i].MT_ID
        tdata[i].pid_ = tdata[i].MT_PARENTID
        tdata[i].text_ = tdata[i].MT_NAME
      }
      if (tdata.length === 0) {
        _this.$router.push('model')
      }
      Tree.data(tdata)
      Tree.Init()
      _this.layer.closeAll()
    })
    _this.post('ModelManage/GetAllOrganization', { 'param': '{}'
    }, function (res) {
      _this.selectInfo.deptStructInfo = res
      _this.autoSelect()
      console.log(_this.selectInfo)
    })
  }
}
function getSelectVal (id) {
  var obj = document.getElementById(id) // 定位id
  var index = obj.selectedIndex // 选中索引
  return {
    value: obj.options[index].value,
    text: obj.options[index].text
  }
}
</script>

<style >
</style>
