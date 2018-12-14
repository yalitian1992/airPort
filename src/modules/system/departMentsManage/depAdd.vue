<template>
  <!--<div class="editBox" v-show="show">-->
    <!--<div class="editCont">-->
      <!--<h4 v-if="aeType==='add'">{{aeTitle}}</h4>-->
      <!--<h4 v-else>编辑</h4>-->
  <Prompt :pro-data="ProData" v-show="ProData.show">
    <span class="Tit">{{title}}{{roleInfo.rolename}}</span>
    <ul>
      <li>
        <span>结构名称：</span>
        <input type="text" maxlength="50" v-model="roleInfo.rolename">
      </li>
      <li>
        <span>结构编码：</span>
        <input :readonly="(aeFlag!=='add')" type="text" v-model="roleInfo.org_code">
      </li>
      <li>
        <span class="txt">结构描述：</span>
        <textarea maxlength="200" v-model="roleInfo.description" id="" cols="30" rows="10"></textarea>
      </li>
    </ul>
    <div class="btnBox">
      <span @click="SaveRole(roleInfo)">确定</span>
      <span class="grayBg" @click="ProData.show=false">取消</span>
    </div>
  </Prompt>
      <!--<i class="closeIcon" @click="show=false"></i>-->
    <!--</div>-->
  <!--</div>-->
</template>
<script>
import Prompt from '../../../components/prompt/prompt.vue'
export default {
  data () {
    return {
      aeTitle: '添加',
      // move: false,
      show: false,
      roleInfo: {
        createtime: '',
        description: '',
        roleID: '',
        rolename: '',
        org_code: ''
      },
      saveParamColum: {
        DEPT: '',
        MOUDLAR: '',
        RISKTYPE: '',
        FACTORTYPE: ''
      },
      AddParam: {
        type: '',
        pid: '',
        curItems: {}
      },
      aeType: 'add',
      title: '部门',
      editSaveData: {},
      aeFlag: 'add',
      ProData: {
        title: '',
        show: false,
        width: '50em',
        height: '33em'
      },
      checkList: []
    }
  },
  components: {
    Prompt
  },
  methods: {
    checkCode () {
      let result = false
      let list = this.checkList
      for (let i in list) {
        if (list[i].ORG_CODE === this.roleInfo.org_code) {
          result = true
          break
        }
      } return result
    },
    addChildShow: function (type, curItems, list) {
      this.aeTitle = '添加'
      this.aeFlag = 'add'
      this.checkList = list
      this.roleInfo = {
        createtime: '',
        description: '',
        roleID: '',
        rolename: '',
        org_code: ''
      }
      this.aeType = 'add'
      this.AddParam.type = type
      this.AddParam.curItems = curItems
      this.ProData.title = this.aeType === 'add' ? this.aeTitle : '编辑'
      switch (type) {
        case 'dept':
          this.ProData.show = true
          this.title = ''
          this.AddParam.pid = '0'
          break
        case 'modular':
          if (curItems.cModular.TO_ID === undefined && curItems.cRiskType.TO_ID !== undefined) {
            this.layer.msg('当前部门已经拥有跨级风险类型，</br>不支持添加模块！')
            return false
          }
          this.ProData.show = true
          this.title = curItems.cDept.ORG_NAME + '>'
          this.saveParamColum.DEPT = curItems.cDept.ORG_CODE
          this.AddParam.pid = curItems.cDept.TO_ID
          break
        case 'riskType':
          let _this = this
          if (curItems.cModular.TO_ID !== undefined) {
            this.title = curItems.cDept.ORG_NAME + '>' + curItems.cModular.ORG_NAME + '>'
            _this.ProData.show = true
            this.saveParamColum.DEPT = curItems.cDept.ORG_CODE
            this.saveParamColum.MOUDLAR = curItems.cModular.ORG_CODE
            this.AddParam.pid = curItems.cModular.TO_ID
          } else {
            if (curItems.cRiskType.TO_ID === undefined) {
              this.layer.confirm('当前模块无信息,</br>保存的风险类型将直接归属于部门,</br>并将无法支持模块添加！', {
                title: '提示',
                icon: 3,
                skin: 'layer-ext-myskin',
                btn: ['确定', '取消']
              }, function (index) {
                _this.layer.close(index)
                _this.title = curItems.cDept.ORG_NAME + '>'
                _this.ProData.show = true
                _this.saveParamColum.DEPT = curItems.cDept.ORG_CODE
                _this.AddParam.pid = curItems.cDept.TO_ID
              })
            } else {
              _this.title = curItems.cDept.ORG_NAME + '>'
              _this.ProData.show = true
              _this.saveParamColum.DEPT = curItems.cDept.ORG_CODE
              _this.AddParam.pid = curItems.cDept.TO_ID
            }
          }
          break
        case 'factorType':
          if (curItems.cRiskType.TO_ID === undefined) {
            this.layer.msg('必须选定某个风险类型')
            return false
          }
          this.title = curItems.cDept.ORG_NAME + '>' + curItems.cModular.ORG_NAME + '>' + curItems.cRiskType.ORG_NAME + '>'
          if (curItems.cModular.TO_ID === undefined) {
            this.title = curItems.cDept.ORG_NAME + '>' + curItems.cRiskType.ORG_NAME + '>'
          }

          this.ProData.show = true
          this.saveParamColum.DEPT = curItems.cDept.ORG_CODE
          this.saveParamColum.MOUDLAR = curItems.cModular.ORG_CODE
          this.saveParamColum.RISKTYPE = curItems.cRiskType.ORG_CODE
          this.AddParam.pid = curItems.cRiskType.TO_ID
          break
        default:break
      }
    },
    SaveRole: function (info) {
      let _this = this
      let aeFlag = this.aeFlag
      if (aeFlag === 'add') {
        if (this.checkCode()) {
          this.layer.msg('编码重复,请重新编辑！')
          return false
        }
        if (info.org_code === '' || info.org_code === undefined) {
          this.layer.msg('结构编码和名称为必填项！')
          return false
        }
        this.layer.load(1)
        switch (this.AddParam.type) {
          case 'dept':
            this.saveParamColum.DEPT = info.org_code
            break
          case 'modular':
            this.saveParamColum.MOUDLAR = info.org_code
            break
          case 'riskType':
            this.saveParamColum.RISKTYPE = info.org_code
            break
          case 'factorType':
            this.saveParamColum.FACTORTYPE = info.org_code
            break
          default:
            break
        }
        this.post('CommonMethod/Save',
          {
            modelName: 'BciaAuthorityTorganization',
            saveData: JSON.stringify({
              TO_ID: this.guid(),
              ORG_NAME: info.rolename,
              ORG_DESCRIPTION: info.description,
              ORG_CODE: info.org_code,
              PARENT_TO_ID: _this.AddParam.pid,
              ORG_TYPE: _this.AddParam.type,
              DEPT: _this.saveParamColum.DEPT,
              MOUDLAR: _this.saveParamColum.MOUDLAR,
              RISKTYPE: _this.saveParamColum.RISKTYPE,
              FACTORTYPE: _this.saveParamColum.FACTORTYPE
            })
          }, function (result) {
            _this.$emit('saveSucess')
            _this.ProData.show = false
          })
      } else {
        this.post('CommonMethod/Save',
          {
            modelName: 'BciaAuthorityTorganization',
            saveData: JSON.stringify({
              TO_ID: _this.editSaveData.TO_ID,
              ORG_NAME: info.rolename,
              ORG_DESCRIPTION: info.description,
              ORG_CODE: info.org_code,
              PARENT_TO_ID: _this.editSaveData.PARENT_TO_ID,
              ORG_TYPE: _this.editSaveData.ORG_TYPE,
              DEPT: _this.editSaveData.DEPT,
              MOUDLAR: _this.editSaveData.MOUDLAR,
              RISKTYPE: _this.editSaveData.RISKTYPE,
              FACTORTYPE: _this.editSaveData.FACTORTYPE
            })
          }, function (result) {
            _this.$emit('saveSucess')
            _this.ProData.show = false
          })
      }
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
    },
    editChildShow: function (item, curItems) {
      this.aeTitle = '编辑'
      this.aeFlag = 'edit'
      this.ProData.show = true
      this.title = (item.DEPT === curItems.cDept.ORG_CODE && item.MOUDLAR !== null ? curItems.cDept.ORG_NAME + '>' : '') +
        (item.MOUDLAR === curItems.cModular.ORG_CODE && item.RISKTYPE !== null ? curItems.cModular.ORG_NAME + '>' : '') +
        (item.RISKTYPE === curItems.cRiskType.ORG_CODE && item.FACTORTYPE !== null ? curItems.cRiskType.ORG_NAME + '>' : '')
      this.roleInfo = {
        description: item.ORG_DESCRIPTION,
        roleID: item.TO_ID,
        rolename: item.ORG_NAME,
        org_code: item.ORG_CODE
      }
      this.editSaveData = item
    }
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  span.Tit{
    display: block;
    @include size(100%, 20px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ul{
    margin-top: 2em;
    li{
      font-size: 15px;
      margin-bottom: 15px;
      .txt{
        position: relative;
        top: -9.5em;
      }
      input,textarea{
        font-size:14px;
        @include size(80%, auto);
        padding: 0 10px;
        color: #fff;
        background: rgba(255, 255, 255, 0.2);
        border: none;
      }
      input{
        font-size: 14px;
        height: 2.5em;
      }
    }
  }
  .btnBox{
    margin-top: 2em;
    text-align: center;
    span{
      display: inline-block;
      height:2em;
      margin: 0 20px;
      padding: 0 1em;
      cursor: pointer;
      color: #fff;
      line-height: 2em;
      text-align: center;
      border-radius: 5px;
      background: #1E9FFF;
    }
  }

  .editBox{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0.6);
    z-index: 10;
    .editCont{
      /*position: relative;*/
      position: absolute;
      top: 10%;
      left: 23%;
      font-size:16px;
      @include size(50em, 30em);
      padding: 1.5em;
      background-color:#101431;
      border-radius: 5px;
      color:white;
      border: 1.5px solid #555c86;
      span.Tit{
        display: block;
        @include size(100%, 20px);
        overflow: hidden;
      }
      h4{
        @include size(100%, 2.5em);
        font-size: 18px;
        font-weight: inherit;
        line-height: 2.5em;
        border-bottom: 1px solid #3f70a2;
      }
      ul{
        margin-top: 2em;
        li{
          font-size: 15px;
          margin-bottom: 15px;
          .txt{
            position: relative;
            top: -9.5em;
          }
          input,textarea{
            font-size:14px;
            @include size(80%, auto);
            padding: 0 10px;
            color: #fff;
            background: rgba(255, 255, 255, 0.2);
            border: none;
          }
          input{
            font-size: 14px;
            height: 2.5em;
          }
        }
      }
      .btnBox{
        margin-top: 2em;
        text-align: center;
        span{
          display: inline-block;
          height:2em;
          margin: 0 20px;
          padding: 0 1em;
          cursor: pointer;
          color: #fff;
          line-height: 2em;
          text-align: center;
          border-radius: 5px;
          background: #1E9FFF;
        }
      }
      .closeIcon{
        position: absolute;
        right: 0.2em;
        top: 0.2em;
        cursor: pointer;
        @include size(2em, 2em);
        border-radius: 5px;
        background: url('../../../assets/images/close.png') no-repeat center/100% 100%;
      }
    }
  }
  @media screen and (min-width: 2560px){
    /*.editBox{*/
    /*.editCont{*/
      font-size: 36px;
      h4{
        font-size: 38px;
      }
      ul{
        li{
          font-size: 40px;
          input,textarea{
            font-size:36px;
          }
        }
      }
    /*}*/
  /*}*/
}
</style>
