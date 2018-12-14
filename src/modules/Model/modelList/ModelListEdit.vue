<template>
  <div class="ModelListEdit_wrap">
    <div class="editmodelContentxq">
      <!-- 机场名称 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>机场名称</span>
          <div class="editTitle">
            <div @click="addCon1()">+</div>
            <div @click="delCon1()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in newModelData1" :key="index" :class="activeKey1===index?'active':''" @click="activeShow1(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle1">
            <input v-on:keyup.enter="addNew1" v-model="inputValue1" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon1()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 部门名称 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>部门名称</span>
          <div class="editTitle">
            <div @click="addCon2()">+</div>
            <div @click="delCon2()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData2" :key="index" :class="activeKey2===index?'active':''" @click="activeShow2(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle2">
            <input v-on:keyup.enter="addNew2" v-model="inputValue2" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon2()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 模块名称 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>模块名称</span>
          <div class="editTitle">
            <div @click="addCon3()">+</div>
            <div @click="delCon3()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData3" :key="index" :class="activeKey3===index?'active':''" @click="activeShow3(index)">{{item.name}}</div>
            <div class="addTitle" v-if="showaddTitle3">
              <input v-on:keyup.enter="addNew3" v-model="inputValue3" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
            <!-- <div class="add" @click="addCon3()"><img src="../../../assets/images/add.png" alt=""></div> -->
          </div>
      </div>
      <!-- 风险名称 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>风险名称</span>
          <div class="editTitle">
            <div @click="addCon4()">+</div>
            <div @click="delCon4()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData4" :key="index" :class="activeKey4===index?'active':''" @click="activeShow4(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle4">
            <input v-on:keyup.enter="addNew4" v-model="inputValue4" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon4()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 风险分支 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>风险分支</span>
          <div class="editTitle">
            <div @click="addCon5()">+</div>
            <div @click="delCon5()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData5" :key="index" :class="activeKey5===index?'active':''" @click="activeShow5(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle5">
            <input v-on:keyup.enter="addNew5" v-model="inputValue5" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon5()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 指标类型 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>指标类型</span>
          <div class="editTitle">
            <div @click="addCon6()">+</div>
            <div @click="delCon6()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData6" :key="index" :class="activeKey6===index?'active':''" @click="activeShow6(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle6">
            <input v-on:keyup.enter="addNew6" v-model="inputValue6" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon6()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 指标名称 -->
      <div class="editmodelContentxq1">
        <div class="editmodelContentxq1_title">
          <span>指标名称</span>
          <div class="editTitle">
            <div @click="addCon7()">+</div>
            <div @click="delCon7()">-</div>
          </div>
        </div>
        <div class="editmodelContentxq1_content">
          <div class="contentList" v-for="(item,index) in modelData7" :key="index" :class="activeKey7===index?'active':''" @click="activeShow7(index)">{{item.name}}</div>
          <div class="addTitle" v-if="showaddTitle7">
            <input v-on:keyup.enter="addNew7" v-model="inputValue7" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
          </div>
          <!-- <div class="add" @click="addCon7()"><img src="../../../assets/images/add.png" alt=""></div> -->
        </div>
      </div>
      <!-- 操作 -->
      <div class="editmodeloperation state">
        <div class="cancel" @click="cancel()">取消</div>
        <div class="save" @click="saveq()">保存</div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */ 
import { mapState } from 'vuex'
import ManageViewData from '@/components/echarts/ManageView.js'
import RiskViewData from '@/components/echarts/RiskView.js'

export default {
  data () {
    return {
      modelData1: ManageViewData,
      newModelData1: ManageViewData,
      modelData2: ManageViewData[0].children,
      newmodelData2: ManageViewData[0].children,
      modelData3: ManageViewData[0].children[0].children,
      modelData4: ManageViewData[0].children[0].children[0].children,
      modelData5: [],
      modelData6: [],
      modelData7: [],
      activeKey1: 0,
      activeKey2: 0,
      activeKey3: 0,
      activeKey4: 0,
      activeKey5: 0,
      activeKey6: 0,
      activeKey7: 0,
      inputValue: null,
      inputValue1: null,
      inputValue2: null,
      inputValue3: null,
      inputValue4: null,
      inputValue5: null,
      inputValue6: null,
      inputValue7: null,
      showaddTitle1: false,
      showaddTitle2: false,
      showaddTitle3: false,
      showaddTitle4: false,
      showaddTitle5: false,
      showaddTitle6: false,
      showaddTitle7: false
    }
  },
  created () {
    if (this.modelEnterState === 0) {
      this.modelData1 = ManageViewData
      this.modelData2 = ManageViewData[0].children
      this.modelData3 = ManageViewData[0].children[0].children
      this.modelData4 = ManageViewData[0].children[0].children[0].children
    }
    if (this.modelEnterState === 1) {
      this.modelData1 = RiskViewData
      this.modelData2 = RiskViewData[0].children
      this.modelData3 = RiskViewData[0].children[0].children
      this.modelData4 = RiskViewData[0].children[0].children[0].children
    }
  },
  computed: {
    ...mapState('ModelStore', ['modelEnterState']),
  },
  watch:{
    modelData1(val){
      this.modelData1ForShow=val
    }
  },
  methods: {
    // 添加
    addCon1 () {
      this.showaddTitle1 = true
    },
    addCon2 () {
      this.showaddTitle2 = true
    },
    addCon3 () {
      this.showaddTitle3 = true
    },
    addCon4 () {
      this.showaddTitle4 = true
    },
    addCon5 () {
      this.showaddTitle5 = true
    },
    addCon6 () {
      this.showaddTitle6 = true
    },
    addCon7 () {
      this.showaddTitle7 = true
    },
    // 删除
    delCon1 () {
      this.modelData1.splice(this.activeKey1, 1)
    },
    delCon2 () {
      this.modelData2.splice(this.activeKey2, 1)
    },
    delCon3 () {
      this.modelData3.splice(this.activeKey3, 1)
    },
    delCon4 () {
      this.modelData4.splice(this.activeKey4, 1)
    },
    delCon5 () {
      this.modelData5.splice(this.activeKey5, 1)
    },
    delCon6 () {
      this.modelData6.splice(this.activeKey6, 1)
    },
    delCon7 () {
      this.modelData7.splice(this.activeKey7, 1)
    },
    // 获取input的值
    addNew1 () {
      if (this.inputValue1 !== null) {
        this.modelData1.push({'name': this.inputValue1,'children':[]})
        this.showaddTitle1 = false
      }
      this.inputValue1=''
    },
    addNew2 () {
      if (this.inputValue2 !== null) {
        this.modelData2.push({'name': this.inputValue2})
        this.showaddTitle2 = false
      }
      this.inputValue2=''
    },
    addNew3 () {
      if (this.inputValue3 !== null) {
        this.modelData3.push({'name': this.inputValue3})
        this.showaddTitle3 = false
      }
      this.inputValue3=''
    },
    addNew4 () {
      if (this.inputValue4 !== null) {
        this.modelData4.push({'name': this.inputValue4})
        this.showaddTitle4 = false
      }
      this.inputValue4=''
    },
    addNew5 () {
      if (this.inputValue5 !== null) {
        this.modelData5.push({'name': this.inputValue5})
        this.showaddTitle5 = false
      }
      this.inputValue5=''
    },
    addNew6 () {
      console.log(this.inputValue6)
      if (this.inputValue6 !== null) {
        this.modelData6.push({'name': this.inputValue6})
        this.showaddTitle6 = false
      }
      this.inputValue6=''
    },
    addNew7 () {
      if (this.inputValue7 !== null) {
        this.modelData7.push({'name': this.inputValue7})
        this.showaddTitle7 = false
      }
      this.inputValue7=''
    },
    // 选中状态
    activeShow1 (index) {
      this.activeKey1 = index
      this.modelData2 = this.modelData1[index].children
    },
    activeShow2 (index) {
      this.activeKey2 = index
      this.modelData3 = this.modelData2[index].children
    },
    activeShow3 (index) {
      this.activeKey3 = index
      this.modelData4 = this.modelData3[index].children
    },
    activeShow4 (index) {
      this.activeKey4 = index
      this.modelData5 = this.modelData4[index].children
    },
    activeShow5 (index) {
      this.activeKey5 = index
      this.modelData6 = this.modelData5[index].children
    },
    activeShow6 (index) {
      this.activeKey6 = index
      this.modelData7 = this.modelData6[index].children
    },
    activeShow7 (index) {
      this.activeKey7 = index
    },
    // 取消
    cancel () {
      this.$router.push('/Application/ModelListDetails')
    },
    // 保存
    save () {
      this.$router.push('/Application/ModelListDetails')
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.ModelListEdit_wrap{
  @include size(100vw,95vh);
  position: absolute;
  top:0;
  left:0;
  box-sizing: border-box;
  .editmodelContentxq{
    @include size(90%,100%);
    margin:0 auto;
    box-sizing: border-box;
    overflow: hidden;
    overflow-y: scroll;
    &1{
      @include size(100%,auto);
      box-sizing: border-box;
      border-bottom:1px dashed #727272;
      overflow: hidden;
      box-sizing:border-box;
      padding-left:2%;
      &_title{
        @include size(100%,27px);
        margin-top:1%;
        margin-bottom:2%;
        font-size: 16px;
        color:#fff;
        border-left:3px solid #0096ff;
        box-sizing:border-box;
        padding-left:1%;
        span{
          display: block;
          width:10%;
          float: left;
        }
        .editTitle{
          @include size(20%,100%);
          margin-left: 13%;
          div{
            @include size(27px,100%);
            float: left;
            background: #0096ff;
            margin-right:5%;
            text-align: center;
            font-size: 30px;
            line-height: 27px;
            cursor: pointer;
          }
          div:nth-child(2){
            background: #FF0000;
            line-height: 22px;
          }
        }
      }
      &_content{
        @include size(100%,auto);
        div{
          @include size(200px,100%);
          font-size: 14px;
          color:#fff;
          text-align: center;
          line-height: 30px;
          float: left;
          cursor: pointer;
          margin-bottom: 1%;
        }
        .active{
          box-sizing:border-box;
          border:1px solid #0096ff;
        }
      }
    }
    .editmodeloperation{
      height:auto;
      border-bottom:0px dashed #727272;
      margin-top:2%;
      div{
        @include size(56px,30px);
        color:#fff;
        font-size: 12px;
        line-height: 30px;
        text-align: center;
        border-radius: 4px;
        float: right;
        cursor: pointer;
      }
      .save{
        margin-right:2%;
        background:#0096ff;
      }
      .cancel{
        background:#c2c3c4;
      }
    }
    .editmodelContentxq::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      width:6px;
    }
    .editmodelContentxq::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
  }
}
@media  only screen  and (max-width: 1366px){
  .ModelListEdit_wrap{
    @include size(100vw,95vh);
    position: relative;
    box-sizing: border-box;
    .editmodelContentxq{
      @include size(90%,100%);
      margin:0 auto;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      padding: 2% 5%;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom:1px dashed #727272;
        overflow: hidden;
        box-sizing:border-box;
        &_title{
          @include size(100%,23px);
          margin-top:1%;
          margin-bottom:1%;
          font-size: 14px;
          color:#fff;
          border-left:3px solid #0096ff;
          box-sizing:border-box;
          padding-left:2%;
          line-height: 23px;
          .editTitle{
            @include size(20%,100%);
            div{
              @include size(23px,23px);
              float: left;
              background: #0096ff;
              margin-right:4%;
              text-align: center;
              font-size: 24px;
              line-height: 23px;
              cursor: pointer;
            }
            div:nth-child(2){
              background: #FF0000;
              line-height: 20px;
            }
          }
        }
        &_content{
          @include size(100%,30px);
          .contentList{
            @include size(145px,100%);
            font-size: 14px;
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
          }
          .contentList:last-child(1){
            margin-right:0px;
          }
          .addTitle{
            @include size(145px,100%);
            font-size: 14px;
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
            input{
              @include size(100%,100%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
            }
          }
          .add{
            @include size(30px,30px);
          }
          .active{
            box-sizing:border-box;
            border:1px solid #0096ff;
          }
        }
      }
      .editmodeloperation{
        height:auto;
        border-bottom:0px dashed #727272;
        margin-top:2%;
        div{
          @include size(56px,30px);
          color:#fff;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          border-radius: 4px;
          float: right;
          cursor: pointer;
        }
        .save{
          background:#0096ff;
          margin-right:2%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
    .editmodelContentxq::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      width:6px;
    }
    .editmodelContentxq::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .ModelListEdit_wrap{
    @include size(100vw,95vh);
    position: relative;
    box-sizing: border-box;
    .editmodelContentxq{
      @include size(90%,100%);
      margin:0 auto;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom:1px dashed #727272;
        overflow: hidden;
        box-sizing:border-box;
        padding-left:2%;
        &_title{
          @include size(100%,20px);
          margin-top:1%;
          margin-bottom:2%;
          font-size: 14px;
          color:#fff;
          border-left:3px solid #0096ff;
          box-sizing:border-box;
          padding-left:2%;
          span{
            display: block;
            width:10%;
            float: left;
          }
          .editTitle{
            @include size(20%,100%);
            margin-left: 13%;
            div{
              @include size(20px,20px);
              float: left;
              background: #0096ff;
              margin-right:5%;
              text-align: center;
              font-size: 30px;
              line-height: 20px;
              cursor: pointer;
            }
            div:nth-child(2){
              background: #FF0000;
              line-height: 16px;
            }
          }
        }
        &_content{
          @include size(100%,35px);
          .contentList{
            @include size(120px,100%);
            font-size: 12px;
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            // margin-right:30px;
          }
          .contentList:last-child(1){
            margin-right:0px;
          }
          .addTitle{
            @include size(145px,100%);
            font-size: 14px;
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
            input{
              @include size(100%,100%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
            }
          }
          .add{
            @include size(30px,30px);
          }
          .active{
            box-sizing:border-box;
            border:1px solid #0096ff;
          }
        }
        // &_content{
        //   @include size(100%,35px);
        //   div{
        //     @include size(200px,100%);
        //     font-size: 16px;
        //     color:#fff;
        //     text-align: center;
        //     line-height: 35px;
        //     float: left;
        //     box-sizing:border-box;
        //     border:0px solid #0096ff;
        //     cursor: pointer;
        //     margin-bottom: 1%;
        //   }
        // }
      }
      .editmodeloperation{
        height:auto;
        border-bottom:0px dashed #727272;
        margin-top:2%;
        .save{
          @include size(80px,40px);
          color:#fff;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          background:#0096ff;
          border-radius: 4px;
          float: right;
          cursor: pointer;
          margin-right:2%;
        }
        .cancel{
          @include size(80px,40px);
          color:#fff;
          font-size: 14px;
          line-height: 40px;
          text-align: center;
          background:#c2c3c4;
          border-radius: 4px;
          float: right;
          cursor: pointer;
        }
      }
    }    
    .editmodelContentxq::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      width:6px;
    }
    .editmodelContentxq::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .ModelListEdit_wrap{
    @include size(100vw,95vh);
    position: relative;
    box-sizing: border-box;
    .editmodelContentxq{
      @include size(90%,100%);
      margin:0 auto;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom:1px dashed #727272;
        overflow: hidden;
        box-sizing:border-box;
        padding-left:2%;
        &_title{
          @include size(100%,27px);
          margin-top:1%;
          margin-bottom:1%;
          font-size: 16px;
          color:#fff;
          border-left:3px solid #0096ff;
          box-sizing:border-box;
          padding-left:1%;
          span{
            display: block;
            width:10%;
            float: left;
          }
          .editTitle{
            @include size(20%,100%);
            margin-left: 13%;
            div{
              @include size(27px,100%);
              float: left;
              background: #0096ff;
              margin-right:5%;
              text-align: center;
              font-size: 30px;
              line-height: 27px;
              cursor: pointer;
            }
            div:nth-child(2){
              background: #FF0000;
              line-height: 22px;
            }
          }
        }
        
        &_content{
          @include size(100%,35px);
          .contentList{
            @include size(140px,100%);
            font-size: 14px;
            color:#fff;
            text-align: center;
            line-height: 35px;
            float: left;
            cursor: pointer;
            margin-bottom: 5px;
            margin-right:10px;
            overflow: hidden;
          }
          .contentList:last-child(1){
            margin-right:0px;
          }
          .addTitle{
            @include size(145px,100%);
            font-size: 14px;
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
            input{
              @include size(100%,100%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
            }
          }
          .add{
            @include size(30px,30px);
          }
          .active{
            box-sizing:border-box;
            outline:1px solid #0096ff;
          }
        }
      }
      .editmodeloperation{
        height:auto;
        border-bottom:0px dashed #727272;
        margin-top:2%;
        .save{
          @include size(80px,48px);
          color:#fff;
          font-size: 16px;
          line-height: 48px;
          text-align: center;
          background:#0096ff;
          border-radius: 4px;
          float: right;
          cursor: pointer;
          margin-right:2%;
        }
        .cancel{
          @include size(80px,48px);
          color:#fff;
          font-size: 16px;
          line-height: 48px;
          text-align: center;
          background:#c2c3c4;
          border-radius: 4px;
          float: right;
          cursor: pointer;
        }
      }
    }    
    .editmodelContentxq::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      width:6px;
    }
    .editmodelContentxq::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
  }
}
@media only screen  and (min-width: 1921px){
  .ModelListEdit_wrap{
    @include size(100vw,95vh);
    position: relative;
    box-sizing: border-box;
    .editmodelContentxq{
      @include size(90%,100%);
      margin:0 auto;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      padding:5%;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom:1px dashed #727272;
        overflow: hidden;
        box-sizing:border-box;
        padding-left:2%;
        &_title{
          @include size(100%,40px);
          margin-top:1%;
          margin-bottom:2%;
          font-size: 28px;
          color:#fff;
          border-left:3px solid #0096ff;
          box-sizing:border-box;
          padding-left:1%;
          span{
            display: block;
            width:10%;
            float: left;
          }
          .editTitle{
            @include size(20%,100%);
            margin-left: 13%;
            div{
              @include size(40px,100%);
              float: left;
              background: #0096ff;
              margin-right:5%;
              text-align: center;
              font-size: 50px;
              line-height: 40px;
              cursor: pointer;
            }
            div:nth-child(2){
              background: #FF0000;
              line-height: 32px;
            }
          }
        }
        &_content{
          @include size(100%,60px);
          .contentList{
            @include size(170px,100%);
            font-size:26px;
            color:#fff;
            text-align: center;
            line-height: 60px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
          }
          .contentList:last-child(1){
            margin-right:0px;
          }
          .addTitle{
            @include size(170px,100%);
            color:#fff;
            text-align: center;
            line-height: 30px;
            float: left;
            cursor: pointer;
            margin-bottom: 1%;
            margin-right:30px;
            font-size:26px;
            input{
              @include size(100%,100%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
              font-size:26px;
            }
          }
          .add{
            @include size(30px,30px);
          }
          .active{
            box-sizing:border-box;
            border:1px solid #0096ff;
          }
        }
        // &_content{
        //   @include size(100%,60px);
        //   div{
        //     @include size(200px,100%);
        //     font-size: 26px;
        //     color:#fff;
        //     text-align: center;
        //     line-height: 60px;
        //     float: left;
        //     box-sizing:border-box;
        //     border:0px solid #0096ff;
        //     cursor: pointer;
        //     margin-bottom: 1%;
        //   }
        //   .active{
        //     box-sizing:border-box;
        //     border:1px solid #0096ff;
        //   }
        // }
      }
      .editmodeloperation{
        height:auto;
        border-bottom:0px dashed #727272;
        margin-top:2%;
        div{
          @include size(130px,60px);
          color:#fff;
          font-size: 26px;
          line-height: 60px;
          text-align: center;
          border-radius: 4px;
          float: right;
          cursor: pointer;
        }
        .save{
          background:#0096ff;
          margin-right:2%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }    
    .editmodelContentxq::-webkit-scrollbar{
      background: rgba(255, 255, 255, 0.2);
      width:6px;
    }
    .editmodelContentxq::-webkit-scrollbar-thumb {
      background: rgba(12,35,119,0.7);
      border-radius: 5px;
    }
  }
}
</style>
