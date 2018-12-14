<template>
    <div class="modelList">
      <div class="modelList_content">
        <div class="modelList_content1" v-for="(item,index) in modelListData" :key="index">
          <div class="nouser" :class="item.value===1?'use':''">{{item.state}}</div>
          <div class="test">
            <div class="radius"><img src="../../../assets/images/aircraft.png"></div>
            <div class="modeltest">
              <div>
                <div id="modelname">{{item.name}}</div>
                <span>{{item.riskType}}</span>
              </div>
              <!--<div>本模型未通过测试</div>-->
              <div>{{item.time}}</div>
            </div>
          </div>
          <div class="enter" @click="enter(item)">进入</div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      modelListData: [
        /* {name: '管理视图模型1', time: 2, state: '在用', value: 1, riskType: '风险视图', riskTypeValue: 2} */
      ],
      isAddModel: false,
      isModelDetails: false,
      activeEnterKey: 0,
      addModelShow: false,
      addShow: true
    }
  },
  methods: {
    ...mapMutations('ModelStore', ['setModelEnterState', 'setCurModelInfo']),
    addModel (item) {
      this.setModelEnterState(item)
      this.$router.push('/Application/addModel')
    },
    enter (item) {
      this.setModelEnterState(item.riskTypeValue)
      this.setCurModelInfo(item)
      this.$router.push('/Application/ModelListDetails')
    },
    addModelShowIf () {
      this.addModelShow = true
      this.addShow = false
    }
  },
  mounted () {
    var _this = this
    this.layer.load(1, {shade: false, content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
    _this.post('ModelManage/GetModelList', {}, function (res) {
      _this.layer.closeAll()
      _this.modelListData = res.modelListData
    })
  }

}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media  only screen  and (max-width: 1376px){
  .modelList{
    @include size(100%,100%);
    position: relative;
    &_content{
      @include size(90%,calc(100% - 2em));
      border:1px solid rgba(255,255,255,0.5);
      margin:0 auto;
      // margin-top:0.5%;
      overflow-y: auto;
      &1{
        @include size(266px,251px);
        border-radius: 4px;
        margin-left:80px;
        margin-top:22px;
        float: left;
        background:rgba(255,255,255,0.1);
        .nouser{
          @include size(100%,60px);
          font-size:18px;
          color:#fff;
          background:rgba(255,0,0,0.2);
          text-align: center;
          line-height: 60px;
          border-radius: 4px;
        }
        .use{
          background:#0096ff;
        }
        .test{
          @include size(100%,130px);
          position: relative;
          .radius{
            @include size(35px,35px);
            position: absolute;
            top:28px;
            left:30px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            img{
              @include size(25px,25px);
              position: absolute;
              top:5px;
              left:4px;
            }
          }
          .modeltest{
            @include size(180px,93px);
            position: absolute;
            left:78px;
            top:28px;
            div{
              color: #fff;
              position: absolute;
              &:nth-child(1){
                font-size: 14px;
                line-height: 20px;
                span{
                  margin-left:100px;
                  text-align:center;
                  border-radius: 4px;
                  line-height:25px;
                  background: #0096ff;
                  padding:4px;
                }
              }
              &:nth-child(2){
                @include size(100%,16px);
                font-size: 0.8rem;
                position: absolute;
                bottom:46px;
              }
              &:nth-child(3){
                @include size(100%,14px);
                font-size: 0.5rem;
                position: absolute;
                bottom:26px;
              }
            }
            #modelname{
              width:100px;
              display:inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .enter{
          @include size(100%,60px);
          font-size:14px;
          color:#fff;
          text-align: center;
          line-height: 60px;
          border-radius: 4px;
          box-sizing: border-box;
          border:1px solid rgba(255,255,255,0.7);
          cursor: pointer;
        }
      }
      .f1{
        .nouser{
          background:rgba(220,220,220,0.2);
        }
        .test{
          overflow: hidden;
          position: relative;
          &1{
            @include size(60px,60px);
            position: absolute;
            top:30%;
            left:40%;
            background:rgba(255,255,255,0.1);
            border-radius: 4px;
            cursor: pointer;
            img{
              display: block;
              @include size(30px,30px);
              position: absolute;
              top:15px;
              left:15px;
            }
          }
          &2{
            @include size(100%,56px);
            margin: 20% auto;
            box-sizing: border-box;
            padding-left:20%;
            span{
              margin-left:10px;
              text-align:center;
              border-radius: 4px;
              padding:4px;
              background:#727272;
              cursor: pointer;
            }
            span:hover{
              background: #0096ff;
            }
            .activeEnter{
              background: #0096ff;
            }
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .modelList{
    @include size(100%,100%);
    position: relative;
    &_content{
      @include size(90%,calc(98% - 2em));
      border:1px solid rgba(255,255,255,0.5);
      margin-left:5%;
     /* margin-top:1%;*/
      margin-bottom:1em;
      &1{
        @include size(25%,290px);
        border-radius: 4px;
        margin-left:6%;
        margin-top:3.2%;
        float: left;
        background:rgba(255,255,255,0.1);
        .nouser{
          @include size(100%,25%);
          font-size:20px;
          color:#fff;
          background:rgba(255,0,0,0.2);
          text-align: center;
          line-height: 80px;
          border-radius: 4px;
        }
        .use{
          background:#0096ff;
        }
        .test{
          @include size(100%,55%);
          position: relative;
          .radius{
            @include size(40px,40px);
            position: absolute;
            top:20%;
            left:9%;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            img{
              @include size(25px,25px);
              position: absolute;
              top:9px;
              left:7px;
            }
          }
          .modeltest{
            @include size(100%,93px);
            position: absolute;
            left:25%;
            top:23%;
            div{
              color: #fff;
              position: absolute;
              &:nth-child(1){
                font-size: 16px;
                line-height: 20px;
                span{
                  margin-left:120px;
                  text-align:center;
                  border-radius: 4px;
                  line-height:25px;
                  background: #0096ff;
                  padding:4px;
                }
              }
              &:nth-child(2){
                @include size(100%,16px);
                font-size: 15px;
                position: absolute;
                bottom:40px;
              }
              &:nth-child(3){
                @include size(100%,14px);
                font-size: 14px;
                position: absolute;
                bottom:15px;
              }
            }
            #modelname{
              width:110px;
              display:inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .enter{
          @include size(100%,20%);
          font-size:16px;
          color:#fff;
          text-align: center;
          line-height: 60px;
          border-radius: 4px;
          box-sizing: border-box;
          border:1px solid rgba(255,255,255,0.7);
          cursor: pointer;
        }
      }
      .f1{
        .nouser{
          background:rgba(220,220,220,0.2);
        }
        .test{
          overflow: hidden;
          position: relative;
          &1{
            @include size(70px,70px);
            position: absolute;
            top:30%;
            left:38%;
            background:rgba(255,255,255,0.1);
            border-radius: 4px;
            cursor: pointer;
            img{
              display: block;
              @include size(36px,36px);
              position: absolute;
              top:17px;
              left:17px;
            }
          }
          &2{
            @include size(100%,56px);
            margin: 20% auto;
            box-sizing: border-box;
            padding-left:20%;
            span{
              margin-left:10px;
              text-align:center;
              border-radius: 4px;
              padding:4px;
              background:#727272;
              cursor: pointer;
            }
            span:hover{
              background: #0096ff;
            }
            .activeEnter{
              background: #0096ff;
            }
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .modelList{
    @include size(100%,100%);
    position: relative;
    &_content{
      @include size(90%,calc(100% - 1em));
      min-height: 470px;
      border:1px solid rgba(255,255,255,0.5);
      margin:0 auto;
      margin-top:3.5%;
      margin-bottom: 1em;
      &1{
        @include size(400px,352px);
        border-radius: 4px;
        margin-left:67px;
        margin-right:47px;
        margin-top:33px;
        float: left;
        background:rgba(255,255,255,0.1);
        .nouser{
          @include size(100%,84px);
          font-size:24px;
          color:#fff;
          background:rgba(255,0,0,0.2);
          text-align: center;
          line-height: 84px;
          border-radius: 4px;
        }
        .use{
          background:#0096ff;
        }
        .test{
          @include size(100%,183px);
          position: relative;
          .radius{
            @include size(50px,50px);
            position: absolute;
            top:39px;
            left:42px;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            img{
              @include size(35px,35px);
              position: absolute;
              top:9px;
              left:7px;
            }
          }
          .modeltest{
            @include size(290px,132px);
            position: absolute;
            left:109px;
            top:40px;
            div{
              color: #fff;
              position: absolute;
              &:nth-child(1){
                font-size: 18px;
                line-height: 20px;
                span{
                  margin-left:130px;
                  text-align:center;
                  border-radius: 4px;
                  line-height:30px;
                  background: #0096ff;
                  padding:4px;
                }
              }
              &:nth-child(2){
                @include size(290px,16px);
                font-size: 16px;
                position: absolute;
                bottom:78px;
              }
              &:nth-child(3){
                @include size(290px,14px);
                font-size: 14px;
                position: absolute;
                bottom:44px;
              }
            }
            #modelname{
              width:130px;
              display:inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .enter{
          @include size(398px,85px);
          font-size:24px;
          color:#fff;
          text-align: center;
          line-height: 84px;
          border-radius: 4px;
          border:1px solid rgba(255,255,255,0.7);
          cursor: pointer;
        }
      }
      .f1{
        .nouser{
          background:rgba(220,220,220,0.2);
        }
        .test{
          overflow: hidden;
          position: relative;
          &1{
            @include size(80px,80px);
            position: absolute;
            top:30%;
            left:40%;
            background:rgba(255,255,255,0.1);
            border-radius: 4px;
            cursor: pointer;
            img{
              display: block;
              @include size(40px,40px);
              position: absolute;
              top:20px;
              left:20px;
            }
          }
          &2{
            @include size(100%,40px);
            margin: 20% auto;
            box-sizing: border-box;
            padding-left:20%;
            span{
              margin-left:10px;
              text-align:center;
              border-radius: 4px;
              padding:10px;
              background:#727272;
              cursor: pointer;
              font-size:18px;
              text-align: center;
            }
            span:hover{
              background: #0096ff;
            }
            .activeEnter{
              background: #0096ff;
            }
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1931px){
  .modelList{
    @include size(100%,100%);
    position: relative;
    // background: #0096ff;
    &_content{
      @include size(90%,1250px);
      border:1px solid rgba(255,255,255,0.5);
      margin-left:5%;
      margin-top:3%;
      &1{
        @include size(25%,40%);
        border-radius: 4px;
        margin-left:6%;
        margin-top:3.5%;
        float: left;
        background:rgba(255,255,255,0.1);
        .nouser{
          @include size(100%,25%);
          font-size:32px;
          color:#fff;
          background:rgba(255,0,0,0.2);
          text-align: center;
          line-height: 120px;
          border-radius: 4px;
        }
        .use{
          background:#0096ff;
        }
        .test{
          @include size(100%,55%);
          position: relative;
          .radius{
            @include size(70px,70px);
            position: absolute;
            top:16%;
            left:8%;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            img{
              @include size(40px,40px);
              position: absolute;
              top:14px;
              left:15px;
            }
          }
          .modeltest{
            @include size(100%,50%);
            position: absolute;
            left:28%;
            top:25%;
            div{
              color: #fff;
              position: absolute;
              &:nth-child(1){
                font-size: 28px;
                line-height: 28px;
                span{
                  margin-left:230px;
                  text-align:center;
                  border-radius: 4px;
                  line-height:25px;
                  background: #0096ff;
                  padding:4px;
                }
              }
              &:nth-child(2){
                @include size(100%,16px);
                font-size: 26px;
                position: absolute;
                bottom:66px;
              }
              &:nth-child(3){
                @include size(100%,14px);
                font-size: 24px;
                position: absolute;
                bottom:26px;
              }
            }
            #modelname{
              width:200px;
              display:inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
        .enter{
          @include size(100%,20%);
          font-size:30px;
          color:#fff;
          text-align: center;
          line-height: 100px;
          border-radius: 4px;
          box-sizing: border-box;
          border:1px solid rgba(255,255,255,0.7);
          cursor: pointer;
        }
      }
      .f1{
        .nouser{
          background:rgba(220,220,220,0.2);
        }
        .test{
          overflow: hidden;
          position: relative;
          &1{
            @include size(120px,120px);
            position: absolute;
            top:30%;
            left:38%;
            background:rgba(255,255,255,0.1);
            border-radius: 4px;
            cursor: pointer;
            img{
              display: block;
              @include size(70px,70px);
              position: absolute;
              top:25px;
              left:25px;
            }
          }
          &2{
            @include size(100%,56px);
            margin: 20% auto;
            box-sizing: border-box;
            padding-left:20%;
            span{
              margin-left:30px;
              text-align:center;
              border-radius: 4px;
              padding:10px;
              background:#727272;
              cursor: pointer;
              font-size:26px;
            }
            span:hover{
              background: #0096ff;
            }
            .activeEnter{
              background: #0096ff;
            }
          }
        }
      }
    }
  }
}
</style>
