<template>
  <div class="rotate_title">
    <div :class="{Titlebj: Titlebj === 1}" @click="selectF(1)">通知信息</div>
    <div :class="{Titlebj: Titlebj === 2}" @click="selectF(2)">安全事件提醒</div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      Titlebj: 1
    }
  },
  computed: {
    ...mapState('noticeStore', ['noticeState'])
  },
  methods: {
    ...mapMutations('noticeStore', ['setNoticeState']),
    selectF (tab) {
      this.Titlebj = tab
      this.setNoticeState(tab)
    }
  },
  mounted () {
    this.selectF(1)
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
    margin-bottom: 1.4em;
    overflow: hidden;
    box-sizing:border-box;
    padding-top:20px;
    padding-left:20px;
    text-align: center;
    line-height:30px;
    color:#fff;
    font-size: 12px;
    div{
      float: left;
      width: 150px;
      height: 40px;
      /*line-height: 40px;*/
      cursor: pointer;
      text-align: center;
      background: url('../../../assets/images/title-bj3.png') no-repeat center center;
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
