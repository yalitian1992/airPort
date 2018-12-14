<template>
  <div class="riskDetails">
    <div class="riskDetails_warp">
      <!-- <div></div> -->
      <div class="riskDetails_Title1">道场管理模块</div>
      <div class="riskDetails_three">
        <div class="closelooprate">
          <div class="riskDetails_left">
            <img src="../assets/images/jindu.png"
                alt="">
            <div class="proess">80%</div>
          </div>
          <div class="riskDetails_right">事故处理闭环率</div>
        </div>
        <div class="loadingpolice">
          <div class="riskDetails_left">
            <img src="../assets/images/LOUDOU.png"
                alt="">
          </div>
          <div class="riskDetails_right">
            <div class="riskDetails_right1">等待处理的报警</div>
            <div class="tiao"></div>
            <div class="riskDetails_right2">
              <span>30</span>
            </div>
          </div>
        </div>
        <div class="alarmNum">
          <div class="riskDetails_left">
            <img src="../assets/images/ANHUO.png"
                alt="">
          </div>
          <div class="riskDetails_right">
            <div class="riskDetails_right1">历史预警数量</div>
            <div class="tiao"></div>
            <div class="riskDetails_right2">
              <span>2309</span>
              <span>0.79%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="riskDetails_riskDistribute">
        <div class="riskDetails_Title2">风险分布</div>
        <div class="tiao"></div>
        <div class="riskDistribute_content">
          <risk-echart :riskData='riskData'></risk-echart>
        </div>
      </div>
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
          <ul>
            <li v-for='(item,index) in listdataInfo'
                :key='index'
                :style="{color:listdataColor[index]}">
              <div>{{index+1}}</div>
              <div>{{item.riskfactor}}</div>
              <div>{{item.riskvalue}}</div>
              <div>{{item.poclie}}</div>
              <div v-if="item.value===0"
                  class="state">
                <i><img src="../assets/images/NO.png"></i>{{item.state}}</div>
              <div v-if="item.value===1"
                  class="state">
                <i><img src="../assets/images/ING.png"></i>{{item.state}}</div>
              <div v-if="item.value===2"
                  class="state">
                <i><img src="../assets/images/YES.png"></i>{{item.state}}</div>
              <div>
                <!-- <span>查看</span> -->
                <span @click="Showriskdisposal()">处置</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="safetyCurve">
        <div class="riskDetails_Title4">安全曲线</div>
        <div class="tiao"></div>
        <div class="safetyCurve_content">
          <securityLine :data="safetyCurveData24"
                        :color="workStrengthChartColor"
                        :areaOpacity=0
                        v-if="    activeMountKey===0  &&  safetyCurveData24"
                        :dataZoom=false
                        yaxisName="(风险值)"
                        xaxisName="(时间点)"></securityLine>
          <securityLine :data="safetyCurveData48"
                        :color="workStrengthChartColor"
                        :areaOpacity=0
                        v-if="    activeMountKey===1  &&  safetyCurveData48"
                        :dataZoom=false
                        yaxisName="(风险值)"
                        xaxisName="(时间点)"></securityLine>
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
      <div class="riskdisposal" v-show="riskdisposalShow">
        <riskdisposal1 @closeRiskdisposal1="closeRiskdisposal1"></riskdisposal1>
      </div>
    </div>
    <div class="riskxq"
        v-show="riskxqShow">
      <risk-xq @riskClose="riskClose"></risk-xq>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import Riskdisposal1 from '../modules/risk/riskdisposal1/Riskdisposal1.vue'
import securityLine from '../components/echarts/securityLine.vue'
import RiskXq from '../modules/risk/riskXq/RiskXq.vue'
import riskEchart from '../components/echarts/riskDistrbuteCharts.vue'
import riskbottom from '../modules/risk/riskbottom/riskbottom.vue'
export default {
  components: {
    Riskdisposal1,
    securityLine,
    RiskXq,
    riskEchart,
    riskbottom
  },
  data () {
    return {
      workStrengthChartColor: ['#05D0EB ', '#C88637', '#BC570C'],
      activeMountKey: 0,
      riskData: [
        { name: '跑道入侵', value: 10 },
        { name: '应急救援', value: 1 },
        { name: '消防类', value: 6 },
        { name: '信息安全', value: 2 },
        { name: '人伤类', value: 3 },
        { name: '其他类', value: 1 },
        { name: '空防反恐', value: 5 },
        { name: '航空器类', value: 8 }
      ],
      listTitle: ['序号', '风险因子', '风险值', '报警时长', '状态', '操作'],
      listdata: [
        {
          riskfactor: '引导员资质',
          riskvalue: 5,
          poclie: '120h',
          state: '未缓解',
          value: 0
        },
        {
          riskfactor: '车辆交通违章率',
          riskvalue: 3,
          poclie: '110h',
          state: '缓解中',
          value: 1
        },
        {
          riskfactor: '廊桥状态',
          riskvalue: 2,
          poclie: '100h',
          state: '已缓解',
          value: 2
        },
        {
          riskfactor: '是否动电',
          riskvalue: 8,
          poclie: '50h',
          state: '缓解中',
          value: 1
        },
        {
          riskfactor: '通话合规性',
          riskvalue: 1,
          poclie: '60h',
          state: '已缓解',
          value: 2
        },
        {
          riskfactor: '车辆速度',
          riskvalue: 5,
          poclie: '70h',
          state: '缓解中',
          value: 1
        },
        {
          riskfactor: '通话合规性',
          riskvalue: 2,
          poclie: '52h',
          state: '未缓解',
          value: 0
        },
        {
          riskfactor: '工作人员联系时间',
          riskvalue: 7,
          poclie: '23h',
          state: '缓解中',
          value: 1
        },
        {
          riskfactor: '车辆速度',
          riskvalue: 10,
          poclie: '20h',
          state: '未缓解',
          value: 0
        },
        {
          riskfactor: '廊桥状态',
          riskvalue: 6,
          poclie: '12h',
          state: '已缓解',
          value: 2
        }
      ],
      riskxqShow: false,
      riskButtonData: [
        {
          Xdata: [
            '00:00',
            '02:00',
            '04:00',
            '06:00',
            '08:00',
            '10:00',
            '12:00',
            '14:00',
            '16:00',
            '18:00',
            '20:00',
            '22:00',
            '24:00'
          ]
        },
        {
          Xdata: [
            '00:00',
            '04:00',
            '08:00',
            '12:00',
            '16:00',
            '20:00',
            '24:00',
            '04:00',
            '08:00',
            '12:00',
            '16:00',
            '20:00',
            '24:00'
          ]
        }
      ],
      safetyCurveData24: [
        {
          name: '本期安全曲线',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '02:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '06:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '10:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '14:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '18:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '22:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) }
          ]
        },
        {
          name: '同期标准曲线',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '02:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '06:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '10:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '14:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '18:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '22:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) }
          ]
        }
      ],
      safetyCurveData48: [
        {
          name: '本期安全曲线',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) }
          ]
        },
        {
          name: '同期标准曲线',
          data: [
            { name: '00:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '04:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '08:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '12:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '16:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '20:00', value: Math.floor(Math.random() * 10 + 1) },
            { name: '24:00', value: Math.floor(Math.random() * 10 + 1) }
          ]
        }
      ],
      riskdisposalShow: false
    }
  },
  computed: {
    ...mapState('homeStore', ['data']),
    listdataInfo () {
      if (
        this.listdata &&
        this.listdata !== undefined &&
        this.listdata !== null
      ) {
        /* eslint-disable*/
        var filterNume =
          this.listdata &&
          this.listdata.map(o => o.riskvalue && Number(o.riskvalue));
        var sortNum =
          filterNume &&
          filterNume.sort(function(a, b) {
            return b - a;
          });
        var sortNumAfter =
          sortNum &&
          sortNum.map(o => {
            return { riskvalue: o };
          });

        var list =
          sortNumAfter &&
          sortNumAfter.map(m => {
            var my = m.riskvalue && m.riskvalue;
            var arr =
              this.listdata &&
              this.listdata.filter(n => {
                var ny = n.riskvalue && n.riskvalue;
                return ny == my;
              });
            return arr;
          });
        var info =
          list &&
          list.map(o => ({
            riskfactor: o && o[0] && o[0].riskfactor && o[0].riskfactor,
            riskvalue: o && o[0] && o[0].riskvalue && o[0].riskvalue,
            poclie: o && o[0] && o[0].poclie && o[0].poclie,
            state: o && o[0] && o[0].state && o[0].state,
            value: o && o[0] && o[0].value && o[0].value
          }));
        return info;
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
    ...mapMutations("homeStore", ["setRiskfactoryrankConData"]),
    view() {
      this.riskxqShow = true;
    },
    riskClose() {
      this.riskxqShow = false;
    },
    activeMount(item) {
      this.activeMountKey = item;
    },
    Showriskdisposal(){
      this.riskdisposalShow = true;
    },
    closeRiskdisposal1(){
      this.riskdisposalShow = false;
    }
  },
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media  only screen  and (max-width: 1366px){
  .riskDetails{
    @include size(100%, 733px);
    .riskDetails_warp {
      // background:#18305e;
      @include size(95%, 732px);
      margin-left:2.5%;
      position: absolute;
      box-sizing: border-box;
      // padding-left:2.5%;
      .riskDetails_Title1{
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
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
      }
      .riskDetails_Title1 {
        @include size(60%, 40px);
        box-sizing: border-box;
        padding-left: 18px;
        margin-top:20px;
      }
      .riskDetails_three {
        @include size(30%, 304px);
        float: left;
        margin-top:33px;
        .closelooprate {
          @include size(100%, 30%);
          background: rgba(255, 255, 255, 0.05);
          margin-bottom: 3.5%;
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img{
              display: block;
              @include size(100%, 100%);
              float: left;
            }
            .proess{
              @include size(100%, 100%);
              font-size: 100%!important;
              text-align: center;
              line-height:65px;
              color:#fff;
              position: absolute;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 100%!important;
            line-height: 84px;
          }
        }
        .loadingpolice {
          @include size(100%, 30%);
          margin-bottom: 3.5%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              left: 15px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 100%!important;
            &1 {
              @include size(100%, 55%);
              line-height:60px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../assets/images/bt-bj.png") no-repeat center center;
            }
          }
        }
        .alarmNum {
          @include size(100%, 30%);
          // margin-bottom: 3%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              left: 15px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            color: #fff;
            font-size: 100%!important;
            float: right;
            &1 {
              @include size(100%, 55%);
              line-height:60px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../assets/images/bt-bj.png") no-repeat center center;
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
        @include size(29%, 300px);
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin-top:33px;
        margin-left:1%;
        float: left;
        .riskDetails_Title2 {
          @include size(100%, 40px);
          color: #fff;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
          box-sizing: border-box;
          padding-left:18px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        .riskDistribute_content {
          @include size(100%, 80%);
        }
      }
      .riskFactorTop {
        @include size(39%, 371px);
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
          padding-left:18px;
          background: rgba(255, 255, 255, 0.05);
          .view {
            @include size(80px, 24px);
            position: absolute;
            right:2%;
            top:18%;
            font-size: 14px;
            background: #18305e;
            border: 1px solid #00c9ff;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            // background:pink;
          }
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        .riskFactorTop_content {
          @include size(100%, 330px);
          .listTitle {
            @include size(100%, 30px);
            float: left;
            div {
              @include size(15%, 30px);
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
              @include size(20%, 100%);
            }
            div:nth-child(5) {
              @include size(20%, 100%);
            }
            div:nth-child(6) {
              @include size(20%, 100%);
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
                @include size(20%, 100%);
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
                  img{
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
        @include size(100%, 35%);
        float: left;
        margin-top:40px;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        position: relative;
        .riskDetails_Title4 {
          @include size(100%, 40px);
          box-sizing: border-box;
          padding-left: 18px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        &_content {
          @include size(100%, 80%);
        }
        &_Time {
          @include size(20%, 26px);
          position: absolute;
          right:0;
          top:50px;
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
            }
            .activeMount {
              box-sizing: border-box;
              border: 1px solid #0096ff !important;
              color: #0096ff;
              background: url("../assets/images/11-01.png") no-repeat center center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .riskxq {
        @include size(100%, 95%);
        margin:0 auto;
      }
      .riskdisposal{
        @include size(100%,100%);
        position: absolute;
        top: 0;
        // background:skyblue;
        // left: -35px;
      }
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .riskDetails{
    @include size(100%, 833px);
    // background:pink;
    .riskDetails_warp {
      // background:#18305e;
      @include size(95%, 90%);
      margin-left:2.5%;
      margin-top:1.5%;
      position: absolute;
      box-sizing: border-box;
      // padding-left:2.5%;
      .riskDetails_Title1{
        @include size(918px, 50px);
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 50px;
        box-sizing: border-box;
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
      }
      .riskDetails_Title1 {
        @include size(60%, 50px);
        box-sizing: border-box;
        padding-left: 18px;
        margin-top:20px;
      }
      .riskDetails_three {
        @include size(30%, 306px);
        float: left;
        margin-top:33px;
        .closelooprate {
          @include size(100%, 30%);
          background: rgba(255, 255, 255, 0.05);
          margin-bottom: 7%;
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img{
              display: block;
              @include size(100%, 100%);
              float: left;
            }
            .proess{
              @include size(100%, 100%);
              font-size: 100%!important;
              text-align: center;
              line-height:65px;
              color:#fff;
              position: absolute;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 100%!important;
            line-height: 84px;
          }
        }
        .loadingpolice {
          @include size(100%, 30%);
          margin-bottom: 7%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              left: 15px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            float: right;
            color: #fff;
            font-size: 100%!important;
            &1 {
              @include size(100%, 55%);
              line-height:60px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../assets/images/bt-bj.png") no-repeat center center;
            }
          }
        }
        .alarmNum {
          @include size(100%, 30%);
          // margin-bottom: 3%;
          background: rgba(255, 255, 255, 0.05);
          .riskDetails_left {
            @include size(65px, 65px);
            border-radius: 50%;
            background: rgba(0, 132, 255, 0.1);
            float: left;
            margin-top:3%;
            margin-left:5%;
            position: relative;
            img {
              position: absolute;
              top: 10px;
              left: 15px;
            }
          }
          .riskDetails_right {
            @include size(55%, 100%);
            color: #fff;
            font-size: 100%!important;
            float: right;
            &1 {
              @include size(100%, 55%);
              line-height:60px;
            }
            .tiao {
              @include size(75%, 1px);
              background: url("../assets/images/bt-bj.png") no-repeat center center;
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
        @include size(29%, 330px);
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        margin-top:33px;
        margin-left:1%;
        float: left;
        .riskDetails_Title2 {
          @include size(100%, 50px);
          color: #fff;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 50px;
          box-sizing: border-box;
          padding-left:18px;
          background:rgba(255, 255, 255, 0.05);
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        .riskDistribute_content {
          @include size(100%, 80%);
        }
      }
      .riskFactorTop {
        @include size(39%, 412px);
        border: 1px solid rgba(255, 255, 255, 0.5);
        float: right;
        margin-top: -49px;
        .riskDetails_Title3 {
          @include size(100%, 50px);
          position: relative;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 50px;
          box-sizing: border-box;
          color: #fff;
          padding-left:18px;
          background: rgba(255, 255, 255, 0.05);
          .view {
            @include size(80px, 24px);
            position: absolute;
            right:2%;
            top:25%;
            font-size: 16px;
            background: #18305e;
            border: 1px solid #00c9ff;
            text-align: center;
            line-height: 24px;
            cursor: pointer;
            // background:pink;
          }
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        .riskFactorTop_content {
          @include size(100%, 380px);
          .listTitle {
            @include size(100%, 30px);
            float: left;
            div {
              @include size(15%, 30px);
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
              @include size(20%, 100%);
            }
            div:nth-child(5) {
              @include size(20%, 100%);
            }
            div:nth-child(6) {
              @include size(20%, 100%);
            }
          }
          ul {
            @include size(100%, 330px);
            list-style: none;
            color: #f2f2f2;
            float: left;
            overflow: hidden;
            font-size: 14px;
            li {
              @include size(100%, 33px);
              box-sizing: border-box;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
              div {
                @include size(15%, 33px);
                float: left;
                box-sizing: border-box;
                line-height: 33px;
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
                @include size(20%, 100%);
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
                  img{
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
        @include size(100%, 35%);
        float: left;
        margin-top:40px;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.5);
        position: relative;
        .riskDetails_Title4 {
          @include size(100%, 50px);
          box-sizing: border-box;
          padding-left: 18px;
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 50px;
        }
        .tiao {
          @include size(100%, 1px);
          background: url("../assets/images/bt-bj.png") no-repeat center center;
          background-size: 100% 100%;
        }
        &_content {
          @include size(100%, 80%);
        }
        &_Time {
          @include size(20%, 26px);
          position: absolute;
          right:0;
          top:50px;
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
            }
            .activeMount {
              box-sizing: border-box;
              border: 1px solid #0096ff !important;
              color: #0096ff;
              background: url("../assets/images/11-01.png") no-repeat center center;
              background-size: 100% 100%;
            }
          }
        }
      }
    }
    .riskxq {
      @include size(100%, 95%);
      margin:0 auto;
    }
    .riskdisposal{
      @include size(100%,100%);
      position: absolute;
      top: 0;
      // background:skyblue;
      // left: -35px;
    }
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .riskDetails_warp {
    @include size(1812px, 933px);
    // background:pink;
    // margin-top:32px;
    // margin-left:35px;
    position: absolute;
    top: 72px;
    left: 35px;
    .riskDetails_Title1,
    .riskDetails_Title2,
    .riskDetails_Title3,
    .riskDetails_Title4 {
      @include size(918px, 56px);
      background: rgba(255, 255, 255, 0.05);
      color: #fff;
      font-size: 28px;
      font-weight: 100;
      text-align: left;
      line-height: 56px;
      box-sizing: border-box;
      padding-left: 38px;
      .tiao {
        @include size(100%, 1px);
        background: url("../assets/images/bt-bj.png") no-repeat center center;
        background-size: 100% 100%;
        position: absolute;
        right: 0;
        top: 56px;
      }
    }
    .riskDetails_Title1 {
      position: absolute;
      left: 0px;
      top: 32px;
    }
    .riskDetails_three {
      @include size(404px, 453px);
      margin-right: 26px;
      display: inline-block;
      position: absolute;
      left: 0;
      top: 126px;
      .closelooprate {
        @include size(404px, 134px);
        margin-bottom: 17px;
        background: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 0;
        left: 0;
        .riskDetails_left {
          @include size(92px, 92px);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          position: absolute;
          top: 21px;
          left: 28px;
          .proess{
            @include size(92px, 92px);
            position: absolute;
            top:0;
            left:0;
            font-size: 20px;
            text-align: center;
            line-height:92px;
            color:#fff;
          }
        }
        .riskDetails_right {
          @include size(220px, 100%);
          position: absolute;
          top: 0px;
          color: #fff;
          font-size: 20px;
          position: absolute;
          left: 182px;
          line-height: 134px;
        }
      }
      .loadingpolice {
        @include size(404px, 134px);
        margin-bottom: 17px;
        background: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 150px;
        left: 0;
        .riskDetails_left {
          @include size(92px, 92px);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          position: absolute;
          top: 21px;
          left: 28px;
          img {
            position: absolute;
            top: 21px;
            left: 28px;
          }
        }
        .riskDetails_right {
          @include size(220px, 100%);
          position: absolute;
          top: 0px;
          color: #fff;
          font-size: 20px;
          position: absolute;
          left: 182px;
          &1 {
            @include size(220px, 20px);
            line-height: 32px;
            margin-top: 40px;
            margin-bottom: 24px;
          }
          .tiao {
            @include size(150px, 1px);
            background: url("../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            left: 0;
            top: 80px;
          }
        }
      }
      .alarmNum {
        @include size(404px, 134px);
        margin-bottom: 17px;
        background: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 301px;
        left: 0;
        .riskDetails_left {
          @include size(92px, 92px);
          border-radius: 50%;
          background: rgba(0, 132, 255, 0.1);
          position: absolute;
          top: 21px;
          left: 28px;
          img {
            position: absolute;
            top: 21px;
            left: 28px;
          }
        }
        .riskDetails_right {
          @include size(220px, 100%);
          position: absolute;
          top: 0px;
          color: #fff;
          font-size: 20px;
          position: absolute;
          left: 182px;
          &1 {
            @include size(220px, 20px);
            line-height: 32px;
            margin-top: 40px;
            margin-bottom: 24px;
          }
          .tiao {
            @include size(150px, 1px);
            background: url("../assets/images/bt-bj.png") no-repeat center center;
            background-size: 100% 100%;
            position: absolute;
            left: 0;
            top: 80px;
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
      @include size(461px, 436px);
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      position: absolute;
      left: 430px;
      top: 126px;
      .riskDetails_Title2 {
        @include size(100%, 56px);
      }
      .riskDistribute_content {
        @include size(100%, 380px);
      }
    }
    .riskFactorTop {
      @include size(918px, 530px);
      position: absolute;
      top: 32px;
      right: -32px;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      .riskDetails_Title3 {
        @include size(918px, 56px);
        position: absolute;
        top: 0px;
        right: 0px;
        .tiao {
          @include size(918px, 1px);
        }
        .view {
          @include size(114px, 34px);
          position: absolute;
          top: 10px;
          right: 15px;
          font-size: 16px;
          background: #18305e;
          border: 1px solid #00c9ff;
          text-align: center;
          line-height: 34px;
          cursor: pointer;
        }
      }
      .riskFactorTop_content {
        @include size(918px, 474px);
        position: absolute;
        top: 56px;
        left: 0;
        .listTitle {
          @include size(100%, 43px);
          float: left;
          div {
            float: left;
            text-align: center;
            line-height: 55px;
            color: #cccccc;
            font-size: 16px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          div:nth-child(1) {
            @include size(100px, 100%);
          }
          div:nth-child(2) {
            @include size(192px, 100%);
          }
          div:nth-child(3) {
            @include size(127px, 100%);
          }
          div:nth-child(4) {
            @include size(160px, 100%);
          }
          div:nth-child(5) {
            @include size(174px, 100%);
          }
          div:nth-child(6) {
            @include size(165px, 100%);
          }
        }
        ul {
          @include size(100%, 429px);
          list-style: none;
          color: #f2f2f2;
          float: left;
          overflow: hidden;
          font-size: 14px;
          li {
            @include size(100%, 43px);
            box-sizing: border-box;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            div {
              float: left;
              height: 43px;
              box-sizing: border-box;
              line-height: 43px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            div:nth-child(1) {
              @include size(100px, 100%);
            }
            div:nth-child(2) {
              @include size(192px, 100%);
            }
            div:nth-child(3) {
              @include size(127px, 100%);
            }
            div:nth-child(4) {
              @include size(160px, 100%);
            }
            div:nth-child(5) {
              @include size(174px, 100%);
            }
            div:nth-child(6) {
              @include size(165px, 100%);
              span {
                margin-right: 15px;
                cursor: pointer;
              }
            }
            .state {
              position: relative;
              i {
                @include size(23px, 24px);
                display: block;
                position: absolute;
                top: 5px;
                left: 30px;
              }
            }
          }
        }
      }
    }
    .safetyCurve {
      @include size(1847px, 300px);
      position: absolute;
      top: 600px;
      left: 0;
      box-sizing: border-box;
      border: 1px solid rgba(255, 255, 255, 0.5);
      .riskDetails_Title4 {
        @include size(100%, 56px);
        position: absolute;
        top: 0;
        left: 0;
      }
      .tiao {
        @include size(100%, 1px);
      }
      &_content {
        @include size(1847px, 242px);
        position: absolute;
        top: 56px;
        left: 0;
      }
      &_Time {
        @include size(100%, 37px);
        position: absolute;
        // background: #0096ff;
        .selectTime {
          @include size(250px, 37px);
          // background: pink;
          position: absolute;
          top: 60px;
          right: -39px;
          div {
            text-align: center;
            line-height: 37px;
            color: #fff;
            font-size: 14px;
            float: left;
            cursor: pointer;
            &:nth-child(1) {
              @include size(68px, 37px);
              border-top-left-radius: 4px;
              border-bottom-left-radius: 4px;
              box-sizing: border-box;
              border: 1px solid #fff;
            }
            &:nth-child(2) {
              @include size(68px, 37px);
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
            background: url("../assets/images/11-01.png") no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
    }
    .riskxq {
      @include size(1850px, 940px);
      position: absolute;
      top: 0;
      left: 0;
      // top:32px;
      // left:35px;
      // background: #00c9ff;
    }
    .riskdisposal{
      @include size(1920px, 940px);
      position: absolute;
      top: 0;
      left: -35px;
    }
  }
}
@media only screen  and (min-width: 1921px) and (max-width: 2560px){
}
@media only screen  and (min-width: 2561px){
}
</style>
