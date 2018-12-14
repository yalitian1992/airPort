<template>
  <Echarts :options="newOption"
           class="securtyline"
           ref="securityLines"
           @click="click"
           ></Echarts>
</template>

<script type="text/javascript">
import Echarts from 'vue-echarts'

export default {
  props: ['data', 'color', 'yaxisName', 'areaOpacity', 'dataZoom', 'xaxisName', 'state'],
  components: {
    Echarts
  },
  methods: {
    click (para) {
      this.$emit('click', para)
    }
  },
  computed: {
    newOption () {
      const option = this.chartOption
      const areaOpacity = this.areaOpacity
      option.color = this.color
      option.yAxis.name = this.yaxisName
      option.xAxis.name = this.xaxisName
      option.xAxis.data = this.data[0].data !== null ? this.data[0].data.map(item => item.name) : []
      option.series = this.data.map(item => ({
        name: item.name,
        type: 'line',
        // symbol: 'emptyCircle',
        smooth: false,
        // symbolSize: 1,
        areaStyle: {
          normal: {
            opacity: areaOpacity
          }
        },
        symbolSize: 1,
        data: item.data
      }))
      if (this.dataZoom === true) {
        option.dataZoom = [
          {
            // show: true,
            show: false,
            height: 10,
            xAxisIndex: [0],
            bottom: 4,
            start: 10,
            end: 50,
            backgroundColor: '#81d9e5',
            fillerColor: '#05d0eb',
            handleIcon:
              'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
            handleSize: '100%',
            handleStyle: {
              color: '#05d0eb'
            },
            textStyle: { color: 'rgba(0,0,0,0)' },
            borderColor: '#81d9e5'
          },
          {
            type: 'inside',
            show: false,
            // show: true,
            height: 15,
            start: 1,
            end: 35
          }
        ]
      }
      if (this.data.length > 1) {
        option.legend.data = this.data.map(item => ({
          name: item.name,
          icon: 'rect'
        }))
      }
      if (this.state === 1) {
        option.xAxis.axisLabel.interval = this.state
      }
      if (this.state === 3) {
        option.xAxis.axisLabel.interval = this.state
      }
      // 不同分辨率下echarts字体的大小
      if (this.screenWidth <= 1376) {
        option.xAxis.axisLabel.fontSize = 12
        option.yAxis.axisLabel.fontSize = 12
        option.xAxis.nameTextStyle.fontSize = 12
        option.yAxis.nameTextStyle.fontSize = 12
        option.grid.top = '23%'
      }
      if (this.screenWidth > 1376 && this.screenWidth <= 1410) {
        option.xAxis.axisLabel.fontSize = 14
        option.yAxis.axisLabel.fontSize = 14
        option.xAxis.nameTextStyle.fontSize = 14
        option.yAxis.nameTextStyle.fontSize = 14
      }
      if (this.screenWidth > 1410 && this.screenWidth <= 1930) {
        option.xAxis.axisLabel.fontSize = 18
        option.yAxis.axisLabel.fontSize = 18
        option.xAxis.nameTextStyle.fontSize = 18
        option.yAxis.nameTextStyle.fontSize = 18
      }
      if (this.screenWidth > 1931) {
        option.xAxis.axisLabel.fontSize = 26
        option.yAxis.axisLabel.fontSize = 26
        option.xAxis.nameTextStyle.fontSize = 26
        option.yAxis.nameTextStyle.fontSize = 26
        option.grid.right = '8%'
        option.grid.bottom = '8%'
        option.grid.top = '20%'
      }
      option.xAxis.data.push('')
      return option
    }
  },
  data () {
    return {
      /* eslint-disable */
      chartOption: {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(0,0,0,0)",
          axisPointer: {
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
            lineStyle: {
              // 直线指示器样式设置
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          formatter(params) {
            return (
              `${'<div class="lineDataZoomTooltip">' + '<p class="title">'}${
                params[0].name
              }</p >` +
              `<div class="itemsBorder clearfix"><div></div><div></div><div></div></div>${params
                .map(
                  item =>
                    `<div class="itemCon clearfix"><p class="${item.seriesName==='本期安全曲线'?'itembg':'itembg1'} fl"></p><p class="indexName fl">${
                      item.seriesName
                    }</p><p class="index fr">${Number(item.value)}</p ></div>`
                )
                .join(" ")}</div>`
            );
          }
        },
        legend: {
          show: false,
          type: "scroll",
          pageTextStyle: {
            color: "#fff"
          },
          width: 300,
          height: 8,
          itemWidth: 12,
          itemHeight: 2
          // icon: 'none',
        },
        grid: {
          left: "2%",
          right: "13%",
          top: '18%',
          bottom: '8%',
          containLabel: true
        },
        xAxis: {
          type: "category",
          // name: '月',
          nameTextStyle: {
            fontSize: 16,
            color: "#B5B5B5",
            padding:[0,0,-25,-5]
          },
          boundaryGap: false,
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            fontSize: 14,
            minInterval:1 // 坐标轴最小间隔大小
          },
          splitLine: {
            show: false
          },
          data: []
        },
        yAxis: {
          type: "value",
          min: 0,
          max: 10,
          interval: 2,
          nameTextStyle: {
            fontSize: 16,
            color: "#B5B5B5"
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            fontSize: 14
          },
          splitLine: {
            show: true,
            //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: ["rgba(255,255,255,0.2)"]
            }
          }
        },
        dataZoom: [],
        series: []
      },
      screenWidth: document.body.clientWidth
    };
  },
  mounted() {
    const that=this
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.$refs.securityLines&&this.$refs.securityLines.resize();
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      });
    });
  },
  destroyed(){
      window.removeEventListener("resize", () => {
        this.$refs.securityLines&&this.$refs.securityLines.resize();
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      });
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
  }
};
</script>

<style lang="scss">
.securtyline {
  width: 100% !important;
  height: 100% !important;
  // overflow: hidden;
}

// tooltip 样式
.lineDataZoomTooltip {
  min-width: 168px;
  min-height: 100px;
  padding: 10px;
  overflow: hidden;
  border: 2px solid rgba(5, 208, 235, 0.78);
  background: rgba(9, 10, 11, 0.9);
  color: #fff;
  font-size: 14px;
  line-height: 20px;

  // 间隔线
  .itemsBorder {
    width: 100%;
    height: 2px;
    margin-top: 10px;
    // background: orange;
    div:nth-child(odd) {
      width: 10px;
      height: 100%;
      overflow: hidden;
      float: left;
      background: #81d9e5;
    }
    div:nth-child(even) {
      width: calc(100% - 20px);
      height: 100%;
      overflow: hidden;
      float: left;
      background: rgba(129, 217, 229, 0.5);
    }
  }
  // 图表数据
  .itemCon {
    width: 100%;
    height: 20px;
    overflow: hidden;
    margin-top: 10px;
    .itembg {
      width: 6px;
      height: 6px;
      overflow: hidden;
      border-radius: 50%;
      margin-top: 7px;
      background: rgba(5, 208, 235, 1);
      float: left;
    }
    .itembg1 {
      width: 6px;
      height: 6px;
      overflow: hidden;
      border-radius: 50%;
      margin-top: 7px;
      background: rgba(193,130,55, 1);
      float: left;
    }
    .indexName {
      margin-left: 5px;
      float: left;
    }
    .index {
      float: right;
    }
  }
  .itemCon:nth-child(n + 4) {
    margin-top: 5px;
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .lineDataZoomTooltip {
    font-size: 16px;
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .lineDataZoomTooltip {
      min-width: 188px;
      padding: 20px;
      padding-bottom: 5px;
      overflow: hidden;
      border: 2px solid rgba(5, 208, 235, 0.78);
      background: rgba(9, 10, 11, 0.9);
      color: #fff;
      font-size: 16px;

      // 间隔线
      .itemsBorder {
        width: 100%;
        height: 2px;
        div:nth-child(odd) {
          width: 10px;
          height: 100%;
          overflow: hidden;
          float: left;
          background: #81d9e5;
        }
        div:nth-child(even) {
          width: calc(100% - 20px);
          height: 100%;
          overflow: hidden;
          float: left;
          background: rgba(129, 217, 229, 0.5);
        }
      }
      // 图表数据
      .itemCon {
        width: 100%;
        height: 30px;
        overflow: hidden;
        .itembg {
          width: 6px;
          height: 6px;
          overflow: hidden;
          border-radius: 50%;
          margin-top: 7px;
          background: rgba(5, 208, 235, 1);
          float: left;
        }
        .indexName {
          margin-left: 5px;
          float: left;
        }
        .index {
          float: right;
        }
      }
      .itemCon:nth-child(n + 4) {
        margin-top: 5px;
      }
    }
}
@media only screen  and (min-width: 1921px){
  .lineDataZoomTooltip {
    min-width: 400px;
    min-height: 100px;
    padding: 50px;
    overflow: hidden;
    border: 2px solid rgba(5, 208, 235, 0.78);
    background: rgba(9, 10, 11, 0.9);
    color: #fff;
    font-size: 26px;
    line-height: 40px;

    // 间隔线
    .itemsBorder {
      width: 100%;
      height: 2px;
      margin-top: 30px;
      // background: orange;
      div:nth-child(odd) {
        width: 10px;
        height: 100%;
        overflow: hidden;
        float: left;
        background: #81d9e5;
      }
      div:nth-child(even) {
        width: calc(100% - 20px);
        height: 100%;
        overflow: hidden;
        float: left;
        background: rgba(129, 217, 229, 0.5);
      }
    }
    // 图表数据
    .itemCon {
      width: 100%;
      height: 40px;
      overflow: hidden;
      margin-top: 20px;
      .itembg {
        width: 6px;
        height: 6px;
        overflow: hidden;
        border-radius: 50%;
        margin-top: 17px;
        background: rgba(5, 208, 235, 1);
        float: left;
      }
      .indexName {
        margin-left: 5px;
        float: left;
      }
      .index {
        float: right;
      }
    }
    .itemCon:nth-child(n + 4) {
      margin-top: 5px;
    }
  }

}
</style>
