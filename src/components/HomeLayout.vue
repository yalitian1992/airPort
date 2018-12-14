<template>
  <div class="homeLayout_wrap clearfix" style="overflow: auto;">
    <!-- header -->
    <div class="headerLayout_wrap">
      <slot name="header"></slot>
    </div>
    <!-- router content -->
    <div class="routerContentLayout_wrap">
      <slot name="routerContent"></slot>
    </div>
    <!-- 弹框 -->
    <!--<div class="pop_warp">
      <div class="">账户主页</div>
    </div> -->
  </div>
</template>
<script>
export default {
  components: {}
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

// @media only screen  and (max-width: 1366px){
//   .homeLayout_wrap {
//     @include size(1366px,768px);
//     background:url('../assets/images/bj.png') no-repeat  0px 0px;
//     background-size: 100% 100%;
//     .headerLayout_wrap {
//       @include size(100%,35px);
//     }
//     .routerContentLayout_wrap {
//       @include size(100%,733px);
//     }
//   }
// }
// @media only screen  and (min-width: 1367px) and (max-width: 1400px){
//   .homeLayout_wrap {
//     @include size(1400px,900px);
//     background:url('../assets/images/bj.png') no-repeat  0px 0px;
//     background-size: 100% 100%;
//     .headerLayout_wrap {
//     // background: #0096ff;
//       @include size(100%,5%);
//     }
//     .routerContentLayout_wrap {
//       @include size(100%,95%);
//     }
//   }
// }
// @media only screen  and (min-width: 1401px) and (max-width: 1920px){
//   .homeLayout_wrap {
//     @include size(1920px,1080px);
//     background:url('../assets/images/bj.png') no-repeat  0px 0px;
//     background-size: 100% 100%;
//     .headerLayout_wrap {
//     // background: skyblue;
//       @include size(100%,50px);
//     }
//     .routerContentLayout_wrap {
//       @include size(100%,1030px);
//     }
//   }
// }
// @media only screen  and (min-width: 1921px) and (max-width: 2560px){
//   .homeLayout_wrap {
//     @include size(2560px,1600px);
//     background:url('../assets/images/bj.png') no-repeat  0px 0px;
//     background-size: 100% 100%;
//     .headerLayout_wrap {
//     // background: orange;
//       @include size(100%,80px);
//     }
//     .routerContentLayout_wrap {
//       @include size(100%,1520px);
//     }
//   }
// }

// @media only screen  and (min-width: 2561px) {
.homeLayout_wrap {
  width: 100vw !important;
  height: 100vh !important;
  background: url("../assets/images/bj.png") no-repeat 0px 0px;
  background-size: 100% 100%;
  .headerLayout_wrap {
    width: 100%;
    height: 5%;
    min-height: 40px;
  }
  .routerContentLayout_wrap {
    width: 100%;
    height: 95%;
    max-height: calc(100% - 40px);
/*
    overflow: hidden;
*/
    min-width: 1024px;
  }
}
// }
</style>
