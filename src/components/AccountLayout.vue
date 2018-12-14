<template>
  <div class="accountBox">
    <div class="account-wrap clearfix">
      <!-- 头部 -->
      <div class="accountTitle" style="height: 9em;">
        <div class="accountTitle1">账户主页</div>
        <div class="accountTitle2">
          <div class="accountTitle2Left">账户名称：<span>{{CuserInfo.userName}}</span></div>
          <div class="accountTitle2Right">创建时间：<span>{{CuserInfo.createTime}}</span></div>
          <div class="accountTitle2Left">登录账号：<span>{{CuserInfo.roleInfo}}</span></div>
          <div class="accountTitle2Right"> </div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="accountContent" style="height: calc(100% - 12em)">
        <div class="accountContent_select">
          <div :class="activeReadKey===0?'activeRead':''" @click="collect(0)">动态</div>
        </div>
        <div class="accountContent_list" v-if="activeReadKey===0">
          <div class="listTitle">
            <div v-for="(item,index) in listTitle" :key="index">{{item}}</div>
          </div>
          <div class="ulBox">
            <ul class="autoScroll">
              <li v-for='(item,index) in listdata' :key='index'>
                <div>{{(pageInfo.curpage - 1) * 5 + (index+1)}}</div>
                <div>{{item.operationType}}</div>
                <div :title="item.describe">{{item.describe}}</div>
                <div>{{item.operationTime}}</div>
              </li>
            </ul>
          </div>
          <div class="Pagination">
            <div class="classPage">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="pageInfo.curpage"
                :page-size="pageInfo.pageSize"
                layout="total,prev, pager, next, jumper"
                :total="pageInfo.pageTotal">
              </el-pagination>
              <div class="jumpbutton">跳转</div>
            </div>
            <div class="cancel" @click="cancelOper()">返回</div>
            <!--<div class="save" @click="saveOper()">确认</div>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data: function () {
    return {
      listTitle: ['序号', '类型', '描述', '操作时间'],
      listdata: [
      ],
      activeReadKey: 0,
      CuserInfo: {
        userName: '',
        roleInfo: '',
        lastLogTime: '',
        createTime: ''
      },
      pageInfo: {
        curpage: 1,
        pageTotal: '',
        pageSize: 5
      }
    }
  },
  methods: {
    collect (item) {
      this.activeReadKey = item
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageInfo.curpage = val
      this.loadAjaxData()
    },
    saveOper () {
      this.$router.push('/Application/risk')
    },
    cancelOper () {
      this.$router.go(-1)
    },
    loadAjaxData () {
      let _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.post('/SystemMng/GetUserAuthorityLog', { param: JSON.stringify({
        tu_id: _this.userInfo.TU_ID,
        PageIndex: _this.pageInfo.curpage,
        PageSize: _this.pageInfo.pageSize
      })}, function (res) {
        _this.layer.closeAll()
        if (res.length > 0) {
          _this.pageInfo.pageTotal = parseInt(res[0].counts)
        }
        _this.listdata = []
        for (let i in res) {
          let type = ''
          switch (res[i].op_type) {
            case '1':
              type = '数据日志'
              break
            case '2':
              type = '页面足迹'
              break
            case '3':
              type = '系统操作'
              break
            default:break
          }
          _this.listdata.push({ operationType: type, describe: res[i].content, operationTime: res[i].gen_time })
        }
      })
    }
  },
  mounted () {
    this.CuserInfo.userName = this.userInfo.VSERNAME
    this.CuserInfo.roleInfo = this.userInfo.LOGIN_NAME
    this.CuserInfo.lastLogTime = this.userInfo.LOGIN_TIME
    this.CuserInfo.createTime = this.userInfo.GEN_TIME
    this.loadAjaxData()
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.accountBox{
  width: 100%;
  height: 100%;
  min-height: 515px;
}
.account-wrap{
  .accountContent{
    .listTitle{
      @include size(100%, 2.5em);
      line-height: 2.5em;
    }
    &_list{
      .ulBox{
        ul{
          li{
            height: 2.5em;
            line-height: 2.5em;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1365.9px) {
  .accountBox {
   /* overflow: auto;*/
  }
}
@media  only screen  and (max-width: 1376px){
  .account-wrap {
    /*@include size(100%, 100%);*/
    height: 100%;
    min-width: 1024px;
    padding-top: 2%;
    position: relative;
    background:url('../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    .accountTitle{
      @include size(100%,20%);
      &1{
        @include size(100%,45%);
        color:#fff;
        font-size: 18px;
        font-weight: 100;
        text-align: left;
        line-height: 50px;
        box-sizing:border-box;
        padding-left:60px;
/*
        margin-top:2%;
*/
      }
      &2{
        width: 100%;
        /*@include size(100%,50%);*/
        border-top:1px solid #b3b3b3;
        background: rgba(255,255,255,0.05);
        box-sizing:border-box;
        padding-left:56px;
        .accountTitle2Left{
          @include size(25%,35px);
          font-size: 14px;
          color:#cccccc;
          display:inline-block;
          line-height: 35px;
          padding-left:20px;
          box-sizing:border-box;
          span{
            font-size: 12px;
          }
        }
        .accountTitle2Right{
          @include size(70%,auto);
          font-size: 14px;
          color:#cccccc;
          display:inline-block;
          line-height: 35px;
          span{
            font-size: 12px;
          }
        }
      }
    }
    .accountContent{
      width:100%;
      height: 80%;
      margin: 0px auto;
      &_select{
        @include size(90%,50px);
        text-align: center;
        line-height:35px;
        color:#fff;
        margin:0 auto;
        div{
          @include size(5%,46px);
          float:left;
          font-size: 16px;
          margin-right:14px;
          cursor: pointer;
        }
        .activeRead{
          box-sizing:border-box;
          border-bottom: 5px solid #0096ff;
        }
      }
      &_list{
        @include size(90%,87%);
        margin:0 auto;
        .listTitle {
          border-top:1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #f2f2f2;
            font-size: 14px;
            &:nth-child(1){
              @include size(10%, 100%);
            }
            &:nth-child(2){
              @include size(20%, 100%);
            }
            &:nth-child(3){
              @include size(30%, 100%);
            }
            &:nth-child(4){
              @include size(30%, 100%);
            }
          }
        }
        .ulBox{
          @include  size(100%,calc(calc(100% - 10%) - 3em));
          overflow: hidden;
          ul {
            @include size(calc(100% + 17px), 70%);
            list-style: none;
            color: #fff;
         /*   overflow: hidden;*/
            font-size: 16px;
            li {
              /*height: 20%;*/
              cursor: pointer;
              border-bottom:1px solid rgba(255,255,255,0.2);
              div {
                float: left;
                height: 100%;
                box-sizing: border-box;
                text-align: center;
                margin-left: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 12px;
                &:nth-child(1){
                  @include size(10%, 100%);
                }
                &:nth-child(2){
                  @include size(20%, 100%);
                }
                &:nth-child(3){
                  @include size(30%, 100%);
                }
                &:nth-child(4){
                  @include size(30%, 100%);
                }
              }
            }
          }}

      }

    }
  }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .account-wrap {
    @include size(100%, 100%);
    position: relative;
    background:url('../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    .accountTitle{
      @include size(100%,20%);
      padding-top: 2em;
      &1{
        @include size(100%,45%);
        color:#fff;
        font-size: 18px;
        font-weight: 100;
        text-align: left;
        line-height: 50px;
        box-sizing:border-box;
        padding-left:60px;
        /*margin-top:2%;*/
      }
      &2{
        width: 100%;
        /*@include size(100%,50%);*/
        border-top:1px solid #b3b3b3;
        background: rgba(255,255,255,0.05);
        box-sizing:border-box;
        padding-left:56px;
        .accountTitle2Left{
          @include size(25%,35px);
          font-size: 14px;
          color:#cccccc;
          display:inline-block;
          line-height: 35px;
          span{
            font-size: 12px;
          }
        }
        .accountTitle2Right{
          @include size(70%,35px);
          font-size: 14px;
          color:#cccccc;
          display:inline-block;
          line-height: 35px;
          span{
            font-size: 12px;
          }
        }
      }
    }
    .accountContent{
      width:100%;
      height: 100%;
      /*height:572px;*/
      margin: 20px auto;
      &_select{
        @include size(90%,50px);
        text-align: center;
        line-height:30px;
        color:#fff;
        margin:0 auto;
        div{
          @include size(5%,40px);
          float:left;
          font-size: 16px;
          margin-right:14px;
          cursor: pointer;
        }
        .activeRead{
          box-sizing:border-box;
          border-bottom: 5px solid #0096ff;
        }
      }
      &_list{
        @include size(90%,calc(100% - 50px));
        // background:pink;
        overflow: hidden;
        margin:0 auto;
        .listTitle {
          /*@include size(100%, 8%);*/
          border-top:1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #f2f2f2;
            font-size: 14px;
            &:nth-child(1){
              @include size(10%, 100%);
            }
            &:nth-child(2){
              @include size(20%, 100%);
            }
            &:nth-child(3){
              @include size(30%, 100%);
            }
            &:nth-child(4){
              @include size(30%, 100%);
            }
          }
        }
        ul {
          @include size(100%, 50%);
          list-style: none;
          color: #fff;
          // float: left;
          overflow: hidden;
          font-size: 16px;
          li {
            /*height: 20%;*/
            cursor: pointer;
            border-bottom:1px solid rgba(255,255,255,0.2);
            div {
              float: left;
              height: 100%;
              box-sizing: border-box;
              text-align: center;
              margin-left: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 12px;
              &:nth-child(1){
                @include size(10%, 100%);
              }
              &:nth-child(2){
                @include size(20%, 100%);
              }
              &:nth-child(3){
                @include size(30%, 100%);
              }
              &:nth-child(4){
                @include size(30%, 100%);
              }
            }
          }
        }
      }

    }
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .account-wrap {
    @include size(100%, 100%);
    position: relative;
    background:url('../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    overflow: hidden;
    .accountTitle{
      @include size(100%,30%);
      box-sizing:border-box;
      padding-top:40px;
      &1{
        @include size(100%,71px);
        color:#fff;
        font-size: 20px;
        font-weight: 100;
        text-align: left;
        line-height: 71px;
        box-sizing:border-box;
        padding-left:60px;
      }
      &2{
        /*@include size(100%,97px);*/
        width: 100%;
        border-top:1px solid #b3b3b3;
        background: rgba(255,255,255,0.05);
        box-sizing:border-box;
        padding-left:5%;
        .accountTitle2Left{
          @include size(40%,48px);
          font-size: 16px;
          color:#cccccc;
          display:inline-block;
          line-height: 48px;
          span{
            font-size: 12px;
          }
        }
        .accountTitle2Right{
          @include size(50%,48px);
          font-size: 16px;
          color:#cccccc;
          display:inline-block;
          line-height: 48px;
          span{
            font-size: 12px;
          }
        }
      }
    }
    .accountContent{
      @include size(100%,70%);
      margin:0 auto;
      margin-top:50px;
      &_select{
        @include size(90%,80px);
        margin: 0 auto;
        text-align: center;
        line-height:90px;
        color:#fff;
        div{
          @include size(50px,80px);
          float:left;
          font-size: 18px;
          margin-right:25px;
          cursor: pointer;
        }
        .activeRead{
          box-sizing:border-box;
          border-bottom: 5px solid #0096ff;
        }
      }
      &_list{
        @include size(90%,calc(100% - 80px));
        margin: 0 auto;
        .listTitle {
          /*@include size(100%, 56px);*/
          margin-bottom: 8px;
          border-top:1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #f2f2f2;
            font-size: 16px;
            &:nth-child(1){
              @include size(3em, 100%);
            }
            &:nth-child(2){
              @include size(100px, 100%);
            }
            &:nth-child(3){
              @include size(436px, 100%);
            }
            &:nth-child(4){
              @include size(422px, 100%);
            }
          }
        }
        .ulBox{
          @include  size(100%,calc(calc(100% - 106px) - 3em));
          overflow: hidden;
          ul {
            list-style: none;
            color: #fff;
            float: left;
            font-size: 14px;
            li {
              /*height: 74px;*/
              cursor: pointer;
              border-bottom:1px solid rgba(255,255,255,0.2);
              div {
                float: left;
                height: 74px;
                box-sizing: border-box;
                text-align: center;
                width: 89px;
                margin-left: 12px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:nth-child(1){
                  @include size(3em, 100%);
                }
                &:nth-child(2){
                  @include size(100px, 100%);
                }
                &:nth-child(3){
                  @include size(436px, 100%);
                }
                &:nth-child(4){
                  @include size(422px, 100%);
                }
              }
            }
          }
        }

      }
    }
  }
}
@media only screen  and (min-width: 1931px){
  .account-wrap {
    @include size(100%, 100%);
    position: relative;
    background:url('../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    .accountTitle{
      @include size(100%,20%);
      position: absolute;
      top:5%;
      &1{
        @include size(100%,45%);
        color:#fff;
        font-size: 30px;
        font-weight: 100;
        text-align: left;
        line-height: 50px;
        box-sizing:border-box;
        padding-left:60px;
        // margin-top:2%;
      }
      &2{
        /*@include size(100%,50%);*/
        width: 100%;
        border-top:1px solid #b3b3b3;
        background: rgba(255,255,255,0.05);
        box-sizing:border-box;
        padding-left:56px;
        .accountTitle2Left{
          @include size(25%,75px);
          font-size: 28px;
          color:#cccccc;
          display:inline-block;
          line-height: 75px;
          span{
            font-size: 26px;
          }
        }
        .accountTitle2Right{
          @include size(70%,75px);
          font-size: 28px;
          color:#cccccc;
          display:inline-block;
          line-height: 75px;
          span{
            font-size: 26px;
          }
        }
      }
    }
    .accountContent{
      width:100%;
      height: 100%;
      /*height:572px;*/
      margin: 20px auto;
      position: absolute;
      top:25%;
      &_select{
        @include size(90%,80px);
        text-align: center;
        line-height:80px;
        color:#fff;
        margin:0 auto;
        div{
          @include size(5%,80px);
          float:left;
          font-size: 28px;
          margin-right:14px;
          cursor: pointer;
        }
        .activeRead{
          box-sizing:border-box;
          border-bottom: 5px solid #0096ff;
        }
      }
      &_list{
        @include size(90%,90%);
        margin:0 auto;
        .listTitle {
          /*@include size(100%, 80px);*/
          border-top:1px solid rgba(255,255,255,0.8);
          background: rgba(255,255,255,0.05);
          div {
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            color: #f2f2f2;
            font-size: 26px;
            &:nth-child(1){
              @include size(10%, 100%);
            }
            &:nth-child(2){
              @include size(20%, 100%);
            }
            &:nth-child(3){
              @include size(30%, 100%);
            }
            &:nth-child(4){
              @include size(30%, 100%);
            }
          }
        }
        ul {
          @include size(100%, 50%);
          list-style: none;
          color: #fff;
          overflow: hidden;
          font-size: 24px;
          li {
            /*height: 70px;*/
            cursor: pointer;
            border-bottom:1px solid rgba(255,255,255,0.2);
            div {
              float: left;
              height: 100%;
              box-sizing: border-box;
              text-align: center;
              margin-left: 12px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &:nth-child(1){
                @include size(10%, 100%);
              }
              &:nth-child(2){
                @include size(20%, 100%);
              }
              &:nth-child(3){
                @include size(30%, 100%);
              }
              &:nth-child(4){
                @include size(30%, 100%);
              }
            }
          }
        }
      }
    }
  }
}
/*__________________________________________________________________*/
@media only screen and (min-width: 1411px) and (max-width: 1610px) {

}
.Pagination{
  width:100%;
  height: 2em;
  margin-top: 0.2em;
  position: relative;
  overflow-y: hidden;
}
.classPage{
  width:calc(100% - 4em);
  float: left;
}
.el-pagination{
  display: inline-block;
  max-width:calc(100% - 4em);
  float:left;
  overflow-x: scroll;
}
.jumpbutton{
  width: 4em;
  height: 1.9em;
  float: left;
  margin-top: 0.2em;
  color: #fff;
  font-size: 14px;
  line-height: 28px;
  display: inline-block;
  text-align: center;
  border-radius: 5px;
  background-color: #0096ff;
  border: #0096ff 0px solid;
  cursor: pointer;
}
.save{
  @include size(150px,60px);
  color:#fff;
  font-size: 28px;
  line-height: 60px;
  text-align: center;
  background:#0096ff;
  border-radius: 4px;
  float: right;
  cursor: pointer;
  margin-right:2%;
  margin-top: 0.5%;
}
.cancel{
  width:4em;
  height: 1.9em;
  color:#fff;
  font-size: 14px;
  text-align: center;
  background:#c2c3c4;
  border-radius: 5px;
  float: right;
  cursor: pointer;
  padding: 0.4em;
  margin-top: 0.3em;
}
</style>
