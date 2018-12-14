<template>
  <div class="risk-wrap clearfix">
<!--
    <div style=" width: 100%;  height: 100%;  position: relative;overflow: auto">
-->
      <div style=" width: 100%;  height: 100%;  position: relative;">
      <div style=" width: 100%;  height: 100%;min-width: 1024px;min-height: 400px;">
      <div style="  width:calc(100% / 16 * 11.9999);float: left;  overflow: hidden;  height: 100%;">
        <div style=" width: 100%;  height: 79.99%;overflow: hidden;" >
          <div class="autoScroll" style="overflow-x: hidden;">
            <slot name="risktop"></slot>
          </div>
        </div>
        <!-- 折线图 -->
        <div style=" width: 100%;  height: 19.99%;">
          <slot name="riskbottom"></slot>
        </div>
      </div>
      <div style="  width:calc(100% / 16 * 3.9999);float: left; overflow: hidden; height: 100%;">
        <!-- 风险分布 -->
        <div class="riskdistributionwrap">
          <slot name="riskdistribution"></slot>
        </div>
        <!-- 风险因子排名 -->
        <div class="riskfactorrankwrap">
          <slot name="riskfactorrank"></slot>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data: function () {
    return {}
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.risk-wrap {
  @include size(100%, 100%);
  position: relative;
  .risktopwrap {
    width: 77%;
    height:78%;
    float: left;
  }
  .riskdistributionwrap {
    width: 100%;
    height: 35%;
    box-sizing: border-box;
    border-left:1px solid rgba(255,255,255,0.7);
  }
  .riskfactorrankwrap {
    width: 100%;
    height: 64%;
    box-sizing: border-box;
    border-left:1px solid rgba(255,255,255,0.7);
  }
  .riskbottomwrap {
    width: 77%;
    height: 20%;
    float: left;
  }
}
</style>
