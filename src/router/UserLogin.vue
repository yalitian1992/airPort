<template>
  <div class="LoginBox" v-show="true">
    <div class="loginTxt">
      <p class="title">首都机场安全状态监控系统</p>
      <ul>
        <li>
          <input  type="text" :class="{nameNone: nameNone}" v-model="userInfo.name" placeholder="请输入登录账号">
        </li>
        <li>
          <input type="password" maxlength="6" :class="{pwdNone: pwdNone}" v-model="userInfo.password" placeholder="请输入密码">
        </li>
        <li class="verCode">
          <input type="text" :class="{codeNone: codeNone}" v-model="userInfo.code" placeholder="验证码">
          <div  class="imageBox" v-html="checkImge"></div>
          <span @click="Code()">换一张</span>
        </li>
      </ul>
      <button class="btn" @click="inputVerify(userInfo)">登录</button>
      <p class="forgetPwd">忘记密码?</p>
    </div>
  </div>
</template>
<script>

// import layer from '../../static/layer/layer'
/* eslint-diable */
// 验证码
const CaptchaHttp = '/captcha'
// 登录
const LoginHttp = '/Login'

export default {
  components: {
  },
  data () {
    return {
      loginIsShow: false,
      userInfo: {
        name: '',
        password: '',
        code: ''
      },
      nameNone: false,
      pwdNone: false,
      codeNone: false,
      checkImge: ''
    }
  },
  methods: {
    inputVerify (info) {
      if (!info.name) {
        this.nameNone = true
        return false
      } else if (!info.password) {
        this.pwdNone = true
        return false
      } else if (!info.code) {
        this.codeNone = true
        return false
      } else {
        this.LoginF(info)
      }
    },
    /**
     * @return {boolean}
     */
    LoginF (info) {
      var _this = this
      localStorage.setItem('token', 'asdfasdfasdf')
      _this.$router.push('/')
      this.post(LoginHttp, {
        name: info.name,
        password: info.password,
        checkcode: info.code
      }, function (res) {
        if (res.meta.code === 200) {
          if (res.data.result === false) {
            // 登录不成功
            alert(res.data.reson)
          } else {
            localStorage.setItem('token', res.data.token)

            _this.$router.push('/')
          }
        }
      })
    },
    Code () {
      var _this = this
      this.get(CaptchaHttp, {
      }, function (res) {
        _this.checkImge = res.toString()
        // _this.checkImge = res.bodyText.toString()
      })
    }
  },
  mounted () {
    this.Code()
  }
}
</script>

<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  /*登陆框start*/
  .LoginBox{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url('../assets/images/bj.png') no-repeat center/100% 100%;
    .loginTxt{
      position: relative;
      margin: 110px auto;
      padding: 20px 10px 0 10px;
      @include size(400px,450px);
      background: rgba(255,255,255,0.8);
      border-radius: 3px;
      p{
        font-size: 24px;
        color: #333399;
        text-align: center;
      }
      ul{
        width: 88%;
        margin: 40px auto 10px auto;
        li.verCode{
          display: flex;
          input{
            width: 50%;
          }
          img{
            @include size(90px,40px);
            margin: 10px 10px 0 15px;
          }
          span{
            margin-top: 21px;
            font-size: 14px;
            color: #333399;
            cursor: pointer;
          }
        }
        input{
          @include size(100%,50px);
          border: none;
          outline:none;
          border-bottom: 1px solid #8c939d;
          background: none;
        }

        .nameNone::-webkit-input-placeholder {
          color:red;
        }
        .nameNone:-moz-placeholder {
          color:red;
        }
        .nameNone::-moz-placeholder {
          color:red;
        }
        .nameNone:-ms-input-placeholder {
          color:red;
        }
        .pwdNone::-webkit-input-placeholder {
          color:red;
        }
        .pwdNone:-moz-placeholder {
          color:red;
        }
        .pwdNone::-moz-placeholder {
          color:red;
        }
        .pwdNone:-ms-input-placeholder {
          color:red;
        }
        .codeNone::-webkit-input-placeholder {
          color:red;
        }
        .codeNone:-moz-placeholder {
          color:red;
        }
        .codeNone::-moz-placeholder {
          color:red;
        }
        .codeNone:-ms-input-placeholder {
          color:red;
        }
      }
      .imageBox{
        width: 7em;
        text-align: center;
      }
      .btn{
        display: block;
        margin: 60px auto 0 auto;
        @include size(89%,50px);
        outline: none;
        background: #333399;
        font-size: 14px;
        letter-spacing: 2px;
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
      }
      .forgetPwd{
        margin: 10px 15px 0 0;
        cursor: pointer;
        text-align: right;
        font-size: 14px;
        color: #8c939d;
      }
    }
  }
  /*登陆框end*/
</style>
