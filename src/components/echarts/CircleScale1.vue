<template>
    <div class="normal1">
        <Echarts :options="newOption" ref="CircleScale1"></Echarts>
    </div>
</template>
<script>
import Echarts from 'vue-echarts'
export default {
  components: {
    Echarts
  },
  props: ['valueData', 'color1', 'color2', 'textSize'],
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
  computed: {
    newOption () {
      const option = this.Options
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
      return option
    }
  },
  watch: {
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
  mounted () {
    const that = this
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.$refs.CircleScale1 && this.$refs.CircleScale1.resize()
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      })
    })
  }
}
</script>
<style lang="scss" scoped>
.normal1{
    width: 100%;
    height: 100%;
    .echarts{
        width: 100%;
        height: 100%;
    }
}
</style>
