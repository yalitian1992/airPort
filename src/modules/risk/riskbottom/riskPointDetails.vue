<template>
  <div class="scoreBox" v-show="scoreShow">
    <!--<p>{{sorceCon}}<i class="closeIcon" @click="scoreShow = false"></i></div>-->
    <div class="Bor">
      <i class="closeIcon" @click="scoreShow = false"></i>
      <div class="Bor_Table" ref="Scro">
        <div class="Bor_Table_header">
          <p>风险名称</p>
          <p>评分规则</p>
          <p>描述</p>
          <p>风险值</p>
        </div>
        <div class="Bor_Table_Box" id="data-list-content">
          <ul class="Bor_Table_Content" v-if="Length !== 0">
            <li v-for="(item, index) in riskDetailList" :key="index">
              <p :title="item.kname">{{item.kname}}</p>
              <p :title="item.rules">{{item.rules}}</p>
              <p :title="item.remark">{{item.remark}}</p>
              <p :title="item.rvalue">{{item.rvalue}}</p>
            </li>
          </ul>
          <p class="noData" v-else>暂无数据</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const RiskCurveDetail = 'RiskTopology/GetRiskCurveDetail'

export default {
  data () {
    return {
      scoreShow: false,
      riskDetailList: [],
      Length: ''
    }
  },
  watch: {
    riskDetailList () {
      this.scrollToTop()
    }
  },
  methods: {
    // 折线图详情框——滚动条回到顶部
    scrollToTop () {
      var div = document.getElementById('data-list-content')
      div.scrollTop = 0
    },
    RiskDetail (id) {
      let _this = this
      console.log(111)
      _this.scoreShow = true
      _this.riskDetailList = []
      _this.layer.load(1)
      console.log(222)
      this.post(RiskCurveDetail, {
        param: JSON.stringify({cid: id})
      }, function (res) {
        console.log(333)
        _this.layer.closeAll()
        _this.riskDetailList = res.CurveDetail
        _this.Length = res.CurveDetail.length
        console.log('_this.riskDetailList', _this.riskDetailList)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .scoreBox{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2000;
    .Bor{
      position: relative;
      @include size(80%, 500px);
      padding: 40px 25px 0 25px;
      margin: 18em auto 0 auto;
      background: #0f1535;
      border-radius: 5px;
      font-size: 14px;
      color: #fff;
      .closeIcon{
        position: absolute;
        right: 3px;
        top: 3px;
        @include size(30px, 30px);
        border-radius: 5px;
        background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
      }
      &_Table{
        @include size(100%, 100%);
        &_header,&_Content>li{
          height: 30px;
          line-height: 30px;
          p,li>p{
            float: left;
            margin-right: 5px;
            @include size(25%, 100%);
          }
        }
        &_header{
          background: rgba(255, 255, 255, 0.1);
          p{
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-align: center;
            color: #0096ff;
            font-size: 14px;
            text-align: center;
          }
          p:nth-child(2){
            width: 38%;
          }
          p:nth-child(3){
            width: 28%;
          }
          p:last-child{
            width: 5%;
          }
        }
        &_Box{
          height: 90%;
          overflow: auto;
        }
        &_Content{
          li{
            cursor: pointer;
            p{
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
            }
            p:nth-child(1){
              width: 25.4%;
              padding-left: 10px;
            }
            p:nth-child(2){
              width: 38.5%;
            }
            p:nth-child(3){
              width: 28%;
            }
            p:last-child{
              width: 5%;
              text-align: right;
            }
          }
          li:nth-child(2n){
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }

  @media  only screen  and (max-width: 1376px){
    .scoreBox{
      .Bor{
        margin: 6% auto 0 auto;
        &_Table{
          &_header{
            p:nth-child(3){
              margin-right: 2%;
            }
          }
        }
      }
    }
  }

  @media only screen  and (min-width: 1377px) and (max-width: 1410px){
    .scoreBox{
      .Bor{
        &_Table{
          &_header{
            p:nth-child(3){
              margin-right: 2%;
            }
          }
        }
      }
    }
  }

  @media only screen  and (min-width: 1411px) and (max-width: 1930px) {
    .scoreBox{
      .Bor{
        &_Table{
          &_header{
            p:nth-child(3){
              margin-right: 5px;
            }
          }
        }
      }
    }
  }

  @media only screen  and (min-width: 1931px){
    .scoreBox{
      .Bor{
        height: 70%;
        &_Table{
          &_header{
            p:nth-child(3){
              margin-right: 1%;
            }
          }
        }
      }
    }
  }
</style>
