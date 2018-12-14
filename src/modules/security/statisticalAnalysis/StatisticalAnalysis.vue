<template>
  <div class="statisticalAnalysis clearfix">
    <!-- 标题选项内容 -->
    <div class="el-head">
      <div style="float: left;padding: 5px;width: 28%;">
        <div class="grid-content bg-purple" style="overflow: hidden">
          <!-- 日期选项 -->
          <statistical-analysis-title style="overflow: hidden"></statistical-analysis-title>
        </div>
      </div>
      <div class="selectBox">
        <search-box style="width: 100%;">
          <search-item style="vertical-align: middle">
            <el-col :span="18" center="true">
              <div class="grid-content bg-purple">
                <!-- 部门 -->
                <label class="tit">部门：</label>
                <el-select v-model="defalultSelect.dept" @change="depChange"
                           placeholder="请选择">
                  <el-option v-for="item in departmentData"
                             :key="item.value"
                             :label="item.ORG_NAME"
                             :value="item.ORG_CODE">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </search-item>
          <search-item style="vertical-align: middle">
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <!--模块-->
                <label class="tit">模块：</label>
                <el-select v-model="defalultSelect.modular" @change="moudleChange"
                           placeholder="请选择">
                  <el-option v-for="item in moudleData"
                             :key="item.value"
                             :label="item.ORG_NAME"
                             :value="item.ORG_CODE">
                  </el-option>
                </el-select>
              </div>
            </el-col>
          </search-item>
          <search-item style="vertical-align: middle">
            <el-col :span="18">
              <div class="grid-content bg-purple">
                <!-- 风险类型 -->
                <label class="tit">风险类型：</label>
                <!--<div class="fl">-->
                <el-select v-model="defalultSelect.riskType"
                           placeholder="请选择"
                           @change="coreRiskTypeChange">
                  <el-option v-for="item in riskTypeData"
                             :key="item.value"
                             :label="item.ORG_NAME"
                             :value="item.ORG_CODE">
                  </el-option>
                </el-select>
                <!--</div>-->
              </div>
            </el-col>
          </search-item>
        </search-box>
      </div>
    </div>
    <div class="statisticalAnalysis_aAndR clearfix">
      <!-- 报警总数，橙色预警，红色预警 -->
      <div class='statisticalAnalysis_aAndR_alert fl'>
        <a-and-r-alert></a-and-r-alert>
      </div>
      <!-- 已缓解，待缓解 -->
      <div class="statisticalAnalysis_aAndR_relieve fl">
        <!-- 已缓解 -->
        <div class="statisticalAnalysis_aAndR_relieve_left fl">
          <div class="relieveProess fl">
            <circle-scale1 :valueData="relieveData.remissionPercentage" color1="#FFB400" color2="#2343B5"></circle-scale1>
            <!-- <span>{{relieveData.remissionPercentage||0}}%</span> -->
          </div>
          <div class="relievedata fr">
            <span>已缓解</span>
            <span>{{relieveData.remissionNum||0}}</span>
          </div>
        </div>
        <!-- 待缓解 -->
        <div class="statisticalAnalysis_aAndR_relieve_right fl">
          <div class="relieveProess fl">
            <img src="../../../assets/images/daohuanjie.png">
          </div>
          <div class="relievedata fr">
            <span>待缓解</span>
            <span>{{relieveData.await||0}}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="statisticalAnalysis_sLAndRTAndCLR">
      <!-- 安全曲线 -->
      <div class="statisticalAnalysis_sLAndRTAndCLR_safeLine fl" >
        <div class="statisticalAnalysis_sLAndRTAndCLR_safeLine_title">安全曲线</div>
        <div class="statisticalAnalysis_sLAndRTAndCLR_safeLine_content">
          <area-line @click="eClick" :data="getSafeLineData" ref="safeLineChart"></area-line>
        </div>
      </div>
      <!-- 平均响应时间，安全事件闭环率 -->
      <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate fl">
        <!-- 平均响应时间 -->
        <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_responseTime fl">
          <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_responseTime_title fl">平均响应时间</div>
          <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_responseTime_content fl">
            <div class="responseTimes">
              <span>平均响应耗时</span>
              <span>{{securityEventsClosedLoopRateDate.timeConsuming||''}}</span>
            </div>
            <div class="averageResponseTime">
              <span>响应次数：{{securityEventsClosedLoopRateDate.ResponseTimes||''}}</span>
              <div class="proess">
                <div v-for="(index) in 20" :key="index"></div>
              </div>
            </div>
          </div>
        </div>
        <!-- 安全事件闭环率 -->
        <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_closeLoopRate fl">
          <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_closeLoopRate_title fl">安全事件闭环率</div>
          <div class="statisticalAnalysis_sLAndRTAndCLR_rtAndCLRate_closeLoopRate_content fl">
            <div class="securityEventsRate">
              <circle-scale :valueData="securityEventsClosedLoopRateDate.securityEventsClosedLoopRate||''" color1="#008AFF" color2="#999999" ref="circleScaleChart"></circle-scale>
              <!-- <span>{{securityEventsClosedLoopRateDate.securityEventsClosedLoopRate||''}}%</span> -->
            </div>
            <div class="risk">
             <!-- <span>比目标值偏低{{securityEventsClosedLoopRateDate.LowerThanTargetValue||''}}%</span>-->
              <div class="breakdownRisk fl">
                <span>{{securityEventsClosedLoopRateDate.breakdownRisk||''}}%</span>
                <span>击穿风险</span>
              </div>
              <div class="HighRisk fl">
                <span>{{securityEventsClosedLoopRateDate.HighRisk||''}}%</span>
                <span>高风险</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="statisticalAnalysis_mRRAndQOQA">
      <!-- 模块风险排名 -->
      <div class="statisticalAnalysis_mRRAndQOQA_moduleRiskRankings fl">
        <div class="statisticalAnalysis_mRRAndQOQA_moduleRiskRankings_title">报警数排名</div>
        <div class="statisticalAnalysis_mRRAndQOQA_moduleRiskRankings_content">
          <ul>
            <li v-for="(item,index) in riskfactoryrankConStateData"
                :key="index">
              <div class="name"
                  v-if="item.value && Number(item.value) <= 90"
                  :title="item.name">{{item.name}}</div>
              <div class="name  danger"
                 v-else-if="90 < item.value && Number(item.value) <= 100"
                  :title="item.name">{{item.name}}</div>
              <div class="name"
                   v-else=""
                   :title="item.name">{{item.name}}</div>
              <div class="infoBase">
                <div class="info  red"
                    :style="{width:item.value+'%'}"
                    v-if="90 < item.value && Number(item.value) <= 100"></div>
                <div class="info  orange"
                    :style="{width:item.value+'%'}"
                    v-if="60 < item.value && Number(item.value) <= 90"></div>
                <div class="info  yellow"
                    :style="{width:item.value+'%'}"
                    v-if="30 < item.value && Number(item.value) <= 60"></div>
                <div class="info  blue"
                    :style="{width:item.value+'%'}"
                    v-if="1 <= item.value && Number(item.value) <= 30"></div>
                <div class="info  blue"
                     :style="{width:0+'%'}"
                     v-else=""></div>
              </div>
              <div class="value" :class="item.value>0&&item.value<=30?'valueBlue':(item.value>30&&item.value<=60?'valueYellow':(item.value>60&&item.value<=90?'valueOrange':(item.value>90&&item.value<=100?'valueRed':'')))">{{item.value}} %</div>
            </li>
            <div class="border-triangle">
              <div class="border"></div>
              <div class="border"></div>
              <div class="border"></div>
            </div>
            <div class="triangle_border">
              <div class="triangle_border_up"></div>
              <div class="triangle_border_up"></div>
              <div class="triangle_border_up"></div>
              <div class="triangle_border_up"></div>
              <div class="triangle_border_up last"></div>
            </div>
          </ul>
        </div>
        <!-- <div class="riskfactoryrankCon"> -->
      <!-- <risk-factors-for-ranking :data="riskfactoryrankConFinData"></risk-factors-for-ranking> -->
        <!-- </div> -->
      </div>
      <!-- 同环比分析 -->
      <div class="statisticalAnalysis_mRRAndQOQA_quarterOnQuarterAnalysis fl">
        <div class="statisticalAnalysis_mRRAndQOQA_quarterOnQuarterAnalysis_title">同环比分析</div>
        <div class="statisticalAnalysis_mRRAndQOQA_quarterOnQuarterAnalysis_content">
          <early-warning-echart :earlyWarning="getEarlyWarningDataStateData" ref="EarlyWarningDataStateDataChart"> </early-warning-echart>
        </div>
      </div>
    </div>
    <div class="scoreBox" v-show="scoreShow">
      <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import StatisticalAnalysisTitle from './StatisticalAnalysisTitle'
import earlyWarningEchart from '../../../components/echarts/earlyWarningEchart.vue'
import AAndRAlert from './AAndRAlert'
import AreaLine from '../../../components/echarts/AreaLine'
import CircleScale from '../../../components/echarts/CircleScale.vue'
import CircleScale1 from '../../../components/echarts/CircleScale1.vue'
import SearchBox from '../../../components/common/searchBox'
import SearchItem from '../../../components/common/searchItem'
export default {
  components: {
    StatisticalAnalysisTitle,
    earlyWarningEchart,
    AAndRAlert,
    AreaLine,
    CircleScale,
    CircleScale1,
    SearchBox,
    SearchItem
  },
  data () {
    return {
      riskTypeData: [{ label: '请选择', value: null }],
      departmentData: [{ label: '请选择', value: null }],
      moudleData: [{label: '请选择', value: null}],
      defalultSelect: {
        dept: '',
        modular: '',
        riskType: ''
      },
      EarlyWarningData: [
        {
          name: '本期',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 100 + 1) }
          ]
        },
        {
          name: '同比',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 100 + 1) }
          ]
        },
        {
          name: '环比',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 100 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 100 + 1) }
          ]
        }
      ],
      safeLine: [ ],
      sorceCon: '',
      scoreShow: false,
      ready: false
    }
  },
  methods: {
    ...mapActions('SecurityStore', ['setDept', 'setDatas', 'setCoreRiskType', 'setModule', 'setNewDeptStruct']),
    depChange (val) {
      this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.setDept(val)
      this.autoDepStruct()
      this.setDatas()
    },
    coreRiskTypeChange (val) {
      this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.setCoreRiskType(val)
      this.setDatas()
    },
    moudleChange (val) {
      this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.setModule(val)
      this.autoDepStruct()
      this.setDatas()
    },
    autoDepStruct: function () {
      let dept = ''
      let modular = ''
      let riskType = ''
      if (this.defalultSelect.dept === '' || this.defalultSelect.dept === undefined || this.defalultSelect.dept === null) {
        dept = ''
      } else {
        dept = this.defalultSelect.dept
      }
      if (this.defalultSelect.modular === '' || this.defalultSelect.modular === undefined || this.defalultSelect.modular === null) {
        modular = ''
      } else {
        modular = this.defalultSelect.modular
      }
      if (this.defalultSelect.riskType === '' || this.defalultSelect.riskType === undefined || this.defalultSelect.riskType === null) {
        riskType = ''
      } else {
        riskType = this.defalultSelect.riskType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType
      }
      let depResult = (function (allData, selectState) {
        let result = [{ORG_CODE: '', ORG_NAME: '请选择'}]
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
          isExit: selectState.dept === '' ? false : tempdic[selectState.dept]
        }
      })(this.depNewStruct, state)
      this.departmentData = depResult.result
      if (!depResult.isExit) {
        this.defalultSelect.dept = ''
      }
      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: '', ORG_NAME: '请选择'}]
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'modular' && selectState.dept === '') {
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
      this.moudleData = moudleResult.result
      if (!moudleResult.isExit) {
        this.defalultSelect.modular = ''
      }
      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_CODE: '', ORG_NAME: '请选择'}]
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === '') { flg += 10 }
          if (selectState.modular === '') { flg += 1 }
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
        return {result: result,
          isExit: tempdic[selectState.riskType]}
      })(this.depNewStruct, state)
      this.riskTypeData = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        this.defalultSelect.riskType = ''
      }
    },
    reSet: function () {
      this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.setDept('')
      this.setCoreRiskType('')
      this.setModule('')
      this.autoDepStruct()
      // this.setDatas()
    },
    eClick (params) {
      // this.scoreShow = true
      this.sorceCon = params.name + '风险值' + params.value
    },
    down () {
      let _this = this
      let src = {
        safeLine: this.$refs.safeLineChart.getDataURL({
          type: 'png',
          // 导出的图片分辨率比例，默认为 1。
          pixelRatio: 1,
          // 导出的图片背景色，默认使用 option 里的 backgroundColor
          backgroundColor: '#3e529e'
        }),
        circleScale: this.$refs.circleScaleChart.getDataURL({
          type: 'png',
          // 导出的图片分辨率比例，默认为 1。
          pixelRatio: 1,
          // 导出的图片背景色，默认使用 option 里的 backgroundColor
          backgroundColor: '#3e529e'
        }),
        earlyDataChart: this.$refs.EarlyWarningDataStateDataChart.getDataURL({
          type: 'png',
          // 导出的图片分辨率比例，默认为 1。
          pixelRatio: 1,
          // 导出的图片背景色，默认使用 option 里的 backgroundColor
          backgroundColor: '#3e529e'
        })
      }
      _this.layer.load(1, {content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">报告下载中...</div>'})
      this.postJ('bcia/FileHelp/ExportSafeReport', {StartDate: this.searchParam.StartDate,
        EndDate: this.searchParam.EndDate,
        Dept: this.searchParam.Dept,
        CoreRiskType: this.searchParam.CoreRiskType,
        Modular: this.searchParam.Modular,
        safeLine: src.safeLine,
        circleScale: src.circleScale,
        earlyDataChart: src.earlyDataChart}
        , function (res) {
        _this.layer.closeAll()
        if (!res.state) {
          _this.layer.msg('下载失败')
          return false
        } else {
          if (!!window.ActiveXObject || 'ActiveXObject' in window) { window.open(_this.BASE_URL + res.path) } else {
            window.location.href = _this.BASE_URL + res.path // 下载
          }
        }
      }
      )
    }
  },
  computed: {
    /* eslint-disable*/
    ...mapState('SecurityStore', ['relieveData', 'securityEventsClosedLoopRateDate', 'StatisticalAnalysisRiskRankingData','rePortCount','searchParam']),
    ...mapState('SecurityStore', ['earlyWarningDataDay', 'earlyWarningDataWeek', 'earlyWarningDataMonth', 'earlyWarningDataYear', 'SelectData']),
    ...mapState('SecurityStore', ['safeLineDataDay', 'safeLineDataWeek', 'safeLineDataMonth', 'safeLineDataYear','depNewStruct']),

    getEarlyWarningDataStateData () {
      this.layer.closeAll()

      if (this.SelectData === 0) {
        this.EarlyWarningData = this.earlyWarningDataDay
      } else if (this.SelectData === 1) {
        this.EarlyWarningData = this.earlyWarningDataWeek
      } else if (this.SelectData === 2) {
        this.EarlyWarningData = this.earlyWarningDataMonth
      } else if (this.SelectData === 3) {
        this.EarlyWarningData = this.earlyWarningDataYear
      }
      if(this.ready===false){
        let _this=this
        setTimeout(function () {
          _this.layer.load(1, {success: function (layero) {
              document.querySelector('.layui-layer-shade').style.height = '82%'
              document.querySelector('.layui-layer-shade').style.top = '16%'
            },
            content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em"></div>'})
          _this.setDatas()
          _this.ready=true
        },1000)

      }
      return this.EarlyWarningData
    },
    getSafeLineData () {
      if (this.SelectData === 0) {
        this.safeLine = this.safeLineDataDay
      } else if (this.SelectData === 1) {
        this.safeLine = this.safeLineDataWeek
      } else if (this.SelectData === 2) {
        this.safeLine = this.safeLineDataMonth
      } else if (this.SelectData === 3) {
        this.safeLine = this.safeLineDataYear
      }
      return this.safeLine
    },
    riskfactoryrankConStateData () {
      if (
        this.StatisticalAnalysisRiskRankingData &&
        this.StatisticalAnalysisRiskRankingData !== undefined &&
        this.StatisticalAnalysisRiskRankingData !== null
      ) {
        /*var filterNume =
          this.StatisticalAnalysisRiskRankingData &&
          this.StatisticalAnalysisRiskRankingData.map(o => o.value && Number(o.value));
        console.log('1', filterNume)
        var sortNum =
          filterNume &&
          filterNume.sort(function(a, b) {
            return b - a;
          });
        console.log('2', sortNum)
        var sortNumAfter =
          sortNum &&
          sortNum.map(o => {
            return { value: o };
          });
        console.log('3', sortNumAfter)
        var list =
          sortNumAfter &&
          sortNumAfter.map(m => {
            var my = m.value && m.value;
            var arr =
              this.StatisticalAnalysisRiskRankingData &&
              this.StatisticalAnalysisRiskRankingData.filter(n => {
                var ny = n.value && n.value;
                return ny == my;
              });
            return arr;
          });
        var info =
          list &&
          list.map(o => ({
            name: o && o[0] && o[0].name && o[0].name,
            value: o && o[0] && o[0].value && o[0].value
          }));
        console.log('info', info)
        return info;*/
        return this.StatisticalAnalysisRiskRankingData
      }
      return null;
    }
  },
watch:{
  rePortCount(val){
this.down()
  }
},
  mounted(){
    let _this = this
    this.defalultSelect= {
      dept: '',
        modular: '',
        riskType: ''
    }
    this.setNewDeptStruct()
    this.ready=false
    this.reSet()


  },
  destroyed(){
    this.ready=false
  }

}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
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
.el-head{
  width: 98% !important;
  height: 7.5%;
  margin: 0 auto !important;
}
.selectBox{
  float: left;
  position: relative !important;
  width: 70%;
  box-sizing: border-box;
  .grid-content{
    .tit{
      margin: 0 15px;
      width: 5em;
    }
  }
  .el-select{
    width: 76%;
  }
  .ov{
    .el-col{
      width: 100%;
    }
    .tit{
      width: 5em;
      text-align: right;
    }
  }
}

@media only screen and (max-width: 1290px) {
  .statisticalAnalysis {
    min-width: 1024px;
    height: 100%;
    .selectBox{
      line-height: 30px;
      font-size: 12px;
      .el-select{
        width: 63%;
      }
      .ov{
        .el-select{
          width: 63%;
        }
      }
      .el-col{
        width: 90%;
      }
      .el-col-6{
        width: 30%;
      }
    }
    &_title {
      width: 100%;
      height: 8.35%;
      &_date {
        width: 40%;
        height: 100%;
        margin-left: 2%;
      }
      &_depart {
        width: 20%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
      &_riskType {
        width: 22%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
    }
    &_aAndR {
      width: 100%;
      height: 82px;
      &_alert {
        width: 54%;
        height: 100%;
      }
      // 已缓解、未缓解
      &_relieve {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 0.6%;
        &_left {
          @include size(48%, 95%);
          background: #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          .relieveProess {
            @include size(65px, 65px);
            // border-radius: 50%;
            margin-top: 4%;
            margin-left: 13%;
            // border: 4px solid #ffb400;
            // span {
            //   display: block;
            //   width: 100%;
            //   line-height: 400%;
            //   font-size: 14px;
            //   text-align: center;
            // }
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 2%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
        &_right {
          @include size(45%, 95%);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          .relieveProess {
            @include size(60px, 60px);
            border-radius: 50%;
            margin-top: 6%;
            margin-left: 13%;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 2%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
      }
    }
    &_sLAndRTAndCLR {
      width: 100%;
      height: 184px;
      // 安全曲线
      &_safeLine {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 40px);
          margin:0 auto;
          font-size:16px;
          color: #0096ff;
          line-height:40px;
        }
        &_content{
          @include size(98%, 80%);
          margin-left:2%;
        }
      }
      // 平均响应时间、安全事件闭环率
      &_rtAndCLRate {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 0.6%;
        // 平均响应时间
        &_responseTime {
          @include size(48%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          &_title {
            @include size(95%, 16%);
            border-bottom: 1px solid #0096ff;
            margin-left: 2.5%;
            line-height: 30px;
            font-size: 18px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow:hidden;
            .responseTimes {
              @include size(100px, 100px);
              border: 3px dashed #ffb400;
              margin: 0 auto;
              border-radius: 50%;
              margin-top: 5px;
              margin-bottom: 5px;
              span {
                display: block;
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  font-size: 14px;
                  margin-top: 30%;
                }
                &:nth-child(2) {
                  font-size: 14px;
                }
              }
            }
            .averageResponseTime {
              @include size(98%, 5%);
              margin: 0 auto;
              font-size: 14px;
              .proess {
                @include size(100%, auto);
                margin-top: 5px;
                div {
                  @include size(4px, 8px);
                  background: #0096ff;
                  margin-right: 5.8px;
                  float: left;
                }
              }
            }
          }
        }
        // 安全事件闭环率
        &_closeLoopRate {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          &_title {
            @include size(95%, 16%);
            margin-left: 2.5%;
            line-height: 30px;
            font-size: 18px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow:hidden;
            .securityEventsRate {
              @include size(90px, 90px);
              margin: 0 auto;
              margin-top: 2px;
              margin-bottom: 2px;
            }
            .risk {
              @include size(50%, 20%);
              margin: 0 auto;
              font-size: 12px;
              span {
                display: block;
                text-align: center;
              }
              .breakdownRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 14px;
                }
              }
              .HighRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA {
      width: 100%;
      height: 39%;
      // 模块风险排名
      &_moduleRiskRankings {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 30px);
          margin:0 auto;
          font-size:16px;
          color: #0096ff;
          line-height:30px;
        }
        &_content{
          @include size(91%, 77%);
          margin-left:7%;
          border-top:1px solid rgba(255,255,255,0.3);
          border-bottom:1px solid rgba(255,255,255,0.3);
          ul {
            @include size(100%, 100%);
            box-sizing:border-box;
            position: relative;
            li {
              @include size(100%, 20px);
              //文字
              .name {
                @include size(16%, 100%);
                float: left;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // border:1px solid pink;
                text-align: center;
                border-right:1px solid rgba(255,255,255,0.3);
              }
              .name.danger {
                color: #ff0000;
              }
              //条形图
              .infoBase {
                @include size(67%, 100%);
                margin-left: 0.5%;
                float: left;
                box-sizing: border-box;
                .info {
                  height: 7px;
                  width: 200px;
                  margin-top: 3%;
                  transition: 1s;
                }
                .red {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #ff5050 100%)!important;
                  background: #ff5050;
                }
                .orange {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #FF7800 100%)!important;
                  background: #FF7800;
                }
                .yellow {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #fffa50 100%)!important;
                  background: #fffa50;
                }
                .blue {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #00b4ff 100%)!important;
                  background:#00b4ff;
                }
              }
              //具体的数字
              .value {
                @include size(16%, 100%);
                font-size: 14px;
                line-height: 250%;
                box-sizing: border-box;
                float: left;
                color: #fff;
                text-align:center;
                border-left:1px solid rgba(255,255,255,0.3);
                // border:1px solid skyblue;
              }
              .valueBlue{
                color: #0096FF;
              }
              .valueYellow{
                color: #FFDC00;
              }
              .valueOrange{
                color: #FF7300;
              }
              .valueRed{
                color: #FF0000;
              }
            }
            .border-triangle{
              @include size(68%, 100%);
              position: absolute;
              top:0;
              left:16%;
              .border{
                @include size(25%, 100%);
                border-right:0.65px solid rgba(255,255,255,0.3);
                float: left;
              }
            }
            .triangle_border{
              @include size(83%, 10px);
              position: absolute;
              bottom:-4px;
              left:15.1%;
              .triangle_border_up{
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #00B4FF;
                float: left;
                margin-right:18.7%;
              }
              .last{
                margin-right:0;
                margin-left:-3px;
              }
            }
          }
        }
      }
      // 同环比分析
      &_quarterOnQuarterAnalysis {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_title {
          @include size(100%, 34px);
          font-size: 16px;
          color: #0096ff;
          line-height: 34px;
        }
        &_content {
          @include size(87%, 80%);
        }
      }
    }
  }
}
@media only screen and (min-width: 1291px) and (max-width: 1376px) {
  .statisticalAnalysis {
    width: 100%;
    height: 100%;
    .selectBox{
      line-height: 30px;
      font-size: 16px;
      .el-col{
        width: 98%;
      }
      .el-col-6{
        width: 30%;
      }
      .el-select{
        width: 62%;
      }
      .ov{
        .el-select{
          width: 62%;
        }
      }
    }
    &_title {
      width: 100%;
      height: 8.35%;
      &_date {
        width: 40%;
        height: 100%;
        margin-left: 2%;
      }
      &_depart {
        width: 20%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
      &_riskType {
        width: 22%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
    }
    &_aAndR {
      width: 100%;
      height: 84px;
      &_alert {
        width: 54%;
        height: 100%;
      }
      // 已缓解、未缓解
      &_relieve {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_left {
          @include size(45%, 95%);
          background: #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          .relieveProess {
            @include size(65px, 65px);
            margin-top: 4%;
            margin-left: 13%;
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 2%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
        &_right {
          @include size(45%, 95%);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          .relieveProess {
            @include size(60px, 60px);
            border-radius: 50%;
            margin-top: 6%;
            margin-left: 13%;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 2%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
      }
    }
    &_sLAndRTAndCLR {
      width: 100%;
      height: 172px;
      // 安全曲线
      &_safeLine {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 40px);
          margin:0 auto;
          font-size:16px;
          color: #0096ff;
          line-height:40px;
        }
        &_content{
          @include size(98%, 80%);
          margin-left:2%;
        }
      }
      // 平均响应时间、安全事件闭环率
      &_rtAndCLRate {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        // 平均响应时间
        &_responseTime {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          &_title {
            @include size(95%, 16%);
            border-bottom: 1px solid #0096ff;
            margin-left: 2.5%;
            line-height: 30px;
            font-size: 18px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow:hidden;
            .responseTimes {
              @include size(100px, 100px);
              border: 3px dashed #ffb400;
              margin: 0 auto;
              border-radius: 50%;
              margin-top: 5px;
              margin-bottom: 5px;
              span {
                display: block;
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  font-size: 14px;
                  margin-top: 30%;
                }
                &:nth-child(2) {
                  font-size: 14px;
                }
              }
            }
            .averageResponseTime {
              @include size(94%, 5%);
              margin: 0 auto;
              font-size: 14px;
              .proess {
                @include size(100%, auto);
                margin-top: 5px;
                div {
                  @include size(4px, 8px);
                  background: #0096ff;
                  margin-right: 7px;
                  float: left;
                }
              }
            }
          }
        }
        // 安全事件闭环率
        &_closeLoopRate {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          &_title {
            @include size(95%, 16%);
            margin-left: 2.5%;
            line-height: 30px;
            font-size: 18px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow:hidden;
            .securityEventsRate {
              @include size(90px, 90px);
              margin: 0 auto;
              margin-top: 2px;
              margin-bottom: 2px;
            }
            .risk {
              @include size(50%, 20%);
              margin: 0 auto;
              font-size: 12px;
              span {
                display: block;
                text-align: center;
              }
              .breakdownRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 14px;
                }
              }
              .HighRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 14px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA {
      width: 100%;
      height: 40.3%;
      // 模块风险排名
      &_moduleRiskRankings {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 30px);
          margin:0 auto;
          font-size:16px;
          color: #0096ff;
          line-height:30px;
        }
        &_content{
          @include size(91%, 77%);
          margin-left:7%;
          border-top:1px solid rgba(255,255,255,0.3);
          border-bottom:1px solid rgba(255,255,255,0.3);
          ul {
            @include size(100%, 100%);
            box-sizing:border-box;
            position: relative;
            li {
              @include size(100%, 20px);
              //文字
              .name {
                @include size(16%, 100%);
                float: left;
                color: #fff;
                font-size: 12px;
                line-height: 20px;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // border:1px solid pink;
                text-align: center;
                border-right:1px solid rgba(255,255,255,0.3);
              }
              .name.danger {
                color: #ff0000;
              }
              //条形图
              .infoBase {
                @include size(67%, 100%);
                margin-left: 0.5%;
                float: left;
                box-sizing: border-box;
                .info {
                  height: 7px;
                  width: 200px;
                  margin-top: 3%;
                  transition: 1s;
                }
                .red {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #ff5050 100%)!important;
                  background: #ff5050;
                }
                .orange {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #FF7800 100%)!important;
                  background: #FF7800;
                }
                .yellow {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #fffa50 100%)!important;
                  background: #fffa50;
                }
                .blue {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #00b4ff 100%)!important;
                  background:#00b4ff;
                }
              }
               //具体的数字
              .value {
                @include size(16%, 100%);
                font-size: 14px;
                line-height: 250%;
                box-sizing: border-box;
                float: left;
                color: #fff;
                text-align:center;
                border-left:1px solid rgba(255,255,255,0.3);
                // border:1px solid skyblue;
              }
              .valueBlue{
                color: #0096FF;
              }
              .valueYellow{
                color: #FFDC00;
              }
              .valueOrange{
                color: #FF7300;
              }
              .valueRed{
                color: #FF0000;
              }
            }
            .border-triangle{
              @include size(68%, 100%);
              position: absolute;
              top:0;
              left:16%;
              .border{
                @include size(25%, 100%);
                border-right:0.65px solid rgba(255,255,255,0.3);
                float: left;
              }
            }
            .triangle_border{
              @include size(83%, 10px);
              position: absolute;
              bottom:-4px;
              left:15.1%;
              .triangle_border_up{
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #00B4FF;
                float: left;
                margin-right:18.7%;
              }
              .last{
                margin-right:0;
                margin-left:-3px;
              }
            }
          }
        }
      }
      // 同环比分析
      &_quarterOnQuarterAnalysis {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_title {
          @include size(100%, 34px);
          font-size: 16px;
          color: #0096ff;
          line-height: 34px;
        }
        &_content {
          @include size(87%, 80%);
        }
      }
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .statisticalAnalysis {
    width: 100%;
    height: 100%;
    .selectBox{
      line-height: 40px;
      font-size: 16px;
      .el-select{
        width: 63%;
      }
      .el-col{
        width: 100%;
      }
      .ov{
        .el-select{
          width: 64%;
        }
      }
      .el-col-6{
        width: 30%;
      }
    }
    &_title {
      width: 100%;
      height: 8.35%;
      &_date {
        width: 40%;
        height: 100%;
        margin-left: 2%;
      }
      &_depart {
        width: 20%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
      &_riskType {
        width: 22%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
          font-size: 14px;
        }
      }
    }
    &_aAndR {
      width: 100%;
      height: 15.45%;
      min-height: 105px;
      &_alert {
        width: 54%;
        height: 100%;
      }
      // 已缓解、未缓解
      &_relieve {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_left {
          @include size(45%, 100px);
          background: #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          .relieveProess {
            @include size(75px, 75px);
            // border-radius: 50%;
            margin-top: 6%;
            margin-left: 6%;
            // border: 4px solid #ffb400;
            // span {
            //   display: block;
            //   width: 100%;
            //   line-height: 400%;
            //   font-size: 14px;
            //   text-align: center;
            // }
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 5%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
        &_right {
          @include size(45%, 100px);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          .relieveProess {
            @include size(60px, 60px);
            border-radius: 50%;
            margin-top: 8%;
            margin-left: 13%;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          .relievedata {
            @include size(50%, 60%);
            margin-top: 5%;
            span {
              display: block;
              @include size(100%, 50%);
              line-height: 50px;
              font-size: 14px;
            }
            span:nth-child(2) {
              font-size: 16px;
            }
          }
        }
      }
    }
    &_sLAndRTAndCLR {
      width: 100%;
      height: 31.85%;
      min-height: 216px;
      // 安全曲线
      &_safeLine {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 30px);
          margin:0 auto;
          font-size:18px;
          color: #0096ff;
          line-height:30px;
        }
        &_content{
          @include size(98%, 90%);
          margin-left:2%;
        }
      }
      // 平均响应时间、安全事件闭环率
      &_rtAndCLRate {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        // 平均响应时间
        &_responseTime {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          float: left;
          &_title {
            @include size(95%, 16%);
            border-bottom: 1px solid #0096ff;
            margin-left: 2.5%;
            line-height: 40px;
            font-size: 20px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            .responseTimes {
              @include size(116px, 116px);
              border: 4px dashed #ffb400;
              margin: 0 auto;
              border-radius: 50%;
              margin-top: 10px;
              margin-bottom: 10px;
              span {
                display: block;
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  font-size: 16px;
                  margin-top: 30%;
                }
                &:nth-child(2) {
                  font-size: 16px;
                }
              }
            }
            .averageResponseTime {
              @include size(94%, 5%);
              margin: 0 auto;
              font-size: 16px;
              .proess {
                @include size(100%, auto);
                margin-top: 9px;
                div {
                  @include size(5px, 9px);
                  background: #0096ff;
                  margin-right: 6.4px;
                  float: left;
                }
              }
            }
          }
        }
        // 安全事件闭环率
        &_closeLoopRate {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          &_title {
            @include size(95%, 16%);
            margin-left: 2.5%;
            line-height: 40px;
            font-size: 20px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            .securityEventsRate {
              @include size(110px, 110px);
              margin: 0 auto;
              border-radius: 50%;
              margin-bottom: 5px;
            }
            .risk {
              @include size(50%, 20%);
              margin: 0 auto;
              font-size: 14px;
              span {
                display: block;
                text-align: center;
              }
              .breakdownRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 16px;
                }
              }
              .HighRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA {
      width: 100%;
      height: 44.3%;
      min-height: 320px;
      // 模块风险排名
      &_moduleRiskRankings {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 40px);
          line-height:40px;
          margin:0 auto;
          font-size:18px;
          color: #0096ff;
        }
        &_content{
          @include size(91%, 78%);
          margin-left:7%;
          border-top:1px solid rgba(255,255,255,0.3);
          border-bottom:1px solid rgba(255,255,255,0.3);
          ul {
            @include size(100%, 100%);
            box-sizing:border-box;
            position: relative;
            li {
              @include size(100%, 30px);
              //文字
              .name {
                @include size(16%, 100%);
                float: left;
                color: #fff;
                font-size: 12px;
                line-height: 30px;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                border-right:1px solid rgba(255,255,255,0.3);
              }
              .name.danger {
                color: #ff0000;
              }
              //条形图
              .infoBase {
                @include size(67%, 100%);
                margin-left: 0.5%;
                float: left;
                box-sizing: border-box;
                // border:1px solid red;
                .info {
                  height: 10px;
                  width: 200px;
                  margin-top: 3%;
                  transition: 1s;
                }
                .red {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #ff5050 100%)!important;
                  background: #ff5050;
                }
                .orange {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #FF7800 100%)!important;
                  background: #FF7800;
                }
                .yellow {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #fffa50 100%)!important;
                  background: #fffa50;
                }
                .blue {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #00b4ff 100%)!important;
                  background:#00b4ff;
                }
              }
              //具体的数字
              .value {
                @include size(16%, 100%);
                font-size: 16px;
                line-height: 200%;
                box-sizing: border-box;
                float: left;
                color: #fff;
                text-align:center;
                border-left:1px solid rgba(255,255,255,0.3);
                // border:1px solid skyblue;
              }
              .valueBlue{
                color: #0096FF;
              }
              .valueYellow{
                color: #FFDC00;
              }
              .valueOrange{
                color: #FF7300;
              }
              .valueRed{
                color: #FF0000;
              }
            }
            .border-triangle{
              @include size(68%, 100%);
              position: absolute;
              top:0;
              left:16%;
              .border{
                @include size(25%, 100%);
                border-right:0.65px solid rgba(255,255,255,0.3);
                float: left;
              }
            }
            .triangle_border{
              @include size(83%, 10px);
              position: absolute;
              bottom:-4px;
              left:15.1%;
              .triangle_border_up{
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #00B4FF;
                float: left;
                margin-right:18.7%;
              }
              .last{
                margin-right:0;
                margin-left:-3px;
              }
            }
          }
        }
      }
      // 同环比分析
      &_quarterOnQuarterAnalysis {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_title {
          @include size(100%, 50px);
          font-size: 18px;
          color: #0096ff;
          line-height: 50px;
        }
        &_content {
          @include size(87%, 80%);
        }
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .statisticalAnalysis {
    width: 100%;
    height: 100%;
    .selectBox{
      font-size: 16px;
      .el-col{
        width: 100%;
      }
      .el-col-6{
        width: 30%;
      }
      .el-select{
        width: 280px !important;
      }
    }
    &_title {
      width: 100%;
      height: 8.35%;
      &_date {
        width: 40%;
        height: 100%;
        margin-left: 2%;
      }
      &_depart {
        width: 19.83%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
        }
      }
      &_riskType {
        width: 19.83%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
        }
      }
    }
    &_aAndR {
      width: 100%;
      height: 26%;
      min-height: 102px;
      max-height: 126px;

      &_alert {
        width: 54%;
        height: 100%;
      }
      // 已缓解、未缓解
      &_relieve {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_left {
          @include size(46%, 95%);
          background: #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          .relieveProess {
            @include size(90px, 90px);
            margin-top: 4px;
            margin-left: 18%;
          }
          .relievedata {
            @include size(45%, 60%);
            margin-top: 5%;
            span {
              display: block;
              width: 100%;
              height: 50%;
              line-height: 50px;
              font-size: 18px;
            }
            span:nth-child(2) {
              font-size: 30px;
            }
          }
        }
        &_right {
          @include size(46%, 95%);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          .relieveProess {
            @include size(90px, 90px);
            border-radius: 50%;
            margin-top: 4px;
            margin-left: 18%;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          .relievedata {
            @include size(45%, 60%);
            margin-top: 5%;
            span {
              display: block;
              width: 100%;
              height: 50%;
              line-height: 50px;
            }
            span:nth-child(2) {
              font-size: 30px;
            }
          }
        }
      }
    }
    &_sLAndRTAndCLR {
      width: 100%;
      height: 31.85%;
      min-height: 243px;
      // 安全曲线
      &_safeLine {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 30px);
          margin:0 auto;
          font-size:20px;
          color: #0096ff;
          line-height:30px;
        }
        &_content{
          @include size(98%, 90%);
          margin-left:2%;
        }
      }
      // 平均响应时间、安全事件闭环率
      &_rtAndCLRate {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        // 平均响应时间
        &_responseTime {
          @include size(46%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          margin-right: 10px;
          &_title {
            @include size(95%, 16%);
            border-bottom: 1px solid #0096ff;
            margin-left: 2.5%;
            line-height: 42px;
            font-size: 20px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow: hidden;
            .responseTimes {
              @include size(150px, 150px);
              border: 5px dashed #ffb400;
              margin: 0 auto;
              border-radius: 50%;
              margin-top: 10px;
              span {
                display: block;
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  font-size: 16px;
                  margin-top: 30%;
                }
                &:nth-child(2) {
                  font-size: 16px;
                }
              }
            }
            .averageResponseTime {
              @include size(94%, 20%);
              margin: 0 auto;
              font-size: 16px;
              .proess {
                @include size(100%, auto);
                margin-top: 9px;
                div {
                  @include size(6px, 10px);
                  background: #0096ff;
                  margin-right: 9px;
                  float: left;
                }
              }
            }
          }
        }
        // 安全事件闭环率
        &_closeLoopRate {
          @include size(46%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          &_title {
            @include size(95%, 16%);
            margin-left: 2.5%;
            line-height: 42px;
            font-size: 20px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 84%);
            overflow: hidden;
            .securityEventsRate {
              @include size(150px, 150px);
              margin: 0 auto;
              border-radius: 50%;
              margin-bottom: 2px;
            }
            .risk {
              @include size(50%, 20%);
              margin: 0 auto;
              font-size: 16px;
              span {
                display: block;
                text-align: center;
              }
              .breakdownRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 24px;
                }
              }
              .HighRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 24px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA {
      width: 100%;
      height: 44.3%;
      min-height: 345px;
      // 模块风险排名
      &_moduleRiskRankings {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 40px);
          line-height:40px;
          margin:0 auto;
          font-size:20px;
          color: #0096ff;
        }
        &_content{
          @include size(91%, 77%);
          margin-left:7%;
          border-top:1px solid rgba(255,255,255,0.3);
          border-bottom:1px solid rgba(255,255,255,0.3);
          ul {
            @include size(100%, 100%);
            box-sizing:border-box;
            position: relative;
            li {
              @include size(100%, 32px);
              //文字
              .name {
                @include size(16%, 100%);
                float: left;
                color: #fff;
                font-size: 14px;
                line-height: 32px;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                // border:1px solid pink;
                text-align: center;
                border-right:1px solid rgba(255,255,255,0.3);
              }
              .name.danger {
                color: #ff0000;
              }
              //条形图
              .infoBase {
                @include size(67%, 100%);
                margin-left: 0.5%;
                float: left;
                box-sizing: border-box;
                // border:1px solid red;
                .info {
                  height: 14px;
                  width: 200px;
                  margin-top: 3%;
                  transition: 1s;
                }
                .red {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #ff5050 100%)!important;
                  background: #ff5050;
                }
                .orange {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #FF7800 100%)!important;
                  background: #FF7800;
                }
                .yellow {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #fffa50 100%)!important;
                  background: #fffa50;
                }
                .blue {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #00b4ff 100%)!important;
                  background:#00b4ff;
                }
              }
              //具体的数字
              .value {
                @include size(16%, 100%);
                font-size: 20px;
                line-height: 180%;
                box-sizing: border-box;
                float: left;
                color: #fff;
                text-align:center;
                border-left:1px solid rgba(255,255,255,0.3);
                // border:1px solid skyblue;
              }
              .valueBlue{
                color: #0096FF;
              }
              .valueYellow{
                color: #FFDC00;
              }
              .valueOrange{
                color: #FF7300;
              }
              .valueRed{
                color: #FF0000;
              }
            }
            .border-triangle{
              @include size(68%, 100%);
              position: absolute;
              top:0;
              left:16%;
              .border{
                @include size(25%, 100%);
                border-right:0.65px solid rgba(255,255,255,0.3);
                float: left;
              }
            }
            .triangle_border{
              @include size(83%, 10px);
              position: absolute;
              bottom:-3px;
              left:15.4%;
              .triangle_border_up{
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 7px solid #00B4FF;
                float: left;
                margin-right:19.2%;
              }
              .last{
                margin-right:0;
                margin-left:-3px;
              }
            }
          }
        }
      }
      // 同环比分析
      &_quarterOnQuarterAnalysis {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_title {
          @include size(100%, 50px);
          font-size: 20px;
          color: #0096ff;
          line-height: 40px;
        }
        &_content {
          @include size(87%, 80%);
        }
      }
    }
  }
}
@media only screen and (min-width: 1931px) {
  .statisticalAnalysis {
    width: 100%;
    height: 100%;
    .selectBox{
      height: 80px;
      line-height: 80px;
      font-size: 30px;
      top: 10px !important;
      left:70px !important;
      .el-col-6{
        width: 30%;
      }
      .el-select{
        width: 380px !important;
      }
    }
    &_title {
      width: 100%;
      height: 8.35%;
      &_date {
        width: 42%;
        height: 100%;
        margin-left: 2%;
      }
      &_depart {
        width: 22%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        font-size: 26px;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
        }
      }
      &_riskType {
        width: 25%;
        height: 100%;
        line-height: 400%;
        margin-left: 2%;
        font-size: 26px;
        .itemCon {
          width: 100%;
          height: 100%;
          font-size: 100%;
        }
      }
    }
    &_aAndR {
      width: 100%;
      height: 15.45%;
      &_alert {
        width: 54%;
        height: 100%;
      }
      // 已缓解、未缓解
      &_relieve {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_left {
          @include size(45%, 95%);
          background: #0096ff;
          border-radius: 4px;
          margin-right: 3%;
          .relieveProess {
            @include size(150px, 150px);
            border-radius: 50%;
            margin-top: 38px;
            margin-left: 67px;
          }
          .relievedata {
            @include size(45%, 60%);
            margin-top: 10%;
            span {
              display: block;
              width: 100%;
              height: 50%;
              line-height: 50px;
              font-size: 36px;
            }
            span:nth-child(2) {
              font-size: 45px;
            }
          }
        }
        &_right {
          @include size(45%, 95%);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          .relieveProess {
            @include size(150px, 150px);
            border-radius: 50%;
            margin-top: 28px;
            margin-left: 67px;
            img {
              display: block;
              @include size(100%, 100%);
            }
          }
          .relievedata {
            @include size(45%, 60%);
            margin-top: 10%;
            span {
              display: block;
              width: 100%;
              height: 50%;
              line-height: 50px;
              font-size: 36px;
            }
            span:nth-child(2) {
              font-size: 45px;
            }
          }
        }
      }
    }
    &_sLAndRTAndCLR {
      width: 100%;
      height: 31.85%;
      // 安全曲线
      &_safeLine {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 30px);
          margin:0 auto;
          font-size:30px;
          color: #0096ff;
          line-height:30px;
        }
        &_content{
          @include size(98%, 90%);
          margin-left:2%;
        }
      }
      // 平均响应时间、安全事件闭环率
      &_rtAndCLRate {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        // 平均响应时间
        &_responseTime {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          margin-right: 3%;
          &_title {
            @include size(95%, 18%);
            border-bottom: 1px solid #0096ff;
            margin-left: 2.5%;
            line-height: 76px;
            font-size: 30px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 92%);
            .responseTimes {
              @include size(220px, 220px);
              border: 5px dashed #ffb400;
              margin: 0 auto;
              border-radius: 50%;
              margin-top: 20px;
              margin-bottom: 30px;
              span {
                display: block;
                width: 100%;
                text-align: center;
                &:nth-child(1) {
                  font-size: 28px;
                  margin-top: 30%;
                }
                &:nth-child(2) {
                  font-size:28px;
                }
              }
            }
            // 平均响应耗时
            .averageResponseTime {
              @include size(94%, 20%);
              margin: 0 auto;
              font-size: 24px;
              .proess {
                @include size(100%, auto);
                margin-top: 9px;
                div {
                  @include size(8px, 15px);
                  background: #0096ff;
                  margin-right: 13px;
                  float: left;
                }
              }
            }
          }
        }
        // 安全事件闭环率
        &_closeLoopRate {
          @include size(45%, 100%);
          border: 1px solid #0096ff;
          border-radius: 4px;
          &_title {
            @include size(95%, 18%);
            margin-left: 2.5%;
            line-height: 76px;
            font-size: 30px;
            box-sizing: border-box;
            padding-left: 10px;
          }
          &_content {
            @include size(100%, 92%);
            .securityEventsRate {
              @include size(200px, 200px);
              margin: 0 auto;
              margin-bottom: 30px;
            }
            .risk {
              @include size(50%, 30%);
              margin: 0 auto;
              font-size: 24px;
              span {
                display: block;
                text-align: center;
              }
              .breakdownRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 30px;
                }
              }
              .HighRisk {
                @include size(50%, 100%);
                span:nth-child(1) {
                  font-size: 30px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA {
      width: 100%;
      height: 44.3%;
      // 模块风险排名
      &_moduleRiskRankings {
        width: 54%;
        height: 100%;
        &_title{
          @include size(86%, 45px);
          line-height:45px;
          margin:0 auto;
          font-size:30px;
          color: #0096ff;
        }
        &_content{
          @include size(91%, 80%);
          margin-left:7%;
          border-top:1px solid rgba(255,255,255,0.3);
          border-bottom:1px solid rgba(255,255,255,0.3);
          ul {
            @include size(100%, 100%);
            box-sizing:border-box;
            position: relative;
            li {
              @include size(100%, 62px);
              //文字
              .name {
                @include size(16%, 100%);
                float: left;
                color: #fff;
                font-size: 24px;
                line-height: 62px;
                box-sizing: border-box;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
                border-right:1px solid rgba(255,255,255,0.3);
              }
              .name.danger {
                color: #ff0000;
              }
              //条形图
              .infoBase {
                @include size(67%, 100%);
                margin-left: 0.5%;
                float: left;
                box-sizing: border-box;
                .info {
                  height: 14px;
                  width: 200px;
                  margin-top: 3%;
                  transition: 1s;
                }
                .red {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #ff5050 100%)!important;
                  background: #ff5050;
                }
                .orange {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #FF7800 100%)!important;
                  background: #FF7800;
                }
                .yellow {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #fffa50 100%)!important;
                  background: #fffa50;
                }
                .blue {
                  background: -webkit-linear-gradient(left, rgba(255,150,0,0.00), #00b4ff 100%)!important;
                  background:#00b4ff;
                }
              }
              //具体的数字
              .value {
                @include size(16%, 100%);
                font-size: 30px;
                line-height: 220%;
                box-sizing: border-box;
                float: left;
                color: #fff;
                text-align:center;
                border-left:1px solid rgba(255,255,255,0.3);
                // border:1px solid skyblue;
              }
              .valueBlue{
                color: #0096FF;
              }
              .valueYellow{
                color: #FFDC00;
              }
              .valueOrange{
                color: #FF7300;
              }
              .valueRed{
                color: #FF0000;
              }
            }
            .border-triangle{
              @include size(68%, 100%);
              position: absolute;
              top:0;
              left:16%;
              .border{
                @include size(25%, 100%);
                border-right:0.65px solid rgba(255,255,255,0.3);
                float: left;
              }
            }
            .triangle_border{
              @include size(83%, 10px);
              position: absolute;
              bottom:0px;
              left:15.1%;
              .triangle_border_up{
                width: 0;
                height: 0;
                border-left: 10px solid transparent;
                border-right: 10px solid transparent;
                border-bottom: 14px solid #00B4FF;
                float: left;
                margin-right:18.7%;
              }
              .last{
                margin-right:0;
                margin-left:-10px;
              }
            }
          }
        }
      }
      // 同环比分析
      &_quarterOnQuarterAnalysis {
        width: 46%;
        height: 100%;
        box-sizing: border-box;
        padding-left: 3%;
        &_title {
          @include size(100%, 80px);
          font-size: 30px;
          color: #0096ff;
          line-height: 80px;
        }
        &_content {
          @include size(87%, 80%);
        }
      }
    }
  }
}

/*________________________________________________________________________________*/
@media only screen and (max-width: 1289px) {
  .statisticalAnalysis{
    &_mRRAndQOQA{
      min-height: 207px;
      &_moduleRiskRankings{
        &_content{
          height: 81%;
          ul{
            .triangle_border{
              left: 13.1%;
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1610px) {
  .AAndRAlert{
    padding-left: 12%;
  }
  .statisticalAnalysis{
    &_sLAndRTAndCLR{
      height: 36%;
      min-height: 235px;
      &_rtAndCLRate{
        &_responseTime{
          &_title{
            font-size: 16px;
          }
          &_content{
            .averageResponseTime{
              .proess{
                margin-top: 0;
                div{
                  margin-right: 7px;
                }
              }
            }
          }
        }
        &_closeLoopRate{
          &_title{
            font-size: 16px;
          }
          &_content{
            .risk{
              .breakdownRisk{
                span:nth-child(1){
                  font-size: 16px;
                }
              }
              .HighRisk{
                span:nth-child(1){
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
    &_mRRAndQOQA{
      height: 35.6%;
      min-height: 225px;
      &_moduleRiskRankings{
        &_title{
          height: 30px;
          line-height: 30px;
          font-size: 16px;
        }
        &_content{
          ul{
            li{
              padding-top: 2px;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              .name{
                line-height: 20px;
              }
              .value{
                font-size: 13px;
              }
              .infoBase{
                .info{
                  margin-top: 5px;
                }
              }
            }
            .triangle_border{
              left: 14.8%;
            }
          }
        }
      }
      &_quarterOnQuarterAnalysis{
        &_title{
          height: 30px;
          line-height: 30px;
          font-size: 16px;
        }
      }
    }
  }
}
.statisticalAnalysis{
  &_mRRAndQOQA{
    &_moduleRiskRankings{
      &_content{
        min-height: 170px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-range-editor.el-input__inner{
  background:rgba(255,255,255,0.1);
}
  @media only screen and (max-width: 1376px) {
    .selectBox{
      .el-input--suffix .el-input__inner{
        line-height: 30px;
      }
    }
  }
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .el-input__icon{
    line-height: 40px;
  }
}
@media only screen and (min-width: 1931px) {
  .el-input__icon{
    line-height: 80px;
  }
}

</style>
