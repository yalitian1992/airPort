<template>
  <div class="headerwrap clearfix" @click="hideLogInfo">
    <div class="headerwrapleft">
      <!-- <div class="headerwrapleftImg"></div> -->
      <p style=" text-shadow: rgba(74,112,173,0.8) 0.5px 0.5px, rgba(48,112,134,0.8) 1px 1px, rgba(48,112,134,0.8) 1.5px 1.5px, rgba(43,134,125,0.8) 2px 2px, rgba(64, 101, 138, 0.8) 2.5px 2.5px, rgba(76, 112, 146, 0.8) 3px 3px">{{title}}</p>
    </div>
    <div class="change" style="display: inline-block;width: 3%;float: left;height: 100%;"></div>
    <div class="headerwrapcenter" style="position: relative;">
      <ul>
        <li :class="{bgactive:list == 'risk',Author:(!menuAuthor['index'])}" @click="listSwitch('risk',menuAuthor['index'])">
          <span :class="{textcolor:list == 'risk',}">风险拓扑</span>
          <div class="liImg fl"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
        </li>
        <li :class="{bgactive:list == 'riskmap',Author:(!menuAuthor['riskMap'])}" @click="listSwitch('riskmap',menuAuthor['riskMap'])">
          <span :class="{textcolor:list == 'riskmap'}">风险地图</span>
          <div class="liImg fl"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
        </li>
        <li :class="{bgactive:list == 'security',Author:(!menuAuthor['safeStatistics'])}" @click="listSwitch('security',menuAuthor['safeStatistics'])">
          <span :class="{textcolor:list == 'security'}">安全统计</span>
          <div class="liImg fl"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
        </li>
        <li :class="{bgactive:list == 'model',Author:!menuAuthor['model']}" @click="listSwitch('model',menuAuthor['model'])">
          <span :class="{textcolor:list == 'model'}">模型管理</span>
          <div class="liImg fl"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
        </li>
        <li :class="{bgactive:list == 'system',Author:(!menuAuthor['sysmanage'])}" @click="listSwitch('system',menuAuthor['sysmanage'])">
          <div class="liImg fr"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
          <span :class="{textcolor:list == 'system'}">系统管理</span>
          <div class="liImg fl"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
        </li>
        <li :class="{Author:(!menuAuthor['alerInfo'])}" >
          <div @click="listSwitch('noticeInform',menuAuthor['alerInfo'])" style="position: relative;">
            <i v-show="noticeShow"></i>
            <img class="one" style="marginTop: 0.8em;" src="../assets/images/title-icon1.png" alt="">
            <div class="liImg fr"><img src="../assets/images/jianbian-1.png" class="liImg"></div>
          </div>

        </li>

      </ul>
      <div class="warn" v-show="WarmShow" @click="WarmShowdisappear" >
        <div class="targer"></div>
        <!-- <span>您有新的报警！</span>-->
        <div class="targercount" style="color:red;">您有未处置报警：
          {{String(AlarmCount).substr(0,4)}}条
          <i class="more" v-if="AlarmCount > 9999">+</i>
        </div>
      </div>
    </div>
    <div class="headerwrapright">
      <div @click.stop="showAccount()">
        <img class="two" src="../assets/images/title-icon.png" alt="">
        <div class="Account" v-show="AccountShow">
          <div @click="listSwitch('Account')">
            <img src="../assets/images/person.png">
            账户主页
          </div>
          <div @click="exit"><img src="../assets/images/exit.png">退出</div>
        </div>
        <span>{{logUser}}</span>
      </div>

    </div>

    <div v-show="false">{{getList}}</div>
  </div>
</template>
<script>
/* eslint-disable */
const HandAlarm = "SafeStatistic/waitHandAlarm";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {},
  data() {
    return {
      title: "首都机场安全状态监控系统",
      list: "",
      AccountShow: false,
      WarmShow: false,
      noticeShow: true,
      AlarmCount: ""
    };
  },

  computed: {
    ...mapState("RiskStore", ["indexData"]),
    ...mapState("menuAuthor", ["MenuAuthDic", "logerName","MenuDic"]),
    ...mapState("SecurityStore", ["securityState"]),
    getList() {
      /*eslint-disable*/
      if (this.$route.name) {
        this.list = this.$route.name;
      }

      return "";
    },
    getparams() {
      return JSON.stringify({
        modelType: String(0),
        treeId: String("")
      });
    },
    menuAuthor() {
      return this.MenuAuthDic;
    },
    logUser() {
      return this.logerName;
    }
  },
  // }),
  created() {
    if (this.$route.name === "risk" && this.menuAuthor["index"]) {
      this.list = "risk";
    } else if (this.$route.name === "riskmap" && this.menuAuthor["riskMap"]) {
      this.list = "riskmap";
    } else if (
      this.$route.name === "security" && this.menuAuthor["safeStatistics"]
    ) {
      this.list = "security";
    } else if (this.$route.name === "model" && this.menuAuthor["model"]) {
      this.list = "model";
    }
    else if (this.$route.name === "system" && this.menuAuthor["sysmanage"]) {
      this.list = "system";
    }
    else if(this.$route.name===''){
      if(this.menuAuthor["index"]){
        this.list='index'
      }else{
        var json = this.menuAuthor
        var keyArr = Object.keys(json)
        this.list=this.MenuDic[keyArr[0]]
        this.listSwitch(this.list,true)
      }
    }
    else if(this.$route.name==='index'){
      var json = this.menuAuthor
      var keyArr = Object.keys(json)
      this.list=this.MenuDic[keyArr[0]]
      this.listSwitch(this.list,true)
    }
    // 报警弹框定时请求
    setInterval(this.AlarmF,5000);
  },
  methods: {
    ...mapMutations("RiskStore", ["setIndexData","setTreeId"]),
    ...mapMutations("ModelStore", ["setModelState"]),
    ...mapMutations("SecurityStore", ["setSecurityState"]),
    ...mapMutations("systemStore", ["setSystemState"]),
    ...mapActions("RiskStore", [
      "getManageData",
      "getRiskViewData",
      "getRiskFactor",
      "getRiskSafeCurve",
      "getRiskData",
      "getRiskDataDetail",
      "getRiskfactorCount",
      "getRiskTopDetailSafeCurve",
      "getRiskDetailFactor"
    ]),
    exit() {
      sessionStorage.removeItem("userInfo");
      sessionStorage.removeItem("menuRight");
      sessionStorage.removeItem("sid");
      this.$router.push("/");
    },
    listSwitch(val, boolAut) {
      this.layer.closeAll()
      if (val != "Account") {
        // 判断是否需要跳转到'账户主页'
        if (!boolAut) {
          return false;
        }
      }
      let  index=2;
       this.setIndexData(index);
      this.list = val;

       this.$router.push("/Application/" + this.list);
      if (val == "risk") {
        this.setTreeId("")
        this.setIndexData('0')
        this.getRiskFactor(this.getparams);
        this.getRiskSafeCurve(this.getparams);
        this.getRiskData(this.getparams);
        this.getManageData();
        this.getRiskViewData();
        // this.$router.push("/Application/"+this.list)
        // this.$router.push({
        //   path: "/Application/"+this.list,
        //   query: {
        //     treeId: "",
        //   }
        // });
      // }else{

      }

      let WarnDataNum = Math.floor(Math.random() * 10 + 1);
      if (WarnDataNum >= 6) {
        this.WarmShow = true;
      }
      if (WarnDataNum < 6) {
        // this.WarmShow = false;
      }
      if (val === "noticeInform") {
        this.noticeShow = true;
      }
      if (val === "Account") {
        this.noticeShow = false;
      }


      this.setModelState(0);
      this.setSecurityState(0);
      this.setSystemState(1);
    },
    WarmShowdisappear() {
      // this.WarmShow = false;
      this.listSwitch('noticeInform',this.menuAuthor['alerInfo'])
    },
    showAccount() {
      this.AccountShow = !this.AccountShow;
    },
    hideLogInfo() {
      this.AccountShow = false;
    },
    AlarmF: function() {
      var _this = this;
      if(_this.userInfo===null){
        return false
      }
      this.post(
        HandAlarm,
        {
          param: JSON.stringify({Uid:_this.userInfo.TU_ID})
        },
        function(res) {
          _this.AlarmCount = res.alarmCount;
          if (_this.AlarmCount >= 0) {
            _this.WarmShow = true
          } else {
            _this.WarmShow = false
          }
        }
      );
    }
  },
  mounted: function() {
    this.AlarmF();
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.targercount {
  position: relative;
  text-align: center;
  .more {
    position: absolute;
    font-weight: bolder;
    font-style: normal;
  }
}
.headerwrap {
  width: 100%;
  height: 100%;
  background: url("../assets/images/title-bj.png") no-repeat 0px 0px;
  background-size: 100% 100%;
  position: relative;
}

.headerwrapleft {
  @include size(auto, 100%);
  box-sizing: border-box;
  padding-left: 54px;
  background: url("../assets/images/logo.png") no-repeat 10px 9px;
  background-size: 33px 33px;
  float: left;

  .headerwrapleftImg {
    @include size(4px, 3px);
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

.headerwrapcenter {
  @include size(45%, 100%);
  margin-left: 0%;
  float: left;

  ul {
    overflow: hidden;
    height: 100%;

    li {
      @include size(16.6%, 100%);
      cursor: pointer;
      float: left;
      text-align: center;
      font-size: 16px;
      // color: #3f70a2;
      color: #fff;

      .liImg {
        width: 2px;
        height: 100%;
        background: url("../assets/images/jianbian-1.png");
      }
    }

    li:hover {
      background-image: url("../assets/images/title-bj-5-hover.png");
      background-size: 100% 100%;
    }

    li.bgactive {
      cursor: pointer;
      background-image: url("../assets/images/jianbiajn-2.png"),
        url("../assets/images/title-bj-5.png");
      background-repeat: no-repeat, no-repeat;
      background-size: 100% 100%;
      color: #fff;
    }

    li.Author {
      cursor: not-allowed;
    }
  }
}

.headerwrapright {
  @include size(13%, 100%);
  float: right;
  position: relative;

  i {
    background: #ff0000;
    width: 8.52px;
    height: 8.52px;
    border-radius: 50%;
    position: absolute;
    top: 7.81px;
    left: 15.36px;
  }

  img.one {
    margin-top: 20px !important;
    float: left;
    cursor: pointer;
  }

  img.two {
    margin-left: 12%;
    margin-top: 4%;
    float: left;
    cursor: pointer;
  }

  span {
    cursor: pointer;
    float: left;
    margin-left: 2%;
    color: #fff;
    font-size: 16px;
  }

  .Account {
    @include size(60%, 150%);
    position: absolute;
    top: 120%;
    left: 8%;
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: #262B46;
    border-radius: 4px;

    div {
      @include size(100%, 50%);
      text-align: left;
      box-sizing: border-box;
      padding-left: 35%;
      cursor: pointer;
      font-size: 12px;

      &:nth-child(1),
      &:nth-child(2) {
        position: relative;

        img {
          display: block;
          @include size(15px, 15px);
          float: left;
          position: absolute;
          left: 10px;
          top: 5px;
        }
      }
    }
  }
}
@media only screen and (max-width: 1290px) {
  .headerwrap{
    min-width: 1024px;
    .headerwrapleft {
      background: url("../assets/images/logo.png") no-repeat 15px 0px;
      background-size: 45px 45px;
      padding-left: 60px;

      p {
        line-height: 40px;
        font-size: 28px;
      }
    }

    .headerwrapcenter ul li {
      line-height: 35px;
      font-size: 14px;
    }

    .headerwrapright span {
      font-size: 12px;
      line-height: 35px;
    }

    .headerwrapright .Account div {
      line-height: 25px;
    }

    .headerwrapright .warn span {
      height: 23px;
    }

    .warn {
      @include size(146px, 48px);
      padding: 0.3em 0.2em;
      position: absolute;
      top: 40px;
      right:calc(8.3% - 73px);
      z-index: 5;
      color: #fff;
      background-size: 100% 100%;
      background: rgba(35, 67, 181, 0.6);
      border-radius: 10px;
      cursor: pointer;

      .targer {
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-bottom: 12px solid rgba(35, 67, 181, 0.6);
        float: left;
        position: absolute;
        top: -11.7px;
        left: 45%;
      }

      span {
        display: block;
        width: 100%;
        height: 20px;
        text-align: center;
        color: #e6dddd;
        font-size: 12px;
        .targercount {
          text-align: center;
          position: relative;
          display: inline;
          font-size: 16px;
          .more {
            position: absolute;
            top: -18px;
            right: -10px;
            font-size: 20px;
            font-weight: bolder;
            font-style: normal;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 1279px) {
  .headerwrapleft{
    p{
      font-size: 23px !important;
    }
  }
  .change{
    width: 1% !important;
  }
}

@media only screen and (min-width: 1291px) and (max-width: 1376px) {
  .headerwrapleft {
    background: url("../assets/images/logo.png") no-repeat 15px -3px;
    background-size: 50px 50px;
    padding-left: 64px;

    p {
      line-height: 40px;
      font-size: 30px;
    }
  }

  .headerwrapcenter ul li {
    line-height: 35px;
    font-size: 14px;
  }

  .headerwrapright span {
    font-size: 12px;
    line-height: 35px;
  }

  .headerwrapright .Account div {
    line-height: 25px;
  }

  .headerwrapright .warn span {
    height: 23px;
  }

  .warn {
    @include size(146px, 48px);
    padding: 0.3em 0.2em;
    position: absolute;
    top: 40px;
    right:calc(8.3% - 73px);
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: rgba(35, 67, 181, 0.6);
    border-radius: 10px;
    cursor: pointer;

    .targer {
      width: 0;
      height: 0;
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 12px solid rgba(35, 67, 181, 0.6);
      float: left;
      position: absolute;
      top: -11.7px;
      left: 45%;
    }

    span {
      display: block;
      width: 100%;
      height: 20px;
      text-align: center;
      color: #e6dddd;
      font-size: 12px;
      .targercount {
        text-align: center;
        position: relative;
        display: inline;
        font-size: 16px;
        .more {
          position: absolute;
          top: -18px;
          right: -10px;
          font-size: 20px;
          font-weight: bolder;
          font-style: normal;
        }
      }
    }
  }
}

@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .headerwrapleft {
    background: url("../assets/images/logo.png") no-repeat 16px 0px;
    background-size: 50px 50px;
    padding-left: 65px;

    p {
      line-height: 45px;
      font-size: 32px;
    }
  }
  .change{
    width: 1% !important;
  }

  .headerwrapcenter ul li {
    line-height: 45px;
    font-size: 16px;
  }

  .headerwrapright span {
    font-size: 14px;
    line-height: 45px;
  }

  .headerwrapright .Account div {
    line-height: 32px;
    font-size: 14px;
  }

  .headerwrapright {
    @include size(15%, 100%);

    .Account {
      div {
        font-size: 14px;

        &:nth-child(1),
        &:nth-child(2) {
          position: relative;

          img {
            display: block;
            @include size(20px, 20px);
            float: left;
            position: absolute;
            left: 10px;
            top: 5px;
          }
        }
      }
    }
  }

  .headerwrapright .warn span {
    height: 25px;
  }

  .headerwrapright {
    img.two {
      margin-top: 6.4%;
    }
  }
  .warn {
    @include size(170px, 54px);
    padding: 0.3em 0.2em;
    position: absolute;
    top: 45px;
    right:calc(8.3% - 85px);
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: rgba(35, 67, 181, 0.6);
    border-radius: 10px;
    cursor: pointer;

    .targer {
      width: 0;
      height: 0;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-bottom: 13px solid rgba(35, 67, 181, 0.6);
      float: left;
      position: absolute;
      top: -11.7px;
      left: 45%;
    }

    span {
      display: block;
      width: 100%;
      height: 25px;
      text-align: center;
      color: #e6dddd;
      font-size: 14px;
      .targercount {
        text-align: center;
        display: inline;
        font-size: 18px;
        .more {
          top: -20px;
          right: -10px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .headerwrapleft {
    background: url("../assets/images/logo.png") no-repeat 15px -5px;
    background-size: 65px 65px;
    padding-left: 75px;

    p {
      line-height: 52px;
      font-size: 34px;
    }
  }
  img.one {
    margin-top: 0.8em;
    width: 1.6em;
  }
  .headerwrapright {
    img.two {
      margin-top: 6.2%;
      width: 1.4em;
    }
  }
  .headerwrapcenter ul li {
    line-height: 50px;
    font-size: 18px;
  }

  .warn {
    @include size(180px, 62px);
    padding: 0.3em 0.2em;
    position: absolute;
    top: 50px;
    right:calc(8.3% - 90px);
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: rgba(35, 67, 181, 0.6);
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;

    .targer {
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 14px solid rgba(35, 67, 181, 0.6);
      float: left;
      position: absolute;
      top: -14px;
      left: 45%;
    }

    span {
      display: block;
      width: 100%;
      height: 28px;
      text-align: center;
      color: #e6dddd;
      .targercount {
        text-align: center;
        display: inline;
        font-size: 20px;
        .more {
          top: -16px;
          right: -10px;
        }
      }
    }
  }

  .headerwrapright span {
    font-size: 16px;
    line-height: 50px;
  }

  .headerwrapright .Account div {
    line-height: 32px;
    font-size: 16px;
  }

  .Account {
    @include size(60%, 150%);
    position: absolute;
    top: 120%;
    left: 25%;
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: #262B46;
    border-radius: 4px;
    font-size: 14px;

    div {
      @include size(100%, 50%);
      text-align: left;
      box-sizing: border-box;
      padding-left: 35%;
      cursor: pointer;
      font-size: 12px;

      &:nth-child(1),
      &:nth-child(2) {
        position: relative;

        img {
          display: block;
          @include size(28px, 28px);
          float: left;
          margin-top: 5px;
          margin-left: 8px;
        }
      }
    }
  }
}

@media only screen and (min-width: 1411px) and (max-width: 1610px) {
  .headerwrapleft{
    background-size: 55px 55px;
    padding-left: 78px;
    p{
      line-height: 50px;
      font-size: 30px;
    }
  }
}

@media only screen and (min-width: 1931px) {
  .headerwrapleft {
    background: url("../assets/images/logo.png") no-repeat 24px 15px;
    background-size: 50px 50px;
    box-sizing: border-box;
    padding-left: 84px;

    p {
      line-height: 80px;
      font-size: 34px;
    }
  }

  .headerwrapcenter ul li {
    line-height: 80px;
    font-size: 32px;
  }

  .headerwrapright span {
    font-size: 18px;
    line-height: 80px;
  }

  .headerwrapright .Account div {
    line-height: 32px;
    font-size: 30px;
  }

  .headerwrapright {
    @include size(15%, 100%);
    float: right;
    position: relative;

    i {
      background: #ff0000;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      position: absolute;
      top: 12px;
      left: 40px;
    }

    img.one {
      display: block;
      width: 1.6em;
      margin-top: 0.8em;
      float: left;
      cursor: pointer;
    }

    img.two {
      display: block;
      @include size(13%, 100%);
      margin-left: 12%;
      margin-top: 6.2%;
      float: left;
      cursor: pointer;
    }

    // admin
    span {
      cursor: pointer;
      float: left;
      margin-left: 2%;
      color: #fff;
      line-height: 350%;
      font-size: 26px;
    }

    .Account {
      @include size(70%, 150%);
      position: absolute;
      top: 120%;
      left: 10%;
      z-index: 5;
      color: #fff;
      // background:url('../assets/images/Account.png') no-repeat center center;
      background-size: 100% 100%;
      background: #262B46;
      border-radius: 4px;

      div {
        @include size(100%, 50%);
        text-align: left;
        box-sizing: border-box;
        padding-left: 35%;
        cursor: pointer;
        font-size: 24px;
        line-height: 50px;

        &:nth-child(1),
        &:nth-child(2) {
          position: relative;

          img {
            display: block;
            @include size(30px, 30px);
            float: left;
            position: absolute;
            left: 20px;
            top: 10px;
          }
        }
      }
    }
  }

  .headerwrapright .warn span {
    height: 40px;
    font-size: 26px;
  }

  .warn {
    @include size(310px, 102px);
    padding: 0.3em 0.2em;
    position: absolute;
    top: 85px;
    right:calc(8.3% - 155px);
    z-index: 5;
    color: #fff;
    background-size: 100% 100%;
    background: rgba(35, 67, 181, 0.6);
    border-radius: 10px;
    cursor: pointer;

    .targer {
      width: 0;
      height: 0;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 20px solid rgba(35, 67, 181, 0.6);
      float: left;
      position: absolute;
      top: -20px;
      left: 45%;
    }

    span {
      display: block;
      width: 100%;
      height: 45px;
      text-align: center;
      color: #e6dddd;
      font-size: 24px;
      .targercount {
        text-align: center;
        display: inline;
        font-size: 34px;
      }
    }
  }
}

@media only screen and (min-width: 1932px) and (max-width: 2570px) {
  .headerwrapleft {
    /*background: url("../assets/images/logo.png") no-repeat 15px 9px;*/
    /*background-size: 33px 33px;*/

     /*p {
       line-height: 50px;
       font-size: 20px;
     }*/
   }
   img.one{
     margin-top: 0.8em;
     width: 1.7em;
   }
   .warn{
     right: 23%;
   }
//   .more{
//     top: -28px;
//     right: -14px;
//   }
}

</style>
