<template>
  <!--<div style="width: 100%;height: 100%;overflow: auto;">-->
    <div style="width: 100%;height: 100%;">
  <div class="module-wrap clearfix">
    <!-- 头部 -->
    <div class="moduelTitle">
      <slot name="modeltitle"></slot>
    </div>
    <!-- 模型列表 -->
    <div class="modellistFrame"
         v-if="modelStateShow === 0">
      <slot name="modellist"></slot>
    </div>
    <!-- 风险因子 -->
    <div class="modelFactorFrame"
         v-if="modelStateShow === 1">
      <slot name="modelFactor"></slot>
    </div>
    <!-- 缓解措施 -->
    <div class="ModelRelieveMeasuresFrame"
         v-if="modelStateShow === 2">
      <slot name="ModelRelieveMeasures"></slot>
    </div>
  </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data: function () {
    return {
      modelStateShow: 0
    }
  },
  computed: {
    ...mapState('ModelStore', ['modelState'])
  },
  watch: {
    modelState (val) {
      this.modelStateShow = val
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.module-wrap {
  @include size(100%, 100%);
  min-width: 1024px;
  min-height: 500px;
  position: relative;
}
.moduelTitle {
  @include size(100%, 70px);
}
.modellistFrame,.modelFactorFrame,.ModelRelieveMeasuresFrame {
  width: 100%;
  height:calc(100% - 71px);
}
@media only screen and (max-width: 1366px) {
  .modellistFrame,.modelFactorFrame,.ModelRelieveMeasuresFrame {
    width: 100%;
    height:calc(100% - 71px);
  }
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
  .modelFactorFrame {
    height: 86%;
    width: 100%;
  }
  .ModelRelieveMeasuresFrame {
    @include size(100%, 86%);
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1930px){
  .modellistFrame,.modelFactorFrame,.ModelRelieveMeasuresFrame {
    width: 100%;
    height:calc(100% - 141px);
  }
}
@media only screen and (min-width: 1931px) and (max-width: 2560px) {
  .modelFactorFrame {
    height: 93%;
    width: 100%;
  }
  .ModelRelieveMeasuresFrame {
    @include size(100%, 93%);
  }
}
@media only screen and (min-width: 2561px) {
  .modelFactorFrame {
    height: 93%;
    width: 100%;
  }
  .ModelRelieveMeasuresFrame {
    @include size(100%, 93%);
  }
}
</style>
