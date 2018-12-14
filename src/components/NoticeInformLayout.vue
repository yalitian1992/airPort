<template>
  <div style="width: 100%;height: 100%;">
    <div class="notice-wrap">
      <div class="noticeTitleFrame">
        <slot name="noticeTitle"></slot>
      </div>
      <div class="noticeInfoFrame" v-if="noticeStateShow === 1">
        <slot name="noticeInfo"></slot>
      </div>
      <div class="safeEventFrame" v-if="noticeStateShow === 2">
        <slot name="safeEvent"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      noticeStateShow: 1
    }
  },
  computed: {
    ...mapState('noticeStore', ['noticeState'])
  },
  watch: {
    noticeState (val) {
      this.noticeStateShow = val
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .notice-wrap{
    @include size(100%, 100%);
    min-width:1024px ;
    min-height: 550px;
    overflow: hidden;
    position: relative;
  }
  .noticeInfoFrame,.safeEventFrame {
    width: 100%;
    height:91%;
  }
  @media only screen and (max-width: 1366px) {
    .noticeInfoFrame,.safeEventFrame {
      height: 93%;
      width: 100%;
    }
  }
  @media only screen and (min-width: 1367px) and (max-width: 1400px) {
    .noticeInfoFrame,.safeEventFrame {
      height: 91%;
      width: 100%;
    }
  }
  @media only screen  and (min-width: 1401px) and (max-width: 1920px){
    .noticeInfoFrame,.safeEventFrame {
      height: 93%;
      width: 100%;
    }
  }
  @media only screen and (min-width: 1921px) {
    .noticeInfoFrame,.safeEventFrame {
      height: 93%;
      width: 100%;
    }
    /*.systemTitleFrame {
      @include size(100%, 130px);
    }*/
  }
</style>
