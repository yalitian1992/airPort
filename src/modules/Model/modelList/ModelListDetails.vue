<template>
    <div class="modelListDetails" style="overflow: hidden;">
      <div class="modelListDetails_title">
        <div class="modelListDetails_title_left">
          <div>模型名称</div>
          <div>
            <input type="text" id="reNameBox" maxlength="50" v-model="NewModelName"/>
          </div>
          <div @click="reName">确定</div>
        </div>
        <div class="modelListDetails_title_right">
          <div style="visibility:hidden;"></div>
          <div style="visibility:hidden;"></div>
          <div @click="release()" v-show="false">发布</div>
          <div @click="unRelease()" v-show="false">禁用</div>
          <div @click="cancel()">返回</div>
        </div>
      </div>
      <div class="modelListDetails_content">
        <div class="ModelManageTree" @click="BlankPageStateShow()">
          <ModelManageTree :modelInfo="modelEnterState"></ModelManageTree>
        </div>
      </div>
      <div class="BlankPage" v-show="BlankPageState">
        <div @click="showBlank()">返回</div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import addModel from './addModel.vue'
import * as Api from '../modelApi'
// import ModelManageTree from '@/components/echarts/ModelManageTree.vue'
import ModelManageTree from '@/modules/model-1/Tree.vue'
export default {
  components: {
    addModel,
    ModelManageTree
  },
  data () {
    return {
      activeKey1: 0,
      activeKey2: 3,
      activeKey3: 4,
      activeKey4: 2,
      showAddpop: false,
      BlankPageState: false,
      NewModelName: ''
    }
  },
  computed: {
    ...mapState('ModelStore', ['blankPageDataState', 'modelEnterState', 'curModelInfo'])
  },
  methods: {
    cancel () {
      this.$router.push('/Application/model')
      // this.$emit('onCloseDetails')
    },
    edit () {
      this.$router.push('/Application/ModelListEdit')
      // this.showAddpop = true
    },
    activeShow1 (item) {
      this.activeKey1 = item
    },
    activeShow2 (item) {
      this.activeKey2 = item
    },
    activeShow3 (item) {
      this.activeKey3 = item
    },
    activeShow4 (item) {
      this.activeKey4 = item
    },
    saveAddXq () {
      this.showAddpop = false
    },
    BlankPageStateShow () {
      this.BlankPageState = this.blankPageDataState
    },
    showBlank () {
      this.BlankPageState = false
    },
    reName () {
      let _this = this
      if (_this.NewModelName.length > 50) {
        _this.layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + 50 + '&#x4E2A;&#x5B57;&#x6570;', document.getElementById('reNameBox'), {tips: 1})
      }
      if (_this.NewModelName !== null && _this.NewModelName !== undefined && _this.NewModelName.length > 0) {
        _this.post('CommonMethod/Save', {
          'modelName': 'BciaModelMmodel',
          'saveData': JSON.stringify([{
            'MM_ID': _this.curModelInfo.riskTypeValue,
            'MM_NAME': _this.NewModelName
          }])
        }, function (res) {
          if (res.Status) {
            _this.layer.msg('重命名成功')
            Api.modelModifyRecord(_this.curModelInfo.riskTypeValue)
          }
        })
      } else {
        _this.NewModelName = _this.curModelInfo.name
        _this.layer.msg('重命名不能为空请重新修正')
      }
    },
    release () {
      let _this = this
      _this.layer.confirm('确认发布此模型？', {
        title: '提示',
        icon: 3,
        skin: 'layer-ext-myskin',
        btn: ['确定', '取消']
      }, function (index) {
        _this.layer.close(index)
        _this.post('CommonMethod/Save', {
          'modelName': 'BciaModelMmodel',
          'saveData': JSON.stringify([{
            'MM_ID': _this.curModelInfo.riskTypeValue,
            'MM_STATUS': 1
          }])
        }, function (res) {
          if (res.Status) {
            _this.layer.msg('模型发布成功')
            Api.modelModifyRecord(_this.curModelInfo.riskTypeValue)
          }
        })
      })
    },
    unRelease () {
      let _this = this
      _this.layer.confirm('确认禁用此模型？', {
        title: '提示',
        icon: 3,
        skin: 'layer-ext-myskin',
        btn: ['确定', '取消']
      }, function (index) {
        _this.layer.close(index)
        _this.post('CommonMethod/Save', {
          'modelName': 'BciaModelMmodel',
          'saveData': JSON.stringify([{
            'MM_ID': _this.curModelInfo.riskTypeValue,
            'MM_STATUS': 0
          }])
        }, function (res) {
          if (res.Status) {
            _this.layer.msg('模型禁用成功')
            Api.modelModifyRecord(_this.curModelInfo.riskTypeValue)
          }
        })
      })
    }
  },
  mounted () {
    this.NewModelName = this.curModelInfo.name
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.modelListDetails{
  @include size(100vw,auto);
  position: relative;
  box-sizing:border-box;
  padding-top:2%;
  &_title{
    @include size(95%,5%);
    margin:0 auto;
    &_left{
      // @include size(30%,100%);
      min-width: 399px;
      height: 100%;
      float: left;
      div{
        &:nth-child(1){
          @include size(20%,100%);
          font-size: 12px;
          color:#fff;
          display: inline-block;
          line-height: 28px;
          text-align: center;
        }
        &:nth-child(2){
          @include size(50%,100%);
          font-size: 12px;
          color:#a8a8a8;
          display: inline-block;
          line-height: 28px;
          text-align: left;
          box-sizing: border-box;
          padding-left: 6px;
          input{
            width:100%;
            height:100%;
            background:rgba(255,255,255,0.1);
            border:none;
            box-sizing:border-box;
            padding-left: 12px;
            color:#8a8a8a;
            outline: none;
            font-size: 12px;
          }
        }
        &:nth-child(3){
          @include size(56px,100%);
          background: #0096ff;
          font-size: 12px;
          color:#fff;
          display: inline-block;
          line-height: 28px;
          text-align: center;
          display: inline-block;
          border-radius: 4px;
          margin-left:5%;
          cursor: pointer;
        }
      }
    }
    &_right{
      @include size(12em,100%);
      float: right;
      display: flex;
      justify-content: space-between;
      div{
        @include size(56px,100%);
        background:#c2c3c4;
        font-size: 12px;
        color:#fff;
        display: inline-block;
        line-height: 28px;
        text-align: center;
        display: inline-block;
        border-radius: 4px;
        margin-left:1%;
        cursor: pointer;
        &:nth-child(1){
          background: #0096ff;
        }
        &:nth-child(2){
          background: #0096ff;
        }
      }
      .detailAdd{
        // @include size(56px,100%);
        img{
          display: block;
          @include size(100%,100%);
        }
      }
      .detail{
        background: #0096ff;
      }
    }
  }
  &_content{
    @include size(100%,94%);
    overflow: hidden;
    /*overflow-X: scroll;*/
    .ModelManageTree{
      @include size(90%,100%);
      margin:0 auto;
    }
  }
  &_content::-webkit-scrollbar{
    background: rgba(255, 255, 255, 0.2);
    height:10px;
  }
  &_content::-webkit-scrollbar-thumb {
    background: rgba(12,35,119,0.7);
    border-radius: 5px;
  }
  .BlankPage{
      @include size(15%,50%);
      background: #2343B5;
      position: absolute;
      right:0;
      top:20%;
      div{
        @include size(56px,28px);
        position: absolute;
        bottom: 5%;
        right:5%;
        background: #0096ff;
        text-align: center;
        border-radius: 4px;
        line-height: 28px;
        cursor: pointer;
      }
    }
}
@media  only screen  and (max-width: 1366px){
  .modelListDetails{
    @include size(100%,100%);
    position: relative;
    &_title{
      @include size(95%,28px);
      margin:0 auto;
      &_left{
        @include size(30%,100%);
        float: left;
        div{
          &:nth-child(1){
            @include size(20%,100%);
            font-size: 12px;
            color:#fff;
            display: inline-block;
            line-height: 28px;
            text-align: center;
          }
          &:nth-child(2){
            @include size(50%,100%);
            font-size: 12px;
            color:#a8a8a8;
            display: inline-block;
            line-height: 28px;
            text-align: left;
            box-sizing: border-box;
            padding-left: 6px;
            input{
              width:100%;
              height:100%;
              background:rgba(255,255,255,0.1);
              border:none;
              box-sizing:border-box;
              padding-left: 12px;
              color:#8a8a8a;
              outline: none;
              font-size: 12px;
            }
          }
          &:nth-child(3){
            @include size(56px,28px);
            background: #0096ff;
            font-size: 12px;
            color:#fff;
            display: inline-block;
            line-height: 28px;
            text-align: center;
            display: inline-block;
            border-radius: 4px;
            margin-left:5%;
            cursor: pointer;
          }
        }
      }
      &_right{
        @include size(12em,100%);
        float: right;
        // background: #c2c3c4;
        display: flex;
        justify-content: space-between;
        div{
          @include size(56px,100%);
          background:#c2c3c4;
          font-size: 12px;
          color:#fff;
          display: inline-block;
          line-height: 28px;
          text-align: center;
          display: inline-block;
          border-radius: 4px;
          margin-left:1%;
          cursor: pointer;
        }
        .detailAdd{
          @include size(56px,100%);
          img{
            display: block;
            @include size(100%,100%);
          }
        }
        .detail{
          background: #0096ff;
        }
      }
    }
    &_content{
      @include size(100%,94%);
      margin-top:2%;
      overflow: hidden;
      /*overflow-X: scroll;*/
      .ModelManageTree{
        @include size(90%,100%);
        margin:0 auto;
      }
    }
    &_content::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      height:10px;
    }
    &_content::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
    .addPop{
      @include size(80%,80%);
      position: absolute;
      left:10%;
      top:10%;
      box-sizing: border-box;
      padding:0 35px;
      background: #1B203C;
      .addmodelContentxq{
        position: absolute;
        @include size(90%,100%);
        &1{
          @include size(100%,20%);
          box-sizing: border-box;
          border-bottom:1px dashed #727272;
          padding:0 4px;
          position: relative;
          &_title{
            @include size(50%,27px);
            margin-top:14px;
            margin-bottom:15px;
            font-size: 14px;
            color:#fff;
          }
          &_content{
            @include size(100%,21px);
            div{
              @include size(120px,21px);
              font-size: 12px;
              color:#fff;
              text-align: center;
              line-height: 21px;
              float: left;
              margin-bottom: 10px;
              box-sizing:border-box;
              border:0px solid #0096ff;
              cursor: pointer;
            }
            .active{
              box-sizing:border-box;
              border:1px solid #0096ff;
            }
          }
          &:nth-last-child(1){
            border-bottom:0px dashed #727272;
          }
          .save{
            @include size(56px,30px);
            color:#fff;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background:#0096ff;
            border-radius: 4px;
            float: right;
            cursor: pointer;
            margin-right:2%;
          }
          .cancel{
            @include size(56px,30px);
            color:#fff;
            font-size: 12px;
            line-height: 30px;
            text-align: center;
            background:#c2c3c4;
            border-radius: 4px;
            float: right;
            cursor: pointer;
          }
        }
      }
    }
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .modelListDetails{
    @include size(100%,100%);
    &_title{
      @include size(95%,38px);
      margin:0 auto;
      &_left{
        div{
          &:nth-child(1){
            font-size: 14px;
            line-height: 38px;
          }
          &:nth-child(2){
            font-size: 14px;
            line-height: 38px;
            input{
              font-size: 14px;
            }
          }
          &:nth-child(3){
            width:80px;
            font-size: 14px;
            line-height: 38px;
          }
        }
      }
      &_right{
        @include size(12em,100%);
        div{
          @include size(80px,100%);
          font-size: 14px;
          line-height: 38px;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1930px){
  .modelListDetails{
    @include size(100%,100%);
    position: relative;
    &_title{
      @include size(95%,48px);
      margin:0 auto;
      &_left{
        min-width: 450px;
        div{
          &:nth-child(1){
            font-size: 14px;
            line-height: 48px;
          }
          &:nth-child(2){
            font-size: 14px;
            line-height: 48px;
            input{
              font-size: 14px;
            }
          }
          &:nth-child(3){
            width:100px;
            font-size: 14px;
            line-height: 48px;
          }
        }
      }
      &_right{
        @include size(17em,100%);
        div{
          @include size(80px,100%);
          font-size: 14px;
          line-height: 48px;
        }
      }
    }
    .addPop{
      .addmodelContentxq{
        position: absolute;
        @include size(95%,100%);
        &1{
          &_title{
            @include size(50%,37px);
            margin-top:24px;
            margin-bottom:25px;
            font-size: 22px;
            line-height:37px;
          }
          &_content{
            @include size(100%,30px);
            div{
              @include size(12%,100%);
              font-size: 18px;
              line-height: 30px;
            }
          }
          .save{
            @include size(80px,48px);
            font-size: 14px;
            line-height: 48px;
          }
          .cancel{
            @include size(80px,48px);
            font-size: 14px;
            line-height: 48px;
          }
        }
        &1:nth-child(5){
          height:10%;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1931px) {
  .modelListDetails{
    @include size(100%,100%);
    &_title{
      @include size(95%,60px);
      margin:0 auto;
      &_left{
        @include size(50%,100%);
        div{
          &:nth-child(1){
            font-size: 26px;
            line-height: 60px;
          }
          &:nth-child(2){
            font-size: 26px;
            line-height: 60px;
            input{
              font-size: 26px;
            }
          }
          &:nth-child(3){
            width:130px;
            font-size: 26px;
            line-height: 60px;
          }
        }
      }
      &_right{
      @include size(12em,100%);
        div{
          @include size(130px,100%);
          font-size: 26px;
          line-height: 60px;
        }
      }
    }
  }
}
/*____________________________________________________________________________*/
@media only screen and (min-width: 1401px) and (max-width: 1600px) {
  .modelListDetails{
    &_title{
      height: 40px;
      &_left{
        div:nth-child(1),div:nth-child(3){
          line-height: 40px;
        }
      }
      &_right{
        div{
          line-height: 40px;
        }
      }
    }
  }
}
</style>
