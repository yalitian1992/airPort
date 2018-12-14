<template>
  <div class="riskDistribute_warp">
    <div class="riskDistribute_title">
      <span>风险分布</span>
    </div>
    <div class="riskDistribute_title_tiao"></div>
    <div class="riskDistribute_content">
      <div class="riskDistribute_content_right">
        <!-- 雷达图 -->
        <div class="riskEchart" >
          <risk-echart :riskData='riskDataWrap'  v-if="riskDataWrap  &&  riskDataWrap.length  &&   riskDataWrap.length  > 0"></risk-echart>
        </div>
        <!--<div class="echartBj"></div>-->
      </div>
    </div>
    <!--雷达背景图-->
    <!-- <div v-show="false">{{getSelectData}}</div> -->
  </div>
</template>
<script>
/*eslint-disable */
import { mapState } from "vuex";
import riskEchart from "../../../components/echarts/riskDistrbuteCharts.vue";
export default {
  components: {
    riskEchart
  },
  data() {
    return {
      // riskDataWrap: []
    };
  },
  methods: {},
  computed: {
    ...mapState("RiskStore", ["RiskData"]),
    riskDataWrap() {
      return (
        this.RiskData &&
        this.RiskData !== undefined &&
        this.RiskData !== null &&
        this.RiskData.riskData &&
        this.RiskData.riskData
      );
    }
  },
  watch: {},
  created() {}
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media only screen and (max-width: 1376px) {
  .riskDistribute_warp {
    @include size(100%, 100%);
    position: relative;
    // background: url("../../../assets/images/ld-bj2.png") no-repeat center center;
    // background-size: 100% 100%;
    .riskDistribute_title {
      @include size(100%, 35px);
      span {
        display: block;
        @include size(100%, 100%);
        // font-family: "SourceHanSansSC-Bold";
        font-size: 14px;
        color: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        line-height: 35px;
      }
      &_tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
    .riskDistribute_content {
      @include size(100%, 87%);
      &_right {
        @include size(100%, 100%);
        position: relative;
        .riskEchart {
          @include size(100%, 100%);
        }
        .echartBj {
          @include size(156px, 156px);
          float: left;
          position: absolute;
          left: 24%;
          top: 15%;
          background: url("../../../assets/images/ld-bj.png") no-repeat center
            center;
          background-size: 80% 80%;
        }
      }
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .riskDistribute_warp {
    @include size(100%, 100%);
    position: relative;
    .riskDistribute_title {
      @include size(100%, 40px);
      span {
        @include size(100%, 100%);
        display: block;
        // font-family: "SourceHanSansSC-Bold";
        font-size: 16px;
        color: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        line-height: 40px;
      }
      &_tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
    .riskDistribute_content {
      @include size(100%, 87%);
      &_right {
        @include size(100%, 100%);
        position: relative;
        .riskEchart {
          @include size(100%, 100%);
        }
        .echartBj {
          @include size(157px, 157px);
          float: left;
          position: absolute;
          left: 23.5%;
          top: 20%;
          background: url("../../../assets/images/ld-bj.png") no-repeat center
            center;
          background-size: 76% 76%;
        }
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .riskDistribute_warp {
    @include size(100%, 100%);
    position: relative;
    // background: url("../../../assets/images/ld-bj2.png") no-repeat center center;
    // background-size: 100% 100%;
    .riskDistribute_title {
      @include size(100%, 13%);
      span {
        display: block;
        @include size(100%, 100%);
        // font-family: "SourceHanSansSC-Bold";
        font-size: 20px;
        color: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        line-height: 40px;
      }
      &_tiao {
        @include size(100%, 1px);
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
    .riskDistribute_content {
      @include size(100%, 87%);
      &_right {
        @include size(100%, 100%);
        position: relative;
        .riskEchart {
          @include size(100%, 100%);
        }
        .echartBj {
          @include size(175px, 175px);
          float: left;
          position: absolute;
          left: 29%;
          top: 22%;
          background: url("../../../assets/images/ld-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
// @media only screen and (min-width: 1921px) and (max-width: 2560px) {
@media only screen and (min-width: 1931px) {
  .riskDistribute_warp {
    @include size(100%, 100%);
    position: relative;
    background: url("../../../assets/images/ld-bj2.png") no-repeat center center;
    background-size: 100% 100%;
    .riskDistribute_title {
      @include size(100%, 65px);
      span {
        display: block;
        @include size(100%, 100%);
        // font-family: "SourceHanSansSC-Bold";
        font-size: 32px;
        color: #fff;
        box-sizing: border-box;
        padding-left: 12px;
        line-height: 65px;
      }
    }
    .riskDistribute_content {
      @include size(100%, 87%);
      &_right {
        @include size(100%, 100%);
        position: relative;
        .riskEchart {
          @include size(100%, 100%);
        }
        .echartBj {
          @include size(257px, 257px);
          float: left;
          position: absolute;
          left: 27%;
          top: 22%;
          background: url("../../../assets/images/ld-bj.png") no-repeat center
            center;
          background-size: 100% 100%;
        }
      }
    }
  }
}
// @media only screen and (min-width: 2561px) {
//   .riskDistribute_warp {
//     @include size(100%, 100%);
//     position: relative;
//     background: url("../../../assets/images/ld-bj2.png") no-repeat center center;
//     background-size: 100% 100%;
//     .riskDistribute_title {
//       @include size(100%, 13%);
//       span {
//         display: block;
//         @include size(100%, 100%);
//         font-family: "SourceHanSansSC-Bold";
//         font-size: 16px;
//         color: #fff;
//         box-sizing: border-box;
//         padding-left: 12px;
//         line-height: 35px;
//       }
//     }
//     .riskDistribute_content {
//       @include size(100%, 87%);
//       &_right {
//         @include size(100%, 100%);
//         position: relative;
//         .riskEchart {
//           @include size(100%, 100%);
//         }
//         .echartBj {
//           @include size(514px, 514px);
//           float: left;
//           position: absolute;
//           left: 27%;
//           top: 22%;
//           background: url("../../../assets/images/ld-bj.png") no-repeat center
//             center;
//           background-size: 100% 100%;
//         }
//       }
//     }
//   }
// }
</style>
