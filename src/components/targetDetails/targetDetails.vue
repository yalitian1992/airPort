<template>
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <div class="detailsTxt">
      <div class="basic">
        <ul class="basic_ul one">
          <li class="topClass" style="width: 100%;clear:both;">
            <span>指标层级：</span>
            <span class="input">{{factorList.factorLevel}}</span>
          </li>
          <li>
          <!--  <span>视图类型：</span>
            <span class="input">管理视图</span>-->
          </li>
          <li>
            <span>指标名称：</span>
            <span class="input">{{factorList.factorName}}</span>
          </li>
          <li>
            <span>风险等级：</span>
            <span class="input">{{factorList.alarmType}}</span>
          </li>
          <li>
            <span>当前分值：</span>
            <span class="input">{{factorList.curRiskValue}}</span>
          </li>
        </ul>
        <p class="line"></p>
        <ul class="basic_ul two">
          <li>
            <span>历史报警总数：</span>
            <span class="input">{{factorList.alarmHis}}</span>
          </li>
          <li>
            <span>未处置报警总数：</span>
            <span class="input">{{factorList.noDoAlarm}}</span>
          </li>
          <li>
            <span>平均响应时间：</span>
            <span class="input">{{factorList.avgTime}}</span>
          </li>
          <li>
            <span>事件处置闭环率：</span>
            <span class="input">{{factorList.alarmCicle}}</span>
          </li>
          <li>
            <span>本月报警总数：</span>
            <span class="input">{{factorList.monthAlarm}}</span>
          </li>
        </ul>
      </div>
      <div class="details">
        <p class="tit">
          <span>待处置报警</span>
        </p>
        <div class="details_ul">
          <div class="row-box">
            <table-simple  style="text-align: center;"
                           :table-data="tableData"
                           :useSerialNumber="true"
                           :serial-number-name="'序号'"
                           :use-zebra="true">
            </table-simple>
          </div>
        </div>
      </div>
    </div>
  </Prompt>
</template>
<script>
import Prompt from '../../components/prompt/prompt.vue'
import TableSimple from '../../components/table/table-simple.vue'

const RiskFactorDetail = '/RiskTopology/GetRiskFactorDetail'
export default {
  data () {
    return {
      ProData: {
        title: '指标详情',
        show: false,
        width: '80%',
        height: '90%'
      },
      tableData: {
        colum: [
          {
            title: '报警等级',
            data: 'AlarmType',
            width: '6em'
          },
          {
            title: '风险值',
            data: 'AlarmValue',
            width: '4em'
          },
          {
            title: '风险报警时间',
            data: 'AlarmTime',
            width: '12em'
          },
          {
            title: '报警描述',
            data: 'AlarmReason',
            width: 'auto'
          },
          {
            title: '风险详情',
            data: 'ReasonDetail'
          },
          {
            title: '问题描述',
            data: 'ProblemDes'
          }
        ],
        data: [
          {ll: '12', fke: '字段2'}
        ]
      },
      factorList: {}
    }
  },
  components: {
    Prompt,
    TableSimple
  },
  methods: {
    IsShow: function (item) {
      let _this = this
      _this.ProData.show = true
      this.post(RiskFactorDetail, {
        param: JSON.stringify({kid: item.kid})
      }, function (res) {
        _this.factorList = res
        _this.tableData.data = res.alarmDetail
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .line{
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .tit{
    border-top: 1px solid #fff;
    span{
      margin-top: 1em;
      display: inline-block;
      width: 90px;
      height: 2em;
      line-height: 2em;
      text-align: center;
      border-radius: 3px;
    }
  }
  .detailsTxt{
    margin: 0 auto;
    height: 96% !important;
    padding: 0 20px 0 20px;
    .basic{
      margin-bottom: 0.6em;
      &_ul{
        margin: 1em 0 0 5%;
        overflow: hidden;
        li{
          width: 50%;
          overflow: hidden;
          span{
            display: block;
            float: left;
            height: 30px;
            line-height: 30px;
            overflow: hidden;
            font-size: 14px;
          }
          .input{
            width: 50%;
            padding: 0 4px;
            vertical-align: middle;
            white-space:nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
            border: none;
            color: #fff;
          }
        }
        li.topClass{
          .input{
            width: 90%;
            text-overflow: clip;
          }
        }
        li:nth-child(2n + 1){
          float: left;
        }
        li:nth-child(2n){
          float: right;
        }
      }
      &_ul.one{
        li{
          span:nth-child(2){
            width: 80%;
          }
        }
      }
      &_ul.two{
        li{
          span:nth-child(2){
            width: 74%;
          }
        }
      }
    }
    .details{
      height: 54%;
      &_ul{
        height: calc(100% - 3em) !important;
        overflow: auto;
        .row-box{
          height: 100%;
          li{
            float: left;
            width: 25%;
            p{
              font-size: 13px;
            }
            p.tip{
              background: url('../../assets/images/sort-up-active-nomal-icon.png') no-repeat left/10px 5px;
              i{
                padding: 0 10px 0 20px;
                font-style: normal;
                color: #0096ff;
              }
            }
            span{
              font-size: 26px;
            }
          }
        }
      }
    }
  }
</style>
