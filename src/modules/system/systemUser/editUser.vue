<template>
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <p class="meunTit"><span>{{userName}}</span></p>
    <div class="editUserBox">
      <div class="sel" style="display: inline-block;vertical-align: bottom;">
        <div class="department">
          <div class="itemCon fr clearfix">
            <div class="fl" >部门：</div>
            <div class="fl">
              <el-select name="optPartMent" v-model="map_queryParm.dept"  @change="map_queryParm_change()">
                <el-option v-for="(partItem,parIndex) in ScorPara.DepartMent"
                           :key="parIndex"
                           :value="partItem.ORG_CODE"
                           :label="partItem.ORG_NAME"
                >{{partItem.ORG_NAME}}</el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
      <div class="sel" style="display: inline-block;vertical-align: bottom;">
        <div class="department">
          <div class="itemCon fr clearfix">
            <div class="fl" >模块：</div>
            <div class="fl">
              <el-select  v-model="map_queryParm.module"  @change="map_queryParm_change()">
                <el-option v-for="(tItem,rIndex) in ScorPara.Modular"
                           :key="rIndex"
                           :value="tItem.ORG_CODE"
                           :label="tItem.ORG_NAME"
                >{{tItem.ORG_NAME}}</el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <span @click="SaveP">确定</span>
      <span class="grayBg" @click="ProData.show = false">取消</span>
    </div>
  </Prompt>
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
const ClassificationDic = 'ModelManage/GetAllOrganization'
export default {
  data () {
    return {
      userName: '',
      ProData: {
        title: '编辑',
        show: false,
        width: '500px',
        height: '300px'
      },
      ScorPara: { DepartMent: [], Modular: [] }, // 筛选指标项的参数选项集合
      map_queryParm: {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''
      }, // 筛选参数的集合
      deptStructInfo: [], // 全部的部门信息
      curItem: {}
    }
  },
  components: {
    Prompt
  },
  methods: {
    editChildShow (item) {
      this.ProData.show = true
      this.curItem = item
      this.map_queryParm.dept = ''
      this.map_queryParm.module = ''
      this.autoSelect()
      for (let i in this.ScorPara.DepartMent) {
        if (item.TO_ID === this.ScorPara.DepartMent[i].ORG_NAME) {
          this.map_queryParm.dept = this.ScorPara.DepartMent[i].ORG_CODE
          break
        }
      }
      this.autoSelect()
      for (let i in this.ScorPara.Modular) {
        if (item.TO_MODULARID === this.ScorPara.Modular[i].ORG_NAME) {
          this.map_queryParm.module = this.ScorPara.Modular[i].ORG_CODE
          break
        }
      }

      this.userName = item.LOGIN_NAME
      this.autoSelect()
    },
    autoSelect () {
      let _this = this
      let res = _this.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (
        _this.map_queryParm.dept === '' ||
        _this.map_queryParm.dept === undefined ||
        _this.map_queryParm.dept === null
      ) {
        dept = null
      } else {
        dept = _this.map_queryParm.dept
      }
      if (
        _this.map_queryParm.module === '' ||
        _this.map_queryParm.module === undefined ||
        _this.map_queryParm.module === null
      ) {
        modular = null
      } else {
        modular = _this.map_queryParm.module
      }
      if (
        _this.map_queryParm.coreRiskType === '' ||
        _this.map_queryParm.coreRiskType === undefined ||
        _this.map_queryParm.coreRiskType === null
      ) {
        riskType = null
      } else {
        riskType = _this.map_queryParm.coreRiskType
      }
      if (
        _this.map_queryParm.riskType === '' ||
        _this.map_queryParm.riskType === undefined ||
        _this.map_queryParm.riskType === null
      ) {
        factorType = null
      } else {
        factorType = _this.map_queryParm.riskType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType,
        factorType: factorType
      }
      let depResult = (function (allData, selectState) {
        let result = [{ORG_NAME: '请选择', ORG_CODE: ''}]
        let tempdic = {}
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'dept') {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: '', ORG_NAME: '请选择' }]
              : result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(res, state)
      _this.ScorPara.DepartMent = depResult.result
      if (!depResult.isExit) {
        _this.map_queryParm.dept = depResult.result[0].ORG_CODE
      }
      state.dept = _this.map_queryParm.dept

      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_NAME: '请选择', ORG_CODE: ''}]
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'modular' && selectState.dept === null) {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          } else if (allData[i].ORG_TYPE === 'modular') {
            if (
              !tempdic[allData[i].ORG_CODE] &&
              allData[i].DEPT === selectState.dept
            ) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: '', ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.modular]
        }
      })(res, state)
      _this.ScorPara.Modular = moudleResult.result
      if (!moudleResult.isExit) {
        _this.map_queryParm.module = moudleResult.result[0].ORG_CODE
      }
      state.modular = _this.map_queryParm.module

      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) {
            flg += 10
          }
          if (selectState.modular === null) {
            flg += 1
          }
          switch (flg) {
            case 0:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.dept === allData[i].DEPT
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.modular === allData[i].MOUDLAR
              ) {
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
            default:
              break
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: '', ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.riskType]
        }
      })(res, state)
      _this.ScorPara.CoreRiskType = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.map_queryParm.coreRiskType = riskTypeResult.result[0].ORG_CODE
      }
      state.riskType = _this.map_queryParm.coreRiskType
      let factorTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) {
            flg += 10
          }
          if (selectState.modular === null) {
            flg += 1
          }
          if (selectState.riskType === null) {
            flg += 100
          }
          switch (flg) {
            case 0:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.modular === allData[i].MOUDLAR &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 11:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 100:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 101:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 110:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.modular === allData[i].MOUDLAR
              ) {
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
            default:
              break
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: '', ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.factorType]
        }
      })(res, state)
      _this.ScorPara.RiskType = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.map_queryParm.riskType = factorTypeResult.result[0].ORG_CODE
      }
      state.factorType = _this.map_queryParm.riskType
    },
    map_queryParm_change () {
      this.autoSelect()
    },
    SaveP () {
      let _this = this
      let param = JSON.stringify({
        TU_ID: this.curItem.TU_ID,
        TO_ID: this.map_queryParm.dept,
        LOGIN_NAME: this.curItem.LOGIN_NAME,
        TO_MODULARID: this.map_queryParm.module
      })
      this.post('/CommonMethod/Save', {
        modelName: 'BciaAuthorityTuser',
        saveData: param
      }, function (result) {
        if (result.Status) {
          _this.layer.msg('编辑成功')
          _this.$emit('success')
          _this.ProData.show = false
        }
      })
    }
  },
  mounted () {
    let _this = this
    this.post(
      ClassificationDic,
      {
        param: '{}'
      },
      function (res) {
        _this.deptStructInfo = res
        _this.autoSelect()
        _this.layer.closeAll()
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.meunTit{
  margin-top: 20px;
  border-bottom: 1px solid #fff;
  span{
    display: block;
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #0096ff;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    border-top: 1px solid #fff;
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
  }
}
.editUserBox{
  width: 90%;
  margin: 0 auto;
  padding: 30px 0 20px 0;
  .sel{
    width: 40%;
    margin-right: 20px;
  }
}
.btnBox{
  margin-top: 20px;
  text-align: center;
  span{
    display: inline-block;
    height: 30px;
    margin: 0 20px;
    padding: 0 12px;
    cursor: pointer;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background: #1E9FFF;
  }
}
</style>
