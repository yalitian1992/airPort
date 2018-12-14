<template>
    <div class="rotate_title">
        <div :class="{Titlebj:TitleKey === 1}" @click="selectTitle(1)">角色管理</div>
        <div :class="{Titlebj:TitleKey === 2}" @click="selectTitle(2)">用户管理</div>
        <div :class="{Titlebj:TitleKey === 3}" @click="selectTitle(3)">风险组织结构管理</div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      TitleKey: 1
    }
  },
  computed: {
    ...mapState('systemStore', ['systemState'])
  },
  methods: {
    ...mapMutations('systemStore', ['setSystemState']),
    selectTitle (item) {
      this.layer.closeAll()
      this.TitleKey = item
      this.setSystemState(item)
    }
  },
  watch: {
    systemState (val) {
      this.TitleKey = val
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.rotate_title{
    @include size(355px,100%);
    box-sizing:border-box;
    padding-top:20px;
    padding-left:20px;
    text-align: center;
    line-height:30px;
    color:#fff;
    font-size: 12px;
    div{
        cursor: pointer;
        @include size(100px,30px);
        float: left;
        background: url('../../../assets/images/title-bj3.png') no-repeat center center;
        background-size: 100% 100%;
    }
    div:hover{
        background: url('../../../assets/images/bj-title-hover.png') no-repeat center center;
        background-size: 100% 100%;
    }
}
.Titlebj{
    background: url('../../../assets/images/title-bj2.png') no-repeat center center!important;
    background-size: 100% 100%!important;
}
@media  only screen  and (max-width: 1376px){
    .rotate_title{
        @include size(355px,100%);
        line-height:30px;
        font-size: 12px;
        div{
            @include size(105px,30px);
        }
    }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
    .rotate_title{
        @include size(455px,100%);
        line-height:35px;
        font-size: 14px;
        div{
            @include size(130px,35px);
        }
    }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
    .rotate_title{
        @include size(555px,100%);
        line-height:40px;
        font-size: 16px;
        div{
            @include size(150px,40px);
        }
    }
}
@media only screen  and (min-width: 1931px) {
    .rotate_title{
        @include size(100%,100%);
        line-height:65px;
        font-size: 26px;
        padding-top:30px;
        padding-left:70px;
        div{
            @include size(220px,65px);
        }
    }
}
</style>
