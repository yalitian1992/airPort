<template>
  <prompt :pro-data="ProData" v-show="ProData.show">
    <div style="width: 100%;height: 100%;overflow: hidden;">
      <div class="autoScroll">
        <div class="detailsTxt">
          <div class="basic">
            <p class="tit">
              <span>指标概况</span>
            </p>
            <ul class="basic_ul">
              <li>
                <span>指标名称：</span>
                <span class="input">引导员资质</span>
              </li>
              <li>
                <span>预警等级：</span>
                <span class="input">黄色预警</span>
              </li>
              <li>
                <span>指标类型：</span>
                <span class="input">人员</span>
              </li>
              <li>
                <span>持续时间：</span>
                <span class="input">34min</span>
              </li>
              <li>
                <span>当前分值：</span>
                <span class="input">5</span>
              </li>
              <li>
                <span>缓解状态：</span>
                <span class="input">不需要缓解</span>
              </li>
            </ul>
          </div>
          <div class="details">
            <p class="tit">
              <span>指标分析</span>
            </p>
            <ul class="details_ul">
              <li>
                <p>历史预警总数（高风险及以上）</p>
                <span>221</span>
              </li>
              <li>
                <p>已缓解预警数量</p>
                <span>217</span>
              </li>
              <li>
                <p>平均响应时间</p>
                <span>37min</span>
              </li>
              <li>
                <p>本月预警总数</p>
                <span>44</span>
                <p class="tip"><i>10%</i>同比上月</p>
              </li>
            </ul>
          </div>
        </div>
        {{param}}
      </div>
    </div>
    </prompt>
</template>

<script>
import Prompt from '../../../components/prompt/prompt'
export default {
  name: 'factorRankDetail',
  components: {Prompt},
  data () {
    return {
      ProData: {
        show: false,
        width: '850px',
        height: '90%',
        title: '风险因子详情'
      },
      param: ''
    }
  },
  methods: {
    show (item) {
      this.ProData.show = true
      this.param = JSON.stringify(item)
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .close{
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
  }
  .tit{
    border-bottom: 1px solid #fff;
    span{
      display: inline-block;
      width: 90px;
      height: 32px;
      background: rgba(255, 255, 255, 0.2);
      line-height: 32px;
      text-align: center;
      color: #0096ff;
      border-radius: 3px;
      border: 1px solid #fff;
      border-bottom: none;
    }
  }
  .detailsTxt{
    padding: 30px 20px 60px 20px;
    .basic,.details{
      margin-bottom: 20px;
      &_ul{
        margin: 30px 0 0 5%;
        overflow: hidden;
      }
    }
    .basic{
      &_ul{
        li{
          width: 50%;
          margin-bottom: 10px;
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
            /*background: rgba(255, 255, 255, 0.2);*/
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
      &_ul{
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
