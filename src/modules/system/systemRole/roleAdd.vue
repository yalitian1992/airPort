<template>
  <!--<div class="editBox" v-show="show">-->
    <!--<div class="editCont">-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <ul>
      <li>
        <span>角色名称：</span>
        <input maxlength="50" type="text" v-model="roleInfo.rolename">
      </li>
      <li>
        <span class="txt">角色描述：</span>
        <textarea maxlength="200" v-model="roleInfo.description" id="" cols="30" rows="8"></textarea>
      </li>
    </ul>
    <div class="btnBox">
      <span @click="Verif(roleInfo)">确定</span>
      <span class="grayBg" @click="ProData.show=false">取消</span>
    </div>
  </Prompt>
      <!--<i class="closeIcon" @click="show=false"></i>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
import layer from '../../../../static/layer/layer.js'
import Prompt from '../../../components/prompt/prompt.vue'
export default {
  data () {
    return {
      // move: false,
      show: false,
      roleInfoList: [],
      roleInfo: {
        createtime: '',
        description: '',
        roleID: '',
        rolename: ''
      },
      ProData: {
        title: '添加',
        show: false,
        width: '500px',
        height: '400px'
      }
    }
  },
  components: {
    Prompt
  },
  methods: {
    addChildShow: function (info) {
      // this.show = true
      this.roleInfo = {}
      this.ProData.show = true
      this.roleInfoList = info.listData
    },
    Verif: function (info) {
      let _this = this
      if (_this.roleInfo.rolename === '') {
        layer.msg('角色名称不能为空！')
      } else {
        for (let i in this.roleInfoList) {
          if (_this.roleInfo.rolename === this.roleInfoList[i].ROLE_NAME) {
            layer.msg('该角色已存在！')
            return false
          }
        }
        _this.SaveRole(info)
      }
    },
    SaveRole: function (info) {
      let _this = this
      _this.ProData.show = false
      this.post('CommonMethod/Save',
        {
          modelName: 'BciaAuthorityTrole',
          saveData: JSON.stringify({
            TR_ID: _this.guid(),
            ROLE_NAME: info.rolename,
            ROLE_DESCRIPTION: info.description
          })
        }, function (result) {
          layer.msg(result.Message)
          _this.$emit('listenToChildEvent', true)
          _this.$router.replace({ path: 'system' })
          _this.roleInfo = {}
        })
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  textarea{
    margin-left: 6px;
    overflow-y: hidden !important;
    padding: 5px 10px;
  }

  ul{
    margin-top: 30px;
    li{
      margin-bottom: 15px;
      .txt{
        float: left;
      }
      input,textarea{
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border: none;
      }
      input{
        height: 28px;
        padding: 0 10px;
      }
    }
  }
  .btnBox{
    margin-top: 40px;
    text-align: center;
    span{
      display: inline-block;
      height: 30px;
      margin: 0 20px;
      padding: 0 12px;
      cursor: pointer;
      color: #fff;
      line-height: 30px;
      text-align: center;
      border-radius: 5px;
      background: #1E9FFF;
    }
  }
  .closeIcon{
    position: absolute;
    right: 3px;
    top: 3px;
    cursor: pointer;
    @include size(30px, 30px);
    border-radius: 5px;
    background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
  }

  /*.editBox{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    .editCont{
      !*position: relative;*!
      position: absolute;
      top: 10%;
      left: 30%;
      @include size(500px, 400px);
      padding: 20px;
      background-color:#101431;
      border-radius: 5px;
      color:white;
      border: 1.5px solid #555c86;
      h4{
        @include size(100%, 50px);
        font-size: 18px;
        font-weight: inherit;
        line-height: 50px;
        border-bottom: 1px solid #3f70a2;
      }
      ul{
        margin-top: 30px;
        li{
          margin-bottom: 15px;
          .txt{
            float: left;
          }
          input,textarea{
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            border: none;
          }
          input{
            height: 28px;
            padding: 0 10px;
          }
        }
      }
      .btnBox{
        margin-top: 40px;
        text-align: center;
        span{
          display: inline-block;
          height: 30px;
          margin: 0 20px;
          padding: 0 12px;
          cursor: pointer;
          color: #fff;
          line-height: 30px;
          text-align: center;
          border-radius: 5px;
          background: #1E9FFF;
        }
      }
      .closeIcon{
        position: absolute;
        right: 3px;
        top: 3px;
        cursor: pointer;
        @include size(30px, 30px);
        border-radius: 5px;
        background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
      }
    }
  }*/
</style>
