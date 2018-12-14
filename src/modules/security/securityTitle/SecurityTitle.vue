<template>
    <div class="security_title">
        <div class="security_title_left">
            <div :class="{Titlebj:TitleKey === 0}" @click="selectTitle(0)">部门统计</div>
            <div :class="{Titlebj:TitleKey === 1}" @click="selectTitle(1)">统计分析</div>
        </div>
        <div class="security_title_right" @click="PresentationState" v-show="generateFileShow">
            <span>生成报告</span>
        </div>
        <!--<div class="presentation" v-show="PresentationShow"
            v-drag
            @mousedown="move=true"
            @mouseup="move=false"
            :style="move?'cursor:move':''"
           > -->
        <div class="presentation" v-show="PresentationShow"
           >
            <div class="title"><span>生成报告</span></div>
             <div class="content">
              <div class="content1">
                <span>生成文件：</span>
                    <div class="generateFile">
                      <div class="input">
                        <input type="text" value="请输入文件名称"
                            onfocus="if(this.value == '请输入文件名称') this.value = ''"
                            onblur="if(this.value =='') this.value = '请输入文件名称'" />
                      </div>
                          <div class="select">
                            <select name="">
                                <option value=".pdf">.pdf</option>
                                <option value=".doc">.doc</option>
                                <option value=".excel">.excel</option>
                            </select>
                        </div>
                    </div>
                </div>
                <!-- <div class="content2">
                    <span>导出地址：</span>
                    <div class="generateAddess">
                       {{importAddress}}
                    </div>
                </div> -->
            </div>
            <div class="operation">
                <div class="cancel" @click="cancelOper()">返回</div>
                <div class="save" @click="saveOper()">确认</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      TitleKey: 0,
      PresentationShow: false,
      move: false,
      generateFileShow: false,
      //   导出地址
      /*eslint-disable*/
      importAddress: "C:UsersUSRTDesktopaaa"
    };
  },
  computed: {
    ...mapState("SecurityStore", ["securityState"])
  },
  methods: {
    ...mapMutations("SecurityStore", ["setSecurityState","setReport"]),
    selectTitle(item) {
      this.layer.closeAll()
      this.TitleKey = item;
      this.setSecurityState(item);
    //   console.log("item", item);
    //   console.log("this.TitleKey", this.TitleKey);
    //   console.log("securityState", this.securityState);
      if (item === 0) {
        /*生成报告是否显示 */
        this.generateFileShow = false;
        /*生成报告的弹窗 是否显示 */
        this.PresentationShow = false;
      }
      if (item === 1) {
        this.generateFileShow = true;
      }
    },
    PresentationState() {
     this.setReport()
    },
    cancelOper() {
      this.PresentationShow = false;
    },
    saveOper() {
      this.PresentationShow = false;
    }
  },
   watch: {
    securityState (val) {
      this.TitleKey = val
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
/*遮盖select右侧小箭头*/
@mixin selDiv() {
  background: #1b203c;
}
.security_title {
  @include size(95%, auto);
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 20px;
  &_left {
    @include size(220px, 100%);
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    display: inline-block;
    div {
      cursor: pointer;
      @include size(100px, 30px);
      display: inline-block;
      margin-right: 5px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 0.1);
    }
  }
  &_right {
    @include size(100px, 30px);
    float: right;
    background: #0096ff;
    border-radius: 4px;
    text-align: center;
    line-height: 30px;
    font-size: 12px;
    cursor: pointer;
  }
  .presentation {
    width: 720px;
    height: 300px;
    background: #1b203c;
    border: 1px solid #0096ff;
    border-radius: 6px;
    z-index: 30;
    position: absolute;
    top: 30%;
    left: 20%;
    .title {
      @include size(100%, 50px);
      font-size: 16px;
      line-height: 60px;
      color: #fff;
      border-bottom: 1px solid #fff;
      box-sizing: border-box;
      padding-left: 20px;
    }
    .content {
      @include size(70%, 200px);
      margin: 0 auto;
      box-sizing: border-box;
      padding-top: 8%;
      &1 {
        // font-size: 20px;
        margin-bottom: 40px;
        span {
          font-size: 14px;
          display: block;
          width: 100px;
          float: left;
          text-align: center;
          line-height: 30px;
        }
        .generateFile {
          width: 400px;
          height: 30px;
          float: left;
          .input {
            width: 300px;
            height: 30px;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            background: none;
            outline: none;
            border: 1px solid #fff;
            float: left;
            color: #fff;
            padding-left: 10px;
            line-height: 22px;
            input {
              width: 100%;
              height: 100%;
              background: none;
              outline: none;
              border: none;
              color: #fff;
              line-height: 20px;
            }
          }
          .select {
            position: relative;
            width: 100px;
            height: 30px;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            float: left;
            // margin-top: -1px;
            padding: 0;
            margin: 0;
            select {
              border: none;
              outline: none;
              width: 100%;
              height: 30px;
              line-height: 30px;
              appearance: none;
              -webkit-appearance: none;
              -moz-appearance: none;
              background: none;
              border: 1px solid #fff;
              border-left: 0px solid #fff;
              border-top-right-radius: 4px;
              border-bottom-right-radius: 4px;
              padding-left: 20px;
              color: #fff;
              option {
                background: #1b203c;
              }
            }
          }
          .select:after {
            content: "";
            width: 14px;
            height: 8px;
            background: url("../../../assets/images/select_arrow.png") no-repeat
              center;
            position: absolute;
            margin-top: 15px;
            margin-left: -22px;
            pointer-events: none;
            z-index: 20;
          }
          .select:before {
            content: "";
            display: block;
            @include size(30px, 91%);
            position: absolute;
            top: 1px;
            right: 2px;
            @include selDiv();
            z-index: 10;
          }
        }
      }
      &2 {
        font-size: 20px;
        span {
          display: block;
          width: 100px;
          font-size: 14px;
          float: left;
          text-align: center;
          line-height: 30px;
        }
        .generateAddess {
          width: 400px;
          height: 30px;
          float: left;
          border: 1px solid #fff;
          border-radius: 4px;
          font-size: 14px;
          text-align: left;
          line-height: 30px;
          box-sizing: border-box;
          padding-left: 10px;
        }
      }
    }
    .operation {
      @include size(95%, 30px);
      div {
        @include size(56px, 30px);
        color: #fff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        float: right;
      }
      .save {
        background: #0096ff;
        margin-right: 2%;
      }
      .cancel {
        background: #c2c3c4;
      }
    }
  }
}
.Titlebj {
  background: #0096ff !important;
}
@media only screen and (min-width: 1290px) and (max-width: 1375px) {
  .security_title{
    .presentation{
      .content{
        &1{
          .generateFile{
            .select:before {
              height: 91%;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1376px) {
  .security_title{
    .presentation{
      .content{
        &1{
          .generateFile{
            .select:before {
              height: 90%;
            }
          }
        }
      }
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .security_title {
    &_left {
      width: 300px;
      line-height: 35px;
      font-size: 14px;
      div {
        @include size(125px, 35px);
      }
    }
    &_right {
      @include size(125px, 35px);
      line-height: 35px;
      font-size: 14px;
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .security_title {
    &_left {
      width: 252px;
      line-height: 40px;
      font-size: 16px;
      div {
        @include size(118px, 38px);
      }
    }
    &_right {
      @include size(125px, 40px);
      line-height: 40px;
      font-size: 16px;
    }
  }
}
@media only screen and (min-width: 1931px) {
  .security_title {
    &_left {
      width: 560px;
      line-height: 65px;
      font-size: 26px;
      div {
        @include size(220px, 65px);
      }
    }
    &_right {
      @include size(220px, 65px);
      line-height: 65px;
      font-size: 26px;
    }
  }
}
</style>
<style lang="scss">
  select::-ms-expand {
    display: none;
  }
</style>
