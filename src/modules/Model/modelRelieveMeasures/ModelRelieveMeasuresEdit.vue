<template>
    <div class="modelEdit">
      <div class="modelEditTitle">
        <div>风险因子</div>
        <div :class="{editbj:editbjKey === 0}" @click="selectTitle(0)">飞行区管理部</div>
        <div :class="{editbj:editbjKey === 1}" @click="selectTitle(1)">场道管理模块</div>
        <div :class="{editbj:editbjKey === 2}" @click="selectTitle(2)">跑道入侵</div>
        <div :class="{editbj:editbjKey === 3}" @click="selectTitle(3)">引导员资质</div>
      </div>
      <div class="modelEditContent">
        <div class="tiao1"></div>
        <div class="modelMeasures">
          <div class="refiel">缓解措施<span @click="add()">添加</span></div>
          <div class="methods" v-for="(item,index) in getModelRelieveMeasuresEditData" :key="index">
            <div>{{index+1}}、{{item}}</div>
            <!-- <input v-on:keyup.enter="addNew2" v-model="inputValue2" type="text" value="请输入缓解措施..." onfocus="if(this.value == '请输入缓解措施...') this.value = ''" onblur="if(this.value =='') this.value = '请输入缓解措施...'" /> -->
            <span @click="edit(index)">编辑</span>
            <span @click="del(index)">删除</span>
          </div>
        </div>
        <div class="tiao2"></div>
      </div>
      <div class="modelEditOper">
        <div class="cancel fr" @click="cancel()">取消</div>
        <div class="save fr" @click="save()">保存</div>
      </div>
      <!-- 添加页面 -->
      <div class="add" v-show="addShow">
        <div class="add1">
          <textarea rows="3" cols="20" v-model="inputValue2" value="请输入缓解措施..." onfocus="if(this.value == '请输入缓解措施...') this.value = ''" onblur="if(this.value =='') this.value = '请输入缓解措施...'"></textarea>
          <!-- <textarea rows="5" cols="" onfocus=this.blur() v-on:keyup.enter="addNew2" v-model="inputValue2" type="text">ddddddddddddddddddd</textarea> -->
          <!-- <input v-on:keyup.enter="addNew2" v-model="inputValue2" type="text" value="请输入缓解措施..." onfocus="if(this.value == '请输入缓解措施...') this.value = ''" onblur="if(this.value =='') this.value = '请输入缓解措施...'" /> -->
          <div class="cancel fr" @click="cancelAdd()">取消</div>
          <div class="save fr" @click="saveAdd()">保存</div>
        </div>
      </div>
      <div class="del" v-show="delShow">
        <div class="del1">
          是否删除此条内容，删除后不可恢复！！！
          <div class="cancel fr" @click="cancelDel()">取消</div>
          <div class="save fr" @click="saveDel()">确认</div>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      editbjKey: 0,
      addShow: false,
      delShow: false,
      ModelRelieveMeasuresEditData: [
        'GPS、通讯设备正常，1分，GPS、通讯设备不正常，7分',
        '强制撤离当前作业人员，更换资质符合要求的作业人员',
        '加强语音通话规范性培训',
        '强制撤离非法进入车辆',
        '禁止车辆低能见度环境下进入控制区作业'
      ],
      inputValue2: ''
    }
  },
  computed: {
    getModelRelieveMeasuresEditData () {
      const EditData = this.ModelRelieveMeasuresEditData
      return EditData
    }
  },
  methods: {
    addNew2 () {
    },
    selectTitle (item) {
      this.editbjKey = item
    },
    select (item) {
      this.editbjKey = item
    },
    save () {
      this.$emit('oncloseR')
    },
    cancel () {
      this.$emit('oncloseR')
    },
    saveAdd () {
      this.addShow = false
      this.ModelRelieveMeasuresEditData.push(this.inputValue2)
      this.inputValue2 = ''
    },
    cancelAdd () {
      this.addShow = false
    },
    edit () {

    },
    add () {
      this.addShow = true
    },
    del (index) {
      this.delShow = true
      this.ModelRelieveMeasuresEditData.splice(index, 1)
    },
    saveDel () {
      this.delShow = false
    },
    cancelDel () {
      this.delShow = false
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.editbj{
  background: url('../../../assets/images/edit.png') no-repeat center center !important;
  background-size: 102% 102%;
}
@media  only screen  and (max-width: 1366px){
  .modelEdit{
    @include size(100%,100%);
    position: relative;
    background:url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    .modelEditTitle{
      @include size(90%,18%);
      font-size: 14px;
      color:#fff;
      margin:0 auto;
      padding-top: 20px;
      padding-bottom: 20px;
      div{
        line-height: 25px;
        margin-right: 2%;
        display: inline-block;
        padding: 0px 2%;
        background: rgba(255,255,255,0.1);
        cursor: pointer;
        &:nth-child(1){
          color: #0096ff;
          background: none;
        }
      }
      .editbj{
        background: url('../../../assets/images/edit.png') no-repeat center center !important;
        background-size: 102% 102%;
      }
    }
    .modelEditContent{
      @include size(90%,auto);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      // border:1px solid red;
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:14px;
        line-height: 32px;
        padding-left: 5%;
        .refiel{
          font-size:14px;
          cursor: pointer;
          span{
            color:#0096ff;
            margin-left:5%;
          }
        }
        .methods{
          font-size:12px;
          div{
            width:80%;
            float: left;
          }
          span{
            color:#0096ff;
            cursor: pointer;
            &:nth-child(2){
              margin-right:2%;
            }
          }
        }
      }
      .tiao1{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
      .tiao2{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
    }
    .modelEditOper{
      @include size(100%,28px);
      margin-top:3%;
      margin-bottom:3%;
      .save{
        @include size(56px,28px);
        color:#fff;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        background:#0096ff;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin-right: 2%;
      }
      .cancel{
        @include size(56px,28px);
        color:#fff;
        font-size: 12px;
        line-height: 28px;
        text-align: center;
        background:#c2c3c4;
        border-radius: 4px;
        cursor: pointer;
        float: right;
        margin-right: 2%;
      }
    }
    .add{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      .add1{
        @include size(96%,90%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 16px;
        box-sizing: border-box;
        margin-left:2%;
        margin-top:1%;
        textarea{
          width:100%;
          height:80%;
          float: left;
          background: none;
          outline: none;
          border: none;
          color:#fff;
          box-sizing:border-box;
          padding-left:20px;
          padding-top:20px;
          font-size:14px;
        }
        div{
          @include size(56px,28px);
          color:#fff;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right: 2%;
        }
        .save{
          background:#0096ff;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
    .del{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      .del1{
        @include size(100%,100%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 14px;
        box-sizing: border-box;
        padding-top:14px;
        padding-left:14px;
        text-align: center;
        line-height:145px;
        .save{
          @include size(56px,28px);
          color:#fff;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          background:#0096ff;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right: 2%;
          margin-top: 15%;
        }
        .cancel{
          @include size(56px,28px);
          color:#fff;
          font-size: 12px;
          line-height: 28px;
          text-align: center;
          background:#c2c3c4;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right: 2%;
          margin-top: 15%;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .modelEdit{
    @include size(100%,100%);
    position: relative;
    background:url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:20px 0;
    .modelEditTitle{
      @include size(90%,20%);
      font-size: 16px;
      color:#fff;
      margin:0 auto;
      padding-top: 20px;
      padding-bottom: 20px;
      div{
        line-height: 25px;
        margin-right: 2%;
        display: inline-block;
        padding: 0px 2%;
        background: rgba(255,255,255,0.1);
        cursor: pointer;
        &:nth-child(1){
          color: #0096ff;
          background: none;
        }
      }
      .editbj{
        background: url('../../../assets/images/edit.png') no-repeat center center !important;
        background-size: 102% 102%;
      }
    }
    .modelEditContent{
      @include size(90%,auto);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:16px;
        line-height: 32px;
        padding-left: 5%;
        box-sizing:border-box;
        padding-top:20px;
        padding-bottom:20px;
        .refiel{
          cursor: pointer;
          span{
            color:#0096ff;
            margin-left:5%;
          }
        }
        .methods{
          font-size:14px;
          div{
            width:80%;
            float: left;
          }
          span{
            color:#0096ff;
            cursor: pointer;
            &:nth-child(2){
              margin-right:2%;
            }
          }
        }
      }
      .tiao1{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
      .tiao2{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
    }
    .modelEditOper{
      @include size(90%,38px);
      margin-top:3%;
      margin-bottom:3%;
      div{
        @include size(80px,100%);
        font-size: 14px;
        line-height: 38px;
        text-align: center;
        cursor: pointer;
        color:#fff;
        border-radius: 4px;
        background:#c2c3c4;
      }
      .save{
        margin-right: 2%;
        background:#0096ff;
      }
    }
    .add{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      .add1{
        @include size(96%,90%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 16px;
        box-sizing: border-box;
        margin-left:2%;
        margin-top:2%;
        textarea{
          width:100%;
          height:75%;
          float: left;
          background: none;
          outline: none;
          border: none;
          color:#fff;
          box-sizing:border-box;
          padding-left:20px;
          padding-top:20px;
          font-size:16px;
        }
        div{
          @include size(80px,38px);
          font-size: 14px;
          line-height: 38px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
    .del{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      box-sizing:border-box;
      padding:1.5%;
      .del1{
        @include size(100%,100%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 16px;
        text-align: center;
        line-height:145px;
        div{
          @include size(80px,38px);
          font-size: 14px;
          line-height: 38px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-top: 15%;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .modelEdit{
    @include size(100%,100%);
    position: relative;
    background:url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:20px 0;
    .modelEditTitle{
      @include size(90%,20%);
      font-size: 18px;
      color:#fff;
      margin:0 auto;
      padding-top: 20px;
      padding-bottom: 20px;
      div{
        line-height: 25px;
        margin-right: 2%;
        display: inline-block;
        padding: 0.5% 2%;
        background: rgba(255,255,255,0.1);
        cursor: pointer;
        &:nth-child(1){
          color: #0096ff;
          background: none;
        }
      }
      .editbj{
        background: url('../../../assets/images/edit.png') no-repeat center center !important;
        background-size: 102% 102%;
      }
    }
    .modelEditContent{
      @include size(90%,auto);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:18px;
        line-height: 32px;
        padding-left: 5%;
        box-sizing:border-box;
        padding-top:20px;
        padding-bottom:20px;
        .refiel{
          cursor: pointer;
          padding-bottom:20px;
          span{
            color:#0096ff;
            margin-left:5%;
          }
        }
        .methods{
          font-size:16px;
          padding:5px 0;
          div{
            width:80%;
            float: left;
          }
          span{
            color:#0096ff;
            cursor: pointer;
            &:nth-child(2){
              margin-right:2%;
            }
          }
        }
      }
      .tiao1{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
      .tiao2{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
    }
    // 操作
    .modelEditOper{
      @include size(90%,35px);
      margin:2% auto;
      div{
        @include size(80px,35px);
        font-size: 14px;
        line-height: 35px;
        text-align: center;
        cursor: pointer;
        color:#fff;
        border-radius: 4px;
        background:#c2c3c4;
      }
      .save{
        margin-right: 2%;
        background:#0096ff;
      }
    }
    // 添加
    .add{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      .add1{
        @include size(96%,90%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 18px;
        box-sizing: border-box;
        margin-left:2%;
        margin-top:1.5%;
        textarea{
          width:100%;
          height:75%;
          float: left;
          background: none;
          outline: none;
          border: none;
          color:#fff;
          box-sizing:border-box;
          padding-left:20px;
          padding-top:20px;
          font-size:16px;
        }
        div{
          @include size(70px,35px);
          font-size: 14px;
          line-height: 35px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
    // 删除
    .del{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      box-sizing:border-box;
      padding:1.5%;
      .del1{
        @include size(100%,100%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 16px;
        text-align: center;
        line-height:145px;
        div{
          @include size(70px,35px);
          font-size: 14px;
          line-height: 35px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-top: 15%;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1921px){
  .modelEdit{
    @include size(100%,100%);
    position: relative;
    background:url('../../../assets/images/bj.png') no-repeat center center;
    background-size: 100% 100%;
    box-sizing:border-box;
    padding:20px 0;
    .modelEditTitle{
      @include size(90%,15%);
      font-size: 30px;
      color:#fff;
      margin:0 auto;
      padding-top: 20px;
      padding-bottom: 20px;
      div{
        line-height: 25px;
        margin-right: 2%;
        display: inline-block;
        padding: 0.5% 2%;
        background: rgba(255,255,255,0.1);
        cursor: pointer;
        &:nth-child(1){
          color: #0096ff;
          background: none;
        }
      }
    }
    .modelEditContent{
      @include size(90%,auto);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:28px;
        line-height: 32px;
        padding-left: 5%;
        box-sizing:border-box;
        padding-top:20px;
        padding-bottom:20px;
        .refiel{
          cursor: pointer;
          padding-bottom:20px;
          span{
            color:#0096ff;
            margin-left:5%;
          }
        }
        .methods{
          font-size:26px;
          padding:10px 0;
          div{
            width:80%;
            float: left;
          }
          span{
            color:#0096ff;
            cursor: pointer;
            &:nth-child(2){
              margin-right:2%;
            }
          }
        }
      }
      .tiao1{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
      .tiao2{
        @include size(100%,1px);
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
    }
    .modelEditOper{
      @include size(90%,60px);
      margin:2% auto;
      div{
        @include size(130px,60px);
        font-size: 30px;
        line-height: 60px;
        text-align: center;
        cursor: pointer;
        color:#fff;
        border-radius: 4px;
        background:#c2c3c4;
      }
      .save{
        margin-right: 2%;
        background:#0096ff;
      }
    }
    .add{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      box-sizing: border-box;
      padding:1.5%;
      .add1{
        @include size(100%,100%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        textarea{
          width:100%;
          height:75%;
          float: left;
          background: none;
          outline: none;
          border: none;
          color:#fff;
          box-sizing:border-box;
          padding-left:20px;
          padding-top:20px;
          font-size:26px;
        }
        div{
          @include size(130px,60px);
          font-size: 26px;
          line-height: 60px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
    .del{
      @include size(70%,50%);
      background:#1b203c;
      position: absolute;
      left:15%;
      top:25%;
      border:1px solid #0096ff;
      box-sizing:border-box;
      padding:1.5%;
      .del1{
        @include size(100%,100%);
        background:rgba(255,255,255,0.05);
        color:rgba(255,255,255,0.7);
        font-size: 32px;
        text-align: center;
        line-height:155px;
        div{
          @include size(130px,60px);
          font-size: 30px;
          line-height: 60px;
          text-align: center;
          cursor: pointer;
          color:#fff;
          border-radius: 4px;
          background:#c2c3c4;
          margin-top: 15%;
          margin-right: 2%;
        }
        .save{
          margin-right: 2%;
          background:#0096ff;
        }
      }
    }
  }
}
</style>
