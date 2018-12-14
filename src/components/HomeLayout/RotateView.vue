<template>
    <div class="rotateBox">
        <div>
            <el-button size="small" type="primary" @click="zoom">缩小</el-button>
        </div>
        <div class="rotateBox_second" ref="second">

        </div>
        <div class="rotateBox_content" ref="content">
            <ul class="rotateBox_content_main">
                <li :class="index===firstIndex?'active':''" v-for="(item,index) in StairList" :key="index" @click="click(index)">{{item.name}}</li>
            </ul>
        </div>
        <div class="rotateBox_center">
            10
        </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      StairList: [{
        id: 1,
        name: '跑道入侵'
      }, {
        id: 2,
        name: '信息安全'
      }, {
        id: 3,
        name: '航空器类'
      }, {
        id: 4,
        name: '其他类'
      }, {
        id: 5,
        name: '空防反恐'
      }, {
        id: 6,
        name: '应急救援'
      }, {
        id: 7,
        name: '消防类'
      }, {
        id: 8,
        name: '人伤类'
      }],
      firstIndex: 0
    }
  },
  methods: {
    click (index) {
      this.firstIndex = index
    //   let _i = this.nextIndex
    //   //   let num = index
    //   if (_i < index && index < 4) {
    //     _i = -index
    //   } else {
    //     _i++
    //   }
    //   this.$refs.content.style.transform = `rotate(${_i * 45}deg)`
    //   this.nextIndex = index
    //   for (let k = 0; k < 8; k++) {
    //     this.$refs.content.getElementsByTagName('ul')[0].getElementsByTagName('li')[k].style.transform = `rotate(${index * 45}deg)`
    //   }
    },
    zoom () {
      this.$refs.content.style.transform = `scale(0.9)`
    }
  }
}
</script>

<style lang="scss" scoped>
.rotateBox{
    position: relative;
    left: 300px;
    width: 386px;
    height: 621px;
    background: url('../../assets/images/bj-2.png') no-repeat;
    &_second{
        position: absolute;
        border: 1px solid red;
        width: 600px;
        height: 600px;
    }
    &_content{
        position: absolute;
        bottom: 0px;
        width: 386px;
        height: 386px;
        transition: 1s;
        // border-radius: 100%;
        &_main{
            position: relative;
            height: 100%;
            li{
                display: inline-block;
                position: absolute;
                width: 86px;
                height: 86px;
                line-height: 86px;
                text-align: center;
                color: #fff;
                font-size: 16px;
                border: 2px solid royalblue;
                border-radius: 50%;
                box-sizing: border-box;
                cursor: pointer;
                box-shadow:0 0 10px royalblue;
                transition: 0.3s;
            }
            li:nth-child(1){
                top: -20px;
                left: 150px;
            }
            li:nth-child(2){
                top: 25px;
                right: 25px;
            }
            li:nth-child(3){
                top: 150px;
                right: -20px;
            }
            li:nth-child(4){
                right:  25px;
                bottom: 25px;
            }
            li:nth-child(5){
                right:  150px;
                bottom: -20px;
            }
            li:nth-child(6){
                left:  25px;
                bottom: 25px;
            }
            li:nth-child(7){
                left: -20px;
                top: 150px;
            }
            li:nth-child(8){
                left: 25px;
                top: 25px;
            }
            .active{
                background-color: #ff0000;
                border: none;
                box-shadow:0 0 20px #ff0000;
            }
        }
    }
    &_center{
        position: absolute;
        width: 141px;
        height: 141px;
        line-height: 141px;
        left: 120px;
        bottom: 120px;
        text-align: center;
        color: #fff;
        border: 3px solid red;
        border-radius: 100%;
        font-size: 70px;
    }
}
</style>
