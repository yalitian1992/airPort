<template>
  <!--<div class="editBox" v-show="show">-->
    <!--<div class="editCont">-->
      <!--<div class="autoScrollBox">-->
        <!--<h4>{{curUser.VSERNAME}}</h4>-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <p class="meunTit"><span>配置角色</span></p>
    <div class="formBox">
      <form action="" ref="table" class="autoScroll" id="list-to-top">
        <p v-for="(item,index) in allRoleData" :key="index">
          <input type="checkbox"
                 class="selBtn"
                 :checked="item.check"
                 :data-id="item.TR_ID"
                 value="">
          <span>{{item.ROLE_NAME}}</span>
        </p>
      </form>
    </div>
    <div class="btnBox">
      <span @click="SaveP">确定</span>
      <span class="grayBg" @click="ProData.show = false">取消</span>
    </div>
  </Prompt>
        <!--<i class="closeIcon" @click="show=false"></i>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
const AllRole = 'SystemMng/GetRoleLike'
export default {
  data () {
    return {
      curUser: {}, // 当前用户信息
      // move: false,
      show: false,
      ableRole: [], // 拥有的角色
      allRoleData: {}, // 所有角色选项列表
      saveJSON: [], // 保存接口需要的传参
      ProData: {
        title: '',
        show: false,
        width: '500px',
        height: '500px'
      }
    }
  },
  computed: {
    wShow () {
      return this.ProData.show
    }
  },
  components: {
    Prompt
  },
  watch: {
    wShow () {
      this.scrollToTop()
    }
  },
  methods: {
    scrollToTop () {
      var div = document.getElementById('list-to-top')
      div.scrollTop = 0
    },
    powerChildShow: function (item) {
      var _this = this
      _this.ProData.show = true
      _this.show = _this.ProData.show
      _this.curUser = item
      _this.ProData.title = _this.curUser.VSERNAME
      this.post('SystemMng/GetUserRoleLike', {
        param: JSON.stringify({
          tu_id: _this.curUser.TU_ID
        })
      }, function (res) {
        _this.ableRole = res
        _this.post(AllRole, JSON.stringify({
          param: '',
          PageIndex: 1,
          PageSize: 9999999
        }), function (res) {
          _this.allRoleData = res.listData
          for (let i in _this.allRoleData) {
            _this.allRoleData[i].check = false
            for (let j in _this.ableRole) {
              if (_this.allRoleData[i].TR_ID === _this.ableRole[j].TR_ID) {
                _this.allRoleData[i].check = true
              }
            }
          }
        })
      })
    },
    SelectedInput: function () {
      let selDom = this.$refs.table.getElementsByClassName('selBtn')
      // let saveJSON = []
      this.saveJSON = []
      for (let i = 0; i < selDom.length; i++) {
        if (selDom[i].checked) {
          this.saveJSON.push({
            TUR_ID: this.guid(),
            TU_ID: this.curUser.TU_ID,
            TR_ID: selDom[i].dataset === undefined ? selDom[i].getAttribute('data-id') : selDom[i].dataset.id
          })
        }
      }
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      )
    }, // 生成guid
    DelFun (fun) {
      this.post('/CommonMethod/Delete', {
        modelName: 'BciaAuthorityTuserrolerelation',
        deleteData: JSON.stringify({TU_ID: this.curUser.TU_ID})
      }, function (res) {
        if (res.Status === true) {
          fun()
        }
      })
    }, // 删除角色旧数据
    SaveP: function () {
      var _this = this
      _this.SelectedInput()
      this.DelFun(function () {
        if (_this.saveJSON.length === 0) {
          _this.layer.msg('设置成功')
          _this.ProData.show = false
          return true
        }
        _this.post('CommonMethod/Save', {
          modelName: 'BciaAuthorityTuserrolerelation',
          saveData: JSON.stringify(_this.saveJSON)
        }, function (res) {
          if (res.Status) {
            _this.layer.msg('设置成功')
            _this.ProData.show = false
          } else {
            _this.layer.msg('设置失败')
          }
        })
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

  .formBox{
    height: 65%;
    margin-top: 22px;
    overflow: hidden;
  }
  .meunTit{
    margin-top: 20px;
    border-bottom: 1px solid #fff;
    span{
      display: block;
      width: 100px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #0096ff;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 3px;
      border-top: 1px solid #fff;
      border-left: 1px solid #fff;
      border-right: 1px solid #fff;
    }
  }
  form{
    z-index: 1000;
    padding: 0 15px;
    font-size: 14px;
    p{
      display: inline-block;
      width: 50%;
      margin-bottom: 6px;
      overflow: hidden;
    }
    input{
      float: left;
      position: relative;
      top: 3px;
    }
    span{
      display: inline-block;
      width: 80%;
      margin: 0 9px 0 4px;
      word-break:break-all;
    }
  }
  .btnBox{
    margin-top: 20px;
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
      @include size(500px,500px);
      overflow: hidden;
      background-color:#101431;
      border-radius: 5px;
      color:white;
      border: 1.5px solid #555c86;
      .autoScrollBox{
        height: 100%;
        padding: 20px;
        .formBox{
          height: 65%;
          margin-top: 22px;
          overflow: hidden;
        }
      }
      h4{
        @include size(100%, 50px);
        font-size: 18px;
        font-weight: inherit;
        line-height: 50px;
        border-bottom: 1px solid #3f70a2;
      }
      .meunTit{
        margin-top: 20px;
        border-bottom: 1px solid #fff;
        span{
          display: block;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          color: #0096ff;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 3px;
          border-top: 1px solid #fff;
          border-left: 1px solid #fff;
          border-right: 1px solid #fff;
        }
      }
      form{
        z-index: 1000;
        padding: 0 15px;
        font-size: 14px;
        p{
          display: inline-block;
          width: 50%;
          margin-bottom: 6px;
          overflow: hidden;
        }
        input{
          float: left;
          position: relative;
          top: 3px;
        }
        span{
          display: inline-block;
          width: 80%;
          margin: 0 9px 0 4px;
          word-break:break-all;
        }
      }
      .btnBox{
        margin-top: 20px;
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
