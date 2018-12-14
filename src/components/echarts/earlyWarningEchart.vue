<template>
  <Echarts :options="newchartData"
           ref="earlyWarningEchart"
           class="earlyWarningEcharts"></Echarts>
</template>
<script>
/* eslint-disable */
import Echarts from "vue-echarts";
export default {
  name: "lineBar",
  props: ['earlyWarning'],
  components: {
    Echarts
  },
  data() {
    return {
      color: ["#0096FF", "#FFDC00", "#FF7300", "#FF0000"],
      setOption: {
        legend: {
          // data: ["本期", "同比", "环比"],
          align: "right",
          right: 10,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
            fontSize: 18
          },
          align: "left"
        },
        grid: {
          left: "3%",
          right: "2%",
          bottom: "6%",
          top: "20%",
          containLabel: true
        },
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
                    `<div class="itemCon clearfix"><p class="${
                      item.seriesName==='本期'?'itembg':
                      (item.seriesName==='同比'?'itembg1':'itembg2')
                    } fl"></p><p class="indexName fl">${
                      item.seriesName
                    }</p><p class="index fr">${Number(item.value)}</p ></div>`
                )
                .join(" ")}</div>`
            );
          }
        },

        // xAxis = [
        //   {
        //     type: 'category',
        //     data: data[0],
        //     show: false,
        //     position: 'top'
        //   },
        //   {
        //     type: 'value',
        //     min: 0,
        //     max: 24,
        //     splitNumber: 24,
        //     axisLabel: {
        //       formatter: '{value}时'
        //     }
        //   }
        // ],

        xAxis: [
          {
            type: "category",
            // data: ["1周", "2周", "3周", "4周"],
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid",
                // position: "relative",
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 18
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "       报警数",
            nameTextStyle: {
              fontSize: 18
            },
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
                fontSize: 18
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#fff",
                width: 1,
                type: "solid"
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                show: "false",
                color: "#fff"
              }
            }
          }
        ],
        series: [
          {
            // name: "本期",
            // data: [20, 50, 80, 58, 83, 68, 57, 80, 42, 66],
            // barWidth: 16, // 柱子宽度
            // barGap: 1, // 柱子之间间距
            type: "bar",
            itemStyle: {
              normal: {
                color: "#008AFF",
                opacity: 1
              }
            }
          },
          {
            // name: "同比",
            // data: [50, 70, 60, 61, 75, 87, 60, 62, 86, 46],
            // barWidth: 16,
            // barGap: 1,
            type: "bar",
            itemStyle: {
              normal: {
                color: "#FFB400",
                opacity: 1
              }
            }
          },
          {
            // name: "环比",
            // data: [70, 48, 73, 68, 53, 47, 50, 72, 96, 86],
            // barWidth: 16,
            // barGap: 1,
            type: "bar",
            itemStyle: {
              normal: {
                color: "#14C85F ",
                opacity: 1
              }
            }
          }
        ]
      },
      newchartData:{},
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    newOption() {
      const option = this.setOption;
      option.legend.data = this.earlyWarning && this.earlyWarning.map(e => e.name)
      for(let i=0;i<3;i++){
        option.series[i].data=this.earlyWarning &&this.earlyWarning[i].data
        option.series[i].name=this.earlyWarning &&this.earlyWarning[i].name
      }
      option.xAxis[0].data=this.earlyWarning[0].data.map(e=>e.name)
      // console.log(option.xAxis[0].data)
      // 不同分辨率下echarts字体的大小
      if(this.screenWidth<=1366){
        option.xAxis[0].axisLabel.textStyle.fontSize=12
        option.yAxis[0].axisLabel.textStyle.fontSize=12
        option.yAxis[0].nameTextStyle.fontSize=12
        option.legend.textStyle.fontSize=12
      }
      if(this.screenWidth>1366&&this.screenWidth<=1400){
        option.xAxis[0].axisLabel.textStyle.fontSize=14
        option.yAxis[0].axisLabel.textStyle.fontSize=14
        option.yAxis[0].nameTextStyle.fontSize=14
        option.legend.textStyle.fontSize=14
      }
      if(this.screenWidth>1400&&this.screenWidth<=1930){
        option.xAxis[0].axisLabel.textStyle.fontSize=16
        option.yAxis[0].axisLabel.textStyle.fontSize=16
        option.yAxis[0].nameTextStyle.fontSize=16
        option.legend.textStyle.fontSize=16
      }
      if(this.screenWidth>1931){
        option.xAxis[0].axisLabel.textStyle.fontSize=24
        option.yAxis[0].axisLabel.textStyle.fontSize=24
        option.yAxis[0].nameTextStyle.fontSize=24
        option.legend.textStyle.fontSize=24
      }
      return option;
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.$refs.earlyWarningEchart && this.$refs.earlyWarningEchart.resize();
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      });
    });
  },
  methods:{
    _newOption(val) {
      this.earlyWarning=val
      const option = this.setOption;
      option.legend.data = this.earlyWarning && this.earlyWarning.map(e => e.name)
      for(let i=0;i<3;i++){
        option.series[i].data=this.earlyWarning &&this.earlyWarning[i].data
        option.series[i].name=this.earlyWarning &&this.earlyWarning[i].name
      }
      option.xAxis[0].data=this.earlyWarning[0].data.map(e=>e.name)
      // console.log(option.xAxis[0].data)
      // 不同分辨率下echarts字体的大小
      if(this.screenWidth<=1366){
        option.xAxis[0].axisLabel.textStyle.fontSize=12
        option.yAxis[0].axisLabel.textStyle.fontSize=12
        option.yAxis[0].nameTextStyle.fontSize=12
        option.legend.textStyle.fontSize=12
      }
      if(this.screenWidth>1366&&this.screenWidth<=1400){
        option.xAxis[0].axisLabel.textStyle.fontSize=14
        option.yAxis[0].axisLabel.textStyle.fontSize=14
        option.yAxis[0].nameTextStyle.fontSize=14
        option.legend.textStyle.fontSize=14
      }
      if(this.screenWidth>1400&&this.screenWidth<=1930){
        option.xAxis[0].axisLabel.textStyle.fontSize=16
        option.yAxis[0].axisLabel.textStyle.fontSize=16
        option.yAxis[0].nameTextStyle.fontSize=16
        option.legend.textStyle.fontSize=16
      }
      if(this.screenWidth>1931){
        option.xAxis[0].axisLabel.textStyle.fontSize=24
        option.yAxis[0].axisLabel.textStyle.fontSize=24
        option.yAxis[0].nameTextStyle.fontSize=24
        option.legend.textStyle.fontSize=24
      }
      this.newchartData=option
    this.$refs.earlyWarningEchart.refresh()

      return option;
    },
getDataURL(option){
  return  this.$refs.earlyWarningEchart.getDataURL(option)
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
    },
    earlyWarning(val){
      this._newOption(val)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .lineDataZoomTooltip {
    min-width: 168px;
    min-height: 100px;
    padding: 5px;
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
        background: rgba(255,180,0, 1);
        float: left;
      }
      .itembg2 {
        width: 6px;
        height: 6px;
        overflow: hidden;
        border-radius: 50%;
        margin-top: 7px;
        background: rgba(20,200,95, 1);
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
</style>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
* {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
.earlyWarningEcharts {
  width: 100%;
  height: 100%;
}
@media only screen and (max-width: 1366px) {
}
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
}
@media only screen and (min-width: 1401px) and (max-width: 1930px) {
  // tooltip 样式

}
@media only screen and (min-width: 1931px){
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
.activeColor {
  background: url("../../assets/images/zx-bj.png") no-repeat center center;
  background-size: 81px 68px;
}
</style>
