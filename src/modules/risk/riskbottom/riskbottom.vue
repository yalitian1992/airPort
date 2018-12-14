<template>
  <div class="riskButtom_warp">
    <div class="riskButtom_warp_tiao">
      <!-- <div class="riskButtom_warp_tiao_zi">
        <div>12</div>
        <div>9</div>
        <div>6</div>
        <div>3</div>
        <div>1</div>
      </div> -->
      <div class="selectTime">
        <div :class="activeMountKey===0?'activeMount':''" @click="activeMount(0)">24小时</div>
        <div :class="activeMountKey===1?'activeMount':''" @click="activeMount(1)">48小时</div>
      </div>
      <div class="linePic">
        <risk-buttom-eachers @click="eClick" :riskButtonData="RiskLineData24" :state=1 v-if="activeMountKey===0"></risk-buttom-eachers>
        <risk-buttom-eachers @click="eClick"  :riskButtonData="RiskLineData48" :state=3 v-if="activeMountKey===1"></risk-buttom-eachers>
      </div>
    </div>
    <div class="riskButtom_warp_time"></div>
    <!--折线图详情弹框-->
    <RiskPointDetails ref="riskPoi"></RiskPointDetails>
  </div>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import riskButtomEachers from '../../../components/echarts/riskbuttomEachers.vue'
import RiskPointDetails from '../riskbottom/riskPointDetailNew.vue'

export default {
  components: {
    riskButtomEachers,
    RiskPointDetails
  },
  data () {
    return {
      activeMountKey: 0,
      sorceCon: ''
    }
  },
  computed: {
    ...mapState('RiskStore', ['RiskSafeCurve']),
    RiskLineData24 () {
      return this.RiskSafeCurve &&
        this.RiskSafeCurve !== null &&
        this.RiskSafeCurve !== undefined &&
        this.RiskSafeCurve.RiskLineData24 &&
        this.RiskSafeCurve.RiskLineData24
    },
    RiskLineData48 () {
      return this.RiskSafeCurve &&
        this.RiskSafeCurve !== null &&
        this.RiskSafeCurve !== undefined &&
        this.RiskSafeCurve.RiskLineData48 &&
        this.RiskSafeCurve.RiskLineData48
    }
  },
  methods: {
    activeMount (item) {
      this.activeMountKey = item
    },
    eClick(params){
      this.$refs.riskPoi.RiskDetail(params.data.DIY.cid)
      this.sorceCon = params.data.DIY.cid+''+ params.data.DIY.name+'点平均风险值'+params.data.DIY.value
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;}
.noData{
  margin: 18% auto 0 auto;
  text-align: center;
}
.riskButtom_warp{
  @include size(100%,100%);
  position: relative;
  &_tiao{
    @include size(100%,82%);
    background: url('../../../assets/images/bubiao-bj.png') no-repeat center center;
    background-size: 100% 100%;
    .selectTime{
      @include size(120px,30px);
      position: absolute;
      top:-40%;
      right:20px;
      div{
        text-align:center;
        line-height: 30px;
        color:#fff;
        font-size: 12px;
        float: left;
        cursor: pointer;
        &:nth-child(1){
          @include size(50%,100%);
          border-top-left-radius:4px;
          border-bottom-left-radius: 4px;
          box-sizing: border-box;
          border: 1px solid #fff;
        }
        &:nth-child(2){
          @include size(50%,100%);
          border-top-right-radius:4px;
          border-bottom-right-radius: 4px;
          box-sizing: border-box;
          border: 1px solid #fff;
        }
      }
      .activeMount{
          box-sizing: border-box;
          border: 1px solid #0096ff !important;
          color:#0096ff;
          background: url('../../../assets/images/11-01.png') no-repeat center center;
          background-size: 100% 100%;
      }
    }
    .linePic{
      @include size(100%,100%);
      position: absolute;
      right:0;
      top:0px;
      z-index: 2;
      box-sizing:border-box;
      padding-left:10px;
    }
  }
  &_time{
    @include size(100%,18%);
    position: absolute;
    bottom:0px;
    background:rgba(25,30,60,0.9);
  }
}
</style>
