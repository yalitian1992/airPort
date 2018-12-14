<template>
    <div class="normal">
        <Echarts :options="Options" ref="CircleScale"></Echarts>
    </div>
</template>
<script>
import Echarts from 'vue-echarts'
export default {
  components: {
    Echarts
  },
  props: ['valueData', 'color'],
  data () {
    return {
      Options: {
        title: {
          text: this.valueData + '%',
          x: 'center',
          y: 'center',
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontSize: '20'
          }
        },
        color: ['rgba(176, 212, 251, 1)'],
        series: [{
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
          data: [{
            value: this.valueData,
            name: '01',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#008AFF' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#008AFF' // 100% 处的颜色
                  }]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '02',
            value: 100 - this.valueData,
            itemStyle: {
              normal: {
                color: 'rgba(-17,255,218,0.2)'
              }
            }
          }]
        }]
      },
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    valueData () {
      this.changeValue()
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        let that = this
        setTimeout(function () {
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {
    changeValue () {
      var val = this.valueData ? this.valueData : 0
      var data = []
      var max = 100
      for (var i = 1; i <= max; i++) {
        if (i <= val) {
          data[i] = {
            value: 20,
            itemStyle: {
              normal: {
                color: i % 2 === 1 ? this.color : 'rgba(0,0,0,0)'
              }
            }
          }
        } else if (val < i <= max) {
          data[i] = {
            value: 20,
            itemStyle: {
              normal: {
                color: i % 2 === 1 ? '#808080' : 'rgba(0,0,0,0)'
              }
            }
          }
        }
      }
      this.Options.title.text = this.valueData + '%'
      this.Options.series[0].data = data
      if (this.screenWidth <= 1366) {
        this.Options.title.textStyle.fontSize = 16
      }
      if (this.screenWidth > 1366 && this.screenWidth <= 1400) {
        this.Options.title.textStyle.fontSize = 18
      }
      if (this.screenWidth > 1400 && this.screenWidth <= 1930) {
        this.Options.title.textStyle.fontSize = 26
      }
      if (this.screenWidth > 1931) {
        this.Options.title.textStyle.fontSize = 32
      }
    },
    getDataURL (option) {
      return this.$refs.CircleScale.getDataURL(option)
    }
  },
  created () {
    this.changeValue()
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.$refs.CircleScale && this.$refs.CircleScale.resize()
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.normal{
    width: 100%;
    height: 100%;
    .echarts{
        width: 100%;
        height: 100%;
    }
}
</style>
