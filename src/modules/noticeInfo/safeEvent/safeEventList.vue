<template>
<div class="safeEventBox">
  <div class="title">
    <search-box style="width: 43em;display: inline-block;max-width: calc(100% - 5em);">
      <search-item style="width: 28em;">
        <el-date-picker style="width: 100%;display: inline-block;vertical-align: middle;"
                        v-model="searchParam.dateRange"
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
      </search-item>
      <search-item style="width: 14em;">
        <mw-input class="searchKey" v-model="searchParam.searchKey" placeholder="请输入事件关键字查询"></mw-input>
      </search-item>
    </search-box>
    <search-btn @click="search"></search-btn>
  </div>
  <div class="eventContent">
    <div style="max-height: calc(100% - 4em);height:100%;width: 100%;overflow: hidden;position: relative;">
      <table-simple class="safeEventTable"
                    :table-data="tableData"
                    :useSerialNumber="true"
                    :serial-number-name="'序号'"
                    :use-zebra="true"
                    :use-operate="true"
                    :operate-width="'8%'"
      >
        <span class="detail" slot-scope="scope" @click="forDetail(scope.row)">查看详情</span>
      </table-simple>
    </div>
<div style="height: 4em;width: 100%;line-height: 4em;">
  <div style="max-width: calc(100% - 4em);display: inline-block;vertical-align: middle;">
    <el-pagination style="display: inline-block;vertical-align: middle;height: 2em;" @current-change="handleCurrentChange"
                   :current-page="currentPage"
                   :page-size="pageInfo.pageSize"
                   :pager-count="pagerCount"
                   layout="total,prev, pager, next, jumper"
                   :total="parseInt(pageInfo.totalCount === undefined ? '0' : pageInfo.totalCount)">
    </el-pagination>
  </div>
  <div style="display: inline-block;width: 3.9em;vertical-align: middle;"> <span class="toBtn">跳转</span></div>
</div>

  </div>
  <safe-event-details ref="safeDetail"></safe-event-details>
</div>
</template>

<script>
import SearchBox from '../../../components/common/searchBox'
import SearchItem from '../../../components/common/searchItem'
import MwInput from '../../../components/common/mw-input'
import TableSimple from '../../../components/table/table-simple'
import SearchBtn from '../../../components/common/button/searchBtn'
import SafeEventDetails from './safeEventDetails'
export default {
  name: 'safeEventList',
  components: {SafeEventDetails, SearchBtn, TableSimple, MwInput, SearchItem, SearchBox},
  data () {
    return {
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
        dateRange: ['2018-08-31 00:00:00', '2018-08-31 13:18:30'],
        searchKey: ''
      },
      activeParam: {
        startDate: '',
        endDate: '',
        pKey: ''
      },
      tableData: {
        colum: [
          {
            title: '事件名称',
            data: 'eventName',
            width: '15%'
          },
          {
            title: '事件描述',
            data: 'eventDesc',
            width: 'auto'
          },
          {
            title: '风险相似度',
            data: 'similarityDegree',
            width: '8em'
          },
          {
            title: '发生日期',
            data: 'createDate',
            width: '13em'
          }
        ],
        data: [
          {eventName: '不安全事件1', eventDesc: '有炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件2', eventDesc: '有恐怖分子', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'}, {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},

          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件3', eventDesc: '有恐怖分子背着炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件4', eventDesc: '有恐怖分子引爆炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'},
          {eventName: '不安全事件5', eventDesc: '有炸弹', similarityDegree: '99%', createDate: '2015-12-01 08:56:37'}
        ]
      },
      currentPage: 1,
      pagerCount: 11,
      pageInfo: {
        pageSize: 10,
        totalCount: 1000000000
      }
    }
  },
  methods: {
    forDetail (item) {
      this.$refs.safeDetail.IsShow(item)
      console.log(item)
    },
    search () {
      this.activeParam = {
        startDate: this.searchParam.dateRange[0],
        endDate: this.searchParam.dateRange[1],
        pKey: this.searchParam.searchKey
      }
      this.currentPage = 1
      this.loadData()
    },
    TimeFun () {
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.loadData()
    },
    loadData () {
      let param = this.activeParam
      param.curPage = this.currentPage
      param.pageSize = this.pageInfo.pageSize
      console.log('请加载这些参数的的数据：' + JSON.stringify(param))
    }
  },
  mounted () {
    this.search()
  }
}
</script>
<style>
  .safeEventTable .table-head  thead th{
    background-color: rgba(45, 53, 86,0.5);
  }
</style>
<style scoped>
  .safeEventBox{
    width: 98%;
    height: 100%;
    margin: 0 auto;
  }
  .searchKey{
    background-color: #2b3454;;
    color: white;
    font-size: 15px;
    border: 1px solid  #2b3454;
    height: 40px;
    border-radius: 5px;
  }
  .title{
    width: 100%;
    height: 3em;
  }
  .safeEventTable{
    text-align: center;
    font-size: 18px;
  }
  .eventContent{
    height: calc(100% - 5em);
    overflow: hidden;
    padding-top: 0.4em;
  }
  .detail{
    cursor: pointer;
  }
  .toBtn{
    color: #fff;
    width: 100%;
    height: 2em;
    line-height: 2em;
    font-size: 0.8em;
    text-align: center;
    background: deepskyblue;
    border-radius: 4px;
    display: inline-block;
    cursor: pointer;
    vertical-align: middle;
  }
  @media only screen and (max-width: 1376px){
    .searchKey{
      font-size: 13px;
      height: 30px;
    }
    .safeEventTable{
      font-size: 15px;
    }
  }
</style>
