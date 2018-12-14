<template>
  <!--<div style="width: 100%;height: 100%;overflow: auto;">-->
    <div style="width: 100%;height: 100%;">
  <div class="system-wrap clearfix">
    <!-- 头部 -->
    <div class="systemTitleFrame">
      <slot name="systemTitle"></slot>
    </div>
    <!-- 菜单管理
    <div class="menuManageFrame" v-if="systemState === 0">
      <slot name="menuManage"></slot>
    </div>-->
    <!-- 角色管理 -->
    <div class="roleManageFrame" v-if="systemStateShow === 1">
      <slot name="roleManage"></slot>
    </div>
    <!-- 用户管理 -->
    <div class="userManageFrame" v-if="systemStateShow === 2">
      <slot name="userManage"></slot>
    </div>
    <!-- 部门结构管理 -->
    <div class="depManageFrame" v-if="systemStateShow === 3">
      <slot name="depManage"></slot>
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
      systemStateShow: 1
    }
  },
  computed: {
    ...mapState('systemStore', ['systemState'])
  },
  watch: {
    systemState (val) {
      this.systemStateShow = val
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.system-wrap {
  @include size(100%, 100%);
  min-width:1024px ;
  min-height: 550px;
  overflow: hidden;
  position: relative;
}
.systemTitleFrame {
  @include size(100%, 70px);
}
.menuManageFrame,.roleManageFrame,.userManageFrame,.depManageFrame {
  width: 100%;
  height:91%;
}
@media only screen and (max-width: 1366px) {
  .menuManageFrame,.roleManageFrame,.userManageFrame,.depManageFrame {
    height: 93%;
    width: 100%;
  }
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
  .menuManageFrame,.roleManageFrame,.userManageFrame,.depManageFrame {
    height: 91%;
    width: 100%;
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .menuManageFrame,.roleManageFrame,.userManageFrame,.depManageFrame {
    height: 93%;
    width: 100%;
  }
}
@media only screen and (min-width: 1921px) {
  .menuManageFrame,.roleManageFrame,.userManageFrame,.depManageFrame {
    height: 93%;
    width: 100%;
  }
  .systemTitleFrame {
    @include size(100%, 130px);
  }
}
</style>
