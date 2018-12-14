<template>
  <home-layout>
    <!-- 公共头部 -->
    <public-header slot="header"></public-header>
    <!-- 路由切换页面 -->
    <router-view slot="routerContent"></router-view>
  </home-layout>
</template>
<script>
import HomeLayout from '../components/HomeLayout'
import PublicHeader from '../components/Header.vue'
export default {
  name: 'application',
  components: {
    HomeLayout,
    PublicHeader
  },
  methods: {}
}
</script>
<style lang="scss" scoped>

</style>
