<template>
  <div class="riskxq_warp">
    <div class="riskxq_title">
      <div class="title">风险详情</div>
      <div class="content">
        <!-- <div class="content1">
          <el-select v-model="value2">
            <el-option v-for="item in riskTypeData"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="content2">
          <!-- 搜索 -->
          <div class="time">
            <!-- <el-date-picker v-model="value"
                            type="datetimerange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker> -->
            <el-date-picker v-model="value7"
                            type="daterange"
                            :clearable="false"
                            :editable="false"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
            </el-date-picker>
          </div>
          <div class="ModelSelect"
               @click="search">搜索</div>
        </div>
      </div>
    </div>
    <div class="riskxq_content">
      <div class="listTitle">
        <div v-for="(item,index) in listTitle"
             :key="index">{{item}}</div>
      </div>
      <div class="listConBox">
        <ul class="autoScroll" style="width: calc(100% + 34px)" v-if="listDataLength !== 0">
          <li v-for='(item,index) in listdata'
              :key='index'>
            <div>{{item.rownum }}</div>
            <!--<div>{{item.number}}</div>-->
            <div class="Point" :title="item.riskfactor">{{item.riskfactor}}</div>
            <div>{{item.riskvalue}}</div>
            <div>{{item.deparent}}</div>
            <div>{{item.model}}</div>
            <div>{{item.risktype}}</div>
            <div class="Point" :title="item.riskfactortype">{{item.riskfactortype}}</div>
            <div>{{item.riskalarmtime}}</div>
            <div>{{item.riskstate}}</div>
            <div>{{item.acount}}</div>
            <div>{{item.optionman}}</div>
            <div>
              <span @click="watchDetail(item)">查看</span>
            </div>
          </li>
        </ul>
        <p class="noList" v-else>无记录</p>
      </div>
      <div style="height: 3em;position: relative;">
        <div class="riskxq_content1" >
          <div class="totalRight" v-if="listDataLength !== 0">
            <div class="textNum">共{{ listDataLength }}条数据</div>
            <div class="Pagination">
              <el-pagination @size-change="handleSizeChange"
                             @current-change="handleCurrentChange"
                             :current-page.sync="currentPage3"
                             :page-size="10"
                             layout="prev, pager, next, jumper"
                             :total="parseInt(listDataLength === undefined ? '0' : listDataLength)"
              >
              </el-pagination>
              <div class="jumpbutton">跳转</div>
            </div>
          </div>
          <div class="state">
            <!-- <div class="save"
                 @click="saveDel()">确认</div> -->
            <div class="cancel"
                 @click="cancelDel()">返回</div>
          </div>
        </div>
      </div>

    </div>
    <!--查看详情弹窗-->
    <SafetyDetails ref="Detail"></SafetyDetails>
  </div>
</template>
<script>
/*eslint-disable */
  import SafetyDetails from '../../../components/targetDetails/targetDetails.vue'
  import { mapState, mapActions } from "vuex";
  import RiskdiSposal from "../riskdisposal/Riskdisposal.vue";
  export default {
    components: {
      RiskdiSposal,
      SafetyDetails
    },
    created() {
      let _this=this
      _this.layer.load(1, {success: function (layero) {
          document.querySelector('.layui-layer-shade').style.height = '82%'
          document.querySelector('.layui-layer-shade').style.top = '17.8%'
        },
        content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.getAllRiskDetailFactor(this.getparams).then(data=>{
        _this.layer.closeAll()
      });
    },
    data() {
      return {
        value7: [new Date(), new Date()],
        middleV: [new Date(), new Date()],
        pickerOptions2: {
          shortcuts: [
            {
              text: "本日",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "本周",
              onClick(picker) {
                const end = new Date(); //当前日期
                const nowDayOfWeek = end.getDay() === 0 ? 7 : end.getDay() // 今天本周的第几天
                const nowDay = end.getDate() // 当前日
                const nowMonth = end.getMonth() === 0 ? 12 : end.getMonth()// 当前月
                let nowYear = end.getYear(); //当前年
                nowYear += nowYear < 2000 ? 1900 : 0;
                const start = new Date(
                  nowYear,
                  nowMonth,
                  nowDay - nowDayOfWeek + 1
                );
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "本月",
              onClick(picker) {
                const end = new Date();
                // const start = new Date();
                const Nowdate = new Date();
                const start = new Date(
                  Nowdate.getFullYear(),
                  Nowdate.getMonth(),
                  1
                );
                // start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit("pick", [start, end]);
              }
            },
            {
              text: "本年",
              onClick(picker) {
                const end = new Date();
                var start = new Date(end.getFullYear(), 0, 1);
                picker.$emit("pick", [start, end]);
              }
            }
          ]
        },
        listTitle: [
          "序号",
          // "编号",
          "风险因子",
          "风险值",
          "部门",
          "模块",
          "风险类型",
          "风险因子类型",
          "风险报警时间",
          "风险状态",
          "报警次数",
          "最后操作",
          "操作"
        ],
        currentPage3: 1,
        riskdiShow: false,
        activeMouKey: 0,
        pageSizeData: 10
      };
    },
    computed: {
      ...mapState("RiskStore", ["allRiskDetailFactor"]),
      listDataLength() {
        return (
          this.allRiskDetailFactor &&
          this.allRiskDetailFactor !== undefined &&
          this.allRiskDetailFactor !== null &&
          this.allRiskDetailFactor.totalCount &&
          this.allRiskDetailFactor.totalCount
        );
      },
      pageTotal() {
        return  (
          this.allRiskDetailFactor &&
          this.allRiskDetailFactor !== undefined &&
          this.allRiskDetailFactor !== null &&
          this.allRiskDetailFactor.totalCount &&
          Math.ceil(Number(this.allRiskDetailFactor.totalCount) / 10)
        )

      },
      listdata() {
        return (
          this.allRiskDetailFactor &&
          this.allRiskDetailFactor !== undefined &&
          this.allRiskDetailFactor !== null &&
          this.allRiskDetailFactor.listData &&
          this.allRiskDetailFactor.listData
        );
      },
      getparams() {
        let start = this.GMTToStr(this.middleV[0]);

        let end = this.GMTToStr(this.middleV[1]);

        let params = JSON.stringify({
          modelType: String(this.$route.query.modelType),
         treeId: String(this.$route.query.treeId),
          pageSize: String(this.pageSizeData), //每页大小
          pageIndex: String(this.currentPage3), //第几页
          beginDate: String(start),
          endDate: String(end)
        });
        return params;
      }
    },

    methods: {
      ...mapActions("RiskStore", ["getAllRiskDetailFactor"]),
      //格林时间  转为   2018-07-02
      GMTToStr(time) {
        let date = new Date(time);
        let month = date.getMonth() + 1;
        if (month < 10) {
          month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
          day = "0" + day;
        }
        let Str = date.getFullYear() + "-" + month + "-" + day;
        return Str;
      },
      search() {
        let _this=this
        _this.middleV = _this.value7
        this.currentPage3=1
        _this.layer.load(1, {success: function (layero) {
            document.querySelector('.layui-layer-shade').style.height = '82%'
            document.querySelector('.layui-layer-shade').style.top = '17.8%'
          },
          content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
        this.getAllRiskDetailFactor(this.getparams).then(data=>{
          _this.layer.closeAll()
        });
      },
      cancelDel() {
        this.$router.push({
          path: "/Application/RiskDetails",
          query: {
            modelType: this.$route.query.modelType,
            treeId: this.$route.query.treeId,
            name:this.$route.query.name,
            value:this.$route.query.value
          }
        });
      },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        let _this=this
        _this.layer.load(1, {success: function (layero) {
            document.querySelector('.layui-layer-shade').style.height = '82%'
            document.querySelector('.layui-layer-shade').style.top = '17.8%'
          },
          content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
        this.getAllRiskDetailFactor(this.getparams).then(data=>{
          _this.layer.closeAll()
        });
      },
      riskClose() {
        this.riskdiShow = false;
      },
      selectMoun(item) {
        this.activeMouKey = item;
      },
      watchDetail (item) {
        item.kid = item.number
        this.$refs.Detail.IsShow(item) // 查看详情弹框显示
      }
    },
    mounted: function () {
    }
  };
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.Point{
  cursor: pointer;
}
.noList {
  padding-top: 20%;
  text-align: center;
  color: #f8f8f8;
}

.riskxq_warp{
  min-width: 1024px;
  min-height: 400px;
  .riskxq_content{
    .listTitle{
      width: 100%;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      div{
        margin-right: 8px;
      }
    }
    ul{
      height: 100%;
      li{
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        div{
          margin-right: 8px;
        }
        div:nth-last-child(1) {
          span {
            cursor: pointer;
          }
        }
      }
    }
  }
  .riskxq_content{
    &1 {
      @include size(100%, 30px);
      bottom: 6%;
      float: left;
    /*  display: flex;*/
      justify-content: space-around;
      .textNum {
        @include size(15%, 100%);
        text-align: center;
        line-height: 30px;
        color: #f2f2f2;
        font-size: 14px;
      }
      .Pagination {
        @include size(100%, 100%);
       /* display: flex;*/
        .jumpbutton{
          float: left;
          margin-left: 24px;
          margin-top: 4px;
          width: 50px;
          height: 28px;
          color: #fff;
          font-size: 14px;
          line-height: 28px;
          text-align: center;
          border-radius: 5px;
          background-color: #0096ff;
          border: #0096ff 0px solid;
          cursor: pointer;
        }
      }
      .state {
        @include size(14%, 100%);
        color: rgba(255, 255, 255, 0.7);
        font-size: 12px;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #fff;
        text-align: center;
        .save {
          @include size(60px, 30px);
          line-height: 30px;
          background: #0096ff;
          border-radius: 4px;
          float: right;
          cursor: pointer;
          margin-right: 15px;
        }
        .cancel {
          @include size(60px, 30px);
          line-height: 30px;
          background: #c2c3c4;
          border-radius: 4px;
          float: right;
          cursor: pointer;
        }
      }
    }
  }
}

.state {
  position: absolute;
  right: 6%;
}
.totalRight {
  width: 74%;
  position: absolute;
  left: 2%;
  .Pagination {
    position: absolute;
    top: 0;
    left: 14%;
    .el-pagination{
      float: left;
    }
  }
}

@media only screen and (max-width: 1290px) {
  .riskxq_warp {
    @include size(95%, 100%);
    min-width: 1024px;
    min-height: 400px;
    background: url("../../../assets/images/bj.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    .riskxq_content1 {
      position: absolute;
      bottom: 70px;
    }
    .riskxq_title {
      @include size(100%, 5em);
      box-sizing: border-box;
      padding: 0% 0 0px 5%;
      .title {
        @include size(100%, 40px);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
      }
      .content {
        @include size(95%, 50%);
      /*  display: flex;*/
        justify-content: space-between;
        &1 {
          div {
            height: 100%;
            padding: 15px 40px;
            line-height: 80%;
            float: left;
            text-align: center;
            color: #f2f2f2;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;
          }
          .activeMou {
            box-sizing: border-box;
            border-top: 1px solid #0096ff;
            border-left: 1px solid #0096ff;
            border-right: 1px solid #0096ff;
            background: url("../../../assets/images/mount.png") no-repeat center
            center;
            background-size: 100% 100%;
          }
        }
        &2 {
          .time {
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #0096ff;
            // border-left: 1px solid #0096ff;
            // border-right: 1px solid #0096ff;
            float: left;
          }
          .ModelSelect {
            box-sizing: border-box;
            text-align: center;
            color: #cecece;
            background: #0096ff;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            float: left;
            line-height: 32px;
            width: 80px;
            margin-left: 10px;
          }
        }
      }
    }
    .riskxq_content {
      @include size(100%, calc(100% - 6.5em));
      box-sizing: border-box;
      border: 1px solid #0096ff;
      box-sizing: border-box;
      padding: 0 2%;
      .listTitle {
        height: auto;
        overflow: hidden;
        div {
          width:calc(12.7% - 66.7px);
          float: left;
          text-align: center;
          color: #cccccc;
          font-size: 14px;
          box-sizing: border-box;
          padding: 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(2),div:nth-child(7){
          width: 10%;
        }
        div:nth-child(8){
          width: 140px;
        }
        div:nth-child(1),div:nth-child(3),div:last-child{
          width: 50px;
        }
      }
      .listConBox{
        width: calc(100% - 17px);
        overflow: hidden;
        height: calc(100% - 6em);
      }
      ul {
        height: 100%;
        list-style: none;
        color: #f2f2f2;
        font-size: 12px;
        li {
          height: auto;
          box-sizing: border-box;
          div {
            width:calc(12.7% - 66.7px);
            float: left;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
          }
          div:nth-child(2),div:nth-child(7){
            width: 10%;
          }
          div:nth-child(8){
            width: 140px;
          }
          div:nth-child(1),div:nth-child(3),div:last-child{
            width: 50px;
          }
        }
      }
      &1 {
        @include size(100%, 30px);
        bottom: 6%;
        float: left;
       /* display: flex;*/
        justify-content: space-around;
        .textNum {
          @include size(15%, 100%);
          text-align: center;
          line-height: 30px;
          color: #f2f2f2;
          font-size: 14px;
        }
        .Pagination {
          @include size(100%, 100%);
        /*  display: flex;*/
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
        }
        .state {
          @include size(14%, 100%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          font-size: 14px;
          color: #fff;
          text-align: center;
          .save {
            @include size(60px, 30px);
            line-height: 30px;
            background: #0096ff;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-right: 15px;
          }
          .cancel {
            @include size(60px, 30px);
            line-height: 30px;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
    .riskdi {
      @include size(100%, 100%);
      position: absolute;
      top: 0;
      // background: goldenrod;
    }
  }
}

@media only screen and (min-width: 1291px) and (max-width: 1376px) {
  .riskxq_warp {
    @include size(95%, 100%);
    background: url("../../../assets/images/bj.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    .riskxq_title {
      @include size(100%, 5em);
      box-sizing: border-box;
      padding: 0% 0 0px 5%;
      .title {
        @include size(100%, 40px);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
      }
      .content {
        @include size(95%, 50%);
      /*  display: flex;*/
        justify-content: space-between;
        &1 {
          div {
            height: 100%;
            padding: 15px 40px;
            line-height: 80%;
            float: left;
            text-align: center;
            color: #f2f2f2;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;
          }
          .activeMou {
            box-sizing: border-box;
            border-top: 1px solid #0096ff;
            border-left: 1px solid #0096ff;
            border-right: 1px solid #0096ff;
            background: url("../../../assets/images/mount.png") no-repeat center
              center;
            background-size: 100% 100%;
          }
        }
        &2 {
          .time {
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #0096ff;
            // border-left: 1px solid #0096ff;
            // border-right: 1px solid #0096ff;
            float: left;
          }
          .ModelSelect {
            box-sizing: border-box;
            text-align: center;
            color: #cecece;
            background: #0096ff;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            float: left;
            line-height: 32px;
            width: 80px;
            margin-left: 10px;
          }
        }
      }
    }
    .riskxq_content {
      @include size(100%, calc(100% - 6.5em));
      box-sizing: border-box;
      border: 1px solid #0096ff;
      box-sizing: border-box;
      padding: 0 2%;
      .listTitle {
        height: auto;
        overflow: hidden;
        div {
          width: 6.1%;
          float: left;
          text-align: center;
          color: #cccccc;
          font-size: 14px;
          box-sizing: border-box;
          padding: 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(2),div:nth-child(7){
          width: 180px;
        }
        div:nth-child(6){
          width: 62px;
        }
        div:nth-child(8){
          width: 120px;
        }
        div:nth-child(1),div:nth-child(3),div:last-child{
          width: 50px;
        }
      }
      .listConBox{
        width: calc(100% -  17px);
        overflow: hidden;
        height: calc(100% - 6em);
      }
      ul {
        height: 100%;
        list-style: none;
        color: #f2f2f2;
        font-size: 12px;
        li {
          height: auto;
          box-sizing: border-box;
          div {
            width: 6.1%;
            float: left;
            height: 36px;
            line-height: 36px;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
          }
          div:nth-child(2),div:nth-child(7){
            width: 180px;
          }
          div:nth-child(6){
            width: 62px;
          }
          div:nth-child(8){
            width: 120px;
          }
          div:nth-child(1),div:nth-child(3),div:last-child{
            width: 50px;
          }
        }
      }
      &1 {
        @include size(100%, 30px);
        bottom: 6%;
        float: left;
       /* display: flex;*/
        justify-content: space-around;
        .textNum {
          @include size(15%, 100%);
          text-align: center;
          line-height: 30px;
          color: #f2f2f2;
          font-size: 14px;
        }
        .Pagination {
          @include size(100%, 100%);
        /*  display: flex;*/
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
        }
        .state {
          @include size(14%, 100%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          font-size: 14px;
          color: #fff;
          text-align: center;
          .save {
            @include size(60px, 30px);
            line-height: 30px;
            background: #0096ff;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-right: 15px;
          }
          .cancel {
            @include size(60px, 30px);
            line-height: 30px;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
    .riskdi {
      @include size(100%, 100%);
      position: absolute;
      top: 0;
      // background: goldenrod;
    }
  }
}
@media only screen and (min-width: 1375px) and (max-width: 1376px) {
  .riskxq_warp{
    .riskxq_title {
      @include size(100%, 6.5em);
    }
    .riskxq_content{
      @include size(100%, calc(100% - 8em));
      .listTitle{
        div{
          width: 80px;
        }
        div:nth-child(6) {
          width: 13%;
        }
        div:nth-child(8) {
          width: 12%;
        }
      }
      ul{
        li{
          div{
            width: 80px;
          }
          div:nth-child(6) {
            width: 13%;
          }
          div:nth-child(8) {
            width: 12%;
          }
          div:nth-last-child(1) {
            span {
              cursor: pointer;
            }
          }
        }
      }
    }
    .riskxq_content1{
     /* position: fixed;*/
      bottom: 4%;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .riskxq_warp {
    @include size(95%, 100%);
    background: url("../../../assets/images/bj.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    .riskxq_title {
      @include size(100%, 6.5em);
      box-sizing: border-box;
      padding: 0 0 0px 5%;
      .title {
        @include size(100%, 40px);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 40px;
      }
      .content {
        @include size(95%, 47%);
       /* display: flex;*/
        justify-content: space-between;
        &1 {
          div {
            height: 100%;
            padding: 15px 40px;
            line-height: 80%;
            float: left;
            text-align: center;
            color: #f2f2f2;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;
          }
          .activeMou {
            box-sizing: border-box;
            border-top: 1px solid #0096ff;
            border-left: 1px solid #0096ff;
            border-right: 1px solid #0096ff;
            background: url("../../../assets/images/mount.png") no-repeat center
              center;
            background-size: 100% 100%;
          }
        }
        &2 {
          .time {
            border-radius: 4px;
            box-sizing: border-box;
            border: 1px solid #0096ff;
            border-left: 1px solid #0096ff;
            border-right: 1px solid #0096ff;
            float: left;
          }
          .ModelSelect {
            box-sizing: border-box;
            padding: 15px 30px;
            line-height: 80%;
            text-align: center;
            color: #cecece;
            background: #0096ff;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            float: left;
            margin-left: 10px;
          }
        }
      }
    }
    .riskxq_content {
      @include size(100%, calc(100% - 8em));
      box-sizing: border-box;
      border: 1px solid #0096ff;
      box-sizing: border-box;
      padding: 0 2%;
      margin-top: -10px;
      .listTitle {
        height: auto;
        overflow: hidden;
        div {
          width: 7%;
          float: left;
          text-align: center;
          color: #cccccc;
          font-size: 16px;
          box-sizing: border-box;
          padding: 10px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        div:nth-child(1),div:nth-child(3),div:last-child{
          width: 60px;
        }
        div:nth-child(2),div:nth-child(7){
          width: 128px;
        }
        div:nth-child(8){
          width: 160px;
        }
      }
      .listConBox{
        width: calc(100% - 17px);
        overflow: hidden;
        height: calc(100% - 6em);
      }
      ul {
        list-style: none;
        color: #f2f2f2;
        float: left;
        font-size: 14px;
        li {
          height: auto;
          box-sizing: border-box;
          div {
            width: 7%;
            float: left;
            height: 46px;
            line-height: 46px;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
          }
          div:nth-child(1),div:nth-child(3),div:last-child{
            width: 60px;
          }
          div:nth-child(2),div:nth-child(7){
            width: 128px;
          }
          div:nth-child(8){
            width: 160px;
          }
        }
      }
      &1 {
        @include size(100%, 30px);
       /* margin-top: 3%;*/
        float: left;
       /* display: flex;*/
        justify-content: space-around;
        // background: #0096ff;
        .textNum {
          @include size(15%, 100%);
          text-align: center;
          line-height: 30px;
          color: #f2f2f2;
          font-size: 16px;
        }
        .Pagination {
          @include size(auto, 100%);
         /* display: flex;*/
          .jumpbutton{
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
        }
        .state {
          @include size(14%, 100%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          font-size: 14px;
          color: #fff;
          text-align: center;
          .save {
            @include size(80px, 38px);
            line-height: 38px;
            background: #0096ff;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-right: 5%;
          }
          .cancel {
            @include size(80px, 38px);
            line-height: 38px;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
    .riskdi {
      @include size(100%, 100%);
      position: absolute;
      top: 0;
      // background: goldenrod;
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .riskxq_warp {
    @include size(96.3%, 100%);
    background: url("../../../assets/images/bj.png") no-repeat center center;
    background-size: 100% 100%;
    margin: 0 auto;
    /*position: relative;*/
    .riskxq_title {
      @include size(100%,5em);
      box-sizing: border-box;
      padding: 5px 0 0px 70px;
      position: relative;
      .title {
        @include size(100%, auto);
        color: #fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        /*line-height: 56px;*/
      }
      .content {
        @include size(95%, 42px);
        position: absolute;
        bottom: 0;
       /* display: flex;*/
        justify-content: space-between;
        &1 {
          div {
            @include size(107px, 42px);
            float: left;
            text-align: center;
            line-height: 42px;
            color: #f2f2f2;
            font-size: 16px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;
          }
          .activeMou {
            box-sizing: border-box;
            border: 1px solid #0096ff;
            border-bottom: none;
            background: url("../../../assets/images/mount.png") no-repeat center
              center;
            background-size: 100% 100%;
          }
        }
        &2 {
         /* display: flex;*/
          justify-content: space-between;
          .time,.ModelSelect{
            float: left;
          }
          .time {
            @include size(350px, 42px);
            border-radius: 4px;
            border: 1px solid #0096ff;
          }
          .ModelSelect {
            @include size(102px, 42px);
            text-align: center;
            line-height: 42px;
            color: #cecece;
            background: #0096ff;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            margin-left: 10px;
          }
        }
      }
    }
    .riskxq_content {
      @include size(100%, calc(100% - 6.5em));
      box-sizing: border-box;
      border: 1px solid #0096ff;
      padding: 0 2%;
      position: relative;
      margin-top: 15px;

      .listTitle {
        height: 56px;
        overflow: hidden;
        div {
          width:calc(16.5% - 151.7px);
          float: left;
          text-align: center;
          line-height: 55px;
          color: #cccccc;
          font-size: 16px;
        }
        div:nth-child(2){
          width: 180px;
        }
        div:nth-child(1),div:nth-child(3),div:last-child{
          width: 80px;
        }
        div:nth-child(7){
          width: 200px;
        }
        div:nth-child(8){
          width: 184px;
        }
      }
      .listConBox{
        width: 100%;
        overflow: hidden;
        height: calc(100% - 6em);
      }
      ul {
        list-style: none;
        color: #f2f2f2;
        font-size: 14px;
        li {
          height: 60px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          div {
            overflow: hidden;
            text-overflow: ellipsis;
            width:calc(16.5% - 154.5px);
            float: left;
            height: 60px;
            box-sizing: border-box;
            line-height: 60px;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          div:nth-child(2){
            width: 180px;
          }
          div:nth-child(1),div:nth-child(3),div:last-child{
            width: 80px;
          }
          div:nth-child(7){
            width: 200px;
          }
          div:nth-child(8){
            width: 184px;
          }
        }
      }
      &1 {
        @include size(92%, 38px);
        /*position: absolute;*/
        /*top: 700px;*/
        .textNum {
          @include size(120px, 38px);
          text-align: center;
          line-height: 30px;
          color: #f2f2f2;
          font-size: 20px;
          position: absolute;
          left: 30px;
        }
        .Pagination {
          width: 800px;
          height: 42px;
          margin: 0 auto;
         /* display: flex;*/
          .jumpbutton{
            float: left;
            margin-left: 24px;
            margin-top: 4px;
            width: 50px;
            height: 28px;
            color: #fff;
            font-size: 14px;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
        }
        .state {
          @include size(auto, 42px);
          position: absolute;
          top: 0px;
          right: 0px;
          div {
            @include size(70px, 35px);
            font-size: 14px;
            line-height: 35px;
            text-align: center;
            border-radius: 4px;
            color: #fff;
            cursor: pointer;
            float: left;
          }
          .save {
            background: #0096ff;
            margin-right: 20px;
          }
          .cancel {
            background: #c2c3c4;
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1931px) {
  .riskxq_warp {
    @include size(95%, 100%);
    background: url("../../../assets/images/bj.png") no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    margin: 0 auto;
    .riskxq_title {
      @include size(100%, 15%);
      box-sizing: border-box;
      padding: 2% 0 0 5%;
      .title {
        @include size(100%, 100px);
        color: #fff;
        font-size: 34px;
        font-weight: 100;
        text-align: left;
        line-height: 100px;
      }
      .content {
        @include size(95%, 50%);
      /*  display: flex;*/
        justify-content: space-between;
        &1 {
          div {
            width: 200px;
            height: 80px;
            margin-top: 30px;
            line-height: 80px;
            float: left;
            text-align: center;
            color: #f2f2f2;
            font-size: 30px;
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            cursor: pointer;
          }
          .activeMou {
            box-sizing: border-box;
            // border-top: 1px solid #0096ff;
            // border-left: 1px solid #0096ff;
            // border-right : 1px solid #0096ff;
            // background: rgba()
            background: url("../../../assets/images/11-01.png") no-repeat center
              center;
            // background:url('../../../assets/images/mount.png') no-repeat center center;
            background-size: 100% 100%;
          }
        }
        &2 {
          .time {
            // width:680px;
            // margin-top: 22px;
            border-radius: 8px;
            box-sizing:border-box;
            border: 1px solid #0096ff;
            // border-left: 1px solid #0096ff;
            // border-right: 1px solid #0096ff;
            float: left;
          }
          .ModelSelect {
            // margin-top: 26px;
            margin-left: 10px;
            width: 150px;
            height: 80px;
            box-sizing: border-box;
            line-height: 80px;
            text-align: center;
            color: #cecece;
            background: #0096ff;
            border-radius: 8px;
            font-size: 30px;
            cursor: pointer;
            float: left;
          }
        }
      }
    }
    .riskxq_content {
      @include size(100%,calc(100% - 6.5em));
      box-sizing: border-box;
      border: 1px solid #0096ff;
      box-sizing: border-box;
      padding: 0 2%;
      margin-top: 24px;
      .listTitle {
        height: auto;
        overflow: hidden;
        div {
          width: 8%;
          float: left;
          text-align: center;
          color: #cccccc;
          font-size: 32px;
          box-sizing: border-box;
          padding: 20px 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .listConBox{
        overflow: hidden;
        height: calc(100% - 6em);
      }
      ul {
        @include size(102%, 100%);
        list-style: none;
        color: #f2f2f2;
        font-size: 28px;
        li {
          height: auto;
          box-sizing: border-box;
          div {
            float: left;
            height: 78px;
            line-height: 78px;
            box-sizing: border-box;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            box-sizing: border-box;
          }
        }
      }
      &1 {
        @include size(100%, 100px);
        margin-top: 3%;
        float: left;
       /* display: flex;*/
        justify-content: space-around;
        .textNum {
          @include size(15%, 42px);
          text-align: center;
          line-height: 32px;
          color: #f2f2f2;
          font-size: 30px;
        }
        .Pagination {
          @include size(50%, 100%);
       /*   display: flex;*/
          .jumpbutton{
            margin-left: 24px;
            // margin-top: 4px;
            width: 80px;
            height: 40px;
            color: #fff;
            font-size: 24px;
            line-height: 40px;
            text-align: center;
            border-radius: 5px;
            background-color: #0096ff;
            border: #0096ff 0px solid;
            cursor: pointer;
          }
        }
        .state {
          @include size(14%, 100%);
          color: rgba(255, 255, 255, 0.7);
          font-size: 12px;
          box-sizing: border-box;
          text-align: center;
          font-size: 30px;
          color: #fff;
          text-align: center;
          .save {
            @include size(130px, 60px);
            line-height: 60px;
            background: #0096ff;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-right: 5%;
          }
          .cancel {
            @include size(130px, 60px);
            line-height: 60px;
            background: #c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
    .riskdi {
      @include size(100%, 100%);
      position: absolute;
      top: 0;
      // background: goldenrod;
    }
  }
}
</style>
<style lang="scss">
@media only screen and (max-width: 1376px) {
  .el-range-editor.el-input__inner{
    height: 30px;
  }
  .el-date-editor .el-range__icon,
  .el-date-editor .el-range-separator{
    line-height:26px;
  }
}
@media only screen and (min-width: 1931px) and (max-width: 2570px) {
  .riskxq_content1 {
    //分页标签
    .el-icon-arrow-left,
    .el-icon-arrow-right,
    .el-pager li,
    .el-pagination span:not([class*="suffix"]) {
      font-size: 32px !important;
      height: 32px !important;
    }
    .el-pagination__editor.el-input .el-input__inner {
      font-size: 32px !important;
      height:32px;
    }
    .el-pagination span{
      letter-spacing: 10px;
    }
    .el-select .el-input .el-select__caret{
      line-height: 80px;
    }
    .el-pagination button, .el-pagination span:not([class*=suffix]){
      font-size:32px !important;
    }
  }
}
</style>
