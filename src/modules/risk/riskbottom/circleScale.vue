<template>
    <div style="width: 100%;height: 100%;margin: 0;padding: 0;box-sizing:border-box;" :id="id">

    </div>
</template>

<script>
import EchartHelpers from '../../../util/eacharts'

export default {
  name: 'circleScale',
  props: ['valueData', 'color1', 'color2', 'textSize'],

  data: function () {
    return {
      id: '',
      myChart: null,
      Options: {
        title: {
          text: this.valueData + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: 24
          }
        },
        // color: ['#ffb400'],
        series: [
          {
            name: '',
            type: 'pie',
            clockWise: true,
            radius: ['90%', '100%'],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: this.valueData,
                name: '01',
                itemStyle: {
                  normal: {
                    color: this.color1,
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    }
                  }
                }
              },
              {
                name: '02',
                value: 100 - this.valueData,
                itemStyle: {
                  normal: {
                    color: this.color2
                  }
                }
              }
            ]
          }
        ]
      },
      screenWidth: document.body.clientWidth
    }
  },
  created () {
    this.id = this.guid()
  },
  methods: {
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    },
    setCharts () {
      let option = this.Options
      option.title.text = this.valueData + '%'
      option.series[0].data[0].value = this.valueData
      option.series[0].data[1].value = 100 - this.valueData
      if (this.screenWidth <= 1366) {
        option.title.textStyle.fontSize = 16
        if (this.textSize === 1) {
          option.title.textStyle.fontSize = 30
        }
      }
      if (this.screenWidth > 1366 && this.screenWidth <= 1400) {
        option.title.textStyle.fontSize = 18
        if (this.textSize === 1) {
          option.title.textStyle.fontSize = 30
        }
      }
      if (this.screenWidth > 1400 && this.screenWidth <= 1930) {
        option.title.textStyle.fontSize = 18
        if (this.textSize === 1) {
          option.title.textStyle.fontSize = 40
        }
      }
      if (this.screenWidth > 1931) {
        option.title.textStyle.fontSize = 32
        if (this.textSize === 1) {
          option.title.textStyle.fontSize = 60
        }
      }
      // 绘制图表
      this.myChart.setOption(option, true)
    }
  },
  mounted () {
    let _this = this
    var echartHelper = new EchartHelpers()
    if (this.myChart === null) {
      echartHelper.resize = function () {
        _this.setCharts()
      }
      _this.myChart = echartHelper.getMychartById(this.id)
      _this.setCharts()
    }
    _this.setCharts()
  },
  updated () {
    window.onresize()
  }
}
</script>

<style scoped>

</style>
