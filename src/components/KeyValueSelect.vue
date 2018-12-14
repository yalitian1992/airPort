<template>
  <div class="selectx" :style="{width:width}" v-if="data[num]">
    <div class="arrow" :class='{rotate:show}'></div>
    <div class="value" @click='show=!show'>
      <div :title="data[num].label">{{data[num].label}}</div>
      </div>
    <div class="list" v-if='show' @mouseleave="closeList">
      <div v-for='(item,index) in data' @click='change(item,index)' :key='index' :title="item.label">{{item.label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data', 'width'],
  data () {
    return {
      show: false,
      num: 0
    }
  },
  methods: {
    change (item, index) {
      this.show = !this.show
      this.num = index
      this.$emit('up', item.value)
      this.$emit('select', item)
    },
    closeList () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
.selectx {
  // color: #b5b5b5;
  color:#cecece;
  height: 42px;
  box-sizing: border-box;
  background: rgba(255,255,255,0.1);
  // border: 1px solid #81d9e5;
  cursor: pointer;
  text-indent: 10px;
  position: relative;
  .arrow {
    width: 15px;
    height: 8px;
    background: url("../assets/images/select_arrow.png") no-repeat;
    position: absolute;
    top: 18px;
    right: 10px;
    pointer-events: none;
  }
  .rotate {
    transform: rotate(180deg);
    transition: transform 0.3s linear;
  }
  .value {
    div{
      width: calc(100% - 30px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      // line-height: 42px;
      color:#818181;
    }
  }
  .list {
    width: 100%;
    max-height: 125px;
    overflow: hidden;
    overflow-y: scroll;
    // border: 1px solid #81d9e5;
    border-top: 0px;
    background: #000000;
    position: relative;
    top: 2px;
    left: -1px;
    z-index: 1001;
    padding-bottom: 5px;
    div {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      line-height:30px;
    }
  }
  .list::-webkit-scrollbar {
    display: none;
  }
  .list div:hover {
    background: rgba(129, 217, 229, 0.3);
  }
}
@media  only screen  and (max-width: 1366px){
  .selectx {
    height: 30px;
    .arrow {
      top: 12px;
    }
    .value {
      div{
        line-height: 30px;
      }
    }
  }
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {}
@media only screen and (min-width: 1401px) and (max-width: 1920px) {}
@media only screen and (min-width: 1921px){}
</style>
