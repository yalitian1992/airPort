<template>
  <div class="departmentStatistics">
    <div class="departmentStatistics_left">
      <div v-for="(item,index) in departmentData" :key="index" @click="titleBjSeclect(item.val)" :class="titlebjkey===item.val?'titlebj':''">{{item.name}}</div>
    </div>
    <div class="departmentStatistics_right" v-if="titlebjkey === 'FA'">
      <div class="departmentStatistics_right_title">
        <search-box>
          <search-item class="timeDuring" style="width: 35em;">
            <div class="fl">时间范围：</div>
            <div class="fl">
              <!--<el-date-picker v-model="value1" @change="TimeFun(value1)" type="daterange" value-format="yyyy-MM-dd"
                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>-->

              <el-date-picker v-model="value1"
                              :clearable="false"
                              :editable="false"
                              type="datetimerange"
                              align="right"
                              unlink-panels
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              @change="TimeFun(value1)"
                              :picker-options="pickerOptions1">
              </el-date-picker>
            </div>
          </search-item>
          <search-item class="risktype" style="float: none;width: 21em;">
            <!--模块-->
            <div class="styR itemCon fl clearfix">
              <div class="fl" style="width: 5em;text-align: right">模块：</div>
              <div class="fl inTxt">
                <el-select v-model="ModuleType" placeholder="请选择">
                  <el-option v-for="(item,index) in modularData" :key="index" :label="item.ORG_NAME" :value="item.ORG_CODE">
                  </el-option>
                </el-select>
              </div>
            </div>

          </search-item>
          <search-item class="risktype" style="float:none;width: 21em;">
            <!--风险类型-->
            <div class="styR  itemCon fl clearfix">
              <div class="fl">风险类型：</div>
              <div class="fl inTxt">
                <el-select style="height: 100%;" v-model="RiskType" placeholder="请选择">
                  <el-option v-for="(item,index) in riskTypeData" :key="index" :label="item.ORG_NAME" :value="item.ORG_CODE">
                  </el-option>
                </el-select>
              </div>
            </div>
          </search-item>
        </search-box>

      </div>
      <div class="departmentStatistics_right_content">
        <div class="securityLine fl">
          <div class="title">
            <span>安全曲线</span>
            <!--<div class="selectTime">
              <div :class="activeMountKey===0?'activeMount':''" @click="activeMount(0)">24小时</div>
              <div :class="activeMountKey===1?'activeMount':''" @click="activeMount(1)">48小时</div>
            </div>-->
          </div>
          <div class="content">
            <securityLine @click="eClick"  :data="safeCurveData1.safetyCurveData24" :color="workStrengthChartColor" :areaOpacity=0 v-if="activeMountKey===0  &&  safeCurveData1.safetyCurveData24"
                          :dataZoom="false" yaxisName="(风险值)" xaxisName="(时间点)" state=1></securityLine>
            <securityLine @click="eClick"  :data="safeCurveData1.safetyCurveData48" :color="workStrengthChartColor" :areaOpacity=0 v-if="activeMountKey===1  &&  safeCurveData1.safetyCurveData48"
                          :dataZoom="false" yaxisName="(风险值)" xaxisName="(时间点)" state=3></securityLine>
          </div>
          <div class="scoreBox" v-show="scoreShow">
            <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
          </div>
        </div>
        <!-- 异常因子 -->
        <div class="outlierFactor fl">
          <div class="outlierFactor_title">
           <!-- <span>异常因子</span>-->
          </div>
          <div class="outlierFactor_content">
            <div class="proess">
              <circle-scale1 :valueData="ColsedLoppRateData1.EventRate||''" color1="#0096ff" color2="#2343B5" textSize=1></circle-scale1>
              <span>事件处理闭环率</span>
            </div>
            <div class="state">
              <div>
                <span>{{ColsedLoppRateData1.exceptionOccurred}}</span>
                <span>发生异常</span>
              </div>
              <div>
                <span>{{ColsedLoppRateData1.completed}}</span>
                <span>已完成</span>
              </div>
              <!-- <div>
                <span>{{ColsedLoppRateData1.successRate}}%</span>
                <span>成功率</span>
              </div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="departmentStatistics_right_bottom">
        <div class="tiao"></div>
        <div class="listTitle">
          <div v-for="(item,index) in departmentStatisticsTitle" :key="index">{{item}}</div>
        </div>
        <div class="listConBtm" style="overflow: hidden;">
          <ul class="autoScroll" v-if="AlarmDetailedData1.totalCount !== ''">
            <li v-for='(item,index) in AlarmDetailedData1.departmentStatisticsdata' :key='index'>
              <div>{{item.code}}</div>
              <div>{{item.riskname}}</div>
              <div>{{item.risktype}}</div>
              <div>{{item.createtime}}</div>
              <!-- 所属部门 -->
              <div>{{item.belongdepartment}}</div>
              <!-- 状态 -->
              <div>{{item.riskstate}}</div>
              <!-- 最后操作时间 -->
              <div>{{item.lastupdatetime}}</div>
              <!-- 最后操作者 -->
              <div>{{item.lastOperator}}</div>
              <div @click="SafeDetail(item)">查看详情</div>
            </li>
          </ul>
          <p class="noList" v-else>暂无记录</p>
        </div>
        <div class="departmentxq" v-if="AlarmDetailedData1.totalCount !== ''">
          <!--<div class="textNum">共{{AlarmDetailedData1.totalCount}}条数据</div>-->
          <div class="Pagination">
            <div class="classPage">
              <el-pagination small
                             @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="curPage"
                             :page-size="pageSize"
                             layout="total,prev, pager, next, jumper"
                             :total="parseInt(AlarmDetailedData1.totalCount === undefined ? '0' : AlarmDetailedData1.totalCount)">
              </el-pagination>
            </div>
            <div class="jumpbutton">跳转</div>
          </div>
        </div>
      </div>
    </div>
    <!--左侧标签切换无数据-->
    <div class="noData" v-else>
      <p>暂无数据</p>
    </div>
    <!--查看详情弹框-->
    <noticeInfoDetails ref="Detail"></noticeInfoDetails>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions
} from 'vuex'
import securityLine from '../../../components/echarts/securityLine'
import CircleScale1 from '../../../components/echarts/CircleScale1.vue'
// import SafetyDetails from '../../../components/targetDetails/targetDetails.vue'
import noticeInfoDetails from '../../noticeInfo/noticeInfo/noticeInfoDetails.vue'
import SearchBox from '../../../components/common/searchBox'
import SearchItem from '../../../components/common/searchItem'
export default {
  components: {
    SearchItem,
    SearchBox,
    securityLine,
    CircleScale1,
    // SafetyDetails,
    noticeInfoDetails
  },
  data () {
    return {
      safeCurveData1: {},
      ColsedLoppRateData1: {},
      AlarmDetailedData1: {},
      pageSize: 10,
      curPage: 1,
      departmentData: [{val: 'FA', name: '飞行区管理部'}, {val: 'tA', name: '航站楼管理部'}, {val: 'tA', name: '公共区管理部'}, {val: 'tA', name: '质量安全部'}, {val: 'tA', name: '信息科技部'}, {val: 'tA', name: '建设项目管理部'}, {val: 'tA', name: '消防支队'}, {val: 'tA', name: '运行控制中心'}],
      titlebjkey: 'FA',
      value1: '',
      ModuleType: '',
      RiskType: '',
      DetailedPara: { // 接口传参~~有分页
        departCode: '',
        StartDate: '',
        EndDate: '',
        riskType: '',
        Modular: '',
        PageIndex: '1',
        PageSize: '10'
      },
      newAllPara: { // 接口传参~~无分页
        departCode: '',
        StartDate: '',
        EndDate: '',
        riskType: '',
        Modular: ''
      },
      // riskTypeData: [{ label: '请选择', value: null }, ...riskType],
      riskTypeData: {},
      modularData: {},
      departmentStatisticsTitle: [
        '序号',
        '风险名称',
        '风险类型',
        '报警时间',
        '所属模块',
        '状态',
        '最后操作时间',
        '最后操作者',
        '操作'
      ],
      departmentStatisticsdata: [{
        code: 'A3246',
        riskname: '风险名称1',
        risktype: '航空器类',
        createtime: '2018-05-22  15:30:30',
        belongdepartment: '消防支队',
        riskstate: '已配置',
        lastupdatetime: '2018-05-23  15:30:30',
        lastOperator: '张琪与'
      }
      ],
      activeMountKey: 0,
      workStrengthChartColor: ['#05D0EB ', '#C88637', '#BC570C'],
      currentPage3: 5,
      // 日期时间
      pickerOptions1: {
        shortcuts: [
          {
            text: '24小时',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '48小时',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 48)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本日',
            onClick (picker) {
              const end = new Date()
              let start = new Date() // 获取当前日期的0时0分0秒
              start = start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate()
              picker.$emit('pick', [new Date(start + ' 00:00:00'), end])
            }
          },
          {
            text: '本周',
            onClick (picker) {
              const end = new Date() // 当前日期
              const nowDayOfWeek = end.getDay() === 0 ? 7 : end.getDay() // 今天本周的第几天
              const nowDay = end.getDate() // 当前日
              const nowMonth = end.getMonth() === 0 ? 12 : end.getMonth()// 当前月
              let nowYear = end.getYear() // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0
              const start = new Date(
                nowYear,
                nowMonth,
                nowDay - nowDayOfWeek + 1
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick (picker) {
              const end = new Date()
              // const start = new Date();
              const Nowdate = new Date()
              const start = new Date(
                Nowdate.getFullYear(),
                Nowdate.getMonth(),
                1
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本年',
            onClick (picker) {
              const end = new Date()
              var start = new Date(end.getFullYear(), 0, 1)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      sorceCon: '',
      scoreShow: false
    }
  },
  created () {
    let _this = this
    this.DetailedPara.StartDate = this.startDate()
    this.DetailedPara.EndDate = this.endDate()
    this.newAllPara.StartDate = this.startDate()
    this.newAllPara.EndDate = this.endDate()
    this.newAllPara.departCode = this.titlebjkey
    this.value1 = [this.startDate(), this.endDate()]
    this.changeInter()
    this.setNewDeptStruct(function () {
      _this.autoDepStruct()
    })
  },
  methods: {
    ...mapMutations('SecurityStore', ['setSecurityStateData']),
    ...mapActions('SecurityStore', ['getSafeCurve', 'getColsedLoppRate', 'getSafetyAlarmDetailed', 'setNewDeptStruct']),
    // 查看详情弹框
    SafeDetail: function (item) {
      this.$refs.Detail.IsShow(item, this.$route)
    },
    changeInter () {
      let _this = this
      this.DetailedPara.departCode = this.titlebjkey
      let i = 3
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '17.8%'
        document.querySelector('.layui-layer-shade').style.left = '17.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.getSafetyAlarmDetailed(JSON.stringify(this.DetailedPara)).then(data => {
        i = i - 1
        if (i === 0) {
          _this.layer.closeAll()
        }
      })
      this.getSafeCurve(JSON.stringify(this.newAllPara)).then(data => {
        i = i - 1
        if (i === 0) {
          _this.layer.closeAll()
        }
      })
      this.getColsedLoppRate(JSON.stringify(this.newAllPara)).then(data => {
        i = i - 1
        if (i === 0) {
          _this.layer.closeAll()
        }
      })
    },
    TimeFun: function (time) {
      this.curPage = 1
      this.DetailedPara.PageIndex = this.curPage.toString()
      this.newAllPara.StartDate = this.getDateTime(time[0])
      this.newAllPara.EndDate = this.getDateTime(time[1])
      this.DetailedPara.StartDate = this.getDateTime(time[0])
      this.DetailedPara.EndDate = this.getDateTime(time[1])
      this.changeInter()
    },
    titleBjSeclect (item) {
      this.titlebjkey = item
      this.setSecurityStateData()
    },
    activeMount (item) {
      this.activeMountKey = item
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getSafetyAlarmDetailed(this.DetailedPara)
    },
    handleCurrentChange (val) {
      this.curPage = val
      this.DetailedPara.PageIndex = this.curPage
      this.getSafetyAlarmDetailed(JSON.stringify(this.DetailedPara))
    },
    // 安全曲线
    SafeData: function (val) {
      if (val &&
          val.safetyCurveData24.length > 0 &&
          val.safetyCurveData24[0]) {
        this.safeCurveData1 = val
      }
    },
    // 异常因子
    RateData: function (val) {
      if (val) {
        this.ColsedLoppRateData1 = val
      }
    },
    // 安全明细
    DetailedData: function (val) {
      this.AlarmDetailedData1 = val
    },
    startDate: function () {
      let start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return start
    },
    endDate: function () {
      let end = new Date()
      let newVal = this.getDateTime(end)
      return newVal
    },
    // 日期时间格式转化
    getDateTime: function (s) {
      let date = s.getFullYear() + '/' + (s.getMonth() + 1) + '/' + s.getDate()
      let time = s.getHours() + ':' + s.getMinutes() + ':' + s.getSeconds()
      let newDate = date + ' ' + time
      return newDate
    },
    autoDepStruct: function () {
      let dept = ''
      let modular = ''
      let riskType = ''
      if (this.titlebjkey === '' || this.titlebjkey === undefined || this.titlebjkey === null) {
        dept = ''
      } else {
        dept = this.titlebjkey
      }
      if (this.ModuleType === '' || this.ModuleType === undefined || this.ModuleType === null) {
        modular = ''
      } else {
        modular = this.ModuleType
      }
      if (this.RiskType === '' || this.RiskType === undefined || this.RiskType === null) {
        riskType = ''
      } else {
        riskType = this.RiskType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType
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
      this.modularData = moudleResult.result
      if (!moudleResult.isExit) {
        this.ModuleType = ''
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
        this.RiskType = ''
      }
    },
    eClick (params) {
      // this.scoreShow = true
      this.sorceCon = params.data.cid + '' + params.data.name + '风险值' + params.data.value
    }
  },
  computed: {
    ...mapState('SecurityStore', ['safeCurveData', 'ColsedLoppRateData', 'AlarmDetailedData', 'safetyCurveData24',
      'safetyCurveData48', 'depNewStruct'
    ])
  },
  watch: {
    ModuleType (val) {
      this.curPage = 1
      this.DetailedPara.PageIndex = this.curPage.toString()
      this.DetailedPara.Modular = val
      this.newAllPara.Modular = val
      this.changeInter()
      this.autoDepStruct()
    },
    RiskType (val) {
      this.curPage = 1
      this.DetailedPara.PageIndex = this.curPage.toString()
      this.DetailedPara.riskType = val
      this.newAllPara.riskType = val
      this.changeInter()
      this.autoDepStruct()
    },
    // 安全曲线
    safeCurveData (val) {
      this.SafeData(val)
    },
    // 异常因子
    ColsedLoppRateData (val) {
      this.RateData(val)
    },
    // 安全明细
    AlarmDetailedData (val) {
      this.DetailedData(val)
    },
    depNewStruct (val) {
      this.autoDepStruct()
    }
  },
  mounted: function () {
    // let firstAllSel = {
    //   DCODE: ' ',
    //   DGROUP: ' ',
    //   DID: ' ',
    //   DVALUE: '请选择'
    // }
    // this.riskTypeData = JSON.parse(localStorage.getItem('SelectPara')).RiskType
    // this.modularData = JSON.parse(localStorage.getItem('SelectPara')).Modular

    // this.riskTypeData.unshift(firstAllSel)
    // this.modularData.unshift(firstAllSel)
    this.autoDepStruct()
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
  .noList{
    margin-top: 5%;
    width: 100%;
    text-align: center;
    color: #F8F8F8;
  }
  .departmentxq{
    position: absolute;
    bottom: 0;
  }

  .departmentStatistics {
    &_right{
      &_bottom{
        margin-left: 40px;
        .listTitle{
          div{
            @include size(11%, 100%);
          }
          div:nth-child(1){
            width: 6%;
          }
          div:nth-child(3){
            width: 8%;
          }
          div:nth-child(4){
            width: 14%;
          }
          div:nth-child(7){
            width: 16%;
          }
        }
        .listConBtm{
          ul{
            li{
              div{
                @include size(11%, 100%);
              }
              div:nth-child(1){
                width: 6%;
              }
              div:nth-child(3){
                width: 8%;
              }
              div:nth-child(4){
                width: 14%;
              }
              div:nth-child(7){
                width: 16%;
              }
            }
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1290px) {
    .departmentStatistics {
      min-width: 1024px;
      height: 100%;
      box-sizing: border-box;
      padding-top: 20px;

      .noData{
        @include size(85%, 100%);
        margin: 20% auto;
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      &_left {
        @include size(15%, 100%);
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.5);

        div {
          @include size(150px, 30px);
          margin-top: 20px;
          background: url('../../../assets/images/title-bj3.png') no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
          margin-left: calc(calc(100% - 150px) / 2);
          cursor: pointer;
        }

        .titlebj {
          background: url('../../../assets/images/title-bj2.png') no-repeat center center !important;
          background-size: 100% 100% !important;
        }
      }

      &_right {
        @include size(85%, 100%);
        float: right;
        position: relative;

        &_title {
          @include size(100%, 40px);
          font-size: 14px;
          box-sizing: border-box;
          padding-left: 40px;

          .timeDuring {
            @include size(45%, 100%);
            vertical-align: middle;
            line-height: 40px;

            .el-range-editor.el-input__inner {
              background: rgba(255, 255, 255, 0.05);
            }
          }

          .risktype {
            margin-top: 5px;
            @include size(54%, 100%);
            line-height: 30px;
            vertical-align: middle;
            /*el input框宽度*/
            .itemCon{
              height:100%;
              .inTxt{
                height: 100%;
                width: 70%;
              }
            }
          }
        }

        &_content {
          @include size(100%,40%);
          box-sizing: border-box;
          min-height: 300px;
          padding: 0 30px 30px 40px;

          .securityLine {
            @include size(65%, 100%);
            font-size: 16px;

            .title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10px;

              .selectTime {
                @include size(120px, 30px);
                float: right;
                margin-top: 15px;

                div {
                  text-align: center;
                  line-height: 30px;
                  color: #fff;
                  font-size: 12px;
                  float: left;
                  cursor: pointer;

                  &:nth-child(1) {
                    @include size(50%, 100%);
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }

                  &:nth-child(2) {
                    @include size(50%, 100%);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }
                }

                .activeMount {
                  box-sizing: border-box;
                  border: 1px solid #0096ff !important;
                  color: #0096ff;
                  background: url('../../../assets/images/11-01.png') no-repeat center center;
                  background-size: 100% 100%;
                }
              }
            }

            .content {
              @include size(100%, 80%);
            }
          }

          .outlierFactor {
            @include size(28%, 100%);
            margin-left: 4%;

            &_title {
              @include size(100%, 40px);
              color: #0096ff;
              line-height: 40px;
              box-sizing: border-box;
              padding: 0 15%;
              font-size: 16px;
            }

            &_content {
              @include size(90%, 90%);
              margin: 0 auto;

              .proess {
                @include size(125px, 125px);
                margin: 0 auto;
                border-radius: 50%;

                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 12px;
                  color: #0096ff;
                  margin-top: -42px;
                }
              }

              .state {
                @include size(100%, 25%);
                margin-top: 10px;

                div {
                  @include size(50%, 100%);
                  float: left;

                  span {
                    display: block;
                    @include size(100%, 50%);
                    text-align: center;
                    font-size: 14px;

                    &:nth-child(1) {
                      font-size: 20px;
                      color: #FFB400;
                    }
                  }
                }
              }
            }
          }
        }

        &_bottom {
          @include size(90%, calc(40% - 40px));
          min-height: 100px;
          max-height:calc(40% - 40px) ;
          position: relative;

          .tiao {
            @include size(100%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
          }

          .listTitle {
            @include size(100%, 30px);
            background: rgba(255, 255, 255, 0.1);

            div {
              float: left;
              box-sizing: border-box;
              text-align: center;
              line-height: 30px;
              color: #0096ff;
              font-size: 14px;
            }
          }
          .listConBtm{
            height: calc(100% - 70px);
            ul {
              width: 102%;
              list-style: none;
              color: #fff;
              overflow: hidden;
              font-size: 12px;
              overflow-y: auto;
              li {
                height: 30px;
                cursor: pointer;

                div {
                  float: left;
                  box-sizing: border-box;
                  text-align: center;
                  line-height: 30px;
                  color: #fff;
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: wrap;

                  &:nth-last-child(1) {
                    color: #0096ff;
                  }
                }
              }

              li:nth-child(even) {
                background: rgba(255, 255, 255, 0.1) !important;
              }
            }
          }

          .departmentxq {
            @include size(92%, 42px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .textNum {
              @include size(150px, 42px);
              text-align: center;
              line-height: 34px;
              color: #f2f2f2;
              font-size: 18px;
            }

            .Pagination {
              /*width: 1000px;*/
              height: 42px;
              .classPage {
                height: 30px;
                float: left;
                margin: 10px 20px 0 0;
              }
              .jumpbutton{
                float: left;
                margin-top: 10px;
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
        }
      }
    }
  }
  @media only screen and (min-width: 1291px) and (max-width: 1376px) {
    .departmentStatistics {
      @include size(100%, 100%);
      box-sizing: border-box;
      padding-top: 20px;

      .noData{
        @include size(85%, 100%);
        margin: 20% auto;
        text-align: center;
        font-size: 24px;
        color: #fff;
      }
      &_left {
        @include size(15%, 100%);
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.5);

        div {
          @include size(150px, 30px);
          margin-top: 20px;
          background: url('../../../assets/images/title-bj3.png') no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          line-height: 30px;
          font-size: 12px;
          margin-left: 30px;
          cursor: pointer;
        }

        .titlebj {
          background: url('../../../assets/images/title-bj2.png') no-repeat center center !important;
          background-size: 100% 100% !important;
        }
      }

      &_right {
        @include size(85%, 100%);
        float: right;
        position: relative;

        &_title {
          @include size(100%, 40px);
          // margin-top: 15px;
          font-size: 14px;
          box-sizing: border-box;
          padding-left: 40px;

          .timeDuring {
            @include size(45%, 100%);
            float: left;
            line-height: 40px;

            .el-range-editor.el-input__inner {
              background: rgba(255, 255, 255, 0.05);
            }
          }

          .risktype {
            float: left;
            margin-top: 5px;
            @include size(52%, 100%);
            float: left;
            line-height: 30px;
            /*el input框宽度*/
            .itemCon{
              .inTxt{
                width: 70%;
              }
            }
          }
        }

        &_content {
          @include size(100%, 220px);
          height: 220px;
          box-sizing: border-box;
          padding: 0 30px 30px 40px;

          .securityLine {
            @include size(65%, 100%);
            font-size: 16px;

            .title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10px;

              .selectTime {
                @include size(120px, 30px);
                float: right;
                margin-top: 15px;

                div {
                  text-align: center;
                  line-height: 30px;
                  color: #fff;
                  font-size: 12px;
                  float: left;
                  cursor: pointer;

                  &:nth-child(1) {
                    @include size(50%, 100%);
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }

                  &:nth-child(2) {
                    @include size(50%, 100%);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }
                }

                .activeMount {
                  box-sizing: border-box;
                  border: 1px solid #0096ff !important;
                  color: #0096ff;
                  background: url('../../../assets/images/11-01.png') no-repeat center center;
                  background-size: 100% 100%;
                }
              }
            }

            .content {
              @include size(100%, 80%);
            }
          }

          .outlierFactor {
            @include size(28%, 100%);
            margin-left: 4%;

            &_title {
              @include size(100%, 40px);
              color: #0096ff;
              line-height: 40px;
              box-sizing: border-box;
              padding: 0 15%;
              font-size: 16px;
            }

            &_content {
              @include size(90%, 90%);
              margin: 0 auto;

              .proess {
                @include size(125px, 125px);
                margin: 0 auto;
                border-radius: 50%;

                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 12px;
                  color: #0096ff;
                  margin-top: -42px;
                }
              }

              .state {
                @include size(100%, 25%);
                margin-top: 10px;

                div {
                  @include size(50%, 100%);
                  float: left;

                  span {
                    display: block;
                    @include size(100%, 50%);
                    text-align: center;
                    font-size: 14px;

                    &:nth-child(1) {
                      font-size: 20px;
                      color: #FFB400;
                    }
                  }
                }
              }
            }
          }
        }

        &_bottom {
          @include size(90%, 50%);
          margin-left: 40px;
          position: relative;

          .tiao {
            @include size(100%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
          }

          .listTitle {
            @include size(100%, 30px);
            background: rgba(255, 255, 255, 0.1);

            div {
              float: left;
              box-sizing: border-box;
              text-align: center;
              line-height: 30px;
              color: #0096ff;
              font-size: 14px;
            }
          }

          .listConBtm{
            height: calc(100% - 70px);
            ul {
              width: 102%;
              list-style: none;
              color: #fff;
              overflow: hidden;
              font-size: 12px;
              overflow-y: auto;
              li {
                height: 30px;
                cursor: pointer;

                div {
                  float: left;
                  box-sizing: border-box;
                  text-align: center;
                  line-height: 30px;
                  color: #fff;
                  font-size: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: wrap;

                  &:nth-last-child(1) {
                    color: #0096ff;
                  }
                }
              }

              li:nth-child(even) {
                background: rgba(255, 255, 255, 0.1) !important;
              }
            }
          }

          .departmentxq {
            @include size(92%, 42px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 10px;

            .textNum {
              @include size(150px, 42px);
              text-align: center;
              line-height: 34px;
              color: #f2f2f2;
              font-size: 18px;
            }

            .Pagination {
              width: 1000px;
              height: 42px;
              .classPage {
                height: 30px;
                float: left;
                margin: 10px 20px 0 0;
              }
              .jumpbutton{
                float: left;
                margin-top: 10px;
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
        }
      }
    }
  }

  @media only screen and (min-width: 1291px) and (max-width: 1365px) {
    .departmentStatistics {
      &_right {
        &_bottom{
          width: 96%;
        }
      }
    }
  }

  @media only screen and (min-width: 1377px) and (max-width: 1410px) {
    .departmentStatistics {
      @include size(100%, 100%);
      box-sizing: border-box;
      padding-top: 20px;

      .noData{
        margin: 20% auto;
        text-align: center;
        font-size: 32px;
        color: #fff;
      }
      &_left {
        @include size(15%, 100%);
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.5);

        div {
          @include size(150px, 35px);
          margin-top: 20px;
          background: url('../../../assets/images/title-bj3.png') no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          line-height: 35px;
          font-size: 12px;
          margin-left: 30px;
          cursor: pointer;
        }

        .titlebj {
          background: url('../../../assets/images/title-bj2.png') no-repeat center center !important;
          background-size: 100% 100% !important;
        }
      }

      &_right {
        @include size(85%, 100%);
        float: right;
        position: relative;

        &_title {
          @include size(100%, 40px);
          margin-top: 20px;
          font-size: 14px;
          box-sizing: border-box;
          padding-left: 60px;

          .timeDuring {
            @include size(42%, 100%);
            float: left;
            line-height: 40px;

            .el-range-editor.el-input__inner {
              background: rgba(255, 255, 255, 0.05);
            }
          }

          .risktype {
            @include size(51%, 100%);
            float: left;
            line-height: 30px;
            .itemCon{
              .inTxt{
                width: 73%;
              }
            }
            .styR {
              margin-right: 8px;
            }
          }
        }

        &_content {
          @include size(100%, 45%);
          min-height: 240px;
          box-sizing: border-box;
          padding: 0 60px 30px 60px;

          .securityLine {
            @include size(65%, 100%);
            font-size: 18px;

            .title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10px;

              .selectTime {
                @include size(140px, 35px);
                float: right;
                margin-top: 20px;

                div {
                  text-align: center;
                  line-height: 35px;
                  color: #fff;
                  font-size: 14px;
                  float: left;
                  cursor: pointer;

                  &:nth-child(1) {
                    @include size(50%, 100%);
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }

                  &:nth-child(2) {
                    @include size(50%, 100%);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }
                }

                .activeMount {
                  box-sizing: border-box;
                  border: 1px solid #0096ff !important;
                  color: #0096ff;
                  background: url('../../../assets/images/11-01.png') no-repeat center center;
                  background-size: 100% 100%;
                }
              }
            }

            .content {
              @include size(100%, 80%);
            }
          }

          .outlierFactor {
            @include size(28%, 100%);
            margin-left: 4%;

            &_title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10%;
              font-size: 18px;
            }

            &_content {
              @include size(90%, 90%);
              margin: 0 auto;

              .proess {
                @include size(150px, 150px);
                margin: 0 auto;
                border-radius: 50%;

                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 14px;
                  color: #0096ff;
                  margin-top: -62px;
                  margin-left: -8px;
                }
              }

              .state {
                @include size(100%, 25%);
                margin-top: 10px;

                div {
                  @include size(50%, 100%);
                  float: left;

                  span {
                    display: block;
                    @include size(100%, 50%);
                    text-align: center;
                    font-size: 16px;

                    &:nth-child(1) {
                      font-size: 24px;
                      color: #FFB400;
                    }
                  }
                }
              }
            }
          }
        }

        &_bottom {
          @include size(90%, 50%);
          padding-top: 3%;
          position: relative;

          .tiao {
            @include size(100%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
          }

          .listTitle {
            @include size(100%, 35px);
            background: rgba(255, 255, 255, 0.1);

            div {
              float: left;
              box-sizing: border-box;
              text-align: center;
              line-height: 35px;
              color: #0096ff;
              font-size: 16px;
            }
          }
          .listConBtm{
            height: 58%;
            ul {
              width: 102%;
              height: 175px;
              list-style: none;
              color: #fff;
              overflow: hidden;
              font-size: 14px;
              overflow-y: auto;
              li {
                height: 35px;
                cursor: pointer;

                div {
                  float: left;
                  box-sizing: border-box;
                  text-align: center;
                  line-height: 35px;
                  color: #fff;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: wrap;

                  &:nth-last-child(1) {
                    color: #0096ff;
                  }
                }
              }

              li:nth-child(even) {
                background: rgba(255, 255, 255, 0.1) !important;
              }
            }
          }

          .departmentxq {
            @include size(92%, 42px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 35px;

            .textNum {
              @include size(120px, 100%);
              text-align: center;
              line-height: 28px;
              color: #f2f2f2;
              font-size: 16px;
            }

            .Pagination {
              width: 1000px;
              height: 42px;
              .classPage {
                height: 30px;
                float: left;
                margin: 10px 20px 0 0;
              }
              .jumpbutton{
                float: left;
                margin-top: 10px;
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
        }
      }
    }
  }

  @media only screen and (min-width: 1411px) and (max-width: 1930px) {
    .departmentStatistics {
      @include size(100%, 100%);

      .noData{
        margin: 0 auto;
        padding-top: 20%;
        text-align: center;
        font-size: 32px;
        color: #fff;
      }
      &_left {
        @include size(19%, 100%);
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.5);

        div {
          @include size(240px, 40px);
          margin-top: 20px;
          background: url('../../../assets/images/title-bj3.png') no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          margin-left: 30px;
          cursor: pointer;
        }

        .titlebj {
          background: url('../../../assets/images/title-bj2.png') no-repeat center center !important;
          background-size: 100% 100% !important;
        }
      }

      &_right {
        @include size(81%, 100%);
        float: right;
        position: relative;

        &_title {
          @include size(100%, 40px);
          margin-top: 20px;
          font-size: 16px;
          box-sizing: border-box;
          padding-left: 60px;

          .timeDuring {
            @include size(32%, 100%);
            float: left;
            line-height: 40px;

            .el-range-editor.el-input__inner {
              background: rgba(255, 255, 255, 0.05);
            }
          }

          .risktype {
            @include size(51%, 100%);
            float: left;
            line-height: 40px;
            .styR{
              margin-right: 8px;
            }
          }
        }

        &_content {
          box-sizing: border-box;
          padding: 0 60px 30px 60px;

          .securityLine {
            @include size(65%, 100%);
            font-size: 18px;

            .title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10px;
              overflow: hidden;

              .selectTime {
                @include size(160px, 40px);
                float: right;
                margin-top: 18px;

                div {
                  text-align: center;
                  line-height: 32px;
                  color: #fff;
                  font-size: 14px;
                  float: left;
                  cursor: pointer;

                  &:nth-child(1) {
                    @include size(60px, 32px);
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }

                  &:nth-child(2) {
                    @include size(60px, 32px);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }
                }

                .activeMount {
                  box-sizing: border-box;
                  border: 1px solid #0096ff !important;
                  color: #0096ff;
                  background: url('../../../assets/images/11-01.png') no-repeat center center;
                  background-size: 100% 100%;
                }
              }
            }

            .content {
              @include size(100%, 90%);
            }
          }

          .outlierFactor {
            @include size(28%, 100%);
            margin-left: 4%;

            &_title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 60px;
              font-size: 18px;
            }

            &_content {
              @include size(90%, 90%);
              margin: 0 auto;

              .proess {
                @include size(225px, 225px);
                margin: 0 auto;
                border-radius: 50%;

                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 18px;
                  color: #0096ff;
                  margin-top: -72px;
                }
              }

              .state {
                @include size(100%, 25%);
                margin-top: 10px;

                div {
                  @include size(50%, 100%);
                  float: left;

                  span {
                    display: block;
                    @include size(100%, 50%);
                    text-align: center;
                    font-size: 18px;

                    &:nth-child(1) {
                      font-size: 26px;
                      color: #FFB400;
                    }
                  }
                }
              }
            }
          }
        }

        &_bottom {
          @include size(90%, 47%);
          min-height: 275px;
          position: relative;

          .tiao {
            @include size(100%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
          }

          .listTitle {
            @include size(100%, 40px);
            background: rgba(255, 255, 255, 0.1);
            div {
              float: left;
              box-sizing: border-box;
              text-align: center;
              line-height: 40px;
              color: #0096ff;
              font-size: 16px;
            }
          }
          .listConBtm{
            height: 70%;
            ul {
              width: 102%;
              height: 240px;
              list-style: none;
              color: #fff;
              overflow: hidden;
              font-size: 16px;
              overflow-y: auto;
              li {
                height: 40px;
                cursor: pointer;

                div {
                  float: left;
                  box-sizing: border-box;
                  text-align: center;
                  line-height: 40px;
                  color: #fff;
                  font-size: 14px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: wrap;

                  &:nth-last-child(1) {
                    color: #0096ff;
                  }
                }
              }

              li:nth-child(even) {
                background: rgba(255, 255, 255, 0.1) !important;
              }
            }
          }

          .departmentxq {
            @include size(92%, 42px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 35px;

            .textNum {
              @include size(120px, 100%);
              text-align: center;
              line-height: 26px;
              color: #f2f2f2;
              font-size: 16px;
            }

            .Pagination {
              width: 100%;
              height: 42px;
              .classPage {
                height: 30px;
                float: left;
                margin: 10px 20px 0 0;
              }
              .jumpbutton{
                float: left;
                margin-top: 10px;
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
        }
      }
    }
  }

  @media only screen and (min-width: 1931px) {
    .departmentStatistics {
      @include size(100%, 100%);
      box-sizing: border-box;
      padding-top: 40px;

      .noData{
        margin: 20% auto;
        text-align: center;
        font-size: 32px;
        color: #fff;
      }
      &_left {
        @include size(15%, 100%);
        float: left;
        border-right: 1px solid rgba(255, 255, 255, 0.5);

        div {
          @include size(260px, 70px);
          margin-top: 25px;
          background: url('../../../assets/images/title-bj3.png') no-repeat center center;
          background-size: 100% 100%;
          text-align: center;
          line-height: 70px;
          font-size: 24px;
          margin-left: 70px;
          cursor: pointer;
        }

        .titlebj {
          background: url('../../../assets/images/title-bj2.png') no-repeat center center !important;
          background-size: 100% 100% !important;
        }
      }

      &_right {
        @include size(85%, 100%);
        float: right;
        position: relative;

        &_title {
          @include size(100%, 80px);
          margin-top: 20px;
          font-size: 26px;
          box-sizing: border-box;
          padding-left: 60px;

          .timeDuring {
            @include size(40%, 100%);
            float: left;
            line-height: 80px;

            .el-range-editor.el-input__inner {
              background: rgba(255, 255, 255, 0.05);
            }
          }

          .risktype {
            @include size(55%, 100%);
            float: left;
            line-height: 77px;
            .styR{
              margin-left:30px;
            }
          }
        }

        &_content {
          @include size(100%, 45%);
          box-sizing: border-box;
          padding: 0 60px 30px 60px;

          .securityLine {
            @include size(65%, 100%);
            font-size: 30px;

            .title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 10px;

              .selectTime {
                @include size(300px, 70px);
                float: right;
                margin-top: 10px;

                div {
                  text-align: center;
                  line-height: 70px;
                  color: #fff;
                  font-size: 30px;
                  float: left;
                  cursor: pointer;

                  &:nth-child(1) {
                    @include size(50%, 100%);
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }

                  &:nth-child(2) {
                    @include size(50%, 100%);
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    box-sizing: border-box;
                    border: 1px solid #fff;
                  }
                }

                .activeMount {
                  box-sizing: border-box;
                  border: 1px solid #0096ff !important;
                  color: #0096ff;
                  background: url('../../../assets/images/11-01.png') no-repeat center center;
                  background-size: 100% 100%;
                }
              }
            }

            .content {
              @include size(100%, 90%);
            }
          }

          .outlierFactor {
            @include size(28%, 100%);
            margin-left: 4%;

            &_title {
              @include size(100%, 60px);
              color: #0096ff;
              line-height: 60px;
              box-sizing: border-box;
              padding: 0 60px;
              font-size: 30px;
            }

            &_content {
              @include size(90%, 90%);
              margin: 0 auto;

              .proess {
                @include size(300px, 300px);
                margin: 0 auto;
                border-radius: 50%;

                span {
                  display: block;
                  width: 100%;
                  text-align: center;
                  font-size: 26px;
                  color: #0096ff;
                  margin-top: -85px;
                }
              }

              .state {
                @include size(100%, 25%);
                margin-top: 10px;

                div {
                  @include size(50%, 100%);
                  float: left;

                  span {
                    display: block;
                    @include size(100%, 50%);
                    text-align: center;
                    font-size: 30px;

                    &:nth-child(1) {
                      font-size: 44px;
                      color: #FFB400;
                    }
                  }
                }
              }
            }
          }
        }

        &_bottom {
          @include size(90%, 50%);
          padding-top: 3%;
          position: relative;

          .tiao {
            @include size(100%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
          }

          .listTitle {
            @include size(100%, 80px);
            background: rgba(255, 255, 255, 0.1);

            // border: 1px solid #0096ff;
            div {
              @include size(11%, 100%);
              float: left;
              box-sizing: border-box;
              text-align: center;
              line-height: 80px;
              color: #0096ff;
              font-size: 28px;
            }
          }

          ul {
            width: 102%;
            height: 400px;
            list-style: none;
            color: #fff;
            overflow: hidden;
            font-size: 26px;
            overflow-y: auto;
            li {
              height: 80px;
              cursor: pointer;

              div {
                @include size(11%, 100%);
                float: left;
                box-sizing: border-box;
                text-align: center;
                line-height: 80px;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: wrap;

                &:nth-last-child(1) {
                  color: #0096ff;
                }
              }
            }

            li:nth-child(even) {
              background: rgba(255, 255, 255, 0.1) !important;
            }
          }

          .departmentxq {
            @include size(92%, 80px);
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-top: 35px;

            .textNum {
              @include size(200px, 100%);
              text-align: center;
              line-height: 26px;
              color: #f2f2f2;
              font-size: 26px;
            }

            .Pagination {
              width: 1750px;
              height: 80px;
              .classPage {
                height: 30px;
                float: left;
                margin: 10px 20px 0 0;
              }
              .jumpbutton{
                float: left;
                margin-top: 10px;
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
        }
      }
    }
  }
  /*___________________________________________________________________*/

  @media only screen and (min-width: 1411px) and (max-width: 1610px) {
    .departmentStatistics{
      &_right{
        &_content{
          @include size(100%, 300px);
          .outlierFactor{
            &_title{
              height: 16px;
            }
            &_content{
              .state{
                margin-top: 0;
                height: 24%;
              }
            }
          }
        }
        &_bottom{
          .listConBtm{
            height: 72%;
            ul{
              height: 100%;
            }
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1611px) and (max-width: 1930px) {
    .departmentStatistics{
      &_right{
        &_content{
          @include size(100%, 380px);
        }
      }
    }
  }

</style>
<style lang="scss">
  @media only screen and (max-width: 1376px) {
    .risktype{
      .el-input--suffix .el-input__inner{
        line-height: 30px;
      }
    }
  }
@media only screen and (min-width: 1931px) {
  .el-pagination span{
    font-size: 32px !important;
    letter-spacing: 10px;
  }
  .el-pagination .btn-next .el-icon, .el-pagination .btn-prev .el-icon{
    font-size: 32px !important;
  }
  .el-pager li{
    font-size: 32px !important;
    margin-left:15px;
  }
  .el-pagination__editor.el-input .el-input__inner{
    font-size: 32px !important;
    height: 30px;
  }
  .el-select .el-input .el-select__caret{
    line-height: 80px;
  }
}
  .el-picker-panel__footer>.el-button--text{
    display: none;
  }
</style>
