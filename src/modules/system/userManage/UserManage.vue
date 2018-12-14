<template>
    <div class="userManage">
    </div>
</template>

<script>
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
@media  only screen  and (max-width: 1376px){
  .userManage{
    height: 100%;
    background: url('../../../assets/images/system3.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 100%;
  }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .userManage{
    height: 100%;
    background: url('../../../assets/images/system3.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 95%;
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .userManage{
    height: 100%;
    background: url('../../../assets/images/system3.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 100%;
  }
}
@media only screen  and (min-width: 1931px){
  .userManage{
    height: 100%;
    background: url('../../../assets/images/system3.png') no-repeat;
    width: 98%;
    margin:0 auto;
    background-size: 100% 90%;
    background-position-y: 50px;
  }
}
</style>
