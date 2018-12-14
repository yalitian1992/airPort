<template>
  <transition appear
              name="fade"
              mode="out-in">
    <account-layout>
    </account-layout>
  </transition>
</template>
<script>
import AccountLayout from '../components/AccountLayout.vue'
export default {
  components: {
    AccountLayout
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
*{
  color:#fff;
}
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
