<template>
  <div class="ModelReliefStep" id="ModelReliefStep_mitigation">
    <div class="ModelReliefStepTitle">
      <!-- 部门 -->
      <div class="InLB department">
        <div class="itemCon fr clearfix">
          <div class="fl">部门：</div>
          <div class="fl">
            <el-select v-model="map_queryParm.dept"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in departmentData"
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
            <el-select v-model="map_queryParm.module"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in modelData"
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
            <el-select v-model="map_queryParm.coreRiskType"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in riskTypeData"
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
            <el-select v-model="map_queryParm.riskType"
                       placeholder="请选择" @change="autoSelect">
              <el-option v-for="(item,index) in factorTypeData"
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
        <input type="text" @focus="Focus = false" @blur="Blur(map_queryParm.searchVal)" v-model="map_queryParm.searchVal"/>
      </div>
      <!-- 搜索 -->
      <div class="searchBtn">
        <div class="InLB ModelSelect" @click="searchClick">搜索</div>
      </div>
    </div>
    <div class="ModelReliefStepContent">
      <div class="ModelReliefStepContent_tiao"></div>
      <div class="listTitle">
        <div v-for="(item,index) in listTitle"
             :key="index">{{item}}</div>
      </div>
      <div class="listCon">
        <ul class="autoScroll" v-if="listdata.totalCount !== 0">
          <li v-for='(item,index) in listdata.riskMeasuresList'
              :key='index'>
            <div>{{(map_queryParm.curpage - 1) * 10 + (index+1)}}</div>
            <div>{{item.number}}</div>
            <div :title="item.riskfactor" @click="scoreTxt(item.riskfactor)">{{item.riskfactor}}</div>
            <div>{{item.department}}</div>
            <div>{{item.modular}}</div>
            <div>{{item.risktype}}</div>
            <div>{{item.riskfactortype}}</div>
            <div :title="item.relieveMeasures"  @click="scoreTxt(item.relieveMeasures)">{{item.relieveMeasures}}</div>
            <div>{{item.riskgrade}}</div>
            <div>{{item.riskevaluation}}</div>
            <!--<div class="delBtn" @click="DelAction(item)">删除</div>-->
            <!-- <div>
              <div @click="modelRelieveSee(item)">查看</div>
              <div @click="editAlarm(item)">编辑</div>
            </div> -->
          </li>
        </ul>
      </div>
      <p class="noList" v-if="listdata.totalCount === 0">暂无记录</p>
      <div class="Pagination" v-if="listdata.totalCount !== 0">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-size="map_queryParm.pagesize"
                       :current-page.sync="map_queryParm.curpage"
                       layout="total,prev, pager, next, jumper"
                       :total="map_queryParm.totalCount">
        </el-pagination>
        <div class="jumpbutton">跳转</div>
      </div>
    </div>
    <div class="editAlarm"
          v-show="isshowedit"
          v-drag
          @mousedown="move=true"
          @mouseup="move=false"
          :style="move?'cursor:move':''">
      <model-alarm-edit @oncloseR='onclose'></model-alarm-edit>
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
    <div class="scoreBox" v-show="scoreShow">
      <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
    </div>
    <div class="scoreBox" v-show="scoreShow">
      <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
    </div>
  </div>
</template>

<script>
import layer from '../../../../static/layer/layer.js'
import ModelAlarmEdit from './ModelRelieveMeasuresEdit.vue'
import KeyValueSelect from '../../../components/KeyValueSelect.vue'
import Dictionary from '../../../util/dictionary.js'
export default {
  components: {
    ModelAlarmEdit,
    KeyValueSelect,
    Dictionary
  },
  data () {
    return {
      Focus: true,
      scoreShow: false,
      sorceCon: '',
      DicSelList: {}, // 下拉选择列表所有项
      map_queryParm: {
        curpage: 1,
        pagesize: 10,
        totalCount: 0,
        searchVal: '',
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''}, // 筛选参数的集合
      middelList: {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: '',
        searchVal: ''
      },
      move: false,
      departmentData: [{ label: '请选择', value: null }],
      department: null,
      modelData: [{ label: '请选择', value: null }],
      model: null,
      riskTypeData: [{ label: '请选择', value: null }],
      riskType: null,
      factorTypeData: [{ label: '请选择', value: null }],
      factorType: null,
      listTitle: [
        '序号',
        '编号',
        '风险因子',
        '部门',
        '模块',
        '风险类型',
        '风险因子类型',
        '缓解措施',
        '风险等级',
        '风险评价'
        // '操作'
      ],
      listdata: [],
      //   {
      //     number: 'A2165',
      //     riskfactor: '引导员资质',
      //     department: '飞行区管理部门',
      //     modular: '工程管理',
      //     risktype: '航空器类',
      //     riskfactortype: '人员',
      //     relieveMeasures: '更换设备',
      //     riskgrade: '低',
      //     riskevaluation: '通讯设备正常，1分，通讯设备不正常，7分'
      //   }
      // ],
      currentPage3: 5,
      isshowedit: false,
      isSeeShow: false,
      value1: '',
      value2: '',
      value3: '',
      value4: '',
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
    handleClick (row) {
      console.log(row)
    },
    editAlarm (item) {
      this.isshowedit = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.map_queryParm.curpage = val
      this.loadAjaxData()
    },
    onclose () {
      this.isshowedit = false
    },
    modelRelieveSee () {
      this.isSeeShow = true
    },
    close () {
      this.isSeeShow = false
    },
    DelAction (item) {
      let _this = this
      layer.confirm('确认删除此缓解措施？', {icon: 3, skin: 'layer-ext-myskin', title: '提示'}, function () {
        layer.load(1)
        _this.post('CommonMethod/Delete',
          {
            modelName: 'BciaKpiMeasures',
            deleteData: JSON.stringify({KM_ID: item.km_id})
          }, function (delresutlt) {
            layer.closeAll()
            layer.msg('删除成功')
            _this.loadAjaxData()
          }
        )
      }, function (index) {
        layer.close(index)
      })
    },
    // 搜索
    searchClick () {
      this.map_queryParm.curpage = 1
      this.middelList.dept = this.map_queryParm.dept
      this.middelList.module = this.map_queryParm.module
      this.middelList.coreRiskType = this.map_queryParm.coreRiskType
      this.middelList.riskType = this.map_queryParm.riskType
      this.middelList.searchVal = this.map_queryParm.searchVal
      this.loadAjaxData()
    },
    loadAjaxData () {
      let _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.post('ModelManage/GetRiskMearsuresList', {
        'param': JSON.stringify({
          searchVal: _this.middelList.searchVal,
          depart: _this.middelList.dept,
          modular: _this.middelList.module,
          coreRiskType: _this.middelList.coreRiskType,
          riskType: _this.middelList.riskType
        }),
        'PageIndex': _this.map_queryParm.curpage,
        'PageSize': _this.map_queryParm.pagesize
      }, function (res) {
        _this.layer.closeAll()
        _this.map_queryParm.totalCount = res.totalCount
        _this.listdata = res
      })
    },
    autoSelect () {
      let _this = this
      let res = _this.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (_this.map_queryParm.dept === '' || _this.map_queryParm.dept === undefined || _this.map_queryParm.dept === null) {
        dept = null
      } else {
        dept = _this.map_queryParm.dept
      }
      if (_this.map_queryParm.module === '' || _this.map_queryParm.module === undefined || _this.map_queryParm.module === null) {
        modular = null
      } else {
        modular = _this.map_queryParm.module
      }
      if (_this.map_queryParm.coreRiskType === '' || _this.map_queryParm.coreRiskType === undefined || _this.map_queryParm.coreRiskType === null) {
        riskType = null
      } else {
        riskType = _this.map_queryParm.coreRiskType
      }
      if (_this.map_queryParm.riskType === '' || _this.map_queryParm.riskType === undefined || _this.map_queryParm.riskType === null) {
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
      _this.departmentData = depResult.result
      if (!depResult.isExit) {
        _this.map_queryParm.dept = depResult.result[0].ORG_CODE
        state.dept = _this.map_queryParm.dept
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
      _this.modelData = moudleResult.result
      if (!moudleResult.isExit) {
        _this.map_queryParm.module = moudleResult.result[0].ORG_CODE
        state.modular = _this.map_queryParm.module
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
      _this.riskTypeData = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.map_queryParm.coreRiskType = riskTypeResult.result[0].ORG_CODE
        state.riskType = _this.map_queryParm.coreRiskType
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
      _this.factorTypeData = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.map_queryParm.riskType = factorTypeResult.result[0].ORG_CODE
      }
    }
  },
  mounted: function () {
    let _this = this
    this.post('ModelManage/GetAllOrganization', { 'param': '{}'
    }, function (res) {
      _this.deptStructInfo = res
      _this.autoSelect()
      _this.loadAjaxData()
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
  .ModelReliefStepTitle{
    .InLB{
      display: inline-block;
    }
    .ModelReliefNum,.ModelSelect{
      position: relative;
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
}
.ModelReliefStepContent{
  .listTitle{
    @include size(95%, 2.5em);
    line-height: 2.5em;
    div{
      @include size(8%, 100%);
    }
    div:nth-child(1){
      width: 4%;
    }
    div:nth-child(2){
      /*width: 15%;*/
      width: 18%;
    }
    div:nth-child(7) {
      width: 12%;
    }
    div:last-child{
      width: 6%;
    }
  }
  ul{
    width: 95%;
    li{
      height: 2.5em;
      line-height: 2.5em;
      .delBtn{
        cursor: pointer;
        color: #0096ff !important;
      }
      div{
        @include size(8%, 100%);
      }
      div:nth-child(1){
        width: 4%;
      }
      div:nth-child(2){
        /*width: 15%;*/
        width: 18%;
      }
      div:nth-child(7) {
        width: 12%;
      }
      div:last-child{
        width: 6%;
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
    min-width: 1024px;
    height: 100%;
    position: relative;
    // 缓解措施头部1366
    .ModelReliefStepTitle {
      height: 54px;
      box-sizing: border-box;
      padding: 0px 16px 20px 16px;
      // 风险类型、因子类型
      .department,.modeldepart {
        @include size(18%, 40px);
        // background: #0096ff;
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
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
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
    // 缓解措施内容1366
    .ModelReliefStepContent {
      width: 100%;
      height: 88%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .listTitle {
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 11px;
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
        font-size: 14px;
        margin: 0 auto;
        li {
          div {
            float: left;
            margin-left: 11px;
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
    .editAlarm {
      @include size(80%, auto);
      z-index: 50;
      background: #0096ff;
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

@media only screen and (min-width: 1291px) and (max-width: 1376px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    // 缓解措施头部1366
    .ModelReliefStepTitle {
      height: 54px;
      box-sizing: border-box;
      padding: 0px 33px 20px 33px;
      // 风险类型、因子类型
      .department,.modeldepart {
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
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
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
    // 缓解措施内容1366
    .ModelReliefStepContent {
      width: 100%;
      height: 462px;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 15px;
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
    .editAlarm {
      @include size(80%, auto);
      z-index: 50;
      background: #0096ff;
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
        position: relative;
        top: 1px;
        @include size(15%, 40px);
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
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 17px;
        }
      }
      ul {
        @include size(95%, 82%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 14px;
        margin: 0 auto;
        li {
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
    .editAlarm {
      @include size(80%, auto);
      z-index: 50;
      background: #0096ff;
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
    // 缓解措施头部
    .ModelReliefStepTitle {
      height: 80px;
      box-sizing: border-box;
      padding: 20px 50px;
      .ModelReliefNum{
        top: 0;
      }
      // 部门、模块
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
      // 风险类型、因子类型
      .riskTypedepart,.factorTypedepart {
        @include size(18%, 40px);
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
      // 搜索框
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
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 19px;
        }
      }
      ul {
        @include size(95%, 80%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 15px;
        margin: 0 auto;
        li {
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
              @include size(35%, 100%);
            }
            div:nth-last-child(1) {
              @include size(35%, 100%);
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
    .editAlarm {
      @include size(80%, auto);
      z-index: 50;
      background: #0096ff;
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
          box-sizing: border-box;
          line-height: 60px;
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
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 20px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 26px;
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
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 20px;
          // margin-right:20px;
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
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          color: #0096ff;
          font-size: 28px;
        }
      }
      ul {
        @include size(95%, 87%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        margin: 0 auto;
        li {
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
        margin: 30px auto;
          .jumpbutton{
            float: left;
            margin-left: 24px;
            // margin-top: 4px;
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
    .editAlarm {
      @include size(80%, auto);
      z-index: 50;
      background: #0096ff;
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
@media only screen and (min-width: 1931px) and (max-width: 2570px) {
  #ModelReliefStep_mitigation {
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
  #ModelReliefStep_mitigation {
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
