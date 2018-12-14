<template>
  <Echarts :options="newOption"
           ref="riskFactorsForRanking"
           class="riskFactorsForRanking"></Echarts>
</template>
<script>
import Echarts from 'vue-echarts'
export default {
  name: 'riskFactorsForRanking',
  props: ['data'],
  components: {
    Echarts
  },
  data () {
    return {
      backgroundColor: 'rgb(243,243,243)',
      color: ['#fff', '#FFDC00', '#FF7300', '#FF0000'],
      setOption: {
        grid: {
          left: '15%',
          top: '5%',
          bottom: '5%',
          right: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        yAxis: [
          {
            type: 'category',
            data: [],
            axisPointer: {
              type: 'shadow'
            },
            splitLine: { show: false },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              align: 'left',
              padding: [0, 0, 0, -80],
              margin: 40,
              formatter: function (item) {
                return item
              },

              color: '#fff'
            }
          }
        ],
        xAxis: [
          {
            type: 'value',
            min: 0,
            axisLabel: {
              formatter: '{value} ',
              color: '#333'
            },
            splitLine: { show: false },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#555'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '实际值',
            type: 'bar',
            barCategoryGap: '25%',
            label: {
              show: true,
              position: 'right',
              color: 'red'
            },
            barWidth: 30,
            itemStyle: {
              normal: {
                // color: function (item) {
                //   console.log(item)
                //   if (data1[item.dataIndex] > data2[item.dataIndex]) {
                //     return 'rgb(255,0,0)'
                //   } else {
                //     return 'rgb(52,212,65)'
                //   }
                // }
              }
            },
            xAxisIndex: 0,
            data: []
          }
        ]
      }
    }
  },
  computed: {
    newOption () {
      const option = this.setOption
      // const data1 = [5, 15, 8, 12, 25, 35, 13]
      option.series[0].data = this.data.map(o => o.value)
      option.yAxis[0].data = this.data.map(o => o.name)
      // const riskFactorsForRanking1 = this.$refs.riskFactorsForRanking1
      // this.echartsResize(riskFactorsForRanking1)
      return option
    }
  },
  methods: {
    // init () {
    //   const self = this
    //   setTimeout(() => {
    //     window.addEventListener('resize', () => {
    //       self.$refs.riskFactorsForRanking1.resize()
    //     })
    //   }, 20)
    // }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.$refs.riskFactorsForRanking &&
          this.$refs.riskFactorsForRanking.resize()
      })
    })
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
.riskFactorsForRanking {
  width: 100%;
  height: 100%;
}
</style>
