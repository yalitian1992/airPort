<template>
  <transition appear
              name="fade"
              mode="out-in">
    <riskmap-layout></riskmap-layout>
  </transition>
</template>
<script>
import RiskmapLayout from '../components/RiskmapLayout.vue'

export default {
  components: {
    RiskmapLayout
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
