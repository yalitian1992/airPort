<template>
  <div class="informBox">
    <div class="noticeInfrom-wrap clearfix">
      <!-- 头部 -->
      <!--<div class="noticeInfromTitle">通知信息</div>-->
      <!-- 内容 -->
      <div class="noticeInfromContent">
        <div>
          <el-row class="noticeHead" :gutter="10">
            <el-col class="dateBox" :span="9">
              <div class="grid-content bg-purple">
                <el-date-picker style="width: 100%;min-width: 365px;"
                  v-model="searchParam.value5"
                  type="datetimerange"
                  :clearable="false"
                  :editable="false"
                  :picker-options="searchParamList.pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="TimeFun()"
                  align="right">
                </el-date-picker>
              </div>
            </el-col>
            <el-col :span="15">
              <div class="grid-content bg-purple" style="height: 100%;">
                <div class="fl Sel">
                  <select v-model="searchParam.isHandleValue" placeholder="请选择">
                    <option v-for="(item,index) in searchParamList.isHandleList"
                            :key="index"
                            :value="item.value">{{item.label}}</option>
                  </select>
                </div>
                <div class="fl posit">
                  <p class="placeH" v-show="Focus">输入描述关键字查询</p>
                  <input type="text" class="input" @focus="Focus = false" @blur="Blur(searchParam.desValue)" v-model="searchParam.desValue">
                </div>
                <div class="grid-content bg-purple">
                  <div class="searchBtn" type="primary" @click="search">搜索</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="noticeInfromContent_list">
          <div class="listTitle">
            <div v-for="(item,index) in listTitle" :key="index">{{item}}</div>
          </div>
          <div class="listCon" v-if="pageInfo.totalCount !== 0">
            <ul class="autoScroll" id="list-to-top">
              <li v-for='(item,_index) in listdata' :key='_index'>
                <div>{{(pageInfo.currentPage3 - 1) * 10 + (_index + 1)}}</div>
                <div>{{item.noticeType}}  ({{item.alarmScore}}分)</div>
                <div @click="meanDeatail(item.mean)" :title="item.mean">{{item.mean}}</div>
                <div>{{item.update}}</div>
                <div>
                  <!--<div v-if="item.ALARM_DOSTATUS<1" class="option" @click="handleAlarm(item)">处置</div>-->
                  <!--<div v-else="" class="option" @click="handleAlarm(item)">已处置</div>-->
                  <div class="option" @click="watchDetail(item)">
                    <span v-if="item.ALARM_DOSTATUS < 1">处置</span>
                    <span v-else>已处置</span>
                    /查看详情
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <p class="noList" v-else-if="pageInfo.totalCount === 0">暂无记录</p>
        </div>
        <div class="Pagination" v-if="pageInfo.totalCount !== 0">
          <div class="classPage">
            <el-pagination @current-change="handleCurrentChange"
                           :current-page="pageInfo.currentPage3"
                           :page-size="pageInfo.pageSize"
                           :pager-count="pagerCount"
                           layout="total,prev, pager, next, jumper"
                           :total="parseInt(pageInfo.totalCount === undefined ? '0' : pageInfo.totalCount)">
            </el-pagination>
            <span class="toBtn">跳转</span>
          </div>
          <div class="cancel" @click="cancelOper()" v-show="false">返回</div>
        </div>
      </div>
      <!--查看详情弹窗-->
      <noticeInfoDetails ref="Detail"></noticeInfoDetails>
    </div>
  </div>
</template>
<script>
import noticeInfoDetails from './noticeInfoDetails.vue'
export default {
  components: {
    noticeInfoDetails
  },
  data: function () {
    return {
      watchPage: '', // 监听页码变化
      pagerCount: 15, // 个数
      Focus: true,
      listTitle: ['序号', '报警级别', '报警描述', '报警时间', '操作'],
      listdata: [
        /*        {
          noticeType: '风险预警',
          mean: '大风橙色预警',
          update: '2018-02-03  05:20:12',
          alarmScore: 9
        } */
      ],
      searchParamList: {
        isReadList: [{label: '全部', value: ''}, {label: '未读', value: 0}, {label: '已读', value: 1}],
        isHandleList: [{label: '未处置', value: 0}, {label: '已处置', value: 1}, {label: '全部', value: ''}],
        pickerOptions2: {
          shortcuts: [
            {
              text: '今日',
              onClick (picker) {
                const end = new Date()
                let start = new Date()
                start = start.getFullYear() + '/' + (start.getMonth() + 1) + '/' + start.getDate()
                picker.$emit('pick', [new Date(start + ' 00:00:00'), end])
              }
            }, {
              text: '最近一周',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近一个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                picker.$emit('pick', [start, end])
              }
            }, {
              text: '最近三个月',
              onClick (picker) {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                picker.$emit('pick', [start, end])
              }
            }]
        }
      },
      searchParam: {
        isReadValue: '',
        isHandleValue: 0,
        value5: ['2018-08-31 00:00:00', '2018-08-31 13:18:30'],
        desValue: ''
      },
      middleList: {
        value5: ['2018-08-31 00:00:00', '2018-08-31 13:18:30'],
        isHandleValue: 0,
        isReadValue: '',
        desValue: ''
      },
      pageInfo: {
        currentPage3: 1,
        pageSize: 10,
        totalCount: 0
      }
    }
  },
  watch: {
    watchPage (val) {
      this.scrollToTop()
    }
  },
  methods: {
    scrollToTop () {
      var div = document.getElementById('list-to-top')
      div.scrollTop = 0
    },
    TimeFun () {
      this.pageInfo.currentPage3 = 1
      this.loadAjaxData()
    },
    Blur (val) {
      if (val === '') {
        this.Focus = true
      } else {
        this.Focus = false
      }
    },
    startDate: function () {
      let start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      let newVal = this.getDateTime(start)
      return newVal
    },
    endDate: function () {
      let end = new Date()
      let newVal = this.getDateTime(end)
      return newVal
    },
    meanDeatail (val) {
      // alert(val)
    },
    search (val) {
      this.pageInfo.currentPage3 = 1
      this.middleList.value5 = this.searchParam.value5
      this.middleList.isHandleValue = this.searchParam.isHandleValue
      this.middleList.desValue = this.searchParam.desValue
      this.middleList.isReadValue = this.searchParam.isReadValue
      this.loadAjaxData()
    },
    Read (item) {
      this.pageInfo.currentPage3 = 1
      this.loadAjaxData()
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageInfo.currentPage3 = val
      this.watchPage = val
      this.loadAjaxData()
    },
    saveOper () {
      this.$router.go(-1)
    },
    cancelOper () {
      this.$router.go(-1)
    },
    loadAjaxData () {
      let _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '17.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      _this.post('RiskTopology/GetBciaResultAlarmLike', {
        'SelectRemark': _this.middleList.desValue,
        'SelecIsRead': _this.middleList.isReadValue,
        'PageIndex': _this.pageInfo.currentPage3,
        'PageSize': _this.pageInfo.pageSize,
        'SelectDoStatus': _this.middleList.isHandleValue,
        'StartTime': _this.middleList.value5[0],
        'EndTime': _this.middleList.value5[1],
        'Uid': _this.userInfo.TU_ID
      }, function (res) {
        _this.layer.closeAll()
        _this.listdata = res.listData
        _this.pageInfo.totalCount = res.totalCount
      })
    },
    // handleAlarm (item) {
    //   let _this = this
    //   _this.layer.load(1, {content: '<div style="width:100px;height:100px;position:relative;left:-0.5em;z-index:-100;top:2.5em">加载中...</div>'})
    //   this.post('RiskTopology/UptBciaResultAlarmState', {
    //     'AID': item.AID
    //   }, function (res) {
    //     if (res) {
    //       _this.layer.closeAll()
    //       _this.$router.push({
    //         name: 'Riskdisposal',
    //         params: item
    //       })
    //     }
    //   })
    // },
    watchDetail (item) {
      item.aid = item.AID
      this.$refs.Detail.IsShow(item, this.$route) // 查看详情弹框显示
    },
    // 日期时间格式转化
    getDateTime: function (s) {
      let date = s.getFullYear() + '-' + (s.getMonth() + 1) + '-' + s.getDate()
      let time = s.getHours() + ':' + s.getMinutes() + ':' + s.getSeconds()
      let newDate = date + ' ' + time
      return newDate
    }
  },
  mounted () {
    let _this = this
    _this.searchParam.value5 = [_this.startDate(), _this.endDate()]
    _this.middleList.value5 = _this.searchParam.value5
    _this.search()
    window.onresize = function () {
      _this.pagerCount = parseInt(document.documentElement.clientWidth / 110)
      if (_this.pagerCount % 2 === 0) {
        _this.pagerCount = _this.pagerCount - 1
      }
      if (_this.pagerCount < 5) {
        _this.pagerCount = 5
      }
      if (_this.pagerCount > 21) {
        _this.pagerCount = 21
      }
    }
    window.onresize()
  }
}

</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  /*遮盖select右侧小箭头*/
  @mixin selDiv() {
    background: #252B46;
  }
  /*公用样式*/
  .fl{
    float: left;
  }
  .noList{
    @include size(100%, 200px);
    padding-top: 20%;
    /*line-height: 200px;*/
    text-align: center;
    color: #F8F8F8;
  }
  .listCon{
    height: calc(100% - 80px);
  }
  .noticeHead{
    margin-left: 0 !important;
    margin-top:15px;
    margin-bottom: 15px;
    select,input{
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 5px;
      color: #fff;
    }
    .Sel{
      position: relative;
      width: 20%;
      margin-right: 5%;
      overflow: hidden;
      z-index: 15;
      select{
        @include size(100%, 40px);
        line-height: 40px;
        padding: 0 0 0 15px;
        option {
          color: #606266;
        }
      }
    }
    .Sel:after{
      content: "";
      display: inline-block;
      position: absolute;
      top: -10%;
      right: 0;
      width: 32px;
      height: 120%;
      background: url('../../../assets/images/sort-down-active-nomal-icon.png') no-repeat center/contain;
      background-size: 12px 8px;
      z-index: 20;
    }
    .Sel:before{
      content: "";
      display: inline-block;
      position: absolute;
      top: -10%;
      right: 0;
      width: 32px;
      height: 120%;
      @include selDiv();
      z-index: 10;
    }
  }
  .grid-content{
    border-radius: 5px;
    overflow: hidden;
    .input{
      position: relative;
    }
  }
  .posit{
    position: relative;
    height: 40px;
    border-radius: 5px;
    overflow: hidden;
    .placeH,input{
      @include size(100%, 40px);
      position: absolute;
      top: 0;
      display: inline-block;
      padding-left: 15px;
      font-size: 14px;
    }
    .placeH{
      line-height: 40px;
    }
  }
  .noticeInfromContent{
    &_list{
      overflow: hidden;
    }
  }
  .informBox{
    width: 100%;
    height: 100%;
  }
  @media only screen and (max-width: 1365.9px) {
    .informBox {

    }
  }
  @media only screen and (max-width: 1376px) {
    .noticeInfrom-wrap {
      @include size(100%, 100%);
      min-width: 1024px;
      position: relative;
      /*padding-top: 2%;*/
      /*background: url('../../../assets/images/bj.png') no-repeat center center;*/
      /*background-size: 100% 100%;*/

      .noticeInfromTitle {
        @include size(100%, 40px);
/*
        margin-top: 2%;
*/
        // margin-bottom: 6%;
        box-sizing: border-box;
        padding-left: 35px;
        font-size: 18px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        background: rgba(255, 255, 255, 0.05);
      }

      .noticeInfromContent {
        @include size(98%, calc(100% - 80px));
        margin-left: 5%;
        // margin-bottom:6%;
        margin: 0 auto;
        .noticeHead{
          .Sel{
            select{
              height: 30px;
              line-height: 30px;
            }
          }
          .posit{
            .placeH,input{
              height: 30px;
              line-height: 30px;
            }
          }
        }
        &_select {
          @include size(100%, 35px);
          text-align: center;
          line-height: 35px;
          color: #fff;
          // background: pink;
          div {
            @include size(50px, 45px);
            float: left;
            font-size: 14px;
            margin-right: 20px;
            cursor: pointer;
          }

          .activeRead {
            box-sizing: border-box;
            border-bottom: 5px solid #0096ff;
          }
          .dateBox{
            margin-bottom: 10px;
            padding-left: 0 !important;
            padding-right: 0 !important;
            width: 30% !important;
            height: 20px;
            border-radius: 5px;
            overflow: hidden;
            .grid-content{
              position: relative;
              top: -5px;
              border-radius: 5px;
            }
          }
        }
        .searchBtn{
          margin: 0 0 0 1em;
          @include size(56px, 30px);
          color: #fff;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          cursor: pointer;
        }

        &_list {
          @include size(100%, 73%);
          .listTitle {
            @include size(100%, 39px);
            /*float: left;*/
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.05);

            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 39px;
              color: #f2f2f2;
              font-size: 15px;

              &:nth-child(1) {
                @include size(3em, 100%);
              }

              &:nth-child(2) {
                @include size(18%, 100%);
              }

              &:nth-child(3) {
                @include size(30%, 100%);
              }

              &:nth-child(4) {
                @include size(20%, 100%);

              }

              &:nth-child(5) {
                @include size(20%, 100%);
              }
            }
          }
          .listCon{
            overflow: hidden;
            ul {
              list-style: none;
              color: #fff;
              float: left;
              font-size: 14px;

              li {
                height: 52.54px;
                cursor: pointer;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                div {
                  float: left;
                  height: 52.54px;
                  box-sizing: border-box;
                  line-height: 52.54px;
                  text-align: center;
                  margin-left: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:nth-child(1) {
                    @include size(3em, 100%);
                  }

                  &:nth-child(2) {
                    @include size(18%, 100%);
                  }

                  &:nth-child(3) {
                    @include size(30%, 100%);
                  }

                  &:nth-child(4) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(5) {
                    @include size(20%, 100%);

                    .option {
                      @include size(100%, 100%);
                      display: inline-block;
                      margin-left: -5px;
                    }
                  }
                }
              }
            }
          }
        }

        .Pagination {
          @include size(100%, 50px);
          margin-top: 10px;
          .classPage {
            @include size(calc(100% - 6em), 30px);
            float: left;
            white-space:nowrap;
            margin-top: 10px;
          }

          .toBtn {
            @include size(56px, 30px);
            color: #fff;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            margin-right: 2%;
          }

          .cancel {
            @include size(56px, 30px);
            color: #fff;
            margin-top: 10px;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1377px) and (max-width: 1410px) {
    .noticeInfrom-wrap {
      @include size(100%, 90%);
      position: relative;
      /*background: url('../../../assets/images/bj.png') no-repeat center center;*/
      /*background-size: 100% 100%;*/

      .noticeInfromTitle {
        @include size(100%, 45px);
        box-sizing: border-box;
        padding-left: 35px;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
        background: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 5%;
      }

      .noticeInfromContent {
        @include size(98%, calc(100% - 80px));
        margin: 0 auto;
        position: absolute;
        top: calc(5% + 40px);
        left: 5%;

        &_select {
          @include size(100%, 50px);
          text-align: center;
          line-height: 50px;
          color: #fff;

          div {
            @include size(50px, 50px);
            float: left;
            font-size: 18px;
            margin-right: 20px;
            cursor: pointer;
          }

          .activeRead {
            box-sizing: border-box;
            border-bottom: 5px solid #0096ff;
          }
            .dateBox{
              margin-bottom: 10px;
              padding-left: 0 !important;
              padding-right: 0 !important;
              width: 30% !important;
              height: 30px;
              border-radius: 5px;
              overflow: hidden;
              .grid-content{
                position: relative;
                top: -5px;
                border-radius: 5px;
              }
            }
        }
        .searchBtn{
          margin: 0 0 0 1em;
          @include size(75px, 40px);
            color: #fff;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            cursor: pointer;
          }
        &_list {
          @include size(100%, 80%);

          .listTitle {
            @include size(100%, 45px);
            /*float: left;*/
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.05);

            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 45px;
              color: #f2f2f2;
              font-size: 16px;

              &:nth-child(1) {
                @include size(3%, 100%);
              }

              &:nth-child(2) {
                @include size(20%, 100%);
              }

              &:nth-child(3) {
                @include size(30%, 100%);
              }

              &:nth-child(4) {
                @include size(20%, 100%);
              }

              &:nth-child(5) {
                @include size(20%, 100%);
              }
            }
          }
          .listCon{
            overflow: hidden;
            ul {
              // @include size(100%, 300px);
             /* width:100%;*/
              list-style: none;
              color: #fff;
              float: left;
              /*overflow: hidden;*/
              font-size: 14px;

              li {
                height: 60px;
                cursor: pointer;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                div {
                  float: left;
                  height: 60px;
                  box-sizing: border-box;
                  line-height: 60px;
                  text-align: center;
                  margin-left: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:nth-child(1) {
                    @include size(3%, 100%);
                  }

                  &:nth-child(2) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(3) {
                    @include size(30%, 100%);
                  }

                  &:nth-child(4) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(5) {
                    @include size(20%, 100%);

                    .option {
                      @include size(100%, 100%);
                      display: inline-block;
                      margin-left: -5px;
                    }
                  }
                }
              }
            }
          }
        }

        .Pagination {
          @include size(100%, 50px);
          margin-top: 10px;

          .classPage {
            @include size(calc(100% - 10em), 30px);
            white-space:nowrap;
            float: left;
            white-space:nowrap;
            margin-top: 10px;
          }

          .toBtn {
            @include size(65px, 30px);
            color: #fff;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            margin-right: 2%;
          }

          .cancel {
            @include size(65px, 30px);
            color: #fff;
            margin-top: 10px;
            font-size: 14px;
            line-height: 30px;
            text-align: center;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1411px) and (max-width: 1930px) {
    .noticeInfrom-wrap {
      @include size(100%, 100%);
      position: relative;
      /*background: url('../../../assets/images/bj.png') no-repeat center center;*/
      /*background-size: 100% 100%;*/
/*
      overflow: hidden;
*/
      .noticeInfromTitle {
        @include size(100%, 56px);
        box-sizing: border-box;
        padding-left: 60px;
/*
        margin-top: 40px;
*/
        font-size: 20px;
        font-weight: 100;
        line-height: 56px;
        background: rgba(255, 255, 255, 0.05);
      }

      .noticeInfromContent {
         @include size(98%, calc(100% - 110px));
        margin: 0px auto;

        &_select {
          @include size(100%, 35px);
          text-align: center;
          line-height: 35px;
          color: #fff;

          div {
            @include size(50px, 45px);
            float: left;
            font-size: 18px;
            margin-right: 20px;
            cursor: pointer;
          }

          .activeRead {
            box-sizing: border-box;
            border-bottom: 3px solid #0096ff;
          }
            .dateBox{
              margin-bottom: 10px;
              padding-left: 0 !important;
              padding-right: 0 !important;
              width: 30% !important;
              height: 30px;
              border-radius: 5px;
              overflow: hidden;
              .grid-content{
                position: relative;
                top: -5px;
                border-radius: 5px;
              }
            }
        }
        .searchBtn{
          margin: 0 0 0 1em;
            @include size(75px, 40px);
            color: #fff;
            font-size: 16px;
            line-height: 40px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            cursor: pointer;
          }
        &_list {
          @include size(100%, 72%);

          .listTitle {
            @include size(100%, 56px);
            margin-bottom: 8px;
            /*float: left;*/
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.05);

            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 56px;
              color: #f2f2f2;
              font-size: 16px;

              &:nth-child(1) {
                @include size(3%, 100%);
              }

              &:nth-child(2) {
                @include size(20%, 100%);
              }

              &:nth-child(3) {
                @include size(30%, 100%);
              }

              &:nth-child(4) {
                width: 20% !important;
                height: 100%;
              }

              &:nth-child(5) {
                width: 20% !important;
                height: 100%;
              }
            }
          }
          .listCon{
            overflow: hidden;
            ul {
              // @include size(100%, 375px);
             /* width:100%;*/
              list-style: none;
              color: #fff;
              float: left;
/*
              overflow: hidden;
*/
              font-size: 14px;

              li {
                height: 60px;
                cursor: pointer;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                div {
                  float: left;
                  height: 74px;
                  box-sizing: border-box;
                  line-height: 74px;
                  text-align: center;
                  width: 89px;
                  margin-left: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:nth-child(1) {
                    @include size(3%, 100%);
                  }

                  &:nth-child(2) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(3) {
                    @include size(30%, 100%);
                  }

                  &:nth-child(4) {
                    width: 20% !important;
                    height: 100%;
                  }

                  &:nth-child(5) {
                    width: 20% !important;
                    height: 100%;
                    .option {
                      @include size(100%, 100%);
                      display: inline-block;
                      margin-left: -5px;
                    }
                  }
                }
              }
            }
          }
        }

        .Pagination {
          @include size(100%, 50px);
          margin-top: 10px;

          .classPage {
            @include size(calc(100% - 10em), 35px);
            float: left;
            white-space:nowrap;
            margin-top: 10px;
          }

          .toBtn {
            @include size(70px, 35px);
            color: #fff;
            font-size: 14px;
            line-height: 35px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
          }

          .cancel {
            @include size(70px, 35px);
            color: #fff;
            margin-top: 10px;
            font-size: 14px;
            line-height: 35px;
            text-align: center;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-left: 20px;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1931px) {
    .noticeInfrom-wrap {
      @include size(100%, 90%);
      position: relative;
      /*background: url('../../../assets/images/bj.png') no-repeat center center;*/
      /*background-size: 100% 100%;*/

      .noticeInfromTitle {
        @include size(100%, 80px);
        box-sizing: border-box;
        padding-left: 65px;
        font-size: 30px;
        font-weight: 100;
        text-align: left;
        line-height: 80px;
        background: rgba(255, 255, 255, 0.05);
        position: absolute;
        top: 5%;
      }

      .noticeInfromContent {
        @include size(98%, 90%);
        margin: 0 auto;
        position: absolute;
        top: 250px;
        left: 5%;
        .noticeHead{
          .Sel {
            select{
              height: 70px;
            }
          }
          .posit{
            height: 70px;
            .placeH,.input{
              height: 70px ;
              line-height: 70px;
            }
          }
        }
        &_select {
          @include size(100%, 80px);
          text-align: center;
          line-height: 80px;
          color: #fff;

          div {
            @include size(100px, 100%);
            float: left;
            font-size: 28px;
            margin-right: 20px;
            cursor: pointer;
          }

          .activeRead {
            box-sizing: border-box;
            border-bottom: 5px solid #0096ff;
          }
            .dateBox{
              margin-bottom: 10px;
              padding-left: 0 !important;
              padding-right: 0 !important;
              width: 30% !important;
              height: 80px;
              border-radius: 5px;
              overflow: hidden;
              .grid-content{
                position: relative;
                top: 0;
                border-radius: 5px;
              }
            }
        }
        .searchBtn{
          margin: 0 0 0 1em;
          @include size(140px, 70px);
          color: #fff;
          font-size: 32px;
          line-height: 70px;
          text-align: center;
          background: deepskyblue;
          border-radius: 8px;
          cursor: pointer;
        }
        &_list {
          @include size(100%, 80%);
          .listTitle {
            @include size(100%, 80px);
            /*float: left;*/
            border-top: 1px solid rgba(255, 255, 255, 0.8);
            background: rgba(255, 255, 255, 0.05);

            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 80px;
              color: #f2f2f2;
              font-size: 26px;

              &:nth-child(1) {
                @include size(3%, 100%);
              }

              &:nth-child(2) {
                @include size(20%, 100%);
              }

              &:nth-child(3) {
                @include size(30%, 100%);
              }

              &:nth-child(4) {
                @include size(20%, 100%);
              }

              &:nth-child(5) {
                @include size(20%, 100%);
              }
            }
          }
          .listCon{
            overflow: hidden;
            ul {
              // @include size(100%, 500px);
             /* width:100%;*/
              list-style: none;
              color: #fff;
              float: left;
             /* overflow: hidden;*/
              font-size: 24px;

              li {
                display: block;
                height: 80px;
                cursor: pointer;
                border-bottom: 1px solid rgba(255, 255, 255, 0.2);

                div {
                  float: left;
                  height: 100%;
                  box-sizing: border-box;
                  line-height: 100px;
                  text-align: center;
                  margin-left: 12px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;

                  &:nth-child(1) {
                    @include size(3%, 100%);
                  }

                  &:nth-child(2) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(3) {
                    @include size(30%, 100%);
                  }

                  &:nth-child(4) {
                    @include size(20%, 100%);
                  }

                  &:nth-child(5) {
                    @include size(20%, 100%);

                    .option {
                      @include size(100%, 100%);
                      display: inline-block;
                      margin-left: -5px;
                    }
                  }
                }
              }
            }
          }
        }

        .Pagination {
          @include size(100%, 80px);
          margin-top: 10px;

          .classPage {
            @include size(calc(100% - 10em), 100%);
            float: left;
            white-space:nowrap;
            margin-top: 10px;
          }

          .toBtn {
            @include size(150px, 100%);
            color: #fff;
            font-size: 32px;
            line-height: 80px;
            text-align: center;
            background: deepskyblue;
            border-radius: 4px;
            display: inline-block;
            cursor: pointer;
            margin-right: 2%;
          }

          .cancel {
            @include size(150px, 100%);
            color: #fff;
            margin-top: 10px;
            font-size: 32px;
            line-height: 80px;
            text-align: center;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
<style lang="scss">
  @media only screen and (min-width: 1411px) and (max-width: 1930px) {
    .dateBox{
      height: 40px;
      .grid-content{
        height: 100%;
        .el-date-editor{
          height: 100%;
          .el-range__icon,.el-range-input,.el-range-separator{
            font-size: 16px;
          }
          .el-range__icon{
            line-height: 6px;
          }
          .el-range-separator{
            line-height: 30px;
            margin: 0 10px;
          }
          .el-range-input{
            width: 33%;
          }
        }
      }
    }
  }

  @media only screen and (min-width: 1931px) {
    .dateBox{
      height: 70px;
      .grid-content{
        height: 100%;
        .el-date-editor{
          height: 100%;
          .el-range__icon,.el-range-input,.el-range-separator{
            font-size: 16px;
          }
          .el-range__icon{
            line-height: 6px;
          }
          .el-range-separator{
            line-height: 30px;
            margin: 0 10px;
          }
          .el-range-input{
            width: 50%;
          }
        }
      }
    }
  }
.el-pagination{
  display: inline-block;
}
  .el-picker-panel__footer>.el-button--text{
    display: none;
  }
</style>
