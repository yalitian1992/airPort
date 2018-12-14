<template>
  <transition appear
              name="fade"
              mode="out-in">
    <module-layout>
      <!-- 模型头部 -->
      <model-title slot="modeltitle"></model-title>
      <!-- 模型列表 -->
      <model-list slot="modellist"></model-list>
      <!-- 风险因子 -->
      <model-factor slot="modelFactor"></model-factor>
      <!-- 缓解措施 -->
      <model-relieve-measures slot="ModelRelieveMeasures"></model-relieve-measures>
    </module-layout>
  </transition>
</template>
<script>
import ModuleLayout from '../components/ModuleLayout.vue'
import ModelTitle from '../modules/Model/modelTitle/ModelTitle.vue'
import modelList from '../modules/Model/modelList/modelList.vue'
import ModelFactor from '../modules/Model/modelFactor/ModelFactor.vue'
import ModelRelieveMeasures from '../modules/Model/modelRelieveMeasures/ModelRelieveMeasures.vue'

export default {
  components: {
    ModuleLayout,
    ModelTitle,
    modelList,
    ModelFactor,
    ModelRelieveMeasures
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
/* 设置持续时间和动画函数 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.15s;
}
</style>
