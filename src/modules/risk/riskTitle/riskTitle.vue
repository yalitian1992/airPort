<template>
<div></div>
    <!-- <div class="rotate_title"> -->
        <!-- <div :class="{Titlebj:TitleKey === 0}" @click="selectTitle(0)">管理视图</div> -->
        <!-- <div :class="{Titlebj:TitleKey === 1}" @click="selectTitle(1)">风险视图</div> -->
    <!-- </div> -->
</template>

<script>
// import {mapMutations} from 'vuex'
export default {
  data () {
    return {
    //   TitleKey: 0
    }
  },
  methods: {
    // ...mapMutations('RiskStore', ['setRiskfactoryrankConData']),
    // selectTitle (item) {
    //   this.TitleKey = item
    //   this.setRiskfactoryrankConData()
    // }
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
// @media  only screen  and (max-width: 1366px){
//     .rotate_title{
//         @include size(284px,71px);
//         box-sizing:border-box;
//         padding-top:20px;
//         padding-left:20px;
//         text-align: center;
//         line-height:28px;
//         color:#fff;
//         font-size: 12px;
//         div{
//             float: left;
//             &:nth-child(1){
//                 cursor: pointer;
//                 @include size(100px,28px);
//                 background: url('../../../assets/images/title-bj3.png') no-repeat center center;
//                 background-size: 100% 100%;
//             }
//             &:nth-child(2){
//                 cursor: pointer;
//                 @include size(100px,28px);
//                 background: url('../../../assets/images/title-bj3.png') no-repeat center center;
//                 background-size: 100% 100%;
//             }
//         }
//     }
//     .Titlebj{
//         background: url('../../../assets/images/title-bj2.png') no-repeat center center!important;
//         background-size: 100px 28px;
//     }
// }

// @media only screen  and (min-width: 1367px){
    .rotate_title{
        @include size(400px,100px);
        box-sizing:border-box;
        padding-top:20px;
        padding-left:20px;
        text-align: center;
        line-height:40px;
        color:#fff;
        div{
            float: left;
            &:nth-child(1){
                cursor: pointer;
                @include size(150px,40px);
                background: url('../../../assets/images/title-bj3.png') no-repeat center center;
            }
            &:nth-child(2){
                cursor: pointer;
                @include size(150px,40px);
                background: url('../../../assets/images/title-bj3.png') no-repeat center center;
            }
        }
    }
    .Titlebj{
        background: url('../../../assets/images/title-bj2.png') no-repeat center center!important;
        background-size: 150px 40px;
    }
// }
</style>
