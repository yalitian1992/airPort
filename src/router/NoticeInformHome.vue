<template>
  <transition appear
              name="fade"
              mode="out-in">
    <notice-inform-layout>
      <notice-title slot="noticeTitle"></notice-title>
      <notice-info slot="noticeInfo"></notice-info>
      <safe-event slot="safeEvent"></safe-event>
    </notice-inform-layout>
  </transition>
</template>
<script>
import NoticeInformLayout from '../components/NoticeInformLayout.vue'
import NoticeTitle from '../modules/noticeInfo/noticeTitle/noticeTitle.vue'
import NoticeInfo from '../modules/noticeInfo/noticeInfo/noticeInformLayout.vue'
import SafeEvent from '../modules/noticeInfo/safeEvent/safeEventList.vue'
export default {
  components: {
    NoticeInformLayout,
    NoticeTitle,
    NoticeInfo,
    SafeEvent
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
