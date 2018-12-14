<template>
  <div class="security-wrap clearfix">
    <!-- 头部 -->
    <div class="securityTitleFrame">
      <slot name="securityTitle"></slot>
    </div>
    <!-- 部门统计 -->
    <div class="departmentStatisticsFrame"
         style="height: 88%;"
         v-if="securityStateShow === 0">
      <slot name="departmentStatistics"></slot>
    </div>
    <!-- 统计分析 -->
    <div class="statisticalAnalysisFrame"
         v-if="securityStateShow === 1">
      <slot name="statisticalAnalysis"></slot>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data: function () {
    return {
      securityStateShow: 0
    }
  },
  computed: {
    ...mapState('SecurityStore', ['securityState'])
  },
  watch: {
    securityState (val) {
      this.securityStateShow = val
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.security-wrap {
  width: 100%;
  height: 100%;
  /*height: calc(100% - 14px);*/
  .securityTitleFrame{
    @include size(100%, auto);
  }
  .statisticalAnalysisFrame{
    height: 90%;
  }
}
@media only screen and (max-width: 1280px) {
  .departmentStatisticsFrame{
    height: 100%;
  }
}
@media only screen and (min-width: 1281px) and (max-width: 1366px) {
  .departmentStatisticsFrame,.statisticalAnalysisFrame {
    width: 100%;
    height:93%;
  }
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
  .departmentStatisticsFrame {
    height: 93%;
    width: 100%;
  }
  .statisticalAnalysisFrame {
    @include size(100%, 93%);
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .departmentStatisticsFrame {
    height: 93%;
    width: 100%;
  }
  .statisticalAnalysisFrame {
    @include size(100%, 93%);
  }
}
@media only screen and (min-width: 1921px){
  .departmentStatisticsFrame {
    height: 93%;
    width: 100%;
  }
  .statisticalAnalysisFrame {
    @include size(100%, 93%);
  }
}

</style>
