<template>
  <Echarts :options="newOption"
           ref="ModelManageTree"
           class="ModelManageTrees"
           @click="clickEcharts" @dblclick="showBlack">
  </Echarts>
</template>
<script>
/* eslint-disable */
import { mapState, mapMutations } from 'vuex'
import Echarts from 'vue-echarts'
import treeData1 from './ManageView.js'
import treeData from './RiskView.js'
import tree_icon from '../../assets/images/tree_icon.png'
import tree_add from '../../assets/images/tree_add.png'
import nullPic from '../../assets/images/null.png'
export default {
  components: {
    Echarts
  },
  data () {
    return {
      screenWidth: document.body.clientWidth,
      modelData: treeData,
      Options: {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (e) {
            if (e.data.last) {
              return e.name
            }
          }
        },
        series: [
          {
            type: 'tree',
            roam: true,
            id: '1',
            data: [{}],
            left: 100,
            right: 100,
            top: '10%',
            bottom: '10%',
            symbolSize: [75, 93],
            symbol: `image://${tree_icon}`,
            orient: 'vertical',
            expandAndCollapse: true,
            initialTreeDepth: 1,
            fontSize: 20,
            label: {
              normal: {
                position: ['50%', 30],
                verticalAlign: 'middle',
                align: 'center',
                color: '#fff',
                fontSize: 13,
                formatter: function (e) {
                  if (e.data.last) {
                  }
                  if (e.name) {
                    let str = e.name.split('')
                    for (let i = 3; i < e.name.length; i += 4) {
                      str[i] += '\n'
                    }
                    return str.join('')
                  }
                }
              }
            },
            leaves: {
              label: {
                // show: true,
                // position: ['50%', 25],
                // verticalAlign: 'middle',
                // align: 'center',
                // formatter: function (e) {
                //   console.log(e)
                //   return 8888888888888
                // }
              }
            },
            lineStyle: {
              type: 'dotted',
              curveness: 0.6
            }
          }
        ]
      }
    }
  },
  computed:{
    ...mapState('ModelStore', ['modelEnterState']),
    newOption(){
      const option = this.Options;
      this.Options.series[0].data = this.modelData
      if(this.screenWidth<=1366){
        this.Options.series[0].label.normal.fontSize=16
      }
      if(this.screenWidth>1366&&this.screenWidth<=1400){
        this.Options.series[0].label.normal.fontSize=17
        this.Options.series[0].symbolSize=[82, 103]
        this.Options.series[0].label.normal.position=['50%', 30]
      }
      if(this.screenWidth>1400&&this.screenWidth<=1920){
        this.Options.series[0].label.normal.fontSize=20
        this.Options.series[0].symbolSize=[102, 113]
        this.Options.series[0].label.normal.position=['50%', 40]
      }
      if(this.screenWidth>1921){
        this.Options.series[0].label.normal.fontSize=30
        this.Options.series[0].symbolSize=[142, 183]
        this.Options.series[0].label.normal.position=['50%', 65]
      }
      return option;
    },
  },
  methods: {
    ...mapMutations('ModelStore', ['setBlankPageDataState']),
    initEcharts () {
      if(this.modelEnterState===0){
        this.modelData = treeData
      }
      if(this.modelEnterState===1){
        this.modelData = treeData1
      }
    },
    clickEcharts (e) {
      console.log(e)
    },
    showBlack(){
      this.setBlankPageDataState(true)
    }
  },
  created () {
    this.initEcharts()
    // this.newOption()
  },
  mounted () {
    const that = this
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.$refs.ModelManageTree && this.$refs.ModelManageTree.resize()
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
            that.timer = false
        }, 400)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.ModelManageTrees{
  width: 100%;
  height: 100%;
}
.echarts {
  width: 100%;
  height: 100%;
  div {
    width: 100% !important;
    height: 100% !important;
  }
}
.name {
  color: red;
}
</style>
