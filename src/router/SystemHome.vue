<template>
  <transition appear
              name="fade"
              class="tranBox"
              mode="out-in">
    <system-layout>
      <!-- 头部 -->
      <system-title slot="systemTitle"></system-title>
      <!-- 菜单管理 -->
      <!--<menu-manage slot="menuManage"></menu-manage>-->
      <!-- 角色管理 -->
      <role-manage slot="roleManage"></role-manage>
      <!-- 用户管理 -->
      <user-manage slot="userManage"></user-manage>
      <!-- 部门管理 -->
      <dep-manage slot="depManage"></dep-manage>
    </system-layout>
  </transition>
</template>
<script>
import SystemLayout from '../components/SystemLayout'
import SystemTitle from '../modules/system/systemTitle/SystemTitle'
import MenuManage from '../modules/system/systemMenu/SystemMenu'
import RoleManage from '../modules/system/systemRole/SystemRole'
import UserManage from '../modules/system/systemUser/SystemUser'
import depManage from '../modules/system/departMentsManage/depManage'
export default {
  components: {
    SystemLayout,
    SystemTitle,
    MenuManage,
    RoleManage,
    UserManage,
    depManage
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
  .tranBox{
    min-width: 860px;
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
