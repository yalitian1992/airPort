<template>
  <!--<div class="editBox" v-show="show">-->
    <!--<div class="editCont"-->
         <!--v-drag-->
         <!--@mousedown="move=true"-->
         <!--@mouseup="move=false"-->
         <!--:style="move?'cursor:move':''">-->
    <!--<div class="editCont">-->
      <!--<h4>{{title}}</h4>-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <ul>
      <li>
        <span>角色名称：</span>
        <input maxlength="50" type="text" v-model="roleInfo.ROLE_NAME">
      </li>
      <li>
        <span class="txt">角色描述：</span>
        <textarea maxlength="200" v-model="roleInfo.ROLE_DESCRIPTION" id="" cols="30" rows="8"></textarea>
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
      title: '',
      show: false,
      roleInfo: {
        ROLE_NAME: '',
        ROLE_DESCRIPTION: ''
      },
      editRoleData: [],
      ProData: {
        title: '编辑',
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
    editChildShow: function (id) {
      // this.show = true
      this.ProData.show = true
      if (id !== undefined) {
        this.title = '编辑'
        this.editRoleData = JSON.parse(localStorage.getItem('roleInfoList'))
        for (let i = 0; i < this.editRoleData.totalCount; i++) {
          if (this.editRoleData.listData[i].TR_ID === id) {
            this.roleInfo = this.editRoleData.listData[i]
            break
          }
        }
      }
      // else {
      //   this.title = '添加'
      //   this.roleInfo.roleID = this.guid()
      // }
    },
    Verif: function (info) {
      let _this = this
      let m = 0
      console.log('info', info)
      if (_this.roleInfo.ROLE_NAME === '') {
        layer.msg('角色名称不能为空！')
      } else {
        for (let i in _this.editRoleData) {
          _this.roleInfo.ROLE_NAME = _this.editRoleData[i].ROLE_NAME
          m++
          if (m >= 2) {
            layer.msg('该角色已存在！')
            return false
          }
        }
        _this.SaveRole(info)
      }
    },
    SaveRole: function (info) {
      // layer.load(1)
      var _this = this
      this.post('CommonMethod/Save',
        {
          modelName: 'BciaAuthorityTrole',
          saveData: JSON.stringify({
            TR_ID: info.TR_ID,
            ROLE_NAME: info.ROLE_NAME,
            ROLE_DESCRIPTION: info.ROLE_DESCRIPTION
          })
        }, function (result) {
          layer.msg('保存成功！')
          _this.$emit('listenToChildEvent', true)
          _this.ProData.show = false
          _this.$router.replace({ path: 'system' })
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
  textarea{
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

  /*.editBox{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    .editCont{
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
        @include size(30px, 30px);
        cursor: pointer;
        border-radius: 5px;
        background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
      }
    }
  }*/
</style>
