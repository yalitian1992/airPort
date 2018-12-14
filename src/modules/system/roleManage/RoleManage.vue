<template>
    <div class="roleManage">

    </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      TitleKey: 0
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media  only screen  and (max-width: 1366px){
  .roleManage{
    height: 100%;
    background: url('../../../assets/images/system2.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 95%;
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .roleManage{
    height: 100%;
    background: url('../../../assets/images/system2.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 95%;
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .roleManage{
    height: 100%;
    background: url('../../../assets/images/system2.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 100%;
  }
}
@media only screen  and (min-width: 1921px){
  .roleManage{
    height: 90%;
    background: url('../../../assets/images/system2.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 97%;
    background-position-y: 50px;
  }
}
</style>
