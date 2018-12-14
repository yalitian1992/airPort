<template>
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <div style="width: 100%;height: 100%;overflow: hidden">
      <div style="height: 100%;" class="autoScroll">
        <ul class="details">
          <li class="liTit">
            <span>报警指标：</span>
            <span style="width: 86%;">{{infoList.FactorName}}</span>
          </li>
          <li class="liTit">
            <span>报警等级：</span>
            <span>{{infoList.AlarmType}}</span>
          </li>
          <li class="liTit">
            <span>报警时间：</span>
            <span>{{infoList.AlarmTime}}</span>
          </li>
          <li>
            <span class="style-B">报警描述：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">{{infoList.AlarmReason}}</p>
            </div>
          </li>
          <li>
            <span class="style-B">风险详情：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">{{infoList.RiskDetail}}</p>
            </div>
          </li>
          <li>
            <span class="style-B">问题描述：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">{{infoList.Problem}}</p>
            </div>
          </li>
          <li v-show="isDo">
            <span class="style-B" >处置结果：</span>
            <div class="Hidd textarea">
              <p class="autoScroll">{{infoList.Problem}}</p>
            </div>
          </li>
        </ul>
        <span class="goback" v-if="routerInfo.name !== 'security'" @click="goDisposal(disposalPara)" v-show="!isDo">处置</span>
        <span class="goback" v-if="routerInfo.name !== 'security'" @click="closePanel" v-show="isDo">返回</span>
      </div>
    </div>
  </Prompt>
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
export default {
  data () {
    return {
      ProData: {
        title: '报警信息详情',
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
      let _this = this
      console.log('item', item)
      this.routerInfo = Router
      if (this.routerInfo.name !== 'security') {
        if (item.ALARM_DOSTATUS !== '0') {
          this.isDo = true
        } else {
          this.isDo = false
        }
      } else {
        // 部门统计页
        if (item.riskstate === '已处置/已缓解') {
          this.isDo = true
        } else {
          this.isDo = false
        }
      }
      this.ProData.show = true
      this.disposalPara = item
      this.infoList = item
      this.post(
        'RiskTopology/GetResultAlarmDetail',
        {
          param: JSON.stringify({ AID: item.aid })
        },
        function (res) {
          console.log('res', res)
          _this.infoList = res.data
        }
      )
    },
    // 跳转处置页
    goDisposal (item) {
      let _this = this
      _this.layer.load(1, {
        content:
          '<div style="width:100px;height:100px;position:relative;left:-0.5em;z-index:-100;top:2.5em">加载中...</div>'
      })
      this.post(
        'RiskTopology/UptBciaResultAlarmState',
        {
          AID: item.AID
        },
        function (res) {
          if (res) {
            _this.layer.closeAll()
            _this.$router.push({
              name: 'Riskdisposal',
              params: item
            })
          }
        }
      )
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
