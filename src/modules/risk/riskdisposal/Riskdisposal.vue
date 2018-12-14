<template>
  <div class="riskBox">
    <div class="riskdisposal_warp">
      <div class="riskdisposal_title">
        <div><span>风险处置 -----{{riskdisposalData.depart}}>{{riskdisposalData.modular}}>{{riskdisposalData.riskfactor||'安全因子'}}</span></div>
      </div>
      <div class="riskdisposal_warp_content">
        <div class="riskdisposal_content">
          <div class="riskdisposal_content1" style="position: relative">
            <div style="width:33%;height: 100%;position: absolute;left:33%;cursor: pointer;z-index: 9999;" @click="setMeasures" ></div>
            <!-- <el-button style="margin-top: 12px;" @click="next">下一步</el-button> -->
            <el-steps :active="(parseInt(riskdisposalData.alarmstatus)+1)"   finish-status="success"   style="margin-top: 20px">
              <el-step title="风险报警" ></el-step>
              <el-step title="选取缓解措施" ></el-step>
              <el-step title="已处置" ></el-step>
            </el-steps>
          </div>
          <div class="riskdisposal_content1">
            <div class="title">安全因子：</div>
            <div class="content borderR" style="overflow: hidden;background: rgba(255,255,255,0.1)">
              <div class="riskFactor autoScroll">{{riskdisposalData.riskfactor||''}}</div>
            </div>
          </div>
          <div class="riskdisposal_content1">
            <div class="title">报警描述：</div>
            <div class="borderR" style="overflow: hidden">
              <div class="content alamReson autoScroll">
                {{riskdisposalData.alarmreason}}
              </div>
            </div>
          </div>
          <div class="riskdisposal_content1">
            <div class="title">当前分值：</div>
            <div class="content">
              <div class="policevalue" :class="(riskdisposalData.riskvalue>0&&riskdisposalData.riskvalue<=3)?'fontblue':(riskdisposalData.riskvalue>3&&riskdisposalData.riskvalue<=6)?'fontyellow':(riskdisposalData.riskvalue>6&&riskdisposalData.riskvalue<=9)?'fontorange':(riskdisposalData.riskvalue>9&&riskdisposalData.riskvalue<=10)?'fontred':''">{{riskdisposalData.riskvalue||0}}</div>
              <div class="police" :class="(riskdisposalData.riskvalue>0&&riskdisposalData.riskvalue<=3)?'fontblue':(riskdisposalData.riskvalue>3&&riskdisposalData.riskvalue<=6)?'fontyellow':(riskdisposalData.riskvalue>6&&riskdisposalData.riskvalue<=9)?'fontorange':(riskdisposalData.riskvalue>9&&riskdisposalData.riskvalue<=10)?'fontred':''">{{riskdisposalData.alarmtype}}</div>
            </div>
          </div>
          <div class="riskdisposal_content1" v-show="showMeasure">
            <div class="title">缓解措施：</div>
            <div class="scrollBox borderR">
              <div class="content refMethod autoScroll">
                <div class="ref" v-for="(item,index) in riskdisposalData.riskmeasures" :key="index">
                  <input type="checkbox" v-model="item.isuse" v-bind:disabled="parseInt(item.alarmstatus)>=1?true:false"/>
                  <span>{{item.description}}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="riskdisposal_operation">
            <div class="save" @click="saveOperation()" v-show="showSave" >确定</div>
            <div class="cancel" @click="cancelOperation()">返回</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import KeyValueSelect from '../../../components/KeyValueSelect.vue'
import logObj from '../../../util/logHelp'
export default {
  components: {
    KeyValueSelect
  },
  data () {
    return {
      selectContentKey: 0,
      refieveMethodData: [
        { value: 1, label: '更换引导员' },
        { value: 2, label: '绩效奖励' },
        { value: 3, label: '节油奖励' }
      ],
      riskdisposalData: {
        aid: '',
        depart: '测试部门',
        modular: '测试模块',
        riskfactor: '测试风险因子',
        riskvalue: '8',
        alarmtype: '测试告警',
        alarmstatus: '0',
        alarmreason: '测试告警原因描述',
        itemsourceid: '',
        riskmeasures: [{
          rmid: '',
          mid: '2',
          description: '测试缓解措施1',
          isuse: false
        }, {
          rmid: '',
          mid: '2',
          description: '测试缓解措施2',
          isuse: false
        }, {
          rmid: '',
          mid: '2',
          description: '测试缓解措施3',
          isuse: true
        }]
      },
      active: 2,
      alarmInfo: {},
      showMeasure: true,
      showSave: true,
      enbleCheck: true,
      logerId: ''
    }
  },
  created () {
    this.alarmInfo = this.$route.params
    if (this.alarmInfo.AID === undefined) {
      this.$router.push('/Application/noticeInform')
    } else {
    }
  },
  methods: {
    saveOperation () {
      let _this = this
      this.logerId = JSON.parse(sessionStorage.getItem('userInfo')).TU_ID
      let isReady = false
      for (let i in _this.riskdisposalData.riskmeasures) {
        if (_this.riskdisposalData.riskmeasures[i].isuse) {
          isReady = true
        }
      }
      if (!isReady) {
        _this.layer.msg('请选择缓解措施！')
        return false
      }
      this.post('SafeStatistic/AlarmDo', {param:
           JSON.stringify({ userid: _this.logerId, riskdo: _this.riskdisposalData })}, function (res) {
        if (res.Status) {
          _this.layer.msg('设置成功')
          let applyMeauares = []
          for (let j in _this.riskdisposalData.riskmeasures) {
            if (_this.riskdisposalData.riskmeasures[j].isuse === true) {
              applyMeauares.push(_this.riskdisposalData.riskmeasures[j].description)
            }
          }
          logObj.recordOperateLog.createLogMessage('为 [' + _this.riskdisposalData.riskfactor + '] 设置缓解措施: ' + JSON.stringify(applyMeauares))
          _this.$router.go(-1)
        } else {
          _this.layer.msg('设置失败' + res.Message)
        }
      })
      // this.$router.go(-1)
    },
    setMeasures () {
      if (parseInt(this.riskdisposalData.alarmstatus) === 0) {
        this.riskdisposalData.alarmstatus = 1
        this.showMeasure = true
        this.showSave = true
      }
    },
    cancelOperation () {
      this.$router.go(-1)
    }
  },
  mounted () {
    var _this = this
    this.post('SafeStatistic/GetAlarmInfo', {
      'param': JSON.stringify({
        AID: _this.alarmInfo.AID
      })}, function (res) {
      _this.riskdisposalData = res
      if (parseInt(_this.riskdisposalData.alarmstatus) === 0) {
      }
      _this.riskdisposalData.alarmstatus = parseInt(_this.riskdisposalData.alarmstatus) + 1
      _this.showMeasure = true
      if (parseInt(_this.riskdisposalData.alarmstatus) > 1) { _this.showSave = false }
    })
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.borderR{
  border-radius: 4px;
}
.fontblue{
  color:#0096FF!important;
}
.fontyellow{
  color:#FFDC00!important;
}
.fontorange{
  color:#FF7300!important;
}
.fontred{
  color:#FF0000!important;
}
.scrollBox{
  height: 100%;
  overflow: hidden;
}
el-steps{
  background: red;
}
.riskBox{
  @include size(100%, 99%);
}
.riskdisposal_warp{
  .riskdisposal_title{
    div:nth-child(1){
      span{
        display: block;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .riskdisposal_warp_content{
    .riskdisposal_content{
      &1{
        .alamReson{
          /*word-break: break-all;*/
          word-wrap:break-word;
        }
        .content{
          div{
            /*word-break: break-all;*/
            word-wrap:break-word;
          }
          div.riskFactor{
            width: calc(100% + 17px) !important;
            line-height: 28px !important;
            text-align: left !important;
            padding-left: 6px !important;
            background: none;
          }
        }
        .scrollBox{
          .content{
            .ref{
              height: auto !important;
              span{
                /*word-break: break-all;*/
                word-wrap:break-word
              }
            }
          }
        }
      }
    }
  }
}

@media  only screen  and (max-width: 1376px){
  .riskdisposal_warp{
    height: 95%;
    min-width: 1024px;
    background: url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    padding-top: 2%;
    // background: #0096ff;
    .riskdisposal_title{
      @include size(100%, auto);
      div{
        &:nth-child(1){
          @include size(100%,40px);
          font-size: 18px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
          color: #fff;
          background: rgba(255,255,255,0.1);
          box-sizing: border-box;
          padding-left: 5%;
        }
        &:nth-child(2){
          @include size(100%,44px);
          font-size: 16px;
          font-weight: 100;
          text-align: left;
          line-height: 89px;
          color: #fff;
          box-sizing:border-box;
          padding-left:88px;
        }
      }
    }
    .riskdisposal_warp_content{
        @include size(100%,98%);
        background:#1B203C;
        margin:0 auto;
      .riskdisposal_content{
        @include size(100%,auto);
        box-sizing: border-box;
        &1{
          @include size(50%,auto);
          margin:0 auto;
          overflow: hidden;
          .title{
            @include size(100%,30px);
            font-size:18px;
            color:#fff;
            line-height:30px;
            margin-bottom: 6px;
          }
          .content{
            /*@include size(100%,30px);*/
            /*height: 30px;*/
            div{
              @include size(232px,42px);
              display: inline-block;
              border-radius: 4px;
              box-sizing:border-box;
              background:rgba(255,255,255,0.1);
              font-size:14px;
              color:#fff;
              line-height:42px;
              cursor: pointer;
            }
            .riskFactor,.policevalue{
              padding-left:10px;
            }
            .police{
              color:#ff0000;
              padding-left:10px;
            }
            .refieveMethod{
              @include size(468px,42px);
              background:none;
            }
            .refieveEffect{
              @include size(468px,42px);
              color:#8a8a8a;
              padding-left:10px;
            }
            .ref{
              width:100%;
              background: none;
              position: relative;
              input{
                width:16px;
                height:16px;
                position: absolute;
                top:12px;
                left:20px;
              }
              input[type="radio"]:checked {color: red;}
              span{
                margin-left:50px;
              }
            }
          }
          .scrollBox{
            .content{
              height: 30px;
              div{
                @include size(232px,28px);
                display: inline-block;
                border-radius: 4px;
                box-sizing:border-box;
                background:rgba(255,255,255,0.1);
                font-size:14px;
                color:#fff;
                cursor: pointer;
              }
              .riskFactor,.policevalue{
                padding-left:10px;
              }
              .police{
                color:#ff0000;
                padding-left:10px;
              }
              .refieveMethod{
                @include size(468px,42px);
                background:none;
              }
              .refieveEffect{
                @include size(468px,42px);
                color:#8a8a8a;
                padding-left:10px;
              }
              .ref{
                width:100%;
                background: none;
                position: relative;
                input{
                  width:18px;
                  height:18px;
                  position: absolute;
                  top:6px;
                  left:20px;
                }
                input[type="radio"]:checked {color: red;}
                span{
                  margin-left:50px;
                  padding: 6px 0;
                  width: 89%;
                  display: block;
                }
              }
              // .selectContent{
              //   color:#29ABE2;
              //   box-sizing:border-box;
              //   border: 1px solid #29ABE2;
              // }
            }
            .refMethod{
              height:80px;
              background:rgba(255,255,255,0.1);
              div{
                line-height: normal;
              }
            }
          }
          .alamReson{
            height:3em;
            font-size: 14px;
            padding: 2px 22px 2px 6px;
            background: rgba(255,255,255,0.1);
          }
        }
        &1:nth-child(1){
          margin-bottom: 10px;
        }
        .riskdisposal_operation{
          @include size(50%,30px);
          margin:10px auto 0 auto;
          // margin-bottom:35px;
          font-size: 14px;
          color:#fff;
          line-height: 30px;
          text-align: center;
          div{
            float: left;
          }
          .save{
            @include size(56px,100%);
            background:#0096ff;
            border-radius: 4px;
            cursor: pointer;
            background:#0096ff;
            margin-right:2%;
          }
          .cancel{
            @include size(56px,100%);
            border-radius: 4px;
            cursor: pointer;
            background: #c2c3c4;
            margin-right:2%;
          }
        }
      }
    }
  }
  .el-step__title.is-success {
    color: #fff;
    font-size: 14px;
  }
  .el-step__title.is-process {
    font-size: 14px;
  }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .riskdisposal_warp{
    @include size(100%,auto);
    background: url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    overflow: hidden;
    padding-top: 2%;
    .riskdisposal_title{
      @include size(100%,5%);
      /*margin-top:2%;*/
      div{
        &:nth-child(1){
          @include size(100%,45px);
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 45px;
          color: #fff;
          background: rgba(255,255,255,0.1);
          box-sizing: border-box;
          padding-left: 5%;
        }
        &:nth-child(2){
          @include size(100%,50px);
          font-size: 18px;
          font-weight: 100;
          text-align: left;
          line-height: 89px;
          color: #fff;
          box-sizing:border-box;
          padding-left:88px;
        }
      }
    }
    .riskdisposal_warp_content{
        @include size(100%,auto);
        background:#1B203C;
        margin:0 auto;
        margin-top:50px;
      .riskdisposal_content{
        @include size(100%,auto);
        box-sizing: border-box;
        &1{
          @include size(50%,auto);
          margin:0 auto 0.6em auto;
          overflow: hidden;
          .title{
            @include size(100%,30px);
            font-size:20px;
            color:#fff;
            line-height:30px;
            margin-bottom: 14px;
          }
          .content{
            /*@include size(100%,60px);*/
            height: 60px;
            div{
              @include size(232px,50px);
              display: inline-block;
              border-radius: 4px;
              box-sizing:border-box;
              background:rgba(255,255,255,0.1);
              font-size:16px;
              color:#fff;
              line-height:50px;
              cursor: pointer;
            }
            .riskFactor,.policevalue{
              padding-left:10px;
            }
            .police{
              color:#ff0000;
              padding-left:10px;
            }
            .refieveMethod{
              @include size(468px,50px);
              background:none;
            }
            .refieveEffect{
              @include size(468px,50px);
              color:#8a8a8a;
              padding-left:10px;
            }
            .ref{
              width:100%;
              background: none;
              position: relative;
              input{
                width:20px;
                height:20px;
                position: absolute;
                top:7px;
                left:20px;
              }
              input[type="radio"]:checked {color: red;}
              span{
                padding: 6px 0;
                margin-left:50px;
              }
            }
          }
          .scrollBox{
            .content{
              height: 60px;
              div{
                @include size(232px,34px);
                display: inline-block;
                border-radius: 4px;
                box-sizing:border-box;
                background:rgba(255,255,255,0.1);
                font-size:16px;
                color:#fff;
                line-height:34px;
                cursor: pointer;
              }
              .riskFactor,.policevalue{
                padding-left:10px;
              }
              .police{
                color:#ff0000;
                padding-left:10px;
              }
              .refieveMethod{
                @include size(468px,50px);
                background:none;
              }
              .refieveEffect{
                @include size(468px,50px);
                color:#8a8a8a;
                padding-left:10px;
              }
              .ref{
                width:100%;
                background: none;
                position: relative;
                input{
                  width:18px;
                  height:18px;
                  position: absolute;
                  top:10px;
                  left:20px;
                }
                input[type="radio"]:checked {color: red;}
                span{
                  margin-left:50px;
                  display: block;
                  width: 91%;
                }
              }
            }
            .refMethod{
              height:100px;
              background:rgba(255,255,255,0.1);
              div{
                line-height: normal;
              }
            }
          }
          .alamReson{
            height:3em;
            padding: 2px 22px 2px 6px;
            background: rgba(255,255,255,0.1);
          }
        }
        &1:nth-child(1){
          /*margin-bottom: 20px;*/
        }
        .riskdisposal_operation{
          @include size(50%,30px);
          margin:35px auto 0 auto;
          font-size: 16px;
          color:#fff;
          line-height: 30px;
          text-align: center;
          div{
            float: left;
          }
          .save{
            @include size(56px,100%);
            background:#0096ff;
            border-radius: 4px;
            cursor: pointer;
            background:#0096ff;
            margin-right:2%;
          }
          .cancel{
            @include size(56px,100%);
            border-radius: 4px;
            cursor: pointer;
            background: #c2c3c4;
            margin-right:2%;
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .riskdisposal_warp{
    @include size(100%,auto);
    background: url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    .riskdisposal_title{
      @include size(100%,100px);
      padding-top:40px;
      div{
        &:nth-child(1){
          @include size(100%,100%);
          font-size: 20px;
          font-weight: 100;
          text-align: left;
          line-height: 58px;
          color: #fff;
          background: rgba(255,255,255,0.1);
          box-sizing:border-box;
          padding-left:60px;
        }
        &:nth-child(2){
          @include size(100%,44px);
          font-size: 18px;
          font-weight: 100;
          text-align: left;
          line-height: 89px;
          color: #fff;
          box-sizing:border-box;
          padding-left:128px;
        }
      }
    }
    .riskdisposal_warp_content{
      @include size(100%, 100%);
      background: #1B203C;
      .riskdisposal_content{
        @include size(82%,100%);
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 1em;
        &1{
          @include size(80%,auto);
          margin-bottom: 1.8em;
          margin-left:10%;
          overflow: hidden;
          .title{
            @include size(100%,30px);
            font-size:22px;
            color:#fff;
            line-height:30px;
            margin-bottom: 14px;
          }
          .content{
            /*@include size(100%,42px);*/
            height: 42px;
            div{
              @include size(232px,42px);
              background:rgba(255,255,255,0.1);
              border-radius: 4px;
              // color:#fff;
              line-height:42px;
              box-sizing:border-box;
              font-size:16px;
              cursor: pointer;
              float: left;
              margin-right: 10px;
              text-align: center;
            }
            .ref{
              width:100%;
              position: relative;
              text-align: left;
              input{
                width:22px;
                height:22px;
                position: absolute;
                top:6px;
                left:22px;
              }
              input[type="radio"]:checked {color: red;}
              span{
                padding: 6px 0;
                margin-left:50px;
              }
            }
          }
          .scrollBox{
            .content{
              height: 70px;
              div{
                @include size(232px,44px);
                background:rgba(255,255,255,0.1);
                border-radius: 4px;
                // color:#fff;
                line-height:44px;
                box-sizing:border-box;
                font-size:16px;
                cursor: pointer;
                float: left;
                margin-right: 10px;
                text-align: center;
              }
              .ref{
                width:100%;
                position: relative;
                text-align: left;
                input{
                  width:20px;
                  height:20px;
                  position: absolute;
                  top:8px;
                  left:22px;
                }
                input[type="radio"]:checked {color: red;}
                span{
                  margin-left:50px;
                  display: block;
                }
              }
            }
            .refMethod{
              background: rgba(255,255,255,0.1);
              .ref{
                line-height: normal;
                background: none !important;
              }
            }
          }
          .alamReson{
            padding: 2px 22px 2px 6px;
            background: rgba(255, 255, 255, 0.1);
          }
        }
        // 确认、取消
        .riskdisposal_operation{
          @include size(80%,42px);
         /* margin:18px auto 0 auto;*/
          margin-left:10%;
          div{
            @include size(70px,35px);
            font-size: 14px;
            line-height: 35px;
            text-align: center;
            border-radius: 4px;
            color:#fff;
            box-sizing:border-box;
            cursor: pointer;
            float: left;
          }
          .save{
            background:#0096ff;
            margin-right:20px;
          }
          .cancel{
            background: #c2c3c4;
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1931px) {
  .riskdisposal_warp{
    @include size(100%,auto);
    background: url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    position: relative;
    padding-top: 2%;
    .riskdisposal_title{
      @include size(100%,5%);
      div{
        &:nth-child(1){
          @include size(100%,40px);
          font-size: 18px;
          font-weight: 100;
          text-align: left;
          line-height: 40px;
          color: #fff;
          background: rgba(255,255,255,0.1);
          box-sizing: border-box;
          padding-left: 5%;
        }
        &:nth-child(2){
          @include size(100%,44px);
          font-size: 16px;
          font-weight: 100;
          text-align: left;
          line-height: 89px;
          color: #fff;
          box-sizing:border-box;
          padding-left:88px;
        }
      }
    }
    .riskdisposal_warp_content{
        @include size(100%,100%);
        background:#1B203C;
        margin:0 auto;
        margin-top:50px;
      .riskdisposal_content{
        @include size(100%,auto);
        box-sizing: border-box;
        // padding-top:25px;
        &1{
          @include size(50%,auto);
          margin:0 auto;
          overflow: hidden;
          .title{
            @include size(100%,30px);
            font-size:18px;
            color:#fff;
            line-height:30px;
            margin-bottom: 14px;
          }
          .content{
            /*@include size(100%,30px);*/
            height: 30px;
            div{
              @include size(232px,42px);
              display: inline-block;
              border-radius: 4px;
              box-sizing:border-box;
              background:rgba(255,255,255,0.1);
              font-size:14px;
              color:#fff;
              line-height:42px;
              cursor: pointer;
            }
            .riskFactor,.policevalue{
              padding-left:10px;
            }
            .police{
              color:#ff0000;
              padding-left:10px;
            }
            .refieveMethod{
              @include size(468px,42px);
              background:none;
            }
            .refieveEffect{
              @include size(468px,42px);
              color:#8a8a8a;
              padding-left:10px;
            }
            .ref{
              width:100%;
              background: none;
              position: relative;
              input{
                width:16px;
                height:16px;
                position: absolute;
                top:12px;
                left:20px;
              }
              input[type="radio"]:checked {color: red;}
              span{
                margin-left:50px;
              }
            }
            // .selectContent{
            //   color:#29ABE2;
            //   box-sizing:border-box;
            //   border: 1px solid #29ABE2;
            // }
          }
          .scrollBox{
            .content{
              height: 30px;
              div{
                @include size(232px,42px);
                display: inline-block;
                border-radius: 4px;
                box-sizing:border-box;
                background:rgba(255,255,255,0.1);
                font-size:14px;
                color:#fff;
                line-height:42px;
                cursor: pointer;
              }
              .riskFactor,.policevalue{
                padding-left:10px;
              }
              .police{
                color:#ff0000;
                padding-left:10px;
              }
              .refieveMethod{
                @include size(468px,42px);
                background:none;
              }
              .refieveEffect{
                @include size(468px,42px);
                color:#8a8a8a;
                padding-left:10px;
              }
              .ref{
                width:100%;
                background: none;
                position: relative;
                input{
                  width:18px;
                  height:18px;
                  position: absolute;
                  top:6px;
                  left:20px;
                }
                input[type="radio"]:checked {color: red;}
                span{
                  margin-left:50px;
                  padding: 6px 0;
                  display: block;
                  width: 94%;
                }
              }
              // .selectContent{
              //   color:#29ABE2;
              //   box-sizing:border-box;
              //   border: 1px solid #29ABE2;
              // }
            }
            .refMethod{
              height:270px;
              background:rgba(255,255,255,0.1);
              div{
                line-height: normal;
              }
            }
          }
          .alamReson{
            height:3em;
            padding: 2px 22px 2px 6px;
            background: rgba(255,255,255,0.1);
          }
        }
        &1:nth-child(1){
          margin-bottom: 20px;
        }
        .riskdisposal_operation{
          @include size(50%,30px);
          margin:35px auto 0 auto;
          // margin-bottom:35px;
          font-size: 14px;
          color:#fff;
          line-height: 30px;
          text-align: center;
          div{
            float: left;
          }
          .save{
            @include size(56px,100%);
            background:#0096ff;
            border-radius: 4px;
            cursor: pointer;
            background:#0096ff;
            margin-right:2%;
          }
          .cancel{
            @include size(56px,100%);
            border-radius: 4px;
            cursor: pointer;
            background: #c2c3c4;
            margin-right:2%;
          }
        }
      }
    }
  }
  .el-step__title.is-success {
    color: #fff;
    font-size: 14px;
  }
  .el-step__title.is-process {
    font-size: 14px;
  }
}
/*————————————————————————————————————————————*/
@media only screen and (min-width: 1411px) and (max-width: 1610px) {
  .riskdisposal_warp{
    .riskdisposal_warp_content{
      .riskdisposal_content{
        &1{
          margin-bottom: 0.7em;
        }
      }
    }
  }
}
</style>
<style lang="scss">
  .riskBox{
    div.el-step__icon-inner{
      margin: 0 auto;
      width: 100%;
      height: 100%;
      line-height: 55px;
    }
    .el-steps--horizontal{
      width: 84%;
    }
    .el-step.is-horizontal .el-step__line {
      width: 100%;
      margin-left: 4%;
    }
  }
  @media only screen and (max-width: 1400px) {
    .riskBox{
      .el-step__icon.is-text{
        width: 50px;
        height: 50px;
      }
      div.el-step__icon-inner{
        line-height: 50px;
      }
      .el-step__title.is-success,.el-step__title.is-process{
        font-size: 18px;
      }
    }
  }
  @media only screen  and (min-width: 1411px) and (max-width: 1930px) {
    .riskBox {
      .el-step__icon.is-text{
        background: #131939;
      }
    }
  }
</style>
