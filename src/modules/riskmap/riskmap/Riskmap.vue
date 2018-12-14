<template>
    <div class="rotate_title">
        <div :class="{Titlebj:TitleKey === 0}" @click="selectTitle(0)">模型列表</div>
        <div :class="{Titlebj:TitleKey === 1}" @click="selectTitle(1)">风险因子</div>
        <div :class="{Titlebj:TitleKey === 2}" @click="selectTitle(2)">缓解措施</div>
    </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      TitleKey: 0
    }
  },
  computed: {
  },
  methods: {
    // ...mapMutations('ModelStore', ['setModelState']),
    // ...mapMutations('RiskStore', ['setRiskfactoryrankConData']),
    selectTitle (item) {
      this.TitleKey = item
    //   this.setModelState(item)
    //   this.setRiskfactoryrankConData()
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.rotate_title{
    @include size(355px,100%);
    box-sizing:border-box;
    padding-top:20px;
    padding-left:20px;
    text-align: center;
    line-height:30px;
    color:#fff;
    font-size: 12px;
    div{
        cursor: pointer;
        @include size(100px,30px);
        float: left;
        background: url('../../../assets/images/title-bj3.png') no-repeat center center;
        background-size: 100% 100%;
    }
}
.Titlebj{
    background: url('../../../assets/images/title-bj2.png') no-repeat center center!important;
    background-size: 100% 100%!important;
}
@media  only screen  and (max-width: 1366px){
    .rotate_title{
        @include size(355px,100%);
        line-height:30px;
        font-size: 12px;
        div{
            @include size(105px,30px);
        }
    }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
    .rotate_title{
        @include size(455px,100%);
        line-height:35px;
        font-size: 14px;
        div{
            @include size(130px,35px);
        }
    }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
    .rotate_title{
        @include size(555px,100%);
        line-height:40px;
        font-size: 16px;
        div{
            @include size(150px,40px);
        }
    }
}
@media only screen  and (min-width: 1921px) and (max-width: 2560px){
    .rotate_title{
        @include size(100%,100%);
        line-height:85px;
        font-size: 30px;
        padding-top:20px;
        padding-left:60px;
        div{
            @include size(320px,85px);
        }
    }
}

// @media  only screen  and (max-width: 1366px){
// }
// @media only screen  and (min-width: 1367px) and (max-width: 1400px){
// }
// @media only screen  and (min-width: 1401px) and (max-width: 1920px){
// }
// @media only screen  and (min-width: 1921px) and (max-width: 2560px){
// }
// @media only screen  and (min-width: 2561px){
// }
// @media only screen  and (min-width: 1367px){
//     .rotate_title{
//         @include size(500px,100px);
//         box-sizing:border-box;
//         padding-top:20px;
//         padding-left:20px;
//         text-align: center;
//         line-height:40px;
//         color:#fff;
//         div{
//             float: left;
//             &:nth-child(1){
//                 cursor: pointer;
//                 @include size(150px,40px);
//                 background: url('../../../assets/images/title-bj3.png') no-repeat center center;
//             }
//             &:nth-child(2){
//                 cursor: pointer;
//                 @include size(150px,40px);
//                 background: url('../../../assets/images/title-bj3.png') no-repeat center center;
//             }
//             &:nth-child(3){
//                 cursor: pointer;
//                 @include size(150px,40px);
//                 background: url('../../../assets/images/title-bj3.png') no-repeat center center;
//             }
//         }
//     }
//     .Titlebj{
//         background: url('../../../assets/images/title-bj2.png') no-repeat center center!important;
//         background-size: 150px 40px;
//     }
// }
</style>
