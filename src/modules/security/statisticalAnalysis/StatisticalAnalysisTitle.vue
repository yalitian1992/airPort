<template>
  <!-- 标题选项内容 -->
  <div class="StatisticalAnalysisTitle">
    <div class="StatisticalAnalysisTitle_dateBtnWrap fl">
      <!--
      <div class="StatisticalAnalysisTitle_dateBtnWrap_dateBtn fl"
           @click="dateToggle(0)"
           :class="item==0?'dateToggleColor':''">今日</div>
      <div class="StatisticalAnalysisTitle_dateBtnWrap_dateBtn fl"
           @click="dateToggle(1)"
           :class="item==1?'dateToggleColor':''">本周</div>
      <div class="StatisticalAnalysisTitle_dateBtnWrap_dateBtn fl"
           @click="dateToggle(2)"
           :class="item==2?'dateToggleColor':''">本月</div>
      <div class="StatisticalAnalysisTitle_dateBtnWrap_dateBtn fl"
           @click="dateToggle(3)"
           :class="item==3?'dateToggleColor':''">本年</div>
               -->
      <div class="StatisticalAnalysisTitle_dateBtnWrap_dateBtn fl">
      <el-date-picker v-model="value7"
                      type="daterange"
                      align="right"
                      :clearable="false"
                      :editable="false"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="dateChangeday"
                      value-format="yyyy-MM-dd"
                      :picker-options="pickerOptions2">
      </el-date-picker></div>
    </div>
   <!-- <div class="StatisticalAnalysisTitle_dateSeletedWrap fl">
      <el-date-picker v-model="value1"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      @change="dateChangeday"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd"
                      class="">
      </el-date-picker>
    </div>-->
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  components: {},
  data () {
    return {
      dateToggleColor: true,
      item: 0,
      value1: '',
      value7: '',
      pickerOptions2: {
        shortcuts: [
          {
            text: '本日',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本周',
            onClick (picker) {
              const end = new Date() // 当前日期
              const nowDayOfWeek = end.getDay() === 0 ? 7 : end.getDay() // 今天本周的第几天
              const nowDay = end.getDate() // 当前日
              const nowMonth = end.getMonth() === 0 ? 12 : end.getMonth()// 当前月
              let nowYear = end.getYear() // 当前年
              nowYear += nowYear < 2000 ? 1900 : 0
              const start = new Date(
                nowYear,
                nowMonth,
                nowDay - nowDayOfWeek + 1
              )
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本月',
            onClick (picker) {
              const end = new Date()
              // const start = new Date();
              const Nowdate = new Date()
              const start = new Date(
                Nowdate.getFullYear(),
                Nowdate.getMonth(),
                1
              )
              // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '本年',
            onClick (picker) {
              const end = new Date()
              var start = new Date(end.getFullYear(), 0, 1)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  created () {
    this.value7 = [this.startDate(), new Date()]
  },
  methods: {
    ...mapActions('SecurityStore', ['setSelectData', 'setDatas']),
    dateToggle (index) {
      this.item = index
      this.setSelectData(index)
      this.setDatas()
    },
    dateChangeday (val) {
      this.layer.load(1, {shade: false, content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.setSelectData(val)
      this.setDatas()
    },
    startDate () {
      let start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return start
    }
  },
  mounted () {
    let val = this.value7
    this.dateChangeday(val)
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

@media only screen and (max-width: 1376px) {
  .StatisticalAnalysisTitle {
    width: 100%;
    height: 100%;
    z-index: 10;
    &_dateBtnWrap {
      height: 100%;
      &_dateBtn {
        height: 100%;
        font-size: 14px;
        /*text-align: center;*/
      }
      &_dateBtn:hover {
        cursor: pointer;
      }
      .dateToggleColor {
        color: #0096ff;
      }
    }
    &_dateSeletedWrap {
      width: 65%;
      height: 100%;
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .StatisticalAnalysisTitle {
    width: 100%;
    height: 100%;
    &_dateBtnWrap {
      height: 100%;
      &_dateBtn {
        height: 100%;
        font-size: 100%;
        text-align: center;
      }
      &_dateBtn:hover {
        cursor: pointer;
      }
      .dateToggleColor {
        color: #0096ff;
      }
    }
    &_dateSeletedWrap {
      width: 45%;
      height: 100%;
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .StatisticalAnalysisTitle {
    width: 100%;
    height: 100%;
    &_dateBtnWrap {
      height: 100%;
      &_dateBtn {
        height: 100%;
        font-size: 100%;
      }
      &_dateBtn:hover {
        cursor: pointer;
      }
      .dateToggleColor {
        color: #0096ff;
      }
    }
    &_dateSeletedWrap {
      width: 50%;
      height: 100%;
    }
  }
}
@media only screen and (min-width: 1931px) {
  .StatisticalAnalysisTitle {
    width: 100%;
    height: 100%;
    font-size: 26px;
    &_dateBtnWrap {
      width: 40%;
      height: 100%;
      &_dateBtn {
        width: 25%;
        height: 100%;
        font-size: 100%;
        text-align: center;
      }
      &_dateBtn:hover {
        cursor: pointer;
      }
      .dateToggleColor {
        color: #0096ff;
      }
    }
    &_dateSeletedWrap {
      width: 50%;
      height: 100%;
    }
  }
}
</style>

<style lang="scss">
  .StatisticalAnalysisTitle{
    .el-date-editor--daterange.el-input__inner{
      width: 100%;
    }
  }
@media only screen and (max-width: 1376px){
  .StatisticalAnalysisTitle_dateBtnWrap_dateBtn{
    .el-date-editor .el-range-input{
      width: 7em;
    }
  }
}
</style>
