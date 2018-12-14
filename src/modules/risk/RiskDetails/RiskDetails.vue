<template>
 <!-- eslint-disable  -->
  <div class="riskDetails">
    <div class="riskDetails_warp">
      <div style="height: 53.8%;">
        <div class="riskDetails_Title1">

          <router-link tag='a' class="routerBack" :to="'/Application/risk'" >

            <img class="riskDetails_return" src="../../../assets/images/return.png" alt=""   @click="jumpRisk()" >
          </router-link>
          <span>{{this.$route.query.name}}</span>
          <p :class="riskValue<=3&&riskValue>0?'CenterBlue':(riskValue<=6&&riskValue>3?'CenterYellow':(riskValue<=9&&riskValue>6?'CenterOrange':(riskValue<=10&&riskValue>9?'CenterRed':'')))">{{riskValue}}</p>
        </div>
        <!-- 道场管理模块的事故处理闭环率 -->
        <div class="riskDetails_three">
          <div class="closelooprate">
            <div class="riskDetails_left">
              <circle-scale1 :valueData="RoadManagementModule &&  RoadManagementModule.progress  ||  0"
                             color1="#0096ff"
                             color2="#1A4E82"></circle-scale1>
            </div>
            <div class="riskDetails_right">事故处理闭环率</div>
          </div>
          <div class="loadingpolice">
            <div class="riskDetails_left">
              <img src="../../../assets/images/LOUDOU.png"
                   alt="">
            </div>
            <div class="riskDetails_right">
              <div class="riskDetails_right1">等待处理的报警</div>
              <div class="tiao"></div>
              <div class="riskDetails_right2">
                <span>{{(RoadManagementModule && RoadManagementModule.alarmWaiting)||0}}</span>
              </div>
            </div>
          </div>
          <div class="alarmNum">
            <div class="riskDetails_left">
              <img src="../../../assets/images/ANHUO.png"
                   alt="">
            </div>
            <div class="riskDetails_right">
              <div class="riskDetails_right1">历史报警数量</div>
              <div class="tiao"></div>
              <div class="riskDetails_right2">
                <span>{{ (RoadManagementModule && RoadManagementModule.HistoricalEarLyWarningNumber)||0}}</span>
                <!--<span>{{RoadManagementModule && RoadManagementModule.HistoricalEarLyWarningRate|| 0}}%</span>-->
                <!-- <span>0.79%</span> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 风险分布 -->
        <div class="riskDetails_riskDistribute">
          <div class="riskDetails_Title2">风险分布</div>
          <div class="tiao"></div>
          <div class="riskDistribute_content">
            <risk-distrbute-charts :riskData='riskDataDetail  &&  riskDataDetail.riskData'
                                   v-if="riskDataDetail  &&riskDataDetail.riskData"></risk-distrbute-charts>
          </div>
        </div>
        <!-- 风险因子排名 -->
        <div class="riskFactorTop">
          <div class="riskDetails_Title3">风险因子排名
            <div class="view"
                 @click="view()">查看全部</div>
          </div>
          <div class="tiao"></div>
          <div class="riskFactorTop_content">
            <div class="listTitle">
              <div v-for="(item,index) in listTitle"
                   :key="index">{{item}}</div>
            </div>
            <div style="height: calc(100% - 30px)" class="autoScroll">
              <ul>
                <li v-for='(item,index) in listdataInfo'
                    :key='index'
                    :style="{color:listdataColor[index]}">
                  <div>{{index+1}}</div>
                  <div>{{item.riskfactor}}</div>
                  <div>{{item.riskvalue}}</div>
                  <div>{{item.poclie}}</div>
                  <div v-if="item.value==0"
                       class="state">
                    <i><img src="../../../assets/images/NO.png"></i>{{item.state}}{{(item.state === '良好' || item.state === '需关注') ? '' : ','+item.relieve}}</div>
                  <div v-if="item.value==1"
                       class="state">
                    <i><img src="../../../assets/images/ING.png"></i>{{item.state}}{{(item.state === '良好' || item.state === '需关注') ? '' : ','+item.relieve}}</div>
                  <div v-if="item.value==2"
                       class="state">
                    <i><img src="../../../assets/images/YES.png"></i>{{item.state}}{{(item.state === '良好' || item.state === '需关注') ? '' : ','+item.relieve}}</div>
                  <div>{{item.acount}}</div>
                  <div>
                    <span @click="Showriskdisposal(item)">查看</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
      <!-- 安全曲线 -->
      <div class="safetyCurve">
        <div class="riskDetails_Title4">安全曲线</div>
        <div class="tiao"></div>
        <div class="safetyCurve_content">
          <securityLine :data="safetyCurveData24"
                        @click="eClick"
                        :color="workStrengthChartColor"
                        :areaOpacity=0
                        v-if="    activeMountKey===0  &&  safetyCurveData24"
                        yaxisName="(风险值)"
                        :dataZoom=false
                        xaxisName="(时间点)"
                        state=1></securityLine>
          <securityLine :data="safetyCurveData48"
                        @click="eClick"
                        :color="workStrengthChartColor"
                        :areaOpacity=0
                        v-if="    activeMountKey===1  &&  safetyCurveData48"
                        yaxisName="(风险值)"
                        :dataZoom=false
                        xaxisName="(时间点)"
                        state=3></securityLine>
        </div>
        <div class="safetyCurve_Time">
          <div class="selectTime">
            <div :class="activeMountKey===0?'activeMount':''"
                 @click="activeMount(0)">24小时</div>
            <div :class="activeMountKey===1?'activeMount':''"
                 @click="activeMount(1)">48小时</div>
          </div>
        </div>
      </div>
    </div>
    <div class="scoreBox" v-show="scoreShow">
      <p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></p>
    </div>
    <!--查看详情弹框-->
    <SafetyDetails ref="Detail"></SafetyDetails>
  </div>
</template>
<script>
/*eslint-disable */
import { mapState, mapActions, mapMutations } from "vuex";
import securityLine from "@/components/echarts/securityLine.vue";
import RiskXq from "@/modules/risk/riskXq/RiskXq.vue";
import riskDistrbuteCharts from "@/components/echarts/riskDistrbuteCharts.vue";
import riskbottom from "@/modules/risk/riskbottom/riskbottom.vue";
import CircleScale1 from "@/components/echarts/CircleScale1.vue";
import SafetyDetails from '../../../components/targetDetails/targetDetails.vue'
export default {
  components: {
    securityLine,
    RiskXq,
    riskDistrbuteCharts,
    riskbottom,
    CircleScale1,
    SafetyDetails
  },
  created() {
    this.getRiskDataDetail(this.getparams);
    this.getRiskfactorCount(this.getparams);
    this.getRiskTopDetailSafeCurve(this.getparams);
    this.getRiskDetailFactor(this.getparams);
  },
  data() {
    return {
      workStrengthChartColor: ["#05D0EB ", "#C88637", "#BC570C"],
      activeMountKey: 0,
      sorceCon: '',
      scoreShow: false,
      listTitle: [
        "序号",
        "风险因子",
        "风险值",
        "等待时长",
        "状态",
        "报警次数",
        "操作"
      ],
      riskxqShow: false,
      riskdisposalShow: false
    };
  },
  computed: {
    ...mapState("RiskStore", [
      "riskDataDetail",
      "treeId",
      "indexData",
      "RiskfactorCount",
      "riskTopDetailSafeCurve",
      "riskDetailFactor"
    ]),
    riskValue() {
      return this.$route.query.value;
    },
    getparams() {
      return JSON.stringify({
        modelType: String(this.$route.query.modelType),
        treeId: String(this.$route.query.treeId)
      });
    },
    getparams2() {
      return JSON.stringify({
        modelType: String(0),
        treeId: String("")
      });
    },
    safetyCurveData24() {
      return (
        this.riskTopDetailSafeCurve &&
        this.riskTopDetailSafeCurve !== undefined &&
        this.riskTopDetailSafeCurve !== null &&
        this.riskTopDetailSafeCurve.safetyCurveData24 &&
        this.riskTopDetailSafeCurve.safetyCurveData24
      );
    },
    safetyCurveData48() {
      return (
        this.riskTopDetailSafeCurve &&
        this.riskTopDetailSafeCurve !== undefined &&
        this.riskTopDetailSafeCurve !== null &&
        this.riskTopDetailSafeCurve.safetyCurveData48 &&
        this.riskTopDetailSafeCurve.safetyCurveData48
      );
    },
    RoadManagementModule() {
      if (
        this.RiskfactorCount &&
        this.RiskfactorCount !== undefined &&
        this.RiskfactorCount !== null &&
        this.RiskfactorCount.RoadManagementModule &&
        this.RiskfactorCount.RoadManagementModule
      ) {
        let data = this.RiskfactorCount.RoadManagementModule;
        return {
          progress:
            (data &&
              data.progress &&
              data.progress !== null &&
              data.progress) ||
            0,
          alarmWaiting: data && data.alarmWaiting && data.alarmWaiting,
          HistoricalEarLyWarningNumber:
            data &&
            data.HistoricalEarLyWarningNumber &&
            data.HistoricalEarLyWarningNumber,
          HistoricalEarLyWarningRate:
            data &&
            data.HistoricalEarLyWarningRate &&
            data.HistoricalEarLyWarningRate
        };
      }
      return null;
    },
    listdataInfo() {
      if (
        this.riskDetailFactor &&
        this.riskDetailFactor !== undefined &&
        this.riskDetailFactor !== null &&
        this.riskDetailFactor.listData &&
        this.riskDetailFactor.listData !== undefined &&
        this.riskDetailFactor.listData !== null
      ) {
        let listdata = this.riskDetailFactor.listData;
        return listdata;
      }
      return "";
    },
    listdataColor() {
      if (
        this.listdataInfo &&
        this.listdataInfo !== undefined &&
        this.listdataInfo !== null
      ) {
        let color = [];
        // 9 < item.value && Number(item.value) <= 10
        // 6 < item.value && Number(item.value) <= 9
        // 3 < item.value && Number(item.value) <= 6
        // 1 <= item.value && Number(item.value) <= 3
        // color: ['#0096FF', '#FFDC00', '#FF7300', '#FF0000'],
        color = this.listdataInfo.map(item => {
          // return 9 < Number(o.riskvalue) <= 10  ?  "#FF0000"  : 6 <Number(o.riskvalue) <=9  ?   "#FF7300"  :3 <  Number(o.riskvalue) <= 6 ?  "#FFDC00"  :  1 <=  Number(o.riskvalue) <= 3?  "#0096FF"  :"";
          if (9 < item.riskvalue && Number(item.riskvalue) <= 10) {
            return "#FF0000";
          } else if (6 < item.riskvalue && Number(item.riskvalue) <= 9) {
            return "#FF7300";
          } else if (3 < item.riskvalue && Number(item.riskvalue) <= 6) {
            return "#FFDC00";
          } else if (1 <= item.riskvalue && Number(item.riskvalue) <= 3) {
            return "#0096FF";
          }
        });
        return color;
      }
      return "";
    }
  },
  methods: {
    ...mapActions("RiskStore", [
      "getManageData",
      "getRiskViewData",
      "getRiskFactor",
      "getRiskSafeCurve",
      "getRiskData",
      "getRiskDataDetail",
      "getRiskfactorCount",
      "getRiskTopDetailSafeCurve",
      "getRiskDetailFactor"
    ]),
    ...mapMutations("RiskStore", ["setTreeId","setIndexData"]),
    jumpRisk() {
      this.setTreeId("");
      this.setIndexData(0)
      this.getRiskFactor(this.getparams2);
      this.getRiskSafeCurve(this.getparams2);
      this.getRiskData(this.getparams2);
      this.getManageData();
      this.getRiskViewData();
    },
    jump() {
      this.$router.push({
        path: "/Application/risk",
        query: {
          modelType: this.$route.query.modelType,
          treeId: this.$route.query.treeId
        }
      });
    },
    view() {
      this.$router.push({
        path: "/Application/RiskXq",
        query: {
          modelType: this.$route.query.modelType,
          treeId: this.$route.query.treeId,
          name: this.$route.query.name,
          value: this.$route.query.value
        }
      });
    },
    riskClose() {
      this.riskxqShow = false;
    },
    activeMount(item) {
      this.activeMountKey = item;
    },
    Showriskdisposal(item) {
      item.kid = item.treeId
      this.$refs.Detail.IsShow(item)
      // this.$router.push("/Application/Riskdisposal");
    },
    closeRiskdisposal1() {
      this.riskdisposalShow = false;
    },
    eClick(params){
     // this.scoreShow = true
      this.sorceCon = params.name + '风险值' + params.value
    }
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.CenterBlue {
  color: #0096ff;
}
.CenterYellow {
  color: #ffdc00;
}
.CenterOrange {
  color: #ff7300;
}
.CenterRed {
  color: #ff0000;
}
/*.riskDetails_return {*/
  /*position: absolute;*/
  /*top: 3%;*/
/*}*/
.riskDetails{
  @include size(100%, 100%);
  min-width:1024px;
  min-height: 400px;
  position: relative;
  .riskDetails_warp{
    .riskDetails_Title1{
      .routerBack{
        position: absolute;
        top: 1em;
      }
      span{
        margin-left: 25px;
      }
      p{
        float: right;
      }
    }
  }
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
@media only screen and (max-width: 1376px) {
  .riskDetails {
    @include size(100%, 100%);
    min-width:1024px;
    min-height: 400px;
    position: relative;
    .riskDetails_warp {
      @include size(95%, 100%);
      margin-left: 2.5%;
      position: absolute;
      box-sizing: border-box;
      .riskDetails_Title1 {
        @include size(918px, 40px);
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
      .riskDetails_Title1 {
        @include size(46%, 40px);
        box-sizing: border-box;
        padding-left: 18px;
        padding-right: 2%;
        margin-top: 15px;
        span {
          width: 88%;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .riskDetails_three {
        @include size(20%, calc(100% - 56px));
        float: left;
        margin-top: 16px;
        .closelooprate {
          @include size(100%, 30%);
          background: rgba(255, 255, 255, 0.05);
        /*  margin-bottom: 8%;*/
          .riskDetails_left {
            @include size(65px, 80%);
            border-radius: 50%;
            // background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 3%;
            margin-left: 8%;
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 95% !important;
            line-height: 400%;
          }
        }
        .loadingpolice {
          @include size(100%, 30%);
          margin: 3.6% auto;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 80%);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 3%;
            margin-left: 8%;
            position: relative;
            img {
              position: absolute;
              /*top: 10px;*/
              width: 50%;
              height: 60%;
              top: 25%;
              left: 25%;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 95% !important;
            &1 {
              @include size(100%, 55%);
              line-height: 350%;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../../../assets/images/bt-bj.png") no-repeat
                center center;
            }
          }
        }
        .alarmNum {
          @include size(100%, 30%);
          // margin-bottom: 3%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 80%);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 3%;
            margin-left: 8%;
            position: relative;
            img {
              position: absolute;
/*
              top: 10px;
*/   width: 50%;
              height: 60%;
              top: 25%;
              left: 25%;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            color: #fff;
            font-size: 95% !important;
            float: right;
            &1 {
              @include size(100%, 55%);
              line-height: 350%;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../../../assets/images/bt-bj.png") no-repeat
                center center;
              background-size: 100% 100%;
            }
            &2 {
              span {
                margin-right: 50px;
                &:nth-child(2) {
                  font-size: 12px;
                }
              }
            }
          }
        }
      }
      .riskDetails_riskDistribute {
        @include size(25%, calc(100% - 56px));
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin-top: 16px;
        margin-left: 1%;
        float: left;
        .riskDetails_Title2 {
          @include size(100%, 15%);
          color: #fff;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
          box-sizing: border-box;
          padding-left: 18px;
          background: rgba(255, 255, 255, 0.05);
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .riskDistribute_content {
          @include size(100%, 78%);
          // background: url("../../../assets/images/ld-bj.png") no-repeat center
          //   center;
          // background-size: 43% 56%;
        }
      }
      .riskFactorTop {
        @include size(53%, 100%);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.5);
        float: right;
        margin-top: -40px;
        .riskDetails_Title3 {
          @include size(100%, 40px);
          position: relative;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
          box-sizing: border-box;
          color: #fff;
          padding-left: 18px;
          background: rgba(255, 255, 255, 0.05);
          .view {
            @include size(80px, 24px);
            position: absolute;
            right: 2%;
            top: 18%;
            font-size: 14px;
            background: #18305e;
            border: 1px solid #00c9ff;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
          }
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .riskFactorTop_content {
          @include size(100%,calc(100% - 41px));
          .listTitle {
            @include size(100%, 30px);
            float: left;
            div {
              @include size(13%, 30px);
              float: left;
              text-align: center;
              line-height: 30px;
              color: #cccccc;
              font-size: 12px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            div:nth-child(1) {
              @include size(10%, 100%);
            }
            div:nth-child(2) {
              @include size(17%, 100%);
            }
            div:nth-child(5) {
              @include size(25%, 100%);
            }
            div:nth-child(6) {
              @include size(10%, 100%);
            }
            div:nth-child(7) {
              @include size(10%, 100%);
            }
          }
          ul {
            @include size(100%, 300px);
            list-style: none;
            color: #f2f2f2;
            float: left;
            overflow: hidden;
            font-size: 12px;
            li {
              @include size(100%, 30px);
              box-sizing: border-box;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              div {
                @include size(13%, 30px);
                float: left;
                box-sizing: border-box;
                line-height: 30px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
              }
              div:nth-child(1) {
                @include size(10%, 100%);
              }
              div:nth-child(2) {
                @include size(17%, 100%);
              }
              div:nth-child(5) {
                @include size(25%, 100%);
              }
              div:nth-child(6) {
                @include size(10%, 100%);
              }
              div:nth-child(7) {
                @include size(10%, 100%);
              }
              .state {
                // background:pink;
                position: relative;
                i {
                  @include size(16px, 17px);
                  display: block;
                  position: absolute;
                  top: 6px;
                  left: 3%;
                  img {
                    display: block;
                    @include size(100%, 100%);
                  }
                }
              }
            }
          }
        }
      }
      .safetyCurve {
        @include size(100%, 39%);
        float: left;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        position: relative;
        margin-top: 10px;
        .riskDetails_Title4 {
          @include size(100%, 30px);
          box-sizing: border-box;
          padding-left: 18px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 16px;
          font-weight: 100;
          text-align: left;
          line-height: 30px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        &_content {
          @include size(100%, 80%);
        }
        &_Time {
          @include size(11%, 26px);
          position: absolute;
          right: 0;
          top: 50px;
          .selectTime {
            @include size(100%, 26px);
            div {
              text-align: center;
              line-height: 26px;
              color: #fff;
              font-size: 12px;
              float: left;
              cursor: pointer;
              &:nth-child(1) {
                @include size(50px, 26px);
                border-top-left-radius: 4px;
                border-bottom-left-radius: 4px;
                box-sizing: border-box;
                border: 1px solid #fff;
              }
              &:nth-child(2) {
                @include size(50px, 26px);
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
                box-sizing: border-box;
                border: 1px solid #fff;
              }
              &:nth-child(3) {
                @include size(50px, 26px);
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
              background: url("../../../assets/images/11-01.png") no-repeat
                center center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .riskxq {
      @include size(100%, 95%);
      margin: 0 auto;
    }
    .riskdisposal {
      @include size(100%, 100%);
      position: absolute;
      top: 0;
      // background:skyblue;
      // left: -35px;
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .riskDetails_warp {
    @include size(95%, 100%);
    margin-left: 2.5%;
    position: relative;
    box-sizing: border-box;
    padding-top: 15px;
    .riskDetails_Title1 {
      @include size(918px, 40px);
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 20px;
      font-weight: 100;
      text-align: left;
      line-height: 40px;
      box-sizing: border-box;
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
    }
    .riskDetails_Title1 {
      @include size(46%, 40px);
      box-sizing: border-box;
      padding-left: 18px;
      padding-right: 2%;
      span {
        width: 90%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .riskDetails_three {
      @include size(20%, calc(100% - 56px));
      float: left;
      margin-top: 16px;
      .closelooprate {
        @include size(100%, 30%);
        background: rgba(255, 255, 255, 0.05);
        /*  margin-bottom: 8%;*/
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          // background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
        }
        .riskDetails_right {
          @include size(55%, 100%);
          font-size: 16px;
          float: right;
          color: #fff;
          font-size: 95% !important;
          line-height: 400%;
        }
      }
      .loadingpolice {
        @include size(100%, 30%);
        margin: 3.6% auto;
        background: rgba(255, 255, 255, 0.05);
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
          position: relative;
          img {
            position: absolute;
            /*top: 10px;*/
            width: 50%;
            height: 60%;
            top: 25%;
            left: 25%;
          }
        }
        .riskDetails_right {
          @include size(55%, 100%);
          float: right;
          color: #fff;
          font-size: 16px;
          &1 {
            @include size(100%, 55%);
            line-height: 350%;
          }
          .tiao {
            @include size(75%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat
            center center;
          }
        }
      }
      .alarmNum {
        @include size(100%, 30%);
        // margin-bottom: 3%;
        background: rgba(255, 255, 255, 0.05);
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
          position: relative;
          img {
            position: absolute;
            /*
                          top: 10px;
            */   width: 50%;
            height: 60%;
            top: 25%;
            left: 25%;
          }
        }
        .riskDetails_right {
          @include size(55%, 100%);
          color: #fff;
          font-size: 16px;
          float: right;
          &1 {
            @include size(100%, 55%);
            line-height: 350%;
          }
          .tiao {
            @include size(75%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat
            center center;
            background-size: 100% 100%;
          }
          &2 {
            span {
              margin-right: 50px;
              &:nth-child(2) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .riskDetails_riskDistribute {
      @include size(25%, calc(100% - 56px));
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      margin-top: 16px;
      margin-left: 1%;
      float: left;
      .riskDetails_Title2 {
        @include size(100%, 15%);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .riskDistribute_content {
        @include size(100%, 78%);
        // background: url("../../../assets/images/ld-bj.png") no-repeat center
        //   center;
        // background-size: 43% 56%;
      }
    }
    .riskFactorTop {
      @include size(53%, 100%);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.5);
      float: right;
      margin-top: -40px;
      .riskDetails_Title3 {
        @include size(100%, 40px);
        position: relative;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        color: #fff;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
        .view {
          @include size(80px, 24px);
          position: absolute;
          right: 2%;
          top: 18%;
          font-size: 14px;
          background: #18305e;
          border: 1px solid #00c9ff;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
        }
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .riskFactorTop_content {
        @include size(100%,calc(100% - 41px));
        .listTitle {
          @include size(100%, 30px);
          float: left;
          div {
            @include size(15%, 30px);
            float: left;
            text-align: center;
            line-height: 30px;
            color: #cccccc;
            font-size: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          div:nth-child(1) {
            @include size(10%, 100%);
          }
          div:nth-child(2) {
            @include size(20%, 100%);
          }
          div:nth-child(5) {
            @include size(20%, 100%);
          }
          div:nth-child(6) {
            @include size(10%, 100%);
          }
          div:nth-child(7) {
            @include size(10%, 100%);
          }
        }
        ul {
          @include size(100%, 300px);
          list-style: none;
          color: #f2f2f2;
          float: left;
          overflow: hidden;
          font-size: 14px;
          li {
            @include size(100%, 30px);
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            div {
              @include size(15%, 30px);
              float: left;
              box-sizing: border-box;
              line-height: 30px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
            div:nth-child(1) {
              @include size(10%, 100%);
            }
            div:nth-child(2) {
              @include size(21%, 100%);
            }
            div:nth-child(5) {
              @include size(19%, 100%);
            }
            div:nth-child(6) {
              @include size(10%, 100%);
            }
            div:nth-child(7) {
              @include size(10%, 100%);
            }
            .state {
              // background:pink;
              position: relative;
              i {
                @include size(16px, 17px);
                display: block;
                position: absolute;
                top: 6px;
                left: 3%;
                img {
                  display: block;
                  @include size(100%, 100%);
                }
              }
            }
          }
        }
      }
    }
    .safetyCurve {
      @include size(100%, 37%);
      float: left;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      position: relative;
      margin-top: 10px;
      .riskDetails_Title4 {
        @include size(100%, 30px);
        box-sizing: border-box;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 16px;
        font-weight: 100;
        text-align: left;
        line-height: 30px;
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      &_content {
        @include size(100%, 80%);
      }
      &_Time {
        @include size(10%, 26px);
        position: absolute;
        right: 0;
        top: 50px;
        .selectTime {
          @include size(100%, 26px);
          div {
            text-align: center;
            line-height: 26px;
            color: #fff;
            font-size: 12px;
            float: left;
            cursor: pointer;
            &:nth-child(1) {
              @include size(50px, 26px);
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
            &:nth-child(2) {
              @include size(50px, 26px);
              // border-radius: 4px;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
            &:nth-child(3) {
              @include size(50px, 26px);
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
            background: url("../../../assets/images/11-01.png") no-repeat
            center center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .riskDetails_warp {
    @include size(95%, 100%);
    margin-left: 2.5%;
    position: relative;
    box-sizing: border-box;
    padding-top: 15px;
    .riskDetails_Title1 {
      @include size(918px, 40px);
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 20px;
      font-weight: 100;
      text-align: left;
      line-height: 40px;
      box-sizing: border-box;
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
    }
    .riskDetails_Title1 {
      @include size(46%, 40px);
      box-sizing: border-box;
      padding-left: 18px;
      padding-right: 2%;
      span {
        width: 90%;
        display: inline-block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .riskDetails_three {
      @include size(20%, calc(100% - 56px));
      float: left;
      margin-top: 16px;
      .closelooprate {
        @include size(100%, 30%);
        background: rgba(255, 255, 255, 0.05);
        /*  margin-bottom: 8%;*/
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          // background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
        }
        .riskDetails_right {
          @include size(55%, 100%);
          font-size: 16px;
          float: right;
          color: #fff;
          font-size: 95% !important;
          line-height: 400%;
        }
      }
      .loadingpolice {
        @include size(100%, 30%);
        margin: 3.6% auto;
        background: rgba(255, 255, 255, 0.05);
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
          position: relative;
          img {
            position: absolute;
            /*top: 10px;*/
            width: 50%;
            height: 60%;
            top: 25%;
            left: 25%;
          }
        }
        .riskDetails_right {
          @include size(55%, 100%);
          float: right;
          color: #fff;
          font-size: 16px;
          &1 {
            @include size(100%, 55%);
            line-height: 350%;
          }
          .tiao {
            @include size(75%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat
            center center;
          }
        }
      }
      .alarmNum {
        @include size(100%, 30%);
        // margin-bottom: 3%;
        background: rgba(255, 255, 255, 0.05);
        .riskDetails_left {
          @include size(65px, 80%);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          float: left;
          margin-top: 3%;
          margin-left: 8%;
          position: relative;
          img {
            position: absolute;
            /*
                          top: 10px;
            */   width: 50%;
            height: 60%;
            top: 25%;
            left: 25%;
          }
        }
        .riskDetails_right {
          @include size(55%, 100%);
          color: #fff;
          font-size: 16px;
          float: right;
          &1 {
            @include size(100%, 55%);
            line-height: 350%;
          }
          .tiao {
            @include size(75%, 1px);
            background: url("../../../assets/images/bt-bj.png") no-repeat
            center center;
            background-size: 100% 100%;
          }
          &2 {
            span {
              margin-right: 50px;
              &:nth-child(2) {
                font-size: 12px;
              }
            }
          }
        }
      }
    }
    .riskDetails_riskDistribute {
      @include size(25%, calc(100% - 56px));
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      margin-top: 16px;
      margin-left: 1%;
      float: left;
      .riskDetails_Title2 {
        @include size(100%, 15%);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .riskDistribute_content {
        @include size(100%, 78%);
        // background: url("../../../assets/images/ld-bj.png") no-repeat center
        //   center;
        // background-size: 43% 56%;
      }
    }
    .riskFactorTop {
      @include size(53%, 100%);
      overflow: hidden;
      border: 1px solid rgba(255, 255, 255, 0.5);
      float: right;
      margin-top: -40px;
      .riskDetails_Title3 {
        @include size(100%, 40px);
        position: relative;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        box-sizing: border-box;
        color: #fff;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
        .view {
          @include size(80px, 24px);
          position: absolute;
          right: 2%;
          top: 18%;
          font-size: 14px;
          background: #18305e;
          border: 1px solid #00c9ff;
          text-align: center;
          line-height: 24px;
          cursor: pointer;
        }
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      .riskFactorTop_content {
        @include size(100%,calc(100% - 41px));
        .listTitle {
          @include size(100%, 30px);
          float: left;
          div {
            @include size(15%, 30px);
            float: left;
            text-align: center;
            line-height: 30px;
            color: #cccccc;
            font-size: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          div:nth-child(1) {
            @include size(10%, 100%);
          }
          div:nth-child(2) {
            @include size(20%, 100%);
          }
          div:nth-child(5) {
            @include size(20%, 100%);
          }
          div:nth-child(6) {
            @include size(10%, 100%);
          }
          div:nth-child(7) {
            @include size(10%, 100%);
          }
        }
        ul {
          @include size(100%, 300px);
          list-style: none;
          color: #f2f2f2;
          float: left;
          overflow: hidden;
          font-size: 14px;
          li {
            @include size(100%, 30px);
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            div {
              @include size(15%, 30px);
              float: left;
              box-sizing: border-box;
              line-height: 30px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              cursor: pointer;
            }
            div:nth-child(1) {
              @include size(10%, 100%);
            }
            div:nth-child(2) {
              @include size(21%, 100%);
            }
            div:nth-child(5) {
              @include size(19%, 100%);
            }
            div:nth-child(6) {
              @include size(10%, 100%);
            }
            div:nth-child(7) {
              @include size(10%, 100%);
            }
            .state {
              // background:pink;
              position: relative;
              i {
                @include size(16px, 17px);
                display: block;
                position: absolute;
                top: 6px;
                left: 3%;
                img {
                  display: block;
                  @include size(100%, 100%);
                }
              }
            }
          }
        }
      }
    }
    .safetyCurve {
      @include size(100%, 37%);
      float: left;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      position: relative;
      margin-top: 10px;
      .riskDetails_Title4 {
        @include size(100%, 30px);
        box-sizing: border-box;
        padding-left: 18px;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 16px;
        font-weight: 100;
        text-align: left;
        line-height: 30px;
      }
      .tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
        center;
        background-size: 100% 100%;
      }
      &_content {
        @include size(100%, 80%);
      }
      &_Time {
        @include size(10%, 26px);
        position: absolute;
        right: 0;
        top: 50px;
        .selectTime {
          @include size(100%, 26px);
          div {
            text-align: center;
            line-height: 26px;
            color: #fff;
            font-size: 12px;
            float: left;
            cursor: pointer;
            &:nth-child(1) {
              @include size(50px, 26px);
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
            &:nth-child(2) {
              @include size(50px, 26px);
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
            &:nth-child(3) {
              @include size(50px, 26px);
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
            background: url("../../../assets/images/11-01.png") no-repeat
            center center;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1931px) {
  .riskDetails_return {
    position: absolute;
    top: 7%;
  }
  .riskDetails {
    @include size(100%, 1500px);
    .riskDetails_warp {
      @include size(95%, 90%);
      margin-left: 2.5%;
      position: absolute;
      box-sizing: border-box;
      .riskDetails_Title1 {
        @include size(46%, 100px);
        box-sizing: border-box;
        padding-left: 26px;
        padding-right: 2%;
        margin-top: 60px;
        font-size: 30px;
        line-height: 100px;
        background: rgba(255, 255, 255, 0.05);
        span {
          width: 630px;
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .riskDetails_three {
        @include size(20%, 670px);
        float: left;
        margin-top: 33px;
        .closelooprate {
          @include size(100%, 30%);
          background: rgba(255, 255, 255, 0.05);
          margin-bottom: 5%;
          .riskDetails_left {
            @include size(125px, 125px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 8%;
            margin-left: 8%;
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 160% !important;
            line-height: 200px;
          }
        }
        .loadingpolice {
          @include size(100%, 30%);
          margin-bottom: 5%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(125px, 125px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 8%;
            margin-left: 8%;
            position: relative;
            img {
              display: block;
              @include size(55px, 65px);
              position: absolute;
              top: 30px;
              left: 36px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 160% !important;
            &1 {
              @include size(100%, 55%);
              line-height: 120px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../../../assets/images/bt-bj.png") no-repeat
                center center;
            }
          }
        }
        .alarmNum {
          @include size(100%, 30%);
          // margin-bottom: 3%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(125px, 125px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top: 8%;
            margin-left: 8%;
            position: relative;
            img {
              display: block;
              @include size(55px, 65px);
              position: absolute;
              top: 30px;
              left: 36px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            color: #fff;
            font-size: 160% !important;
            float: right;
            &1 {
              @include size(100%, 55%);
              line-height: 120px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../../../assets/images/bt-bj.png") no-repeat
                center center;
              background-size: 100% 100%;
            }
            &2 {
              span {
                margin-right: 50px;
                &:nth-child(2) {
                  font-size: 22px;
                }
              }
            }
          }
        }
      }
      .riskDetails_riskDistribute {
        @include size(25%, 650px);
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin-top: 33px;
        margin-left: 1%;
        float: left;
        .riskDetails_Title2 {
          @include size(100%, 100px);
          color: #fff;
          font-size: 30px;
          font-weight: 100;
          text-align: left;
          line-height: 100px;
          box-sizing: border-box;
          padding-left: 26px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .riskDistribute_content {
          @include size(100%, 80%);
          // background: url("../../../assets/images/ld-bj.png") no-repeat center
          //   center;
          // background-size: 50% 56%;
        }
      }
      // 风险因子排名
      .riskFactorTop {
        @include size(53%, 783px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        float: right;
        margin-top: -100px;
        overflow: hidden;
        .riskDetails_Title3 {
          @include size(100%, 100px);
          position: relative;
          font-size: 30px;
          font-weight: 100;
          text-align: left;
          line-height: 100px;
          box-sizing: border-box;
          color: #fff;
          padding-left: 26px;
          background: rgba(255, 255, 255, 0.05);
          .view {
            @include size(130px, 50px);
            position: absolute;
            right: 2%;
            top: 24%;
            font-size: 22px;
            background: #18305e;
            border: 1px solid #00c9ff;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
          }
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        .riskFactorTop_content {
          @include size(100%, 100%);
          .listTitle {
            @include size(100%, 80px);
            float: left;
            div {
              @include size(15%, 80px);
              float: left;
              text-align: center;
              line-height: 80px;
              color: #cccccc;
              font-size: 24px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            div:nth-child(1) {
              @include size(10%, 100%);
            }
            div:nth-child(2) {
              @include size(20%, 100%);
            }
            div:nth-child(5) {
              @include size(20%, 100%);
            }
            div:nth-child(6) {
              @include size(10%, 100%);
            }
            div:nth-child(7) {
              @include size(8%, 100%);
            }
          }
          ul {
            @include size(100%, auto);
            list-style: none;
            color: #f2f2f2;
            float: left;
            overflow: hidden;
            font-size: 22px;
            li {
              @include size(100%, 60px);
              box-sizing: border-box;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              div {
                @include size(15%, 100%);
                float: left;
                box-sizing: border-box;
                line-height: 60px;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                cursor: pointer;
              }
              div:nth-child(1) {
                @include size(10%, 100%);
              }
              div:nth-child(2) {
                @include size(21%, 100%);
              }
              div:nth-child(5) {
                @include size(19%, 100%);
              }
              div:nth-child(6) {
                @include size(10%, 100%);
              }
              div:nth-child(7) {
                @include size(10%, 100%);
              }
              .state {
                position: relative;
                i {
                  @include size(24px, 28px);
                  display: block;
                  position: absolute;
                  top: 10px;
                  left: 15%;
                  img {
                    display: block;
                    @include size(100%, 100%);
                  }
                }
              }
            }
          }
        }
      }
      // 安全曲线
      .safetyCurve {
        @include size(100%, 35%);
        float: left;
        margin-top: 40px;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        position: relative;
        .riskDetails_Title4 {
          @include size(100%, 100px);
          box-sizing: border-box;
          padding-left: 26px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 30px;
          font-weight: 100;
          text-align: left;
          line-height: 100px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../../../assets/images/bt-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
        &_content {
          @include size(100%, 80%);
        }
        &_Time {
          @include size(10%, 60px);
          position: absolute;
          right: 0;
          top: 20px;
          .selectTime {
            @include size(260px, 100%);
            div {
              text-align: center;
              line-height: 60px;
              color: #fff;
              font-size: 26px;
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
                // border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid #fff;
                border-top-right-radius: 4px;
                border-bottom-right-radius: 4px;
              }
              &:nth-child(3) {
                @include size(50px, 26px);
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
              background: url("../../../assets/images/11-01.png") no-repeat
                center center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
}
</style>
