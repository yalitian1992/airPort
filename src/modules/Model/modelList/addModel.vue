<template>
    <div class="addmodel">
      <!-- 头部 -->
      <div class="addmodelTitle">
        <div class="modelName">模型名称</div>
        <div class="modelNameTest">
          <input type="text" value="测试模型" onfocus="if(this.value == '测试模型') this.value = ''" onblur="if(this.value =='') this.value = '测试模型'" />
        </div>
        <div class="operation">
          <div class="cancel" @click="cancelOper()">返回</div>
          <div class="save" @click="saveOper()">保存</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="addmodelContent">
        <div class="addmodelContent1">
          <span>机场名称</span>
          <div class="content">
            <div v-for="item in checkboxGroup11" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(1)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>部门名称</span>
          <div class="content">
            <div v-for="item in checkboxGroup12" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(2)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>模块名称</span>
          <div class="content">
            <div v-for="item in checkboxGroup13" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(3)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>风险名称</span>
          <div class="content">
            <div v-for="item in checkboxGroup14" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(4)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>风险分支</span>
          <div class="content">
            <div v-for="item in checkboxGroup15" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(5)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>指标类型</span>
          <div class="content">
            <div v-for="item in checkboxGroup16" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(6)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
        <div class="addmodelContent1">
          <span>指标名称</span>
          <div class="content">
            <div v-for="item in checkboxGroup17" :key="item">{{item}}</div>
            <div class="contentadd" @click="addShow(7)">
              <img src="../../../assets/images/+.png" alt="" class="fl">
            </div>
          </div>
        </div>
      </div>
      <!-- 详情 -->
      <div class="addmodelContentxq" v-if="showXq"
          v-drag
          @mousedown="move=true"
          @mouseup="move=false"
          :style="move?'cursor:move':''">
        <!-- 机场名称 -->
        <div class="addmodelContentxq1" v-if="showXq1">
          <div class="addmodelContentxq1_title">
            <span>机场名称</span>
            <div class="addModelImg" @click="addCon1()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup1">
              <el-checkbox-button v-for="(item) in addModelData.addModelData1" :key="item" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle1">
              <input v-on:keyup.enter="addNew1" v-model="inputValue1" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 部门名称 -->
        <div class="addmodelContentxq1" v-if="showXq2">
          <div class="addmodelContentxq1_title">
            <span>部门名称</span>
            <div class="addModelImg" @click="addCon2()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup2">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData2" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle2">
              <input v-on:keyup.enter="addNew2" v-model="inputValue2" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 模块名称 -->
        <div class="addmodelContentxq1" v-if="showXq3">
          <div class="addmodelContentxq1_title">
            <span>模块名称</span>
            <div class="addModelImg" @click="addCon3()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup3">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData3" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle3">
              <input v-on:keyup.enter="addNew3" v-model="inputValue3" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 风险名称 -->
        <div class="addmodelContentxq1" v-if="showXq4">
          <div class="addmodelContentxq1_title">
            <span>风险名称</span>
            <div class="addModelImg" @click="addCon4()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup4">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData4" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle4">
              <input v-on:keyup.enter="addNew4" v-model="inputValue4" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 风险分支 -->
        <div class="addmodelContentxq1" v-if="showXq5">
          <div class="addmodelContentxq1_title">
            <span>风险分支</span>
            <div class="addModelImg" @click="addCon5()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup5">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData5" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle5">
              <input v-on:keyup.enter="addNew5" v-model="inputValue5" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 指标类型 -->
        <div class="addmodelContentxq1" v-if="showXq6">
          <div class="addmodelContentxq1_title">
            <span>指标类型</span>
            <div class="addModelImg" @click="addCon6()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup6">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData6" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle6">
              <input v-on:keyup.enter="addNew6" v-model="inputValue6" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <!-- 指标名称 -->
        <div class="addmodelContentxq1" v-if="showXq7">
          <div class="addmodelContentxq1_title">
            <span>指标名称</span>
            <div class="addModelImg" @click="addCon7()"><img src="../../../assets/images/add.png"></div>
          </div>
          <div class="addmodelContentxq1_content">
            <el-checkbox-group v-model="checkboxGroup7">
              <el-checkbox-button v-for="(item,index) in addModelData.addModelData7" :key="index" :label="item" >{{item}}</el-checkbox-button>
            </el-checkbox-group>
            <div class="addTitle" v-if="showaddTitle7">
              <input v-on:keyup.enter="addNew7" v-model="inputValue7" type="text" value="请添加名称" onfocus="if(this.value == '请添加名称') this.value = ''" onblur="if(this.value =='') this.value = '请添加名称'" />
            </div>
          </div>
        </div>
        <div class="state">
          <div class="cancel" @click="cancelXq()">取消</div>
          <div class="save" @click="saveXq()">保存</div>
        </div>
      </div>
    </div>
</template>

<script>
import ManageViewData from '../../../components/echarts/ManageView.js'
export default {
  data () {
    return {
      index: 1,
      move: false,
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
      showaddTitle7: false,
      activeKey1: 0,
      activeKey2: 0,
      activeKey3: 0,
      activeKey4: 0,
      activeKey5: 0,
      activeKey6: 0,
      activeKey7: 0,
      showXq: false,
      showXq1: false,
      showXq2: false,
      showXq3: false,
      showXq4: false,
      showXq5: false,
      showXq6: false,
      showXq7: false,
      addmodelContentxqShow1: false,
      addmodelTitle: ['机场名称', '部门名称', '模块名称', '风险名称', '风险分支', '指标类型', '指标名称'],
      addShowKey: 0,
      addModelData: {
        addModelData1: ['首都机场'],
        addModelData2: ['航站楼管理部', '飞行区管理部', '公共区管理部', '建设项目管理中心', '运行控制中心', '信息科技部', '消防支队', '质量安全部'],
        addModelData3: ['运行管理', '场道管理', '机坪交通', '安全规划', '鸟击管理', '灯光管理', '系统管理', '工程管理', '航空安保', '系统工程', '运输管理', '物业管理', '停车管理', '安全管理'],
        addModelData4: ['人伤类', '消防类', '空防反恐', '航空器类', '跑道入侵', '防汛期', '应急救援', '信息安全'],
        addModelData5: [''],
        addModelData6: [''],
        addModelData7: ['']
      },
      checkboxGroup1: [],
      checkboxGroup2: [],
      checkboxGroup3: [],
      checkboxGroup4: [],
      checkboxGroup5: [],
      checkboxGroup6: [],
      checkboxGroup7: [],
      checkboxGroup11: [],
      checkboxGroup12: [],
      checkboxGroup13: [],
      checkboxGroup14: [],
      checkboxGroup15: [],
      checkboxGroup16: [],
      checkboxGroup17: []
    }
  },
  methods: {
    // 添加显示不同内容
    addCon1 (index) {
      this.showaddTitle1 = true
      this.showaddTitle2 = false
      // this.index = 2
      // if (this.index === 2) {
      //   this.showaddTitle2 = false
      //   this.showaddTitle3 = false
      //   this.showaddTitle4 = false
      //   this.showaddTitle5 = false
      //   this.showaddTitle6 = false
      //   this.showaddTitle7 = false
      //   this.index = 1
      // }
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
    // 获取input的值
    addNew1 () {
      if (this.inputValue1 !== null) {
        this.addModelData.addModelData1.push(this.inputValue1)
        this.showaddTitle1 = false
      }
      this.inputValue1 = ''
    },
    addNew2 () {
      if (this.inputValue2 !== null) {
        this.addModelData.addModelData2.push(this.inputValue2)
        this.showaddTitle2 = false
      }
      this.inputValue2 = ''
    },
    addNew3 () {
      if (this.inputValue3 !== null) {
        this.addModelData.addModelData3.push(this.inputValue3)
        this.showaddTitle3 = false
      }
      this.inputValue3 = ''
    },
    addNew4 () {
      if (this.inputValue4 !== null) {
        this.addModelData.addModelData4.push(this.inputValue4)
        this.showaddTitle4 = false
      }
      this.inputValue4 = ''
    },
    addNew5 () {
      if (this.inputValue5 !== null) {
        this.addModelData.addModelData5.push(this.inputValue5)
        this.showaddTitle5 = false
      }
      this.inputValue5 = ''
    },
    addNew6 () {
      if (this.inputValue6 !== null) {
        this.addModelData.addModelData6.push(this.inputValue6)
        this.showaddTitle6 = false
      }
      this.inputValue6 = ''
    },
    addNew7 () {
      if (this.inputValue7 !== null) {
        this.addModelData.addModelData7.push(this.inputValue7)
        this.showaddTitle7 = false
      }
      this.inputValue7 = ''
    },
    saveOper () {
      this.$router.go(-1)
      // this.$emit('onclickList')
    },
    cancelOper () {
      this.$router.go(-1)
      // this.$emit('onclickList')
    },
    addShow (index) {
      this.addShowKey = index
      this.showXq = true
      if (index === 1) {
        this.showXq1 = true
      }
      if (index === 2) {
        this.showXq1 = true
        this.showXq2 = true
      }
      if (index === 3) {
        this.showXq1 = true
        this.showXq2 = true
        this.showXq3 = true
      }
      if (index === 4) {
        this.showXq1 = true
        this.showXq2 = true
        this.showXq3 = true
        this.showXq4 = true
      }
      if (index === 5) {
        this.showXq1 = true
        this.showXq2 = true
        this.showXq3 = true
        this.showXq4 = true
        this.showXq5 = true
      }
      if (index === 6) {
        this.showXq1 = true
        this.showXq2 = true
        this.showXq3 = true
        this.showXq4 = true
        this.showXq5 = true
        this.showXq6 = true
      }
      if (index === 7) {
        this.showXq1 = true
        this.showXq2 = true
        this.showXq3 = true
        this.showXq4 = true
        this.showXq5 = true
        this.showXq6 = true
        this.showXq7 = true
      }
    },
    saveXq () {
      this.checkboxGroup11 = this.checkboxGroup1
      this.checkboxGroup12 = this.checkboxGroup2
      this.checkboxGroup13 = this.checkboxGroup3
      this.checkboxGroup14 = this.checkboxGroup4
      this.checkboxGroup15 = this.checkboxGroup5
      this.checkboxGroup16 = this.checkboxGroup6
      this.checkboxGroup17 = this.checkboxGroup7
      this.showXq = false
    },
    cancelXq () {
      this.checkboxGroup11 = []
      this.checkboxGroup12 = []
      this.checkboxGroup13 = []
      this.checkboxGroup14 = []
      this.checkboxGroup15 = []
      this.checkboxGroup16 = []
      this.checkboxGroup17 = []
      this.showXq = false
    },
    activeShow1 (item) {
      this.activeKey1 = item
      this.addModelData2 = ManageViewData[item].children
    },
    activeShow2 (item) {
      this.activeKey2 = item
      this.addModelData3 = this.addModelData2[item].children
    },
    activeShow3 (item) {
      this.activeKey3 = item
      this.addModelData4 = this.addModelData3[item].children
    },
    activeShow4 (item) {
      this.activeKey4 = item
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media  only screen  and (max-width: 1366px){
  .addmodel{
    @include size(100%,100%);
    position: relative;
    box-sizing: border-box;
    padding-top:2%;
    &Title{
      @include size(90%,5%);
      margin-left:30px;
      color:#fff;
      font-size: 12px;
      box-sizing: border-box;
      line-height: 28px;
      position: relative;
      .modelName{
        @include size(5%,28px);
        display: inline-block;
        float: left;
      }
      .modelNameTest{
        @include size(20%,28px);
        margin-left:10px;
        float: left;
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
      .operation{
        @include size(20%,100%);
        color:rgba(255,255,255,0.7);
        font-size: 12px;
        float: right;
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
          margin-left:5%;
          cursor: pointer;
        }
      }
    }
    &Content{
      @include size(85%,80%);
      box-sizing: border-box;
      margin:30px auto;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-top: 1px dashed #727272;
        display: flex;
        justify-content: space-between;
        &:nth-last-child(1){
          border-bottom:1px dashed #727272;
        }
        span{
          text-align: center;
          border-right:1px dashed #727272;
          font-size: 12px;
          box-sizing: border-box;
          padding:30px;
        }
        .content{
          flex: 1;
          overflow: hidden;
          div{
            cursor: pointer;
            display: inline-block;
            margin:-5px 10px;
            font-size: 12px;
          }
          .contentadd{
            @include size(30px,30px);
            background:#0096ff;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            margin-top:2%;
            margin-left:2%;
            img{
              display: block;
              @include size(20px,20px);
              position: absolute;
              top:5px;
              left:5px;
            }
          }
        }
      }
    }
    &Contentxq{
      @include size(80%,auto);
      position: absolute;
      left:10%;
      top:20%;
      box-sizing: border-box;
      padding:0 45px 20px 45px;
      background: #1B203C;
      border:1px solid #727272;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom: 1px dashed #727272;
        &_title{
          @include size(100%,40px);
          font-size: 14px;
          color:#fff;
          line-height:40px;
          margin-top:10px;
          box-sizing:border-box;
          padding-left:1%;
          span{
            float: left;
          }
          .addModelImg{
            @include size(30px,28px);
            cursor: pointer;
            float: left;
            margin-left:3%;
            margin-top:0.5%;
          }
        }
        &_content{
          box-sizing: border-box;
          padding-bottom:10px;
          div{
            cursor: pointer;
            display: inline-block;
          }
          .addTitle{
            @include size(124px,40px);
            color:#fff;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            input{
              @include size(100%,80%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
              vertical-align:bottom;
            }
          }
        }
        &:last-child(1){
          border-bottom: 0px dashed #727272;
        }
      }
      .state{
        @include size(120px,30px);
        float: right;
        // position: absolute;
        // bottom:10%;
        // right:5%;
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
          margin-right:5%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1367px) and (max-width: 1400px){
  .addmodel{
    @include size(100%,100%);
    position: relative;
    box-sizing: border-box;
    padding-top:2%;
    &Title{
      @include size(90%,5%);
      margin-left:30px;
      color:#fff;
      font-size: 14px;
      box-sizing: border-box;
      line-height: 28px;
      position: relative;
      .modelName{
        @include size(5%,28px);
        display: inline-block;
        float: left;
      }
      .modelNameTest{
        @include size(20%,28px);
        margin-left:10px;
        float: left;
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
      .operation{
        @include size(20%,100%);
        color:rgba(255,255,255,0.7);
        font-size: 12px;
        float: right;
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
          margin-left:5%;
          cursor: pointer;
        }
      }
    }
    &Content{
      @include size(85%,80%);
      box-sizing: border-box;
      margin:30px auto;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-top: 1px dashed #727272;
        display: flex;
        justify-content: space-between;
        &:nth-last-child(1){
          border-bottom:1px dashed #727272;
        }
        span{
          text-align: center;
          border-right:1px dashed #727272;
          font-size: 14px;
          box-sizing: border-box;
          padding:35px;
        }
        .content{
          flex: 1;
          overflow: hidden;
          div{
            cursor: pointer;
            display: inline-block;
            margin:-5px 10px;
            font-size: 14px;
          }
          .contentadd{
            @include size(30px,30px);
            background:#0096ff;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            margin-top:3%;
            margin-left:2%;
            img{
              display: block;
              @include size(20px,20px);
              position: absolute;
              top:5px;
              left:5px;
            }
          }
        }
      }
    }
    &Contentxq{
      @include size(80%,auto);
      position: absolute;
      left:10%;
      top:20%;
      box-sizing: border-box;
      padding:0 45px 20px 45px;
      background: #1B203C;
      border:1px solid #727272;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom: 1px dashed #727272;
        &_title{
          @include size(100%,40px);
          font-size: 14px;
          color:#fff;
          line-height:40px;
          margin-top:10px;
          box-sizing:border-box;
          padding-left:1%;
          span{
            float: left;
          }
          .addModelImg{
            @include size(30px,28px);
            cursor: pointer;
            float: left;
            margin-left:3%;
            margin-top:0.5%;
          }
        }
        &_content{
          box-sizing: border-box;
          padding-bottom:10px;
          div{
            cursor: pointer;
            display: inline-block;
          }
          .addTitle{
            @include size(124px,40px);
            color:#fff;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            input{
              @include size(100%,80%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
              vertical-align:bottom;
            }
          }
        }
        &:last-child(1){
          border-bottom: 0px dashed #727272;
        }
      }
      .state{
        @include size(120px,30px);
        float: right;
        // position: absolute;
        // bottom:10%;
        // right:5%;
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
          margin-right:5%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1401px) and (max-width: 1920px){
  .addmodel{
    @include size(100%,100%);
    position: relative;
    box-sizing: border-box;
    padding-top:2%;
    &Title{
      @include size(90%,5%);
      margin-left:30px;
      color:#fff;
      font-size: 16px;
      box-sizing: border-box;
      line-height: 28px;
      position: relative;
      .modelName{
        @include size(5%,28px);
        display: inline-block;
        float: left;
      }
      .modelNameTest{
        @include size(20%,28px);
        margin-left:10px;
        float: left;
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
      .operation{
        @include size(20%,100%);
        color:rgba(255,255,255,0.7);
        font-size: 12px;
        float: right;
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
          margin-left:5%;
          cursor: pointer;
        }
      }
    }
    &Content{
      @include size(85%,80%);
      box-sizing: border-box;
      margin:30px auto;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-top: 1px dashed #727272;
        display: flex;
        justify-content: space-between;
        &:nth-last-child(1){
          border-bottom:1px dashed #727272;
        }
        span{
          text-align: center;
          border-right:1px dashed #727272;
          font-size: 16px;
          box-sizing: border-box;
          padding:40px;
        }
        .content{
          flex: 1;
          overflow: hidden;
          div{
            cursor: pointer;
            display: inline-block;
            margin:-20px 20px;
            font-size: 16px;
          }
          .contentadd{
            @include size(50px,50px);
            background:#0096ff;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            margin-top:2%;
            margin-left:2%;
            img{
              display: block;
              @include size(40px,40px);
              position: absolute;
              top:5px;
              left:5px;
            }
          }
        }
      }
    }
    &Contentxq{
      @include size(80%,auto);
      position: absolute;
      left:10%;
      top:20%;
      box-sizing: border-box;
      padding:0 45px 20px 45px;
      background: #1B203C;
      border:1px solid #727272;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom: 1px dashed #727272;
        &_title{
          @include size(100%,60px);
          font-size: 16px;
          color:#fff;
          line-height:40px;
          margin-top:10px;
          box-sizing:border-box;
          padding-left:1%;
          span{
            float: left;
          }
          .addModelImg{
            @include size(30px,28px);
            cursor: pointer;
            float: left;
            margin-left:3%;
            margin-top:0.5%;
          }
        }
        &_content{
          box-sizing: border-box;
          padding-bottom:10px;
          div{
            cursor: pointer;
            display: inline-block;
          }
          .addTitle{
            @include size(124px,40px);
            color:#fff;
            text-align: center;
            line-height: 40px;
            cursor: pointer;
            input{
              @include size(100%,80%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
              vertical-align:bottom;
            }
          }
        }
        &:last-child(1){
          border-bottom: 0px dashed #727272;
        }
      }
      .state{
        @include size(120px,30px);
        float: right;
        // position: absolute;
        // bottom:10%;
        // right:5%;
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
          margin-right:5%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
  }
}
@media only screen  and (min-width: 1921px){
  .addmodel{
    @include size(100%,100%);
    position: relative;
    box-sizing: border-box;
    padding-top:2%;
    &Title{
      @include size(90%,60px);
      margin-left:30px;
      color:#fff;
      font-size: 26px;
      box-sizing: border-box;
      line-height: 28px;
      position: relative;
      margin:0 auto;
      .modelName{
        @include size(5%,100%);
        display: inline-block;
        float: left;
        line-height:60px;
      }
      .modelNameTest{
        @include size(20%,100%);
        margin-left:10px;
        float: left;
        input{
          width:100%;
          height:100%;
          background:rgba(255,255,255,0.1);
          border:none;
          box-sizing:border-box;
          padding-left: 20px;
          color:#8a8a8a;
          outline: none;
          font-size: 26px;
        }
      }
      .operation{
        @include size(20%,100%);
        color:rgba(255,255,255,0.7);
        font-size: 12px;
        float: right;
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
        }
        .cancel{
          background:#c2c3c4;
          margin-left:5%;
        }
      }
    }
    &Content{
      @include size(85%,80%);
      box-sizing: border-box;
      margin:30px auto;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-top: 1px dashed #727272;
        display: flex;
        justify-content: space-between;
        &:nth-last-child(1){
          border-bottom:1px dashed #727272;
        }
        span{
          text-align: center;
          border-right:1px dashed #727272;
          font-size: 24px;
          box-sizing: border-box;
          padding:60px;
        }
        .content{
          flex: 1;
          overflow: hidden;
          div{
            cursor: pointer;
            display: inline-block;
            margin:-30px 20px;
            font-size: 24px;
          }
          .contentadd{
            @include size(80px,80px);
            background:#0096ff;
            border-radius: 4px;
            position: relative;
            cursor: pointer;
            margin-top:2%;
            margin-left:2%;
            img{
              display: block;
              @include size(60px,60px);
              position: absolute;
              top:10px;
              left:10px;
            }
          }
        }
      }
    }
    &Contentxq{
      @include size(80%,auto);
      position: absolute;
      left:10%;
      top:20%;
      box-sizing: border-box;
      padding:0 45px 20px 45px;
      background: #1B203C;
      border:1px solid #727272;
      &1{
        @include size(100%,auto);
        box-sizing: border-box;
        border-bottom: 1px dashed #727272;
        &_title{
          @include size(100%,100px);
          font-size: 26px;
          color:#fff;
          line-height:100px;
          margin-top:10px;
          box-sizing:border-box;
          padding-left:1%;
          span{
            float: left;
          }
          .addModelImg{
            @include size(50px,50px);
            cursor: pointer;
            float: left;
            margin-left:3%;
            margin-top:0.5%;
            img{
              @include size(50px,50px);
              display:block;
            }
          }
        }
        &_content{
          box-sizing: border-box;
          padding-bottom:10px;
          div{
            cursor: pointer;
            display: inline-block;
            font-size:30px;
          }
          .addTitle{
            @include size(180px,60px);
            color:#fff;
            text-align: center;
            line-height: 60px;
            cursor: pointer;
            input{
              @include size(100%,80%);
              background:none;
              border:1px solid #727272;
              color:#999;
              box-sizing: border-box;
              padding-left:20px;
              vertical-align:bottom;
            }
          }
        }
        &:last-child(1){
          border-bottom: 0px dashed #727272;
        }
      }
      .state{
        @include size(300px,60px);
        float: right;
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
          margin-right:5%;
        }
        .cancel{
          background:#c2c3c4;
        }
      }
    }
  }
}
</style>
