<template>
  <!--<div class="editBox" v-show="show">-->
    <!--<div class="editCont">-->
      <!--<h4>管理员权限</h4>-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <p class="meunTit"><span>菜单权限</span></p>
    <form action="" ref="table">
      <p v-for="(item,index) in newRightData" :key="index">
        <input type="checkbox"
               class="selBtn"
               :checked="item.Sel"
               :data-id="item.TR_ID"
               :data-type="item.RIGHT_TYPE"
               value="">
        <span>{{item.RIGHT_DESCRIPTION}}</span>
      </p>
    </form>
    <div class="btnBox">
      <span @click="SaveP">确定</span>
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
const AllRight = 'SystemMng/GetRoleRightsAndAllRight'
export default {
  data () {
    return {
      // move: false,
      show: false,
      currentList: {}, // 选中的某行
      rightData: {}, // 权限接口所有数据
      newRightData: {}, // 权限所有选项列表
      saveJSON: [], // 保存接口需要的传参
      ProData: {
        title: '管理员权限',
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
    powerChildShow: function (item) {
      var _this = this
      _this.ProData.show = true
      _this.currentList = item
      this.post(AllRight, {param: JSON.stringify({
        roleId: String(item.TR_ID)
      })}, function (res) {
        _this.rightData = res
        _this.newRightData = res.menuRights
        for (let i = 0; i < _this.rightData.menuRights.length; i++) {
          _this.newRightData[i].Sel = false
          for (let j = 0; j < _this.rightData.roelRight.length; j++) {
            if (_this.rightData.menuRights[i].TR_ID === _this.rightData.roelRight[j].TR_ID) {
              _this.newRightData[i].Sel = true
            }
          }
        }
      })
    },
    SelectedInput: function () {
      function dataset (element) {
        var obj = {}
        if (element.dataset) {
          return element.dataset
        } else {
          // console.log(element.attributes);
          for (var i = 0; i < element.attributes.length; i++) {
            var key = element.attributes[i].nodeName
            if (/^data-\w+$/.test(key)) { // 判断是否以data-开头的属性名
              var value = element.attributes[i].nodeValue// 值
              var keyName = key.match(/^data-(\w+)/)[1]// 键名
              obj[keyName] = value// 对象添加属性
            }
          }
        }
        return obj
      }
      let selDom = this.$refs.table.getElementsByClassName('selBtn')
      // let saveJSON = []
      this.saveJSON = []
      for (let i = 0; i < selDom.length; i++) {
        if (selDom[i].checked) {
          this.saveJSON.push({
            TRR_ID: '',
            ROLE_ID: this.currentList.TR_ID,
            RIGHT_ID: dataset(selDom[i]).id,
            RIGHT_TYPE: dataset(selDom[i]).type
          })
        }
      }
    },
    SaveP: function () {
      var _this = this
      _this.SelectedInput()
      this.post('SystemMng/setRoleRight', {
        roleId: this.currentList.TR_ID,
        saveDatas: this.saveJSON
      }, function (res) {
        layer.closeAll()
        layer.msg('保存成功')
        _this.ProData.show = false
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
    margin-top: 22px;
    font-size: 14px;
    p{
      display: inline-block;
      width: 50%;
      margin-bottom: 6px;
      overflow: hidden;
    }
    span{
      display: inline-block;
      width: 80%;
      margin: 0 9px 0 4px;
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
      width: 500px;
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
        margin-top: 22px;
        font-size: 14px;
        p{
          display: inline-block;
          width: 50%;
          margin-bottom: 6px;
          overflow: hidden;
        }
        span{
          display: inline-block;
          width: 80%;
          margin: 0 9px 0 4px;
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
