<template>
  <Echarts :options="newOption"
           @click="click"
           ref="AreaLine"></Echarts>
</template>
<script>
/* eslint-disable */
import Echarts from "vue-echarts";
export default {
  components: {
    Echarts
  },
  props: ["data"],
  data() {
    return {
      setOption: {
        grid: {
          left: "5%",
          right: "3%",
          bottom: "5%",
          top: "15%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        // backgroundColor: rgba(256, 256, 256, 0),
        color: "#fff",
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 18
            }
          }
        },
        yAxis: {
          type: "value",
          // name: "安全曲线",
          nameGap: 10,
          min: 0,
          max: 10,
          nameTextStyle: {
            color: "#fff",
            align: "right",
            fontSize: 16
          },
          splitLine: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#fff"
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
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true,
            symbol: "",
            symbolSize: 1,

            areaStyle: {
              color: "rgba(0,150,255,0.3)"
            },
            lineStyle: {
              color: "#0096FF"
            }
          }
        ]
      },
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    newOption() {
      const option = this.setOption;
      option.xAxis.data = this.data && this.data.map(o => o.name);
      option.series[0].data = this.data && this.data.map(o => o.value);
      option.xAxis.data.push('')
      const w = window.screen.width;
      if (w <= 1366){
        option.xAxis.axisLabel.textStyle.fontSize=12
        option.yAxis.axisLabel.textStyle.fontSize=12
      }
      if (w > 1366 && w <= 1400){
        option.xAxis.axisLabel.textStyle.fontSize=12
        option.yAxis.axisLabel.textStyle.fontSize=12
      }
      if (w > 1400 && w <= 1920){
        option.xAxis.axisLabel.textStyle.fontSize=12
        option.yAxis.axisLabel.textStyle.fontSize=12
      }
      if (w > 1921) {
        option.xAxis.axisLabel.textStyle.fontSize=24
        option.yAxis.axisLabel.textStyle.fontSize=24
      }
      return option;
    }
  },
  methods: {
    click(params){
      this.$emit('click',params)
    },
    getDataURL(option){
      return  this.$refs.AreaLine.getDataURL(option)
    }
  },
  mounted() {
    const that = this
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.$refs.AreaLine && this.$refs.AreaLine.resize();
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
      });
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
<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
