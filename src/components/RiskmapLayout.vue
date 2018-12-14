<template>
  <div class="riskMap-wrap clearfix" style="padding: 5px;position: relative;">
      <div class="riskMap-title"></div>
    <iframe v-if="isIe===true" src="../../static/htmlPage/mapPage.html" style="border: none;width: 100%;height: 100%;position: absolute;top:0;left: 0;" v-show="isIe"></iframe>
   <map-for-google v-else></map-for-google>
  </div>
</template>
<script>
import MapForGoogle from '../modules/riskmap/riskmap/mapForGoogle'
export default {
  components: {MapForGoogle},
  data () {
    return {
      isIe: true
    }
  },
  mounted () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) { this.isIe = true } else {
      this.isIe = false
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.riskMap-wrap {
  @include size(100%, 100%);
  overflow: hidden;
}
@media only screen and (max-width: 1366px) {
  .riskMap-title {
    @include size(100%, 20px);
  }
  .riskMap-content {
    @include size(100%, 100%);
    margin: 0 auto;
    background: url("../assets/images/riskmap.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
  .riskMap-title {
    @include size(100%, 20px);
  }
  .riskMap-content {
    @include size(95%, 85%);
    margin: 0 auto;
    background: url("../assets/images/riskmap.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
@media only screen and (min-width: 1401px) and (max-width: 1920px) {
  .riskMap-title {
    @include size(100%, 20px);
  }
  .riskMap-content {
    @include size(98%, 95%);
    margin: 0 auto;
    background: url("../assets/images/riskmap.png") no-repeat center center;
    background-size: 100% 100%;
  }
}
@media only screen and (min-width: 1921px) {
  .riskMap-title {
    @include size(100%, 20px);
  }
  .riskMap-content {
    @include size(98%, 90%);
    margin: 0 auto;
    background: url("../assets/images/riskmap.png") no-repeat center center;
    background-size: 100% 100%;
  }
}

</style>
