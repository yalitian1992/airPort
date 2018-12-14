<template>
  <div v-bind:class="{shade:vShow}" v-show="vShow">
    <div class="content" v-drag>
      <div class="content-body">
        <div><label>菜单名称：</label><el-input></el-input></div>
        <div><label>菜单描述：</label><el-input></el-input></div>
      </div>
      <div class="footer">
        <div @click="cancel()">取消</div>
        <div @click="sure()">确认</div>
      </div>
      </div>

  </div>
</template>

<script>
import ElPager from 'element-ui/packages/pagination/src/pager'
export default {
  name: 'Panel_AE_Menu',
  components: {ElPager},
  data () {
    return {
      vShow: false,
      colors: [{
        text: 'Aquamarine'
      }, {
        text: 'Hotpink'
      }, {
        text: 'Gold'
      }, {
        text: 'Crimson'
      }, {
        text: 'Blueviolet'
      }, {
        text: 'Lightblue'
      }, {
        text: 'Cornflowerblue'
      }, {
        text: 'Skyblue'
      }, {
        text: 'Burlywood'
      }]
    }
  },
  methods: {
    show () {
      this.vShow = true
    }
  }

}
</script>

<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .shade{
    position:fixed;
    _position:absolute;
    width:100%;
    height:100%;
    left:0;
    top:0;
    background: rgba(0,0,0,0.2);
    z-index:30;
  }
.content{
  background: #0F1838;
  top:30%;
  left:30%;
  width: 50%;
  height: 40%;
  opacity: 0.9;
  .content-body{
    padding:10px;
    min-height: 100%;
    div{
      margin:2.5px;
      .el-input{
        width:250px;
      }
    }
  }
  .footer {
    padding: 10px;
    border-top:1px solid blue;
    margin-top: -50px;
    height: 50px;
    background-color:#0F1838;
    z-index: 9999;
    vertical-align: middle;
    div{
      text-align: center;
      vertical-align: middle;
      &:nth-child(1){
        @include size(56px,30px);
        background:#0096ff;
        border-radius: 4px;
        cursor: pointer;
        float: right;
      }
      &:nth-child(2){
        @include size(56px,30px);
        background: #c2c3c4;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin-right:10px;
        // background:pink;
      }
    }
  }

}
</style>
