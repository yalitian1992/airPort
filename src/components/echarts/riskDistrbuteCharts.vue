<template>
  <Echarts class="echarts"
           :options="newOption"
           ref="riskDistrbuteCharts"></Echarts>
</template>
<script>
/*eslint-disable */
import Echarts from "vue-echarts";
export default {
  components: {
    Echarts
  },
  props: ["riskData"],
  data() {
    return {
      setOption: {
        radar: {
          // shape: 'circle',
          name: {
            formatter: function(value, indicator) {
              return "{a|" + indicator.name.slice(0,4) + "}" + "  " + indicator.value;
            },
            textStyle: {
              color: "#fff",
              fontSize: 14
            },
            rich: {
              a: {
                color: "#fff",
                fontSize: 12
              }
            }
          },
          startAngle: 90,
          radius: "55%",
          splitArea: {
            areaStyle: {
              color: ["rgba(255,255,255,0)"]
            }
          },
          axisLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0)"
            }
          },
          splitLine: {
            lineStyle: {
              type: "dotted",
              color: "#fff",
              opacity: 0.5,
              normal: {
                shadowColor: "rgba(142, 152, 241, 0.6)"
              }
            }
          },
          splitNumber: 0,
          indicator: []
          //   { name: '跑道入侵', max: 10 },
          //   { name: '应急救援', max: 10 },
          //   { name: '消防类', max: 10 },
          //   { name: '信息安全', max: 10 },
          //   { name: '人伤类', max: 10 },
          //   { name: '其他类', max: 10 },
          //   { name: '空防反恐', max: 10 },
          //   { name: '航空器类', max: 10 }
          // ]
        },
        series: [
          {
            name: "雷达图",
            type: "radar",
            symbolSize: 1,
            itemStyle: {
              normal: {
                borderWidth: 0,
                color: "rgba(255, 0, 255)"
              }
            },
            lineStyle: {
              width: 1
            },
            areaStyle: {
              normal: {
                color: "rgba(255, 0, 255, 0.2)"
              }
            },
            data: [
              {
                value: this.myValueList
              }
            ]
          }
        ]
      },
      numColor: ["#0096FF", "#FFDC00", "#FF7300", "#FF0000"],
      screenWidth: document.body.clientWidth
    };
  },
  computed: {
    newOption() {
      let option = this.setOption;
      // option.series[0].data[0].value =
      //   this.riskData && this.riskData.map(e => e.value);
        // console.log("option.series[0].data[0].value",option.series[0].data[0].value)
      option.radar.indicator =
        this.riskData &&
        this.riskData.map((k, index) => {
          return {
            name: k.name,
            value: k.value,
            max: 10,
            color:
              k.value >= 0 && k.value <= 3
                ? this.numColor[0]
                : k.value > 3 && k.value <= 6
                  ? this.numColor[1]
                  : k.value > 6 && k.value <= 9
                    ? this.numColor[2]
                    : k.value > 9 && k.value <= 10 ? this.numColor[3] : ""
          };
        });
      if (this.screenWidth <= 1290) {
        option.radar.radius = "38%";
      }
      if (this.screenWidth > 1291 && this.screenWidth <= 1376) {
        option.radar.name.textStyle.fontSize = 12;
        option.radar.name.rich.a.fontSize = 12;
        option.radar.radius = "45%";
      }

      if (this.screenWidth > 1376 && this.screenWidth <= 1410) {
        option.radar.name.textStyle.fontSize = 13;
        option.radar.name.rich.a.fontSize = 13;
        option.radar.center = ["49%", "50%"];
        option.radar.radius = "45%";
      }

      if (this.screenWidth > 1410 && this.screenWidth <= 1930) {
        option.radar.name.textStyle.fontSize = 14;
        option.radar.name.rich.a.fontSize = 14;
        option.radar.radius = "58%";
      }

      if (this.screenWidth > 1931) {
        option.radar.name.textStyle.fontSize = 26;
        option.radar.name.rich.a.fontSize = 24;
      }

      return option;
    },
    myValueList(){
      let   list = this.riskData && this.riskData.map(e => e.value);
      return   list
    }
  },
  mounted() {
    const that = this;
    this.$nextTick(() => {
      window.addEventListener("resize", () => {
        this.$refs.riskDistrbuteCharts &&
          this.$refs.riskDistrbuteCharts.resize();
        window.screenWidth = document.body.clientWidth;
        that.screenWidth = window.screenWidth;
      });
    });
  },
  watch: {
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}
.echarts {
  width: 100%;
  height: 100%;
  /* background:powderblue; */
}
</style>
