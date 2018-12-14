<template>
  <div class="riskfactoryrankWrap">
    <div class="riskfactoryrankHeader_tiao"></div>
    <div class="riskfactoryrankHeader">风险因子排行</div>
    <div class="riskfactoryrankHeader_tiao"></div>
    <div class="riskfactoryrankCon">
      <!-- <risk-factors-for-ranking :data="riskfactoryrankConFinData"></risk-factors-for-ranking> -->
      <ul>
        <li style="cursor: pointer;" v-for="(item,index) in getriskfactoryrankConFinData"
            :key="index" @click="showDetail(item)">
          <!--<div class="riskfactoryrankCon_img">
            <img src="../../../assets/images/icon-1.png"
                 v-if="item.name==='引导员资质'">
            <img src="../../../assets/images/icon-2.png"
                 v-if="item.name==='车辆交通违章率'">
            <img src="../../../assets/images/icon-3.png"
                 v-if="item.name==='廊桥状态'">
            <img src="../../../assets/images/icon-4.png"
                 v-if="item.name==='是否动电'">
            <img src="../../../assets/images/icon-5.png"
                 v-if="item.name==='通话合规性'">
            <img src="../../../assets/images/icon-6.png"
                 v-if="item.name==='车辆速度'">
            <img src="../../../assets/images/icon-7.png"
                 v-if="item.name==='劳保用品适用性'">
            <img src="../../../assets/images/icon-8.png"
                 v-if="item.name==='消防器材配备情况'">
            <img src="../../../assets/images/icon-9.png"
                 v-if="item.name==='天气情况'">
            <img src="../../../assets/images/icon-10.png"
                 v-if="item.name==='电销雷检合规性'">
            <img src="../../../assets/images/icon-11.png"
                 v-if="item.name==='工作人员连续工作时间'">
          </div>-->
          <div class="name"
               v-if="item.value && Number(item.value) <= 9"
               :title="item.name">{{item.name}}</div>
          <div class="name  danger"
               v-if="9 < item.value && Number(item.value) <= 10"
               :title="item.name">{{item.name}}</div>
          <div class="infoBase">
            <div class="info  red"
                 :style="{width:100*(item.value>10?10:item.value)/10+'%'}"
                 v-if="9 < item.value && Number(item.value) <= 10"></div>
            <div class="info  orange"
                 :style="{width:100*(item.value>10?10:item.value)/10+'%'}"
                 v-if="6 < item.value && Number(item.value) <= 9"></div>
            <div class="info  yellow"
                 :style="{width:100*(item.value>10?10:item.value)/10+'%'}"
                 v-if="3 < item.value && Number(item.value) <= 6"></div>
            <div class="info  blue"
                 :style="{width:100*(item.value>10?10:item.value)/10+'%'}"
                 v-if="1 <= item.value && Number(item.value) <= 3"></div>
          </div>
          <div class="value" :class="item.value>0&&item.value<=3?'valueBlue':(item.value>3&&item.value<=6?'valueYellow':(item.value>6&&item.value<=9?'valueOrange':(item.value>9&&item.value<=10?'valueRed':'')))">{{item.value}}</div>
        </li>
      </ul>
    </div>
    <factor-rank-detail ref="detail"></factor-rank-detail>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState,  mapActions } from "vuex";
import RiskFactorsForRanking from '../../../components/echarts/riskFactorsForRanking'
import FactorRankDetail from "../../../components/targetDetails/targetDetails.vue";
export default {
  data () {
    return {
    }
  },
  components: {
    FactorRankDetail,
    RiskFactorsForRanking
  },

  computed: {
    ...mapState('RiskStore', ['riskfactoryrankConData']),

    getriskfactoryrankConFinData () {
      if (
        this.riskfactoryrankConData &&
        this.riskfactoryrankConData !== undefined &&
        this.riskfactoryrankConData !== null
      ) {
        return this.riskfactoryrankConData.riskfactoryrankConData;
      }
      return null;
    },
    // getparams(){
    //   return     JSON.stringify({
    //     modelType:String(this.indexData),
    //     treeId:String(this.treeId)
    //   })
    // }

  },
  created() {


  },

  mounted() {
    //  this.getRiskFactor(this.getparams)
  },
  methods: {
    // ...mapActions('RiskStore', ['getRiskFactor']),
    showDetail(item){
      this.$refs.detail.IsShow(item)
    }
  },
};
</script>

<style lang='scss' scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media only screen and (max-width: 1376px) {
  .riskfactoryrankWrap {
    @include size(100%, 100%);
    .riskfactoryrankHeader {
      @include size(100%, 35px);
      padding-left: 12px;
      line-height: 35px;
      box-sizing: border-box;
      font-size: 14px;
      color: #fff;
      &_tiao{
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .riskfactoryrankCon {
      @include size(100%, 94%);
      ul {
        @include size(100%, 98%);
        margin-top: 2%;
        li {
          @include size(100%, 9%);
          //图片
          .riskfactoryrankCon_img {
            @include size(10%, 100%);
            float: left;
            box-sizing: border-box;
            img {
              vertical-align: middle;
              width: 15px;
              height: 14px;
              margin-top: -2%;
              margin-left: 20%;
            }
          }
          //文字
          .name {
            @include size(25%, 100%);
            padding-left: 12px;
            float: left;
            color: #fff;
            font-size: 12px;
            line-height: 200%;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .name.danger {
            color: #ff0000;
          }
          //条形图
          .infoBase {
            @include size(55%, 100%);
            float: left;
            box-sizing: border-box;
            .info {
              height: 7px;
              width: 200px;
              margin-top: 6%;
              transition: 1s;
            }
            .red {
              background: #ff5050;
              background: -webkit-linear-gradient(right, #ff0000, #ff5050);
            }
            .orange {
              background: #ff9600;
              background: -webkit-linear-gradient(right, #ff7800, #ff9600);
            }
            .yellow {
              background: #fffa50;
              background: -webkit-linear-gradient(right, #ffdc00, #fffa50);
            }
            .blue {
              background: #00b4ff;
              background: -webkit-linear-gradient(right, #0096ff, #00b4ff);
            }
          }
          //具体的数字
          .value {
            @include size(10%, 100%);
            font-size: 14px;
            line-height: 180%;
            box-sizing: border-box;
            float: left;
            color: #fff;
            margin-left: 10px;
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
      }
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .riskfactoryrankWrap {
    @include size(100%, 100%);
    .riskfactoryrankHeader {
      @include size(100%, 40px);
      padding-left: 12px;
      line-height: 40px;
      box-sizing: border-box;
      font-size: 16px;
      color: #fff;
      &_tiao{
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .riskfactoryrankCon {
      @include size(100%, 91%);
      ul {
        @include size(100%, 98%);
        margin-top: 2%;
        li {
          @include size(100%, 9%);
          margin-top:1px;
          //图片
          .riskfactoryrankCon_img {
            @include size(10%, 100%);
            float: left;
            box-sizing: border-box;
            img {
              vertical-align: middle;
              width: 16px;
              height: 17px;
              margin-top: 5%;
              margin-left: 20%;
            }
          }
          //文字
          .name {
            @include size(25%, 100%);
            float: left;
            color: #fff;
            font-size: 13px;
            line-height: 240%;
            // padding-top: 18px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 10px;
          }
          .name.danger {
            color: #ff0000;
          }
          //条形图
          .infoBase {
            @include size(54%, 100%);
            margin-left: 0.5%;
            float: left;
            box-sizing: border-box;
            .info {
              height: 8px;
              width: 200px;
              margin-top: 6%;
              transition: 1s;
            }
            .red {
              background: #ff5050;
              background: -webkit-linear-gradient(right, #ff0000, #ff5050);
            }
            .orange {
              background: #ff9600;
              background: -webkit-linear-gradient(right, #ff7800, #ff9600);
            }
            .yellow {
              background: #fffa50;
              background: -webkit-linear-gradient(right, #ffdc00, #fffa50);
            }
            .blue {
              background: #00b4ff;
              background: -webkit-linear-gradient(right, #0096ff, #00b4ff);
            }
          }
          //具体的数字
          .value {
            @include size(10%, 100%);
            font-size: 14px;
            line-height: 200%;
            box-sizing: border-box;
            float: left;
            color: #fff;
            margin-left: 10px;
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
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .riskfactoryrankWrap {
    @include size(100%, 100%);
    .riskfactoryrankHeader {
      @include size(100%, 50px);
      padding-left: 12px;
      line-height: 50px;
      box-sizing: border-box;
      font-size: 20px;
      color: #fff;
      &_tiao{
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .riskfactoryrankCon {
      @include size(100%, 92%);
      ul {
        @include size(100%, 100%);
        box-sizing:border-box;
        padding-top:20px;
        li {
          @include size(100%, 9%);
          // height: 61px;
          //图片
          .riskfactoryrankCon_img {
            @include size(10%, 100%);
            // margin-left: 12px;
            float: left;
            // margin-top: 15px;
            //   padding-top: 15px;
            box-sizing: border-box;
            // background: pink;
            img {
              vertical-align: middle;
              width: 20px;
              height: 21px;
              margin-top: 10%;
              margin-left: 20%;
            }
          }
          //文字
          .name {
            @include size(25%, 100%);
            // margin-left: 14px;
            // width: 112px;
            // height: 61px;
            float: left;
            color: #fff;
            font-size: 16px;
            line-height: 200%;
            // padding-top: 18px;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-left: 10px;
          }
          .name.danger {
            color: #ff0000;
          }
          //条形图
          .infoBase {
            @include size(52%, 100%);
            margin-left: 0.5%;
            float: left;
            box-sizing: border-box;
            .info {
              height: 10px;
              width: 200px;
              margin-top: 7%;
              transition: 1s;
            }
            .red {
              background: #ff5050;
              background: -webkit-linear-gradient(right, #ff0000, #ff5050);
            }
            .orange {
              background: #ff9600;
              background: -webkit-linear-gradient(right, #ff7800, #ff9600);
            }
            .yellow {
              background: #fffa50;
              background: -webkit-linear-gradient(right, #ffdc00, #fffa50);
            }
            .blue {
              background: #00b4ff;
              background: -webkit-linear-gradient(right, #0096ff, #00b4ff);
            }
          }
          //具体的数字
          .value {
            @include size(12%, 100%);
            font-size: 18px;
            line-height: 180%;
            box-sizing: border-box;
            float: left;
            color: #fff;
            margin-left: 10px;
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
      }
    }
  }
}
@media only screen and (min-width: 1931px) {
  .riskfactoryrankWrap {
    @include size(100%, 100%);
    .riskfactoryrankHeader {
      @include size(100%, 65px);
      padding-left: 12px;
      line-height: 180%;
      box-sizing: border-box;
      font-size: 32px;
      line-height: 65px;
      color: #fff;
      &_tiao{
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center center;
        background-size: 100% 100%;
      }
    }
    .riskfactoryrankCon {
      @include size(100%, 92%);
      ul {
        @include size(100%, 98%);
        margin-top: 2%;
        li {
          @include size(100%, 9%);
          //图片
          .riskfactoryrankCon_img {
            @include size(10%, 100%);
            float: left;
            box-sizing: border-box;
            img {
              vertical-align: middle;
              width: 26px;
              height: 26px;
              margin-top: 28%;
              margin-left: 20%;
            }
          }
          //文字
          .name {
            @include size(25%, 100%);
            float: left;
            color: #fff;
            font-size: 24px;
            line-height: 200%;
            box-sizing: border-box;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right:2px;
            margin-left: 15px;
          }
          .name.danger {
            color: #ff0000;
          }
          //条形图
          .infoBase {
            @include size(52%, 100%);
            margin-left: 2.5%;
            float: left;
            box-sizing: border-box;
            .info {
              height: 14px;
              width: 200px;
              margin-top: 7%;
              transition: 1s;
            }
            .red {
              background: #ff5050;
              background: -webkit-linear-gradient(right, #ff0000, #ff5050);
            }
            .orange {
              background: #ff9600;
              background: -webkit-linear-gradient(right, #ff7800, #ff9600);
            }
            .yellow {
              background: #fffa50;
              background: -webkit-linear-gradient(right, #ffdc00, #fffa50);
            }
            .blue {
              background: #00b4ff;
              background: -webkit-linear-gradient(right, #0096ff, #00b4ff);
            }
          }
          //具体的数字
          .value {
            @include size(10%, 100%);
            font-size: 28px;
            line-height: 200%;
            box-sizing: border-box;
            float: left;
            color: #fff;
            margin-left: 10px;
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
      }
    }
  }
}
</style>
