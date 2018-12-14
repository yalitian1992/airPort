<template>
  <transition appear
              name="fade"
              mode="out-in">
    <risk-layout>
      <!-- 标题切换 -->
      <risk-title slot="risktoptitle"></risk-title>
      <!-- 拓扑图 -->
      <risk-top slot="risktop"></risk-top>
      <!-- 折线图 -->
      <riskbottom slot="riskbottom"></riskbottom>
      <!-- 风险分布 -->
      <risk-distribution slot="riskdistribution"></risk-distribution>
      <!-- 风险因子排名 -->
      <risk-factor-rank slot="riskfactorrank"></risk-factor-rank>
    </risk-layout>
  </transition>
</template>
<script>
import RiskLayout from '../components/RiskLayout'
import riskTitle from '../modules/risk/riskTitle/riskTitle.vue'
import riskbottom from '../modules/risk/riskbottom/riskbottom'
import RiskDistribution from '../modules/risk/riskdistribution/RiskDistribution'
import RiskFactorRank from '../modules/risk/riskfactorrankings/RiskFactorRank'
import RiskTop from '../modules/risk/risktop/RiskTop'

export default {
  components: {
    RiskLayout,
    riskTitle,
    riskbottom,
    RiskDistribution,
    RiskFactorRank,
    RiskTop
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
