<template>
  <div class="riskdisposal_warp">
    <div class="riskdisposal_title">
      <div>风险处置</div>
      <div>飞行区管理部 >> 场道管理模块 >> 跑道入侵2</div>
    </div>
    <div class="riskdisposal_warp_content">
      <div class="riskdisposal_content">
      <div class="riskdisposal_content1">
        <el-steps :active="1" finish-status="success" style="margin-top: 20px">
          <el-step title="风险预警" ></el-step>
          <el-step title="选取缓解措施" ></el-step>
          <el-step title="预警消除" ></el-step>
        </el-steps>
      </div>
      <div class="riskdisposal_content1">
        <div class="title">安全因子：</div>
        <div class="content">
          <!-- <div :class="selectContentKey===0?'selectContent':''" @click="selectContent(0)">飞行管理模块</div>
          <div :class="selectContentKey===1?'selectContent':''" @click="selectContent(1)">场道管理模块</div>
          <div :class="selectContentKey===2?'selectContent':''" @click="selectContent(2)">跑道入侵</div>
          <div :class="selectContentKey===3?'selectContent':''" @click="selectContent(3)">引导员资质</div> -->
          <div class="riskFactor">引导员资质</div>
        </div>
      </div>
      <div class="riskdisposal_content1">
        <div class="title">当前分值：</div>
        <div class="content">
          <div class="policevalue">10</div>
          <div class="police">击穿预警</div>
        </div>
      </div>
      <div class="riskdisposal_content1">
        <div class="title">缓解措施：</div>
        <div class="content">
          <div class="refieveMethod">
            <key-value-select width='468px' :data="refieveMethodData"></key-value-select>
          </div>
        </div>
      </div>
      <div class="riskdisposal_content1">
        <div class="title">缓解效果：</div>
        <div class="content">
          <div class="refieveEffect">缓解后可接受</div>
        </div>
      </div>
      <div class="riskdisposal_operation">
        <div class="save" @click="saveOperation()">确认</div>
        <div class="cancel" @click="cancelOperation()">取消</div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import KeyValueSelect from '../../../components/KeyValueSelect.vue'
export default {
  components: {
    KeyValueSelect
  },
  data () {
    return {
      selectContentKey: 0,
      refieveMethodData: [
        { value: 1, label: '更换引导员' },
        { value: 2, label: '绩效奖励' },
        { value: 3, label: '节油奖励' }
      ]
    }
  },
  methods: {
    // selectContent (val) {
    //   this.selectContentKey = val
    // },
    saveOperation () {
      this.$emit('closeRiskdisposal1')
    },
    cancelOperation () {
      this.$emit('closeRiskdisposal1')
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
// @media  only screen  and (max-width: 1366px){
//   .riskdisposal_warp{
//     @include size(100%,95%);
//     background: url('../../../assets/images/bj.png') no-repeat center center;
//     background-size: 100% 100%;
//     position: relative;
//     .riskdisposal_title{
//       @include size(100%,5%);
//       margin-top:2%;
//       div{
//         &:nth-child(1){
//           @include size(100%,40px);
//           font-size: 20px;
//           font-weight: 100;
//           text-align: left;
//           line-height: 40px;
//           color: #fff;
//           background: rgba(255,255,255,0.1);
//           box-sizing: border-box;
//           padding-left: 5%;
//         }
//         &:nth-child(2){
//           @include size(100%,44px);
//           font-size: 20px;
//           font-weight: 100;
//           text-align: left;
//           line-height: 89px;
//           color: #fff;
//           box-sizing:border-box;
//           padding-left:88px;
//         }
//       }
//     }
//     .riskdisposal_warp_content{
//         @include size(100%,auto);
//         background:#1B203C;
//         margin:0 auto;
//         margin-top:100px;
//       .riskdisposal_content{
//         @include size(100%,auto);
//         box-sizing: border-box;
//         // padding-top:25px;
//         &1{
//           @include size(50%,93px);
//           margin:0 auto;
//           .title{
//             @include size(100%,30px);
//             font-size:18px;
//             color:#fff;
//             line-height:30px;
//             margin-bottom: 14px;
//           }
//           .content{
//             @include size(100%,30px);
//             div{
//               @include size(232px,42px);
//               display: inline-block;
//               border-radius: 4px;
//               box-sizing:border-box;
//               background:rgba(255,255,255,0.1);
//               font-size:16px;
//               color:#fff;
//               line-height:42px;
//               cursor: pointer;
//             }
//             .riskFactor,.policevalue{
//               padding-left:10px;
//             }
//             .police{
//               color:#ff0000;
//               padding-left:10px;
//             }
//             .refieveMethod{
//               @include size(468px,42px);
//               background:none;
//             }
//             .refieveEffect{
//               @include size(468px,42px);
//               color:#8a8a8a;
//               padding-left:10px;
//             }
//             // .selectContent{
//             //   color:#29ABE2;
//             //   box-sizing:border-box;
//             //   border: 1px solid #29ABE2;
//             // }
//           }
//         }
//         &1:nth-child(1){
//           margin-bottom: 20px;
//         }
//         .riskdisposal_operation{
//           @include size(100%,30px);
//           margin-top:35px;
//           // margin-bottom:35px;
//           font-size: 14px;
//           color:#fff;
//           line-height: 30px;
//           text-align: center;
//           .save{
//             @include size(56px,100%);
//             background:#0096ff;
//             border-radius: 4px;
//             cursor: pointer;
//             background:#0096ff;
//             float: right;
//             margin-right:2%;
//           }
//           .cancel{
//             @include size(56px,100%);
//             border-radius: 4px;
//             cursor: pointer;
//             background: #c2c3c4;
//             float: right;
//             margin-right:2%;
//           }
//         }
//       }
//     }
//   }
// }
// @media only screen  and (min-width: 1367px){
  .riskdisposal_warp{
    @include size(100%,100%);
    background: url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    .riskdisposal_title{
      @include size(100%,100px);
      div{
        &:nth-child(1){
          @include size(100%,56px);
          font-size: 28px;
          font-weight: 100;
          text-align: left;
          line-height: 56px;
          color: #fff;
          background: rgba(255,255,255,0.1);
          box-sizing:border-box;
          padding-left:70px;
        }
        &:nth-child(2){
          @include size(100%,44px);
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 89px;
          color: #fff;
          box-sizing:border-box;
          padding-left:128px;
        }
      }
    }
    .riskdisposal_warp_content{
        @include size(1577px,762px);
        margin-top:56px;
        margin-left:151px;
        background:#1B203C;
      .riskdisposal_content{
        @include size(100%,100%);
        box-sizing: border-box;
        padding-top:25px;
        &1{
          @include size(954px,93px);
          margin-bottom: 28px;
          margin-left:311px;
          .title{
            @include size(100%,30px);
            font-size:22px;
            color:#fff;
            line-height:30px;
            margin-bottom: 14px;
          }
          .content{
            // @include size(100%,63px);
            @include size(100%,42px);
            div{
              // @include size(232px,57px);
              @include size(232px,42px);
              display: inline-block;
              border-radius: 4px;
              box-sizing:border-box;
              background:rgba(255,255,255,0.1);
              font-size:20px;
              color:#fff;
              line-height:42px;
              cursor: pointer;
            }
            .riskFactor,.policevalue{
              padding-left:10px;
            }
            .police{
              color:#ff0000;
              padding-left:10px;
            }
            .refieveMethod{
              @include size(468px,42px);
              background:none;
            }
            .refieveEffect{
              @include size(468px,42px);
              color:#8a8a8a;
              padding-left:10px;
            }
            // .selectContent{
            //   color:#29ABE2;
            //   box-sizing:border-box;
            //   border: 1px solid #29ABE2;
            // }
          }
        }
        .riskdisposal_operation{
          // @include size(954px,42px);
          @include size(1250px,42px);
          // background: #0096ff;
          margin-top:50px;
          position: relative;
          .save{
            @include size(80px,42px);
            font-size: 16px;
            line-height: 42px;
            text-align: center;
            background:#0096ff;
            border-radius: 4px;
            position: absolute;
            // top:20px;
            top:0;
            right:20px;
            color:#fff;
            box-sizing:border-box;
            cursor: pointer;
            background:#0096ff;
          }
          .cancel{
            @include size(80px,42px);
            color:#fff;
            font-size: 16px;
            line-height: 42px;
            text-align: center;
            border-radius: 4px;
            position: absolute;
            // top:20px;
            top:0;
            right:120px;
            box-sizing:border-box;
            cursor: pointer;
            background: #c2c3c4
          }
        }
      }
    }
  }
// }
</style>
