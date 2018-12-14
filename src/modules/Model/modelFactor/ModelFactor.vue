<template>
  <div class="ModelReliefStep"
       id="ModelReliefStep">
    <div class="ModelReliefStepTitle clearfix">
      <!-- 部门 -->
      <div class="InLB department">
        <div class="itemCon fr clearfix">
          <div class="fl">部门：</div>
          <div class="fl">
            <el-select v-model="direct.depart"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in DicSelList.DepartMent"
                         :key="index"
                         :label="item.ORG_NAME"
                         :value="item.ORG_CODE">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 模块 -->
      <div class="InLB modeldepart">
        <div class="itemCon fr clearfix">
          <div class="fl">模块：</div>
          <div class="fl">
            <el-select v-model="direct.modular"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in DicSelList.Modular"
                         :key="index"
                         :label="item.ORG_NAME"
                         :value="item.ORG_CODE">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 风险类型 -->
      <div class="InLB riskTypedepart">
        <div class="itemCon fr clearfix">
          <div class="fl">风险类型：</div>
          <div class="fl">
            <el-select v-model="direct.coreRiskType"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in DicSelList.CoreRiskType"
                         :key="index"
                         :label="item.ORG_NAME"
                         :value="item.ORG_CODE">
              </el-option>
            </el-select>

          </div>
        </div>
      </div>
      <!-- 因子类型 -->
      <div class="InLB factorTypedepart">
        <div class="itemCon fr clearfix">
          <div class="fl">因子类型：</div>
          <div class="fl">
            <el-select v-model="direct.riskType"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in DicSelList.RiskType"
                         :key="index"
                         :label="item.ORG_NAME"
                         :value="item.ORG_CODE">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 编号/风险因子 -->
      <div class="InLB ModelReliefNum">
        <p class="placeH" v-show="Focus">编号/风险因子</p>
        <input type="text" @focus="Focus = false" @blur="Blur(direct.searchVal)" v-model="direct.searchVal"/>
      </div>
      <!-- 搜索 -->
      <div class="searchBtn">
        <div class="InLB ModelSelect" @click="searchClick()">搜索</div>
      </div>
    </div>
    <div class="ModelReliefStepContent">
      <div class="ModelReliefStepContent_tiao"></div>
      <div class="listTitle">
        <div v-for="(item,index) in modelFactorTitle"
             :key="index">{{item}}</div>
      </div>
      <div class="listCon">
        <ul class="autoScroll" v-if="facData.totalCount !== 0">
          <li v-for='(item,index) in facData.riskFactorList'
              :key='index'>
            <div>{{(curPage-1) * 10 + (index+1)}}</div>
            <div>{{item.number}}</div>
            <div @click="scoreTxt(item.riskfactor)" :title="item.riskfactor">{{item.riskfactor}}</div>
            <div>{{item.department}}</div>
            <div>{{item.modular}}</div>
            <div>{{item.risktype}}</div>
            <div>{{item.riskfactortype}}</div>
            <div :title="item.updatetime">{{item.updatetime}}</div>
            <div @click="scoreTxt(item.scorerules)" :title="item.scorerules">{{item.scorerules}}</div>
            <div>{{item.lastOperator}}</div>
            <!--<div class="Ed">
              <div @click="modelSee(item)">查看</div>
              <div @click="modeledit(item)">编辑</div>
            </div>-->
          </li>
        </ul>
        <p class="noList" v-else>暂无记录</p>
      </div>
      <div class="Pagination" v-if="facData.totalCount !== 0">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page.sync="curPage"
                       :page-size="pageSize"
                       layout="total,prev, pager, next, jumper"
                       :total="facData.totalCount">
        </el-pagination>
        <div class="jumpbutton">跳转</div>
      </div>
      <div class="Edit"
          v-if="isEditShow"
          v-drag
          @mousedown="move=true"
          @mouseup="move=false"
          :style="move?'cursor:move':''">
        <model-factor-edit @onclose="onclose"></model-factor-edit>
      </div>
      <div class="see"
          v-show="isSeeShow"
          v-drag
          @mousedown="move=true"
          @mouseup="move=false"
          :style="move?'cursor:move':''">
        <div class="close"
             @click="close()"></div>
      </div>
    </div>
    <div class="scoreBox" v-show="scoreShow">
      <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
    </div>
  </div>
</template>

<script>
import ModelFactorEdit from './ModelFactorEdit.vue'
import KeyValueSelect from '../../../components/KeyValueSelect.vue'
import Dictionary from '../../../util/dictionary.js'
const FactorList = 'ModelManage/GetRiskFactorList'
const {
  date: { year, month, day }
} = Dictionary
export default {
  components: {
    ModelFactorEdit,
    KeyValueSelect,
    Dictionary
  },
  data () {
    return {
      Focus: true,
      sorceCon: '',
      scoreShow: false, // 评分规则弹框显示
      DicSelList: {}, // 下拉选择列表所有项
      facData: {}, // 风险因子列表
      map_queryParm: {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''}, // 筛选参数的集合
      direct: { // 风险因子搜索条件
        searchVal: '',
        depart: '',
        modular: '',
        coreRiskType: '',
        riskType: ''
      },
      middleList: { // 过渡变量
        searchVal: '',
        depart: '',
        modular: '',
        coreRiskType: '',
        riskType: ''
      },
      yearOption: year,
      monthOption: [{ label: '全年', value: null }, ...month],
      dayOption: [{ label: '全月', value: null }, ...day],
      year: 2014,
      month: '02',
      day: '02',
      departmentData: [{ label: '请选择', value: null }],
      department: null,
      modelData: [{ label: '请选择', value: null }],
      model: null,
      riskTypeData: [{ label: '请选择', value: null }],
      riskType: null,
      factorTypeData: [{ label: '请选择', value: null }],
      factorType: null,
      modelFactorTitle: [
        '序号',
        '编号',
        '风险因子',
        '部门',
        '模块',
        '风险类型',
        '风险因子类型',
        '更新时间',
        '评分规则',
        '最后操作者'
        // '操作'
      ],
      curPage: 1,
      pageSize: 10,
      isEditShow: false,
      isSeeShow: false,
      move: false,
      deptStructInfo: []
    }
  },
  methods: {
    Blur (val) {
      if (val === '') {
        this.Focus = true
      } else {
        this.Focus = false
      }
    },
    // 评分弹框
    scoreTxt: function (txt) {
      this.scoreShow = true
      this.sorceCon = txt
    },
    // 搜索
    searchClick () {
      this.curPage = 1
      this.middleList.searchVal = this.direct.searchVal
      this.middleList.depart = this.direct.depart
      this.middleList.modular = this.direct.modular
      this.middleList.coreRiskType = this.direct.coreRiskType
      this.middleList.riskType = this.direct.riskType
      this.FactorList()
    },
    // 风险因子列表
    FactorList: function () {
      var _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.post(FactorList, {
        param: _this.middleList.depart === '' ? null : JSON.stringify(_this.middleList),
        PageIndex: _this.curPage,
        PageSize: _this.pageSize
      }, function (res) {
        _this.layer.closeAll()
        _this.facData = res
      })
    },
    selectYear (item) {
      this.year = item.value
    },
    selectMonth (item) {
      this.month = item.value
    },
    selectDay (item) {
      this.day = item.value
    },
    selectDepartment (item) {
      this.department = item.value
    },
    selectModelData (item) {
      this.model = item.value
    },
    selectriskType (item) {
      this.riskType = item.value
    },
    selectfactorTypeData (item) {
      this.factorType = item.value
    },
    modeledit (item) {
      this.isEditShow = true
    },
    onclose () {
      this.isEditShow = false
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.curPage = val
      this.FactorList()
    },
    modelSee (val) {
      this.isSeeShow = true
    },
    close () {
      this.isSeeShow = false
    },
    autoSelect () {
      let _this = this
      let res = _this.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (_this.direct.depart === '' || _this.direct.depart === undefined || _this.direct.depart === null) {
        dept = null
      } else {
        dept = _this.direct.depart
      }
      if (_this.direct.modular === '' || _this.direct.modular === undefined || _this.direct.modular === null) {
        modular = null
      } else {
        modular = _this.direct.modular
      }
      if (_this.direct.coreRiskType === '' || _this.direct.coreRiskType === undefined || _this.direct.coreRiskType === null) {
        riskType = null
      } else {
        riskType = _this.direct.coreRiskType
      }
      if (_this.direct.riskType === '' || _this.direct.riskType === undefined || _this.direct.riskType === null) {
        factorType = null
      } else {
        factorType = _this.direct.riskType
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
      _this.DicSelList.DepartMent = depResult.result
      if (!depResult.isExit) {
        _this.direct.depart = depResult.result[0].ORG_CODE
        state.dept = _this.direct.depart
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
      _this.DicSelList.Modular = moudleResult.result
      if (!moudleResult.isExit) {
        _this.direct.modular = moudleResult.result[0].ORG_CODE
        state.modular = _this.direct.modular
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
      _this.DicSelList.CoreRiskType = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.direct.coreRiskType = riskTypeResult.result[0].ORG_CODE
        state.riskType = _this.direct.coreRiskType
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
      _this.DicSelList.RiskType = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.direct.riskType = factorTypeResult.result[0].ORG_CODE
      }
    }
  },
  mounted () {
    var _this = this
    this.post('ModelManage/GetAllOrganization', { 'param': '{}'
    }, function (res) {
      _this.deptStructInfo = res
      _this.autoSelect()
      _this.FactorList()
    })
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.noList{
  margin: 0 auto;
  padding-top: 15%;
  text-align: center;
  color: #F8F8F8;
}
.scoreBox{
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  p{
    position: relative;
    display: block;
    @include size(450px, 250px);
    padding: 40px 25px 0 25px;
    margin: 10% auto;
    background: #0f1535;
    border-radius: 5px;
    font-size: 14px;
    color: #fff;
    .closeIcon{
      position: absolute;
      right: 3px;
      top: 3px;
      @include size(30px, 30px);
      border-radius: 5px;
      background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
    }
  }
}
.ModelReliefStep{
  min-width: 1024px;
  min-height: 100px;
  .ModelReliefStepTitle{
    .InLB{
      display: inline-block;
    }
    .ModelReliefNum,.ModelSelect{
      position: relative;
    }
    .searchBtn{
      display: inline-block;
      width: 5%;
      position: relative;
      .ModelSelect{
        width: 100%;
        position: absolute;
        top: 0;
        /*top: -20px;*/
      }
    }
  }
  .ModelReliefNum{
    top: -10px;
    .placeH,input{
      position: absolute;
      top: 0;
      left: 0;
      @include size(100%, 100%);
      font-size: 14px;
      padding-left: 8px;
      text-align: left;
    }
  }
  /*.ModelSelect{
    top: -20px;
  }*/
}
.ModelReliefStepContent{
  width: 100%;
  .listTitle{
    height: 2.5em;
    line-height: 2.5em;
    div{
      @include size(8%, 100%);
    }
    div:nth-child(1){
      width: 4%;
    }
    div:nth-child(2){
      width: 15%;
    }
    div:nth-child(5){
      width: 6%;
    }
    div:nth-child(7){
      width: 9%;
    }
    div:nth-child(8){
      width: 13%;
    }
  }
  ul{
    width: 95%;
    li{
      height: 2.5em;
      line-height: 2.5em;
      div{
        @include size(8%, 100%);
      }
      div:nth-child(1){
        width: 4%;
      }
      div:nth-child(2){
        width: 15%;
      }
      div:nth-child(5){
        width: 6%;
      }
      div:nth-child(7){
        width: 9%;
      }
      div:nth-child(8){
        width: 13%;
      }
    }
  }
}
.Pagination{
  .el-pagination{
    float: left;
  }
  .el-pagination,.jumpbutton{
    display: inline-block;
  }
}

@media only screen and (max-width: 1290px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    height: 100%;
    position: relative;
    // 风险因子的头部
    .ModelReliefStepTitle {
      height: 54px;
      box-sizing: border-box;
      /*padding: 0px 33px 20px 33px;*/
      padding: 0 16px 20px 16px;
      // 部门、模块
      .department,.modeldepart {
        @include size(18%, 40px);
        border-radius: 10px;
        /*margin-right: 20px;*/
        margin-right: 8px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
          }
        }
      }
      // 风险类型、因子类型
      .riskTypedepart,.factorTypedepart {
        @include size(18%, 40px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 30px);
          }
        }
      }
      // 搜索框
      .searchBtn{
        top: -40px;
        .ModelSelect {
          @include size(100%, 30px);
          text-align: center;
          line-height: 30px;
          color: #cecece;
          background: #0096ff;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      // 编号/风险因子
      .ModelReliefNum {
        @include size(12%, 30px);
        line-height: 30px;
        color: #cecece;
        border-radius: 4px;
        text-align: center;
        margin: 0 10px;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    // 风险因子的内容
    .ModelReliefStepContent {
      height: 88%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .listTitle {
        width: 95%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 14px;
        }

      }
      ul {
        /*@include size(95%, 78%);*/
        height: 80%;
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          cursor: pointer;
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #fff;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            div:nth-last-child(2) {
              @include size(40%, 100%);
              float: left;
              // background: pink;
              margin-left: 0px;
            }
            div:nth-last-child(1) {
              @include size(40%, 100%);
              color: #0096ff;
              float: right;
              // background: #0096ff;
              margin-left: 0px;
            }
          }
        }
        li:nth-child(even) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .Pagination {
        width: 95%;
        height: 5%;
        text-align: center;
        margin: 10px auto !important;
        .jumpbutton{
          float: left;
          margin-left: 24px;
          margin-top: 4px;
          width: 50px;
          height: 28px;
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
          border-radius: 5px;
          background-color: #0096ff;
          border: #0096ff 0px solid;
          cursor: pointer;
        }
      }
    }
    // 编辑弹框
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      // background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    // 查看弹框
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
        center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}

@media only screen and (min-width: 1291px) and (max-width: 1376px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    // 风险因子的头部
    .ModelReliefStepTitle {
      height: 54px;
      box-sizing: border-box;
      padding: 0px 33px 20px 33px;
      // 部门、模块
      .department,.modeldepart {
        @include size(18%, 40px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
          }
        }
      }
      // 风险类型、因子类型
      .riskTypedepart,.factorTypedepart {
        @include size(18%, 40px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 30px);
          }
        }
      }
      // 搜索框
      .searchBtn{
        top: -40px;
        .ModelSelect {
          @include size(100%, 30px);
          text-align: center;
          line-height: 30px;
          color: #cecece;
          background: #0096ff;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      // 编号/风险因子
      .ModelReliefNum {
        @include size(12%, 30px);
        line-height: 30px;
        color: #cecece;
        border-radius: 4px;
        text-align: center;
        margin: 0 10px;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    // 风险因子的内容
    .ModelReliefStepContent {
      height: 462px;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        width: 95%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 14px;
        }

      }
      ul {
        height: 80%;
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          cursor: pointer;
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #fff;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            div:nth-last-child(2) {
              @include size(40%, 100%);
              float: left;
              // background: pink;
              margin-left: 0px;
            }
            div:nth-last-child(1) {
              @include size(40%, 100%);
              color: #0096ff;
              float: right;
              // background: #0096ff;
              margin-left: 0px;
            }
          }
        }
        li:nth-child(even) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .Pagination {
        width: 95%;
        height: 5%;
        text-align: center;
        margin: 10px auto !important;
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
      }
    }
    // 编辑弹框
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      // background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    // 查看弹框
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      box-sizing: border-box;
      padding: 0px 33px 20px 33px;
      .department,
      .modeldepart {
        @include size(16%, 40px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(18%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 30px);
          }
        }
      }
      .searchBtn{
        display: inline-block;
        width: 5%;
        position: relative;
        top: -40px;
        .ModelSelect {
          position: absolute;
          top: 0;
          @include size(100%, 40px);
          text-align: center;
          line-height: 40px;
          color: #cecece;
          background: #0096ff;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .ModelReliefNum {
        @include size(15%, 40px);
        position: relative;
        top: 1px;
        line-height: 40px;
        color: #cecece;
        border-radius: 4px;
        text-align: center;
        margin: 0 10px;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        width: 95%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 16px;
        }
      }
      ul {
        height: 82%;
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          cursor: pointer;
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            div:nth-last-child(2) {
              @include size(40%, 100%);
            }
            div:nth-last-child(1) {
              @include size(40%, 100%);
              color: #0096ff;
              margin-left: 0px;
            }
          }
        }
        li:nth-child(even) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .Pagination {
        width: 95%;
        height: 5%;
        text-align: center;
        margin: 10px auto;
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      // background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      height: 80px;
      /*display: -webkit-box; !* Chrome 4+, Safari 3.1, iOS Safari 3.2+ *!
      display: -moz-box; !* Firefox 17- *!
      display: -webkit-flex; !* Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 *!
      display: -moz-flex; !* Firefox 18+ *!
      display: -ms-flexbox; !* IE 10 *!
      display: flex; !* Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ *!
      justify-content: space-around;*/
      box-sizing: border-box;
      padding: 20px 50px;
      .ModelReliefNum{
        top: 0;
      }
      /*.ModelSelect{
        top: -13px;
      }*/
      .department,.modeldepart {
        @include size(16%, 40px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 16px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
          }
        }
      }
      .riskTypedepart,.factorTypedepart {
        @include size(18%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 16px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 30px);
          }
        }
      }
      .searchBtn{
        top: -40px;
        .ModelSelect {
          @include size(100%, 40px);
          text-align: center;
          line-height: 40px;
          color: #cecece;
          background: #0096ff;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
        }
      }
      .ModelReliefNum {
        @include size(15%, 40px);
        line-height: 40px;
        color: #cecece;
        border-radius: 4px;
        text-align: center;
        margin: 0 10px;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          color: #cecece;
          outline: none;
          font-size: 16px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 16px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        width: 95%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 18px;
        }
      }
      ul {
        height: 80%;
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 14px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          cursor: pointer;
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            div:nth-last-child(2) {
              @include size(30%, 100%);
            }
            div:nth-last-child(1) {
              @include size(30%, 100%);
              color: #0096ff;
            }
          }
        }
        li:nth-child(even) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .Pagination {
        width: 95%;
        height: 5%;
        text-align: center;
        margin: 30px auto;
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(50px, 50px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 1931px){
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      box-sizing: border-box;
      padding: 60px 30px;
      width:95%;
      height:180px;
      margin:0 auto;
      font-size:26px;
      .department,
      .modeldepart {
        @include size(18%, 60px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 26px;
          box-sizing: border-box;
          .fl:nth-child(1) {
            @include size(25%, 100%);
            line-height: 80px;
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 60px);
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 30px;
          box-sizing: border-box;
          line-height: 60px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
            line-height: 80px;
          }
          .fl:nth-child(2) {
            @include size(60%, 30px);
          }
        }
      }
      .ModelSelect {
        @include size(6%, 80px);
        text-align: center;
        line-height: 80px;
        color: #cecece;
        background: #0096ff;
        border-radius: 4px;
        font-size: 26px;
        cursor: pointer;
      }
      .ModelReliefNum {
        @include size(15%, 80px);
        line-height: 80px;
        color: #cecece;
        border-radius: 4px;
        text-align: center;
        margin: 0 10px;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          color: #cecece;
          outline: none;
          font-size: 26px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 26px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 85%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        width: 95%;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 26px;
        }
      }
      ul {
        height: 87%;
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          height: 7.5%;
          cursor: pointer;
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #fff;
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            div:nth-last-child(2) {
              @include size(40%, 100%);
              float: left;
              margin-left: 0px;
            }
            div:nth-last-child(1) {
              @include size(40%, 100%);
              color: #0096ff;
              float: right;
              margin-left: 0px;
            }
          }
        }
        li:nth-child(even) {
          background: rgba(255, 255, 255, 0.1) !important;
        }
      }
      .Pagination {
        width: 95%;
        height: 5%;
        text-align: center;
        margin: 30px auto;
          .jumpbutton{
            margin-left: 24px;
            width: 80px;
            height: 40px;
            color: #fff;
            font-size: 24px;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(80px, 80px);
        position: absolute;
        right: -40px;
        top: -40px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
</style>

// 特殊样式定义
<style lang="scss">
  .el-pagination button:disabled{
    background: none !important;
  }
  .el-pagination__total{
    color: #fff !important;
  }
@media only screen and (min-width: 1931px) and (max-width: 2570px) {
  #ModelReliefStep {
    //分页标签
    .el-icon-arrow-left,
    .el-icon-arrow-right,
    .el-pager li,
    .el-pagination span:not([class*="suffix"]) {
      font-size: 32px !important;
      height: 32px !important;
    }
    .el-pagination__editor.el-input .el-input__inner {
      font-size: 32px !important;
      height:32px;
    }
    .el-pagination span{
      letter-spacing: 10px;
    }
    .el-select .el-input .el-select__caret{
      line-height: 80px;
    }
  }
}
@media only screen and (min-width: 2571px) {
  #ModelReliefStep {
    //分页标签
    .el-icon-arrow-left,
    .el-icon-arrow-right,
    .el-pager li,
    .el-pagination span:not([class*="suffix"]) {
      font-size: 32px;
    }
    .el-pagination__editor.el-input {
      width: 100px;
    }
    .el-pagination__editor {
      height: 56px;
    }
    .el-pagination__editor.el-input .el-input__inner {
      font-size: 32px;
      height:40px;
    }
  }
}
</style>
