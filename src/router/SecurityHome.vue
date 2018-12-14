<template>
  <transition appear
              name="fade"
              mode="out-in">
    <security-layout class="BoxSelf">
      <!-- 模型头部 -->
      <security-title slot="securityTitle"></security-title>
      <!-- 部门统计 -->
      <department-statistics slot="departmentStatistics"></department-statistics>
      <!-- 统计分析 -->
      <statistical-analysis slot="statisticalAnalysis"></statistical-analysis>
    </security-layout>
  </transition>
</template>
<script>
import SecurityLayout from '../components/SecurityLayout.vue'
import SecurityTitle from '../modules/security/securityTitle/SecurityTitle.vue'
import DepartmentStatistics from '../modules/security/departmentStatistics/DepartmentStatistics.vue'
import StatisticalAnalysis from '../modules/security/statisticalAnalysis/StatisticalAnalysis.vue'

export default {
  components: {
    SecurityLayout,
    SecurityTitle,
    DepartmentStatistics,
    StatisticalAnalysis
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
@media only screen and (max-width: 1365.9px) {
  .BoxSelf{
    min-height: 380px;
   /* overflow: auto;*/
  }
}
</style>
