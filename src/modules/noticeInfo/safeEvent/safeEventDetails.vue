<template>
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <div style="width: 100%;height: 100%;overflow: hidden">
      <div style="height: 100%;" class="autoScroll">
        <ul class="details ">
          <li class="liTit">
            <span>事件名称：</span>
            <span style="width: 86%">{{infoList.eventName}}</span>
          </li>
          <li class="liTit">
            <span>责任部门：</span>
            <span>XXX</span>
          </li>
          <li class="liTit">
            <span>发生日期：</span>
            <span>{{infoList.createDate}}</span>
          </li>
          <li>
            <span class="style-B">事件描述：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">{{infoList.eventDesc}}</p>
            </div>
          </li>
          <li>
            <span class="style-B">关联风险因子：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">XXX</p>
            </div>
          </li>
          <li>
            <span class="style-B">风险相似度评价：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">XXX</p>
            </div>
          </li>
        </ul>
        <span class="goback" @click="closePanel">返回</span>
      </div>
    </div>
  </Prompt>
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
export default {
  name: 'safeEventDetails',
  data () {
    return {
      ProData: {
        title: '事件详情',
        show: false,
        width: '800px',
        height: '90%'
      },
      infoList: {},
      disposalPara: {},
      routerInfo: {},
      isDo: false
    }
  },
  components: {
    Prompt
  },
  methods: {
    IsShow (item, Router) {
      this.routerInfo = Router
      this.ProData.show = true
      this.disposalPara = item
      this.infoList = item
      // this.post(
      //   'RiskTopology/GetResultAlarmDetail',
      //   {
      //     param: JSON.stringify({ AID: item.aid })
      //   },
      //   function (res) {
      //     console.log('res', res)
      //     _this.infoList = res.data
      //   }
      // )
    },
    // 关闭面板
    closePanel () {
      this.ProData.show = false
    }
  },
  mounted () {}
}
</script>
<style lang="scss" scoped>
  .Hidd {
    overflow: hidden;
  }
  .details {
    width: 94%;
    margin: 20px auto;
    li {
      span {
        display: inline-block;
        height: 40px;
        line-height: 40px;
      }
      span.style-B {
        display: block;
      }
      .textarea {
        height: 66px;
        color: #fff;
        outline: none;
        border-radius: 5px;
        border: 1px solid #a7a7a7;
        background: rgba(255, 255, 255, 0.2);
        p {
          padding: 4px;
          word-break: break-all;
        }
      }
    }
    li.liTit{
      overflow: hidden;
      span{
        display: block;
        float: left;
      }
      span:nth-child(2){
        overflow: hidden;
      }
    }
  }
  .goback {
    float: right;
    display: inline-block;
    margin-right: 2%;
    height: 30px;
    padding: 0 8px;
    cursor: pointer;
    color: #fff;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background: #1e9fff;
  }
</style>
