<template>
  <div id="box" style="width: 100%;position: relative;">
    <ul class="ul" >
     <slot></slot>
    </ul>
    <div class="more" v-show="more" @click="showMoreList=!showMoreList" style="height: 100%;" :style="{right:moreToRight}"><span onselectstart="return false">更多<i :class="{'down-arrow':!showMoreList,'up-arrow':showMoreList}"></i></span> <i style="height: 100%;width: 0px;display:inline-block;vertical-align: middle;"></i></div>
    <ul class="ov" v-show="showMoreList"></ul>
  </div>
</template>

<script>
export default {
  name: 'searchBox',
  data () {
    return {
      more: false,
      moreToRight: '0px',
      showMoreList: false,
      wOrigionReSize: null
    }
  },
  methods: {
    addEventOnResize (fn) {
      var originFn = window.onresize
      this.wOrigionReSize = originFn
      window.onresize = function () {
        originFn && originFn()
        fn()
      }
    }
  },
  mounted () {
    let _this = this
    this.addEventOnResize(function () {
      let shuUl = []
      if (document.querySelector('.ov').children !== undefined || document.querySelector('.ov').children !== null) {
        shuUl = document.querySelector('.ov').children
      }
      let uc = document.querySelector('.ul').children
      let overDom = []
      let boxW = document.querySelector('#box').offsetWidth
      let sw = 75
      let screenBigger = true
      if (shuUl.length > 0) {
        _this.more = true
      }
      for (let i = 0; i < uc.length; i++) {
        sw += uc[i].offsetWidth
        if (_this.more) {
          if (boxW - sw < 0) {
            screenBigger = false
            _this.more = true
            sw -= uc[i].offsetWidth
            overDom.push(uc[i].parentNode.removeChild(uc[i]))
            i = i - 1
          }
        } else {
          if (boxW - sw < 0) {
            if (boxW - sw + 60 > 0) { screenBigger = true } else {
              screenBigger = false
              _this.more = true
              sw -= uc[i].offsetWidth
              overDom.push(uc[i].parentNode.removeChild(uc[i]))
              i = i - 1
            }
          }
        }
      }
      if (screenBigger) {
        if (shuUl.length > 0) {
          if (boxW - sw - shuUl[0].offsetWidth + 75 >= 0) {
            document.querySelector('.ul').appendChild(shuUl[0].parentNode.removeChild(shuUl[0]))
            _this.more = false
            window.onresize()
          }
        } else {
          _this.more = false
          _this.showMoreList = false
        }
      } else {
        if (document.querySelector('.ov').children.length > 0) {
          for (let j = 0; j < overDom.length; j++) {
            document.querySelector('.ov').insertBefore(overDom[j], document.querySelector('.ov').children[j])
          }
        } else {
          for (let j = 0; j < overDom.length; j++) {
            document.querySelector('.ov').appendChild(overDom[j])
          }
        }
      }
    })
    window.onresize()
    window.onresize()
  },
  destroyed () {
    window.onresize = this.wOrigionReSize
  }
}

</script>

<style >
  .ul{
    list-style: none;
    margin: 0 !important;
    padding: 0 !important;;
    word-spacing: -0.3em;
    display: inline-block;
    vertical-align: middle;
    /*background: #333;*/
  }
  .ul li{
    color:white;
/*
    background: #333;
*/
    display: inline-block;
    box-sizing: border-box;
    padding: 5px;
    margin: 0 !important;
    word-spacing: 0;
  }
  .ov{
    background: #1b2959;
    position: absolute;
    margin: 5px;
    right: 0;
    padding: 5px;
    z-index: 100;
    box-shadow: 0px 0px 11px 3px #574caf;
    text-align: right;
  }
  .ov li{
    display: block;
    margin-bottom: 5px;

  }
  .more{
    display: inline-block;
    vertical-align: middle;
    color:white;
    cursor: pointer;
  }
  label{width: 4em;}
  .down-arrow{
    position: relative;
    display: inline-block;
    width: calc(1em + 2px);
    height: 12px;
    font-size: 14px;
  }
  /*.down-arrow:before{*/
    /*content: "";*/
    /*position: absolute;*/
    /*left: 0.33em;*/
    /*top:0.354em;*/
    /*height: 0.1em;*/
    /*width: 1em;*/
    /*background: white;*/
    /*transform: rotate(-45deg);*/
  /*}*/
  /*.down-arrow:after{*/
    /*content: "";*/
    /*position: absolute;*/
    /*top:0.354em;*/
    /*left: -0.33em;*/
    /*height: 0.1em;*/
    /*width: 1em;*/
    /*background: white;*/
    /*transform: rotate(45deg);*/
  /*}*/
  .up-arrow{
    position: relative;
    display: inline-block;
    width: calc(1em + 2px);
    height: 12px;
    font-size: 14px;
  }
  .down-arrow:before,.up-arrow:before{
    content: "";
    display: block;
    position: absolute;
    left: 0.4em;
    top: 0.1em;
    height: 0.8em;
    width: 0.8em;
  }
  .down-arrow:before{
    background: url('../../assets/images/dow-1.png') center/contain no-repeat;
  }
  .up-arrow:before{
    background: url('../../assets/images/up-1.png') center/contain no-repeat;
  }
  /*.up-arrow:before{*/
    /*content: "";*/
    /*position: absolute;*/
    /*left: -0.33em;*/
    /*top:0.353em;*/
    /*height: 0.1em;*/
    /*width: 1em;*/
    /*background: white;*/
    /*transform: rotate(-45deg);*/
  /*}*/
  /*.up-arrow:after{*/
    /*content: "";*/
    /*position: absolute;*/
    /*top:0.353em;*/
    /*left: 0.33em;*/
    /*height: 0.1em;*/
    /*width: 1em;*/
    /*background: white;*/
    /*transform: rotate(45deg);*/
  /*}*/
</style>
