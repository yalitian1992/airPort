<template>
  <Echarts :options="newOption"
           ref="riskbuttomEachers"
           class="riskbuttomEachers"
           @click="click"
  ></Echarts>
</template>
<script>
/*eslint-disable */
import Echarts from 'vue-echarts'
export default {
  name: 'lineBar',
  props: ['riskButtonData', 'state'],
  components: {
    Echarts
  },
  data () {
    return {
      color: ['#0096FF', '#FFDC00', '#FF7300', '#FF0000'],
      setOption: {
        grid: {
          left: '0%',
          right: '0%',
          bottom: '6%',
          top: '12%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          position: function (point, params, dom, rect, size) {

            //其中point为当前鼠标的位置，size中有两个属性：viewSize和contentSize，分别为外层div和tooltip提示框的大小
            var x = point[0];//
            var boxWidth = size.contentSize[0];
            // var y = point[1];
            // var viewWidth = size.viewSize[0];
            // var posX = 0;//x坐标位置
            if (x > 630) {
              point[0] = x - boxWidth
            }

            // 固定在顶部
            return [point[0], '-30%', point[1], '-55%']
          },
          axisPointer: {
            lineStyle: {
              type: 'dashed',
              //   type: 'cross',
              color: 'rgba(255,255,255,1)'
            }
          },
          textStyle: {
            fontSize: 18
          },
          backgroundColor: 'rgba(0,231,249,0.3)',
          borderColor: 'rgba(0,231,249,1)',
          borderWidth: 1,
          extraCssText: 'box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);',
          formatter: `<div class="activeColor" style="padding:5px;box-sizing:border-box;">{b}   {c}</div>`
        },
        xAxis: [
          {
            type: 'category',
            position: 'bottom',
            boundaryGap: true,
            data: [],
            axisLabel: {
              show: true,
              fontSize: 14,
              interval: 3,
              textStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            show: true,
            type: 'value',
            min: 0,
            max: 10,
            interval: 2,
            lineStyle: {
              color: '#fff',
              width: 1
            },
            itemStyle: {
              show: false,
              normal: {
                lineStyle: {
                  color: '#fff',
                  width: 1
                }
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
                fontSize: 12
              }
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              fontSize: 14,
              textStyle: {
                color: '#fff'
              }
            }
          }
        ],
        series: [
          {
            type: 'line',
            data: [],
            lineStyle: {
              color: '#fff',
              width: 1
            },
            symbol: 'circle',
            symbolSize: '10'
          }
        ]
      },
      screenWidth: document.body.clientWidth
    }
  },
  computed: {
    newOption () {
      const option = this.setOption
      option.series[0].data = this.riskButtonData && this.riskButtonData.map((e, index) => {
        return {
          value: e.value,
          itemStyle: {
            normal: {
              color:
                e.value > 0 && e.value <= 3
                  ? this.color[0]
                  : e.value > 3 && e.value <= 6
                    ? this.color[1]
                    : e.value > 6 && e.value <= 9
                      ? this.color[2]
                      : e.value > 9 && e.value <= 10 ? this.color[3] : ''
            }
          },
          DIY:e
        }
      })
      option.xAxis[0].data = this.riskButtonData && this.riskButtonData.map(e => {
        return e.name
      })
      if (this.state === 1) {
        option.xAxis[0].axisLabel.interval = this.state
      }
      if (this.state === 3) {
        option.xAxis[0].axisLabel.interval = this.state
      }
      if (this.screenWidth <= 1376) {
        option.xAxis[0].axisLabel.textStyle.fontSize = 12
        option.yAxis[0].axisLabel.textStyle.fontSize = 12
      }
      if (this.screenWidth > 1376 && this.screenWidth <= 1410) {
        option.xAxis[0].axisLabel.textStyle.fontSize = 13
        option.yAxis[0].axisLabel.textStyle.fontSize = 13
      }
      if (this.screenWidth > 1410 && this.screenWidth <= 1930) {
        option.xAxis[0].axisLabel.textStyle.fontSize = 14
        option.yAxis[0].axisLabel.textStyle.fontSize = 14
      }
      if (this.screenWidth > 1931) {
        option.xAxis[0].axisLabel.textStyle.fontSize = 26
        option.yAxis[0].axisLabel.textStyle.fontSize = 26
      }
      return option
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log()
    },
    click(para){
      this.$emit('click', para)
    }
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.$refs.riskbuttomEachers && this.$refs.riskbuttomEachers.resize()
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })
    })
  },
  watch: {
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          // that.screenWidth = that.$store.state.canvasWidth
          // console.log(that.screenWidth)
          // that.init()
          that.timer = false
        }, 400)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.riskbuttomEachers {
  width: 100%;
  height: 100%;
}
@media only screen and (max-width: 1366px) {
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
}
@media only screen and (min-width: 1401px) and (max-width: 1920px) {
}
@media only screen and (min-width: 1921px) and (max-width: 2560px) {
}
@media only screen and (min-width: 2561px) {
}
.activeColor {
  background: url("../../assets/images/zx-bj.png") no-repeat center center;
  background-size: 81px 68px;
}
</style>
