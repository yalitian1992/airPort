<template>
  <div class="login_warp">
    <div class="login_title" v-show="(clientType===0?true:false)">
      <div class="login_title_left">
        <div class="headerwrapleftImg"></div>
        <p>{{title}}</p>
      </div>
    </div>
    <div class="login_box"  v-show="(clientType===0?true:false)">
      <div class="login_title">
        <span>系统登录</span>
      </div>
      <div class="login_content">
        <div class="login_user">
          <div><img src="../assets/images/user.png"></div>
          <input type="text"  v-model="userName" value="admin" placeholder="请输入账号" @keyup.enter="login" />
        </div>
        <div class="login_pass">
          <div><img src="../assets/images/pass.png"></div>
          <input type="password" v-model="userPwd"  placeholder="请输入密码"  @keyup.enter="login"/>
        </div>
      </div>
      <div class="login_button" @click="login()">
        <span>安全登录</span>
      </div>
    </div>
    <div  v-show="(clientType===1?true:false)" style="width: 80%;height: 80%;margin: 0 auto; text-align: center; font-size: 4em;
    font-family:PingFang SC,KaiTi;
    font-weight: bold;
    text-align: center;
    line-height: 8em;
    color: #443a3a;">
      <span> {{message}}</span>

    </div>
  </div>
</template>
<script>
import {mapActions, mapMutations} from 'vuex'
export default {
  components: {
  },
  data () {
    return {
      title: '首都机场安全状态监控系统',
      userName: 'admin',
      userPwd: '123456',
      clientType: 0,
      message: '登陆验证中...'
    }
  },
  methods: {
    ...mapActions('menuAuthor', ['setMenuData']),
    ...mapMutations('RiskStore', ['setTreeId', 'setIndexData']),
    login () {
      let _this = this
      if (_this.userName !== '' && _this.userPwd !== '') {
        _this.layer.load(1)
        _this.post('/UserLogin/Login', {
          'userName': _this.userName,
          'userPassWord': _this.userPwd,
          'sessionID': '',
          'ClientType': 0
        }, function (result) {
          _this.layer.closeAll()
          if (result.Status) {
            if (result.ResultData.right_name.length === 0) {
              _this.layer.msg('当前用户无菜单权限;</br>请通过管理员设置权限后再登录')
            } else {
              _this.setMenuData(result.ResultData.right_name)
              sessionStorage.setItem('menuRight', JSON.stringify(result.ResultData.right_name))
              sessionStorage.setItem('sid', result.SessionID)
              sessionStorage.setItem('userInfo', JSON.stringify(result.ResultData.user))
              _this.layer.msg('登录成功')
            }
            setTimeout(function () {
              _this.$router.push('/Application')
              _this.setTreeId('')
            }, 3000)
          } else {
            _this.layer.msg('登录失败:' + result.Message)
          }
        })
      } else {
        _this.layer.msg('用户名密码不能为空！！！')
      }
    },
    autoLogin () {
      let _this = this
      _this.layer.load(1)
      _this.post('/UserLogin/Login', {
        // 'userName': _this.userName,
        'userName': 'admin',
        'sessionID': '',
        'ClientType': 1
      }, function (result) {
        _this.layer.closeAll()
        if (result.Status) {
          if (result.ResultData.right_name.length === 0) {
            _this.layer.msg('当前用户无菜单权限;</br>请通过管理员设置权限后再登录')
            _this.message = '当前用户无菜单权限;</br>请通过管理员设置权限后再登录'
          } else {
            _this.setMenuData(result.ResultData.right_name)
            sessionStorage.setItem('menuRight', JSON.stringify(result.ResultData.right_name))
            sessionStorage.setItem('sid', result.SessionID)
            sessionStorage.setItem('userInfo', JSON.stringify(result.ResultData.user))
            _this.message = '登录成功'
            setTimeout(function () {
              _this.$router.push('/Application')
              _this.setTreeId('')
            }, 100)
          }
        } else {
          _this.layer.msg('登录失败:' + result.Message)
          _this.message = '登录失败:' + result.Message
        }
      })
    }
  },
  created () {

  },
  mounted () {
    this.message = '安全状态监控系统'
    let id = this.$route.query.user
    if (id !== undefined) {
      this.clientType = 1
      this.userName = id
    }
    if (this.clientType === 1) {
      this.autoLogin()
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.login_warp{
  width:100vw !important;
  height:100vh !important;
  background: url('../assets/images/login.png') center center;
  position: relative;
  .login_title{
    @include size(100%,35px);
    background: url("../assets/images/title-bj.png") no-repeat 0px 0px;
    background-size: 100% 100%;
    position: relative;
    &_left{
        @include size(100%,100%);
        box-sizing:border-box;
        padding-left: 54px;
        background: url("../assets/images/logo.png") no-repeat 10px 9px;
        background-size: 24px 16px;
        float: left;
        .headerwrapleftImg{
          @include size(4px,3px);
          float: left;
        }
        p {
          margin: 0;
          color: #fff;
          // font-family: "SourceHanSansSC-Bold";
          font-size: 20px;
          letter-spacing: 6px;
        }
    }
  }
  .login_box{
    @include size(593px,521px);
    background: rgba(15,20,50,0.6);
    position: absolute;
    right:10%;
    top:10%;
    .login_title{
      @include size(100%,76px);
      background: rgba(15,20,50,1);
      text-align: center;
      line-height:76px;
      font-size: 28px;
    }
    .login_content{
      @include size(435px,auto);
      margin:0 auto;
      div{
        @include size(435px,66px);
        border-radius: 7px;
        background: #DDDDDD;
        input{
          @include size(369px,66px);
          border-radius: 7px;
          border: none;
          background: #DDDDDD;
          font-size: 20px;
          color: #000000;
          outline:none;
        }
      }
      .login_user{
        margin-top:77px;
        div{
          @include size(66px,66px);
          float: left;
          img{
            margin-top:20px;
            margin-left:20px;
          }
        }
      }
      .login_pass{
        margin-top:35px;
        div{
          @include size(66px,66px);
          float: left;
          img{
            margin-top:20px;
            margin-left:20px;
          }
        }
      }
    }
    .login_button{
      @include size(435px,66px);
      background: rgba(15,20,50,1);
      margin:0 auto;
      text-align: center;
      line-height:66px;
      font-size: 28px;
      border-radius: 7px;
      margin-top:72px;
      cursor: pointer;
    }
  }
}
@media  only screen  and (max-width: 1376px){
  .login_warp{
    position: relative;
    .login_title{
      @include size(100%,35px);
      &_left{
          padding-left: 54px;
          background: url("../assets/images/logo.png") no-repeat 10px 9px;
          background-size: 24px 16px;
          float: left;
          .headerwrapleftImg{
            @include size(4px,3px);
            float: left;
          }
          p {
            font-size: 16px;
            letter-spacing: 6px;
            line-height: 35px;
          }
      }
    }
    .login_box{
      @include size(393px,321px);
      background: rgba(15,20,50,0.6);
      position: absolute;
      right:10%;
      top:10%;
      .login_title{
        @include size(100%,56px);
        background: rgba(15,20,50,1);
        text-align: center;
        line-height:56px;
        font-size: 20px;
      }
      .login_content{
        @include size(305px,auto);
        margin:0 auto;
        div{
          @include size(305px,46px);
          border-radius: 7px;
          background: #DDDDDD;
          input{
            @include size(169px,46px);
            border-radius: 7px;
            border: none;
            background: #DDDDDD;
            font-size: 16px;
            color: #000000;
            outline:none;
          }
        }
        .login_user{
          margin-top:37px;
          div{
            @include size(46px,46px);
            float: left;
            img{
              display: block;
              @include size(20px,20px);
              margin-top:15px;
              margin-left:15px;
            }
          }
        }
        .login_pass{
          margin-top:15px;
          div{
            @include size(46px,46px);
            float: left;
            img{
              display: block;
              @include size(20px,20px);
              margin-top:15px;
              margin-left:15px;
            }
          }
        }
      }
      .login_button{
        @include size(305px,46px);
        background: rgba(15,20,50,1);
        margin:0 auto;
        text-align: center;
        line-height:46px;
        font-size: 20px;
        border-radius: 7px;
        margin-top:32px;
        cursor: pointer;
      }
    }
  }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .login_warp{
    position: relative;
    .login_title{
      @include size(100%,45px);
      &_left{
          background: url("../assets/images/logo.png") no-repeat 10px 14px;
          background-size: 24px 16px;
          p {
            font-size: 18px;
            line-height: 45px;
          }
      }
    }
    .login_box{
      @include size(493px,381px);
      background: rgba(15,20,50,0.6);
      position: absolute;
      right:10%;
      top:15%;
      .login_title{
        @include size(100%,56px);
        background: rgba(15,20,50,1);
        text-align: center;
        line-height:56px;
        font-size: 24px;
      }
      .login_content{
        @include size(335px,auto);
        margin:0 auto;
        div{
          @include size(100%,56px);
          border-radius: 7px;
          background: #DDDDDD;
          input{
            @include size(169px,56px);
            border-radius: 7px;
            border: none;
            background: #DDDDDD;
            font-size: 16px;
            color: #000000;
            outline:none;
          }
        }
        .login_user{
          margin-top:47px;
          div{
            @include size(56px,56px);
            float: left;
            img{
              display: block;
              @include size(25px,25px);
              margin-top:15px;
              margin-left:15px;
            }
          }
        }
        .login_pass{
          margin-top:25px;
          div{
            @include size(56px,56px);
            float: left;
            img{
              display: block;
              @include size(25px,25px);
              margin-top:15px;
              margin-left:15px;
            }
          }
        }
      }
      .login_button{
        @include size(335px,56px);
        line-height:56px;
        font-size: 24px;
        margin-top:42px;
      }
    }
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .login_warp{
    width:100vw !important;
    height:100vh !important;
    background: url('../assets/images/login.png') center center;
    position: relative;
    .login_title{
      @include size(100%,50px);
      &_left{
          background: url("../assets/images/logo.png") no-repeat 15px 14px;
          background-size: 30px 20px;
          p {
            font-size: 20px;
            line-height: 50px;
          }
      }
    }
    .login_box{
      @include size(593px,521px);
      background: rgba(15,20,50,0.6);
      position: absolute;
      right:10%;
      top:10%;
      .login_title{
        @include size(100%,76px);
        background: rgba(15,20,50,1);
        text-align: center;
        line-height:76px;
        font-size: 28px;
      }
      .login_content{
        @include size(435px,auto);
        margin:0 auto;
        div{
          @include size(435px,66px);
          border-radius: 7px;
          background: #DDDDDD;
          input{
            @include size(369px,66px);
            border-radius: 7px;
            border: none;
            background: #DDDDDD;
            font-size: 20px;
            color: #000000;
            outline:none;
          }
        }
        .login_user{
          margin-top:77px;
          div{
            @include size(66px,66px);
            float: left;
            img{
              margin-top:20px;
              margin-left:20px;
            }
          }
        }
        .login_pass{
          margin-top:35px;
          div{
            @include size(66px,66px);
            float: left;
            img{
              margin-top:20px;
              margin-left:20px;
            }
          }
        }
      }
      .login_button{
        @include size(435px,66px);
        background: rgba(15,20,50,1);
        margin:0 auto;
        text-align: center;
        line-height:66px;
        font-size: 28px;
        border-radius: 7px;
        margin-top:72px;
        cursor: pointer;
      }
    }
  }
}
@media only screen  and (min-width: 1931px){
  .login_warp{
    width:100vw !important;
    height:100vh !important;
    background: url('../assets/images/login2560.png') center center;
    position: relative;
    .login_title{
      @include size(100%,80px);
      &_left{
          background: url("../assets/images/logo.png") no-repeat 18px 14px;
          background-size: 50px 40px;
          padding-left: 100px;
          p {
            font-size: 30px;
            line-height: 80px;
          }
      }
    }
    .login_box{
      @include size(793px,700px);
      background: rgba(15,20,50,0.6);
      position: absolute;
      right:10%;
      top:10%;
      .login_title{
        @include size(100%,126px);
        background: rgba(15,20,50,1);
        text-align: center;
        line-height:126px;
        font-size: 36px;
      }
      .login_content{
        @include size(635px,auto);
        margin:0 auto;
        div{
          @include size(100%,86px);
          border-radius: 7px;
          background: #DDDDDD;
          input{
            @include size(550px,86px);
            border-radius: 7px;
            border: none;
            background: #DDDDDD;
            font-size: 30px;
            color: #000000;
            outline:none;
            // background: gold;
          }
        }
        .login_user{
          margin-top:87px;
          div{
            @include size(80px,80px);
            float: left;
            img{
              margin-top:28px;
              margin-left:28px;
            }
          }
        }
        .login_pass{
          margin-top:65px;
          div{
            @include size(80px,80px);
            float: left;
            img{
              margin-top:28px;
              margin-left:28px;
            }
          }
        }
      }
      .login_button{
        @include size(635px,86px);
        background: rgba(15,20,50,1);
        margin:0 auto;
        text-align: center;
        line-height:86px;
        font-size: 34px;
        border-radius: 7px;
        margin-top:72px;
        cursor: pointer;
      }
    }
  }
}
  input:-webkit-autofill{
    background-color: white!important;
  }
</style>
