<template>
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <div class="detailsTxt">
      <div class="basic">
        <ul class="basic_ul">
          <li>
            <span>指标名称：</span>
            <span class="input">引导员资质</span>
          </li>
          <li>
            <span>视图类型：</span>
            <span class="input">管理视图</span>
          </li>
          <li>
            <span>指标类型：</span>
            <span class="input">人员</span>
          </li>
          <li>
            <span>报警等级：</span>
            <span class="input">黄色报警</span>
          </li>
          <li>
            <span>当前分值：</span>
            <span class="input">5</span>
          </li>
        </ul>
        <p class="line"></p>
        <ul class="basic_ul">
          <li>
            <span>历史报警总数：</span>
            <span class="input">XXX</span>
          </li>
          <li>
            <span>未处置报警总数：</span>
            <span class="input">XXX</span>
          </li>
          <li>
            <span>平均响应时间：</span>
            <span class="input">XXX</span>
          </li>
          <li>
            <span>事件处置闭环率：</span>
            <span class="input">XXX</span>
          </li>
          <li>
            <span>本月报警总数：</span>
            <span class="input">XXX（同比上升XX%）</span>
          </li>
        </ul>
      </div>
      <div class="details">
        <p class="tit">
          <span>待处置报警</span>
        </p>
        <ul class="details_ul">
          <table-simple :table-data="tableData"
                        :useSerialNumber="true"
                        :serial-number-name="'序号'"
                        :use-zebra="true">
          </table-simple>
        </ul>
      </div>
    </div>
  </Prompt>
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
import TableSimple from '../../../components/table/table-simple.vue'
export default {
  data () {
    return {
      ProData: {
        title: '指标详情',
        show: false,
        width: '60em',
        height: '40em'
      },
      tableData: {
        colum: [
          {
            title: '报警等级',
            data: '高风险',
            width: 'auto'
          },
          {
            title: '风险值',
            data: '9',
            width: '4em'
          },
          {
            title: '风险报警时间',
            data: '2018.11.11 16.07.05',
            width: '8em'
          },
          {
            title: '报警描述',
            data: 'XXXXXXXXXXXXXXX',
            width: '6em'
          },
          {
            title: '风险详情',
            data: 'XXXXXXXXX'
          },
          {
            title: '问题描述',
            data: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
          }
        ],
        data: [
          {ll: '12', fke: '字段2'}
        ]
      }
    }
  },
  components: {
    Prompt,
    TableSimple
  },
  methods: {
    IsShow: function () {
      this.ProData.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .line{
    border-bottom: 1px solid rgba(255,255,255,0.2);
  }
  .tit{
    border-top: 1px solid #fff;
    span{
      margin-top: 18px;
      display: inline-block;
      width: 90px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      border-radius: 3px;
    }
  }
  .detailsTxt{
    margin: 0 auto;
    padding: 0 20px 60px 20px;
    .basic{
      margin-bottom: 20px;
      &_ul{
        margin: 20px 0 0 5%;
        overflow: hidden;
      }
    }
    .basic{
      &_ul{
        li{
          width: 50%;
          span{
            display: inline-block;
            font-size: 14px;
          }
          .input{
            @include size(50%,30px);
            line-height: 30px;
            padding: 0 4px;
            border: none;
            color: #fff;
            vertical-align: middle;
          }
        }
        li:nth-child(2n + 1){
          float: left;
        }
        li:nth-child(2n){
          float: right;
        }
      }
    }
    .details{
      margin-bottom: 20px;
      &_ul{
        margin: 8px 0 0 0;
        overflow: hidden;
        li{
          float: left;
          width: 25%;
          p{
            font-size: 13px;
          }
          p.tip{
            background: url('../../../assets/images/sort-up-active-nomal-icon.png') no-repeat left/10px 5px;
            i{
              padding: 0 10px 0 20px;
              font-style: normal;
              color: #0096ff;
            }
          }
          span{
            font-size: 26px;
          }
        }
      }
    }
  }
</style>
