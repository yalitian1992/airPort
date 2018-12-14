<template>

    <prompt :pro-data="ProData" v-show="ProData.show" @resize="proBoxResize">
      <div class="box">
        <!--title-->
       <!-- <div class="title">
          <span>节点详情</span>
          <i class="closeIcon" @click="closeIcon"></i>
        </div>-->
        <!--描述-->
        <div class="des">
          <!--数据描述-->
          <div class="datades">
            <div class="row h-pc-30" style="text-align: left;">
              <div class="row h-pc-50">
                <div class="row-column-24" >
                  <span class="moreTxt">拓扑单元：{{RiskTop}}</span>
                </div>
              </div>
              <div class="row h-pc-50">
                <div class="row-column-8">
                  当前分值：{{RiskValue}}
                </div>
                <div class="row-column-8">
                  <span>当前节点：{{CurTime}}</span>
                </div>
              </div>
              <div class="row h-pc-50">
                <div class="row-column-8">
                  等待处理的报警：{{AlarmNum}}
                </div>
                <div class="row-column-8">
                  视图类型：{{View}}
                </div>
              </div>
            </div>
            <div class="datadesPanel">
              <!--新改-->
              <div class="pathL">
                <p>节点指标总数</p>
                <p>{{FactorNum}}</p>
              </div>
              <div class="pathR" style="box-sizing: border-box;">
                <div class="li">
                  <div class="cav" style="">
                    <!--<div id="pie1" style="width: 80px;height: 80px;"></div>-->
                    <circleScale :valueData="jRisk.cont" color1="#ff0000" ref="circle1" color2="#eee">
                    </circleScale>
                  </div>
                  <p>击穿风险</p>
                </div>
                <div class="li">
                  <div class="cav">
                    <circleScale :valueData="hRisk.cont" ref="circle2" color1="#ff7300" color2="#eee">
                    </circleScale>
                  </div>
                  <p>高风险</p>
                </div>
                <div class="li">
                  <div class="cav">
                    <circleScale :valueData="mRisk.cont" ref="circle3" color1="#ffdc00" color2="#eee">
                    </circleScale>
                  </div>
                  <p>中风险</p>
                </div>
                <div class="li">
                  <div class="cav">
                    <circleScale :valueData="lRisk.cont" ref="circle4" color1="#0096ff" color2="#eee">
                    </circleScale>
                  </div>
                  <p>低风险</p>
                </div>

                <!--<div class="datadesPanelItem1">
                  <div class="row h-pc-50 p10 box-borderBox">
                    <div style="display: inline-block;">该节点涉及的指标总数：</div>
                    <div class=" p10 inline-block" style="text-align: center;display: inline-block;">{{FactorNum}}</div>
                  </div>
                  <div class="row h-pc-50 p10 box-borderBox">
                    <div style="display: inline-block;">等待处理的报警：</div>
                    <div class=" p10 inline-block" style="text-align: center;display: inline-block;">{{AlarmNum}}</div>
                  </div>
                </div>-->
                <!--<div class="datadesPanelItem2">
                  <div class="row h-pc-50">
                    <div class="row-column-8 lp20 box-borderBox">
                      <div class=" imgItem" ></div>
                      <div class="inline-block" style="text-align: center;padding-left: 1em;">
                        <div class="m0_5-em">人员类指标</div>
                        <div class="fs-23">44</div>
                      </div>
                    </div>
                    <div class="row-column-8 lp20 box-borderBox">
                      <div class="imgItem" ></div>
                      <div class="inline-block" style="text-align: center;padding-left: 1em;">
                        <div class="m0_5-em">设备类指标</div>
                        <div class="fs-23">44</div>
                      </div>
                    </div>
                  </div>
                  <div class="row h-pc-50">
                    <div class="row-column-8 lp20 box-borderBox">
                      <div class="imgItem" ></div>
                      <div class="inline-block" style="text-align: center;padding-left: 1em;">
                        <div class="m0_5-em">环境类指标</div>
                        <div class="fs-23">44</div>
                      </div>
                    </div>
                    <div class="row-column-8 lp20 box-borderBox">
                      <div class="imgItem" ></div>
                      <div class="inline-block" style="text-align: center;padding-left: 1em;" >
                        <div class="m0_5-em">管理类指标</div>
                        <div class="fs-23">44</div>
                      </div>
                    </div>
                  </div>
                </div>-->
              </div>
            </div>
          </div>
          <!--eachart图表-->
          <div class="row-column-5 h-pc-100 p10" style="box-sizing: border-box;">
            <div class="h-pc-100" style="border: 2px solid #a2a2a2;border-radius: 5px;" id="main">无数据</div>
          </div>
        </div>
        <!--表格标题-->
        <div class="tableTable">
          <span>风险因子排名：</span>
        </div>
        <!--表格-->
        <div class="tableBox">
          <div class="row-column-16">
            <table-simple  :table-data="tableData" :useSerialNumber="true" :serial-number-name="'序号'" :use-zebra="true" :class="{mySkin:true}"></table-simple>
          </div>
        </div>
      </div>
    </prompt>

</template>

<script>
import EchartHelpers from '../../../util/eacharts'
import TableSimple from '../../../components/table/table-simple'
import Prompt from '../../../components/prompt/prompt'
import circleScale from '../riskbottom/circleScale'

const RiskCurveDetail = 'RiskTopology/GetRiskCurveDetail'
export default {
  name: 'detailBox',
  components: {Prompt, TableSimple, circleScale},
  data () {
    return {
      jRisk: {cont: 0},
      hRisk: {cont: 0},
      mRisk: {cont: 0},
      lRisk: {cont: 0},
      num: 50,
      tableData: {
        colum: [
          {
            title: '风险因子',
            data: 'riskfactor',
            width: 'auto'
          },
          {
            title: '风险值',
            data: 'alarmValue',
            width: '4em'
          },
          {
            title: '部门',
            data: 'department',
            width: '8em'
          },
          {
            title: '模块',
            data: 'modular',
            width: '6em'
          },
          // {
          //   title: '报警时间',
          //   data: 'alarmTime',
          //   width: '11em'
          // },
          // {
          //   title: '风险状态',
          //   data: 'state',
          //   width: '9em'
          // },
          {
            title: '风险类型',
            data: 'risktype'
          },
          {
            title: '风险因子类型',
            data: 'riskfactortype'
          },
          {
            title: '历史报警总数',
            data: 'acount',
            width: '9em'
          },
          {
            title: '平均响应时间',
            data: 'atime',
            width: '9em'
          }/*,
          {
            title: '最后操作者',
            data: 'lastOperator',
            width: '8em'
          } */
        ],
        data: [
          {ll: '12', fke: '字段2'}
        ]
      },
      scoreShow: false,
      myChart: null,
      pieChart1: null,
      RiskValue: 0,
      View: '',
      RiskTop: '',
      CurTime: '',
      FactorNum: 0,
      AlarmNum: 0,
      RiskData: [],
      ProData: {
        title: '节点详情',
        show: false,
        width: '80%',
        height: '99%'
      }
    }
  },
  methods: {
    closeIcon () {
      this.layer.closeAll()
      this.scoreShow = false
      this.ProData.show = false
    },
    RiskDetail (id) {
      let _this = this
      _this.scoreShow = true
      _this.ProData.show = true
      _this.layer.load(1, {shade: false})
      _this.tableData.data = []
      this.post(RiskCurveDetail, {
        param: JSON.stringify({cid: id})
      }, function (res) {
        console.log(res)
        _this.tableData.data = res.AlarmList
        _this.RiskValue = res.RiskValue
        _this.View = res.View
        _this.RiskTop = res.RiskTop
        _this.FactorNum = res.FactorNum
        _this.AlarmNum = res.AlarmNum
        _this.RiskData = res.RiskData
        _this.CurTime = res.CurTime
        for (let i in res.RiskMap) {
          switch (res.RiskMap[i].cod) {
            case '击穿':
              _this.jRisk = res.RiskMap[i]
              break
            case '高':
              _this.hRisk = res.RiskMap[i]
              break
            case '中':
              _this.mRisk = res.RiskMap[i]
              break
            case '低':
              _this.lRisk = res.RiskMap[i]
              break
            default:break
          }
        }
        _this.setCharts()
        // _this.setPieEChart('#ff0000', this.num)
        _this.layer.closeAll()
      })
    },
    setCharts () {
      let aData = (function (RiskData) {
        let _aData = {indicator: [], value: []}
        for (let i in RiskData) {
          _aData.indicator.push({name: RiskData[i].name + ' \n ' + RiskData[i].value + ' ', max: 10})
          _aData.value.push(RiskData[i].value)
        }
        return _aData
      })(this.RiskData)
      let fontS = 14
      if (screen.width > 1920) {
        fontS = 18
      }
      let option = {
        title: {text: '风险分布',
          textStyle: {
            color: '#fff'
          }},
        // tooltip: {},
        radar: {
          radius: '20%',
          // shape: 'circle',
          name: {
            textStyle: {
              fontSize: fontS,
              color: '#fff',
              borderRadius: 13,
              padding: [0, 0]
            }
          },
          indicator: aData.indicator
        },
        series: [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar'}]
      }
      if (aData.indicator !== '' && aData.indicator !== null && aData.indicator !== undefined && aData.indicator.length > 0) {
        option.series =
          [{
            name: '预算 vs 开销（Budget vs spending）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: aData.value === [] ? [] : [
              {
                value: aData.value,
                name: '预算分配（Allocated Budget）'
              }
            ]
          }]
        option.radar = {
          // shape: 'circle',
          radius: '40%',
          name: {
            textStyle: {
              fontSize: fontS,
              color: '#fff',
              borderRadius: 13,
              padding: [0, 0]
            }
          },
          indicator: aData.indicator
        }
      } else {
        option.series = [{
          name: '预算 vs 开销（Budget vs spending）',
          type: 'radar'}]
        option.radar = {
          // shape: 'circle',
          name: {
            textStyle: {
              fontSize: fontS,
              color: '#fff',
              borderRadius: 13,
              padding: [0, 0]
            }
          }
        }
      }
      // 绘制图表
      this.myChart.setOption(option, true)
    },
    setPieEChart (color1, num) {
      let option = {
        title: {
          text: num + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 24
          }
        },
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: num,
                name: '01',
                itemStyle: {
                  normal: {
                    color: color1,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '02',
                value: 100 - num,
                itemStyle: {
                  normal: {
                    color: '#eee'
                  }
                }
              }
            ]
          }
        ]
        // ------------------------------------------------------
      }
      this.pieChart1.setOption(option, true)
    },
    proBoxResize () {
      window.onresize()
    }
  },
  mounted () {
    let _this = this
    var echartHelper = new EchartHelpers()
    if (this.myChart === null) {
      echartHelper.resize = function () {
        _this.setCharts()
      }
      this.myChart = echartHelper.getMychartById('main')
    }

    // if (this.pieChart1 === null) {
    //   echartHelper.resize = function () {
    //     _this.setPieEChart('#ff0000', this.num)
    //   }
    //   this.pieChart1 = echartHelper.getMychartById('pie1')
    //   console.log('this.pieChart1', this.pieChart1)
    // }
  },
  updated () {
    window.onresize()
  }
}
</script>
<style>
  .mySkin{
    text-align: center;
  }
  .mySkin table thead th{
    background-color: rgb(25, 30, 62);
    background:rgb(25, 30, 62);
  }
  .mySkin .odd{
   /*background-color:#2D3657   !important;*/
  }
  .mySkin tbody tr:hover{
    background-color: #33426F !important;
  }
</style>
<style lang="scss" scoped>
  @media only screen and (min-width: 1931px){
    .pageLevel{
      font-size: 25px;
    }
  }
  .moreTxt{
    display: block;
    overflow: hidden;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pageLevel{
    position: fixed;
    top:0;
    z-index: 999999;
    width: 1024px;
    height: 100%;
    overflow: auto;
    background: url("../../../assets/images/bj.png");
  }
  .box{
    width: 100%;
  margin:0 auto;
    left:0;
    height: 100%!important;
    position:relative;
    top:0;
    z-index: 101;
  }
  .title{
    width: 100%;
    height: 5%!important;
    position: relative;
    padding: 10px;
    text-align: left;
    font-weight: bold;
    box-sizing: border-box;
  }
  .closeIcon{
    position: absolute;
    right: 3px;
    top: 3px;
width: 2em;
    height: 100%;
    border-radius: 5px;
    cursor:pointer;
    background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
  }
  .des{
    width: 100%;
    height: 40%!important;
    position: relative;
  }
  .des .datades{
    width:calc(100% / 16 * 10.9999);
    float: left;
    height: 100%!important;
    padding: 10px;
    box-sizing: border-box;
  }
  .des .datades .datadesPanel{
    width: 100%;
    height: 61%!important;
    margin-top: 1.2em;
    padding: 10px;
    position: relative;
    border:2px solid rgb(162, 162, 162);
    border-radius: 5px;
    .pathL,.pathR{
      height: 100%;
     display: inline-block;
    }
    .pathL{
      width: 20%;
      vertical-align: middle;
     /* margin-right: 10px;*/
      p{
        margin: 1.4em auto;
        text-align: center;
      }
      p:nth-child(2){
        font-size: 18px;
      }
    }
    .pathR{
      width: 75%;
      vertical-align: middle;
      overflow: hidden;
      .li{
       display: inline-block;
        width: 23%;
        vertical-align: middle;
        height: 100%;
       /* margin-right: 8px;*/
        .cav{
          /*margin: 1em auto;*/
          width:100%;
          height: calc(100% - 1.5em);
          position: relative;
          /*border: 1px solid #fff;*/
          .normal1{
            .echarts{
              div{
                width: 100%!important;
                height: 100%!important;
              }
            }
          }
        }
        p{
          font-size: 14px;
          text-align: center;
        }
      }
      .li:last-child{
        margin-right: 0;
      }
    }
  }
  .des .datades .datadesPanel .datadesPanelItem1{
    width:calc(100% / 16 * 15.9999);
    float: left;
    height: 100%;
    border-radius: 5px;background: #2d4687;
    text-align: left;
  }
  .des .datades .datadesPanel .datadesPanelItem2{
    width:calc(100% / 16 * 9.9999);
    float: left;
    height: 100%;
    white-space: nowrap;
  }
  .des .datades .datadesPanel .datadesPanelItem2 .imgItem{
    background:blue;
    border-radius: 100%;
    width: 3em;
    height: 3em;
    display: inline-block;
  }
  .tableTable{
    height: 5%!important;
    padding: 10px;
    text-align: left;
    font-size: 14px;
    line-height: 150%;
    box-sizing: border-box;
  }
  .tableBox{
    width: 100%;
    height: 55%!important;
    position: relative;
    padding: 10px;
    overflow: auto;
    position: relative;
    box-sizing: border-box;
  }
  .row{
    width: 100%;
    height: 100%;
    position: relative;
  }
  .row-column-5{
    width:calc(100% / 16 * 4.9999);
    float: left;
    height: 100%;
  }
  .row-column-8{
    width:calc(100% / 16 * 7.9999);
    float: left;
    height: 100%;
  }
  .row-column-16{
    width:calc(100% / 16 * 15.9999);
    float: left;
    height: 100%;
  }
  .h-pc-30{
    height: 30%!important;
  }
  .h-pc-50{
    height: 40%!important;
  }
  .h-pc-100{
    height: 100%!important;
  }
  .p10{
    padding: 10px;
  }
  .p20{
    padding: 20px;
  }
  .box-borderBox{
    box-sizing: border-box;
  }
  .fs-23{
    font-size: 23px;
  }
  .lp20{
    padding-left: 20px;
  }
  .inline-block{
    display: inline-block;
  }
  @media only screen and (min-width: 1411px) and (max-width: 1930px){
    .des .datades .datadesPanel{
      .pathL{
        p:nth-child(1){
          font-size: 22px;
        }
        p:nth-child(2){
          font-size: 26px;
        }
      }
    }
  }
</style>
