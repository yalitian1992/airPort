<template>
  <div class="ModelReliefStep"
       id="ModelReliefStep">
    <div class="ModelReliefStepTitle ">
        <search-box style="width: calc(100% - 3em);max-width:52em;display:inline-block;">
          <search-item class="searW">
            <div style="display: inline-block;vertical-align: bottom;">
              <div class="department">
                <div class="itemCon fr clearfix">
                  <div class="fl" >部门：</div>
                  <div class="fl">
                    <el-select name="optPartMent" v-model="map_queryParm.dept"  @change="map_queryParm_change()">
                      <el-option v-for="(partItem,parIndex) in ScorPara.DepartMent"
                              :key="parIndex"
                              :value="partItem.ORG_CODE"
                                 :label="partItem.ORG_NAME"
                      >{{partItem.ORG_NAME}}</el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </search-item>
          <search-item class="searW">
            <div style="display: inline-block;vertical-align: bottom;">
              <div class="department">
                <div class="itemCon fr clearfix">
                  <div class="fl" >模块：</div>
                  <div class="fl">
                    <el-select  v-model="map_queryParm.module"  @change="map_queryParm_change()">
                      <el-option v-for="(tItem,rIndex) in ScorPara.Modular"
                                 :key="rIndex"
                                 :value="tItem.ORG_CODE"
                                 :label="tItem.ORG_NAME"
                      >{{tItem.ORG_NAME}}</el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            </div>
          </search-item>
          <search-item class="searW">
            <div style="display: inline-block;vertical-align: bottom;">
              <div class="department">
                <div class="itemCon fr clearfix">
                  <div class="fl" >用户：</div>
                  <div class="fl">
                    <input type="search" v-model="searchParam">
                    <!-- <div class="addBtn"></div>
                          <key-value-select :data='departmentData'
                                 width="150px"
                                 @select='selectDepartment("departMent",$event)'></key-value-select> -->
                  </div>
                </div>
              </div>
            </div>
          </search-item>
        <!-- 用户查询 -->
        </search-box>
      <div class="search"  @click="search" style="display: inline-block;">搜索</div>
    </div>
    <div class="ModelReliefStepContent">
      <div class="ModelReliefStepContent_tiao"></div>
      <div class="listTitle">
        <div style="width:3em;">序号</div>
        <div v-for="(item,index) in systemUserTitle"
             :key="index">
                {{item}}</div>
        <div style="width:16%;">操作</div>
      </div>
      <div class="listCon">
        <ul class="autoScroll" v-if="total !== 0">
          <li v-for="(itemD,indexD) in systemUserData"
              :key="indexD">
            <div style="width:3em;">{{(curPage - 1) * 10 + (indexD + 1)}}</div>
            <div>{{itemD.LOGIN_NAME}}</div>
            <div>{{itemD.VSERNAME}}</div>
            <div>{{itemD.MOBILE}}</div>
            <div >{{itemD.TO_ID}}</div>
            <div >{{itemD.TO_MODULARID}}</div>
            <div>{{itemD.GEN_TIME}}</div>
            <div style="width: 15%;color:#0096ff;">
              <span @click="setRole(itemD)">角色配置</span>
              <span @click="EditFun(itemD)">编辑</span>
            </div>
          </li>
        </ul>
        <p class="noList" v-else-if="total === 0">暂无记录</p>
      </div>
      <div class="listFoot" v-if="total !== 0">
        <div class="classPage">
          <el-pagination class="pageStyle"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :page-sizes="[10, 200, 300, 400]"
                         :current-page.sync="curPage"
                         :page-size=pageSize
                         layout="total,prev, pager, next, jumper"
                         :total="parseInt(total === '' ? '0' : total)"
          >
          </el-pagination>
        </div>
        <div class="jumpbutton">跳转</div>
      </div>

    </div>
    <set-role ref="roleSet"></set-role>
    <edit-user ref="userEdit" @success="loadUserInfo"></edit-user>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import setRole from '../systemUser/setRole'
import editUser from '../systemUser/editUser.vue'
import SearchBox from '../../../components/common/searchBox'
import SearchItem from '../../../components/common/searchItem'
const ClassificationDic = 'ModelManage/GetAllOrganization'
export default {
  data () {
    return {
      searchParam: null,
      pageSize: 10,
      curPage: 1,
      deptStructInfo: [], // 全部的部门信息
      map_queryParm: {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''
      }, // 筛选参数的集合
      ScorPara: { DepartMent: [], Modular: [] }, // 筛选指标项的参数选项集合
      middleList: {
        dept: '',
        module: '',
        SearchValue: ''
      }
    }
  },
  computed: mapState({
    systemUserTitle () {
      return this.$store.state.systemStore.UserData.systemUserTitle
    },
    systemUserData () {
      return this.$store.state.systemStore.UserData.systemUserData
    },
    total () {
      return this.$store.state.systemStore.UserData.pageTotal
    }
  }),
  watch: {
    systemUserTitle () {
      this.layer.closeAll()
    },
    systemUserData () {
      this.layer.closeAll()
    },
    total () {
      this.layer.closeAll()
    }
  },
  components: {
    setRole,
    editUser,
    SearchBox,
    SearchItem
  },
  methods: {
    ...mapActions('systemStore', ['LoadUserData']),
    loadUserInfo () {
      var _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      _this.LoadUserData({
        param: JSON.stringify({
          dept: _this.middleList.dept,
          module: _this.middleList.module,
          SearchValue: _this.middleList.SearchValue,
          PageIndex: _this.curPage,
          PageSize: _this.pageSize
        })
      })
    },
    handleSizeChange (val) {
      var _this = this
      _this.pageSize = val
      _this.loadUserInfo()
    },
    handleCurrentChange (val) {
      var _this = this
      _this.curPage = val
      _this.loadUserInfo()
    },
    search () {
      this.curPage = 1
      this.middleList.dept = this.map_queryParm.dept
      this.middleList.module = this.map_queryParm.module
      this.middleList.SearchValue = this.searchParam
      this.loadUserInfo()
    },
    setRole (item) {
      this.$refs.roleSet.powerChildShow(item)
    },
    EditFun (item) {
      this.$refs.userEdit.editChildShow(item)
    },
    autoSelect () {
      let _this = this
      let res = _this.deptStructInfo
      let dept = null
      let modular = null
      let riskType = null
      let factorType = null
      if (
        _this.map_queryParm.dept === '' ||
        _this.map_queryParm.dept === undefined ||
        _this.map_queryParm.dept === null
      ) {
        dept = null
      } else {
        dept = _this.map_queryParm.dept
      }
      if (
        _this.map_queryParm.module === '' ||
        _this.map_queryParm.module === undefined ||
        _this.map_queryParm.module === null
      ) {
        modular = null
      } else {
        modular = _this.map_queryParm.module
      }
      if (
        _this.map_queryParm.coreRiskType === '' ||
        _this.map_queryParm.coreRiskType === undefined ||
        _this.map_queryParm.coreRiskType === null
      ) {
        riskType = null
      } else {
        riskType = _this.map_queryParm.coreRiskType
      }
      if (
        _this.map_queryParm.riskType === '' ||
        _this.map_queryParm.riskType === undefined ||
        _this.map_queryParm.riskType === null
      ) {
        factorType = null
      } else {
        factorType = _this.map_queryParm.riskType
      }
      let state = {
        dept: dept,
        modular: modular,
        riskType: riskType,
        factorType: factorType
      }
      let depResult = (function (allData, selectState) {
        let result = [{ORG_NAME: '请选择', ORG_CODE: null}]
        let tempdic = {}
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'dept') {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: null, ORG_NAME: '请选择' }]
              : result,
          isExit: selectState.dept === null ? false : tempdic[selectState.dept]
        }
      })(res, state)
      _this.ScorPara.DepartMent = depResult.result
      if (!depResult.isExit) {
        _this.map_queryParm.dept = depResult.result[0].ORG_CODE
      }
      state.dept = _this.map_queryParm.dept

      let moudleResult = (function (allData, selectState) {
        let tempdic = {}
        let result = [{ORG_NAME: '请选择', ORG_CODE: null}]
        for (let i in allData) {
          if (allData[i].ORG_TYPE === 'modular' && selectState.dept === null) {
            if (!tempdic[allData[i].ORG_CODE]) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          } else if (allData[i].ORG_TYPE === 'modular') {
            if (
              !tempdic[allData[i].ORG_CODE] &&
              allData[i].DEPT === selectState.dept
            ) {
              result.push(allData[i])
              tempdic[allData[i].ORG_CODE] = true
            }
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: null, ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.modular]
        }
      })(res, state)
      _this.ScorPara.Modular = moudleResult.result
      if (!moudleResult.isExit) {
        _this.map_queryParm.module = moudleResult.result[0].ORG_CODE
      }
      state.modular = _this.map_queryParm.module

      let riskTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) {
            flg += 10
          }
          if (selectState.modular === null) {
            flg += 1
          }
          switch (flg) {
            case 0:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.dept === allData[i].DEPT
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (
                allData[i].ORG_TYPE === 'riskType' &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 11:
              if (allData[i].ORG_TYPE === 'riskType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            default:
              break
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: null, ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.riskType]
        }
      })(res, state)
      _this.ScorPara.CoreRiskType = riskTypeResult.result
      if (!riskTypeResult.isExit) {
        _this.map_queryParm.coreRiskType = riskTypeResult.result[0].ORG_CODE
      }
      state.riskType = _this.map_queryParm.coreRiskType
      let factorTypeResult = (function (allData, selectState) {
        let tempdic = {}
        let result = []
        for (let i in allData) {
          let flg = 0
          if (selectState.dept === null) {
            flg += 10
          }
          if (selectState.modular === null) {
            flg += 1
          }
          if (selectState.riskType === null) {
            flg += 100
          }
          switch (flg) {
            case 0:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 1:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 10:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.modular === allData[i].MOUDLAR &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 11:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.riskType === allData[i].RISKTYPE
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 100:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 101:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.dept === allData[i].DEPT
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 110:
              if (
                allData[i].ORG_TYPE === 'factorType' &&
                selectState.modular === allData[i].MOUDLAR
              ) {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            case 111:
              if (allData[i].ORG_TYPE === 'factorType') {
                if (!tempdic[allData[i].ORG_CODE]) {
                  result.push(allData[i])
                  tempdic[allData[i].ORG_CODE] = true
                }
              }
              break
            default:
              break
          }
        }
        return {
          result:
            result.length === 0
              ? [{ ORG_CODE: null, ORG_NAME: '请选择' }]
              : result,
          isExit: tempdic[selectState.factorType]
        }
      })(res, state)
      _this.ScorPara.RiskType = factorTypeResult.result
      if (!factorTypeResult.isExit) {
        _this.map_queryParm.riskType = factorTypeResult.result[0].ORG_CODE
      }
      state.factorType = _this.map_queryParm.riskType
    },
    map_queryParm_change () {
      this.autoSelect()
    }
  },
  mounted () {
    let _this = this
    this.post(
      ClassificationDic,
      {
        param: '{}'
      },
      function (res) {
        _this.deptStructInfo = res
        _this.autoSelect()
        _this.layer.closeAll()
      }
    )
    this.loadUserInfo()
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.searW{
  width: 17em;
}
.more{
  span{
    font-size: 14px !important;
  }
}
.sBox{
  font-size: 14px;
}
.search{
  margin-top: 4px;
  width: 44px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  text-align: center;
  border-radius: 5px;
  background: #0096ff;
  cursor: pointer;
}
.noList {
  width: 100%;
  padding-top: 16%;
  text-align: center;
  color: #f8f8f8;
}
.ModelReliefStepContent {
  .listTitle {
    div {
      @include size(11%, 100%);
      text-align: center;
    }
    div:nth-child(8) {
      width: 15%;
    }
  }
  .listCon {
    ul {
      li {
        div {
          @include size(11%, 100%);
          text-align: center;
          overflow: hidden;
        }
      }
    }
  }
}
.ModelReliefStep {
/*
  min-width: 1240px;
*/
  .ModelReliefStepTitle {
    .department {
      .fl {
        position: relative;
        input {
          position: absolute;
          top: 0;
          left: 0;
          padding-left: 10px;
          @include size(100%, 100%);
          color: #fff;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          outline: none;
        }
        .ModelSelect {
          position: absolute;
          top: 0;
          right: 0;
        }
        .addBtn {
          @include size(34px, 100%);
          position: absolute;
          top: 0;
          cursor: pointer;
          background: url("../../../assets/images/tree_add.png") no-repeat
            center/ 100% 100%;
        }
      }
    }
  }
}
.listFoot {
}
@media only screen and (max-width: 1376px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      /*justify-content: space-around;*/
      box-sizing: border-box;
      padding: 0 2em 0.6em 2em;
      .department,
      .modeldepart {
        @include size(15em, 32px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 32px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 100%);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 50px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 40px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 100%);
          }
        }
      }
      .ModelSelect {
        @include size(44px, 100%);
        text-align: center;
        background: #0096ff;
        cursor: pointer;
      }
      .ModelReliefNum {
        @include size(15%, 40px);
        line-height: 40px;
        color: #cecece;
        border-radius: 4px;
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: calc(100% - 5em);
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(95%, 39px);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          /*text-align: center;*/
          line-height: 2.5em;
          color: #0096ff;
          font-size: 15px;
        }
        div:last-child {
          text-align: center;
        }
      }
      .listCon {
        @include size(95%, calc(100% - 10em));
        margin: 0 auto 8px auto;
        overflow: hidden;
        ul {
          list-style: none;
          color: #fff;
          font-size: 14px;
          li {
            height: 2.5em;
            cursor: pointer;
            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              line-height: 2.5em;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: wrap;
            }
            div.resetPwd {
              color: #0096ff;
            }
            div:last-child {
              text-align: center;
              color: #0096ff;
              span {
                margin: 0 9px;
              }
            }
          }
          li:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        }
      }
      .listFoot {
        @include size(95%, 50px);
        margin: 10px auto 0 auto;
        .classPage {
          height: 30px;
          float: left;
          margin: 10px 20px 0 0;
        }
        .jumpbutton {
          @include size(56px, 30px);
          color: #fff;
          font-size: 12px;
          line-height: 30px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          float: left;
          cursor: pointer;
          margin-right: 2%;
          margin-top: 10px;
        }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      /*justify-content: space-around;*/
      box-sizing: border-box;
      padding: 1.2em 2em 0.6em 2em;
      .department,
      .modeldepart {
        @include size(15em, 34px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 40px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 100%);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 50px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 40px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 100%);
          }
        }
      }
      .ModelSelect {
        @include size(34px, 100%);
        text-align: center;
        font-size: 12px;
        background: #0096ff;
        cursor: pointer;
      }
      .ModelReliefNum {
        @include size(15%, 40px);
        line-height: 40px;
        color: #cecece;
        border-radius: 4px;
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(95%, 45px);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 45px;
          color: #0096ff;
          font-size: 16px;
        }
      }
      .listCon {
        @include size(95%, calc(100% - 13em));
        margin: 0 auto 8px auto;
        overflow: hidden;
        ul {
          list-style: none;
          color: #fff;
          font-size: 14px;
          li {
            height: 2.5em;
            cursor: pointer;
            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 2.5em;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: wrap;
              div:nth-last-child(2) {
                @include size(12%, 100%);
                float: left;
                // background: pink;
                margin-left: 0px;
              }
              div:nth-last-child(1) {
                @include size(15%, 100%);
                color: #0096ff;
                float: right;
                // background: #0096ff;
                margin-left: 0px;
              }
            }
            div:last-child {
              color: #0096ff;
            }
          }
          li:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        }
      }
      .listFoot {
        @include size(95%, 50px);
        margin: 10px auto 0 auto;
        .classPage {
          height: 30px;
          float: left;
          margin: 10px 20px 0 0;
        }
        .jumpbutton {
          @include size(65px, 30px);
          color: #fff;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          float: left;
          cursor: pointer;
          margin-right: 2%;
          margin-top: 10px;
        }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}

@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .sBox{
    font-size: 18px;
  }
  .search{
    height: 40px;
    width: 60px;
    line-height: 40px;
    font-size: 16px;
  }
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      /*justify-content: space-around;*/
      box-sizing: border-box;
      padding: 1.2em 2em 0.6em 2em;
      .department {
        @include size(16em, 40px);
      }
      .modeldepart {
        @include size(15em, 40px);
      }
      .department,
      .modeldepart {
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 16px !important;
          box-sizing: border-box;
          line-height: 40px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 100%);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 50px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 40px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 100%);
          }
        }
      }
      .ModelSelect {
        @include size(50px, 100%);
        text-align: center;
        background: #0096ff;
        cursor: pointer;
      }
      .addBtn {
        width: 50px;
        right: -70px;
      }
      .ModelReliefNum {
        @include size(15%, 40px);
        line-height: 40px;
        color: #cecece;
        border-radius: 4px;
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 14px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 14px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(95%, 3em);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 2.4em;
          color: #0096ff;
          font-size: 20px;
        }
      }
      .listCon {
        @include size(95%, calc(100% - 13em));
        margin: 0 auto 8px auto;
        overflow: hidden;
        ul {
          list-style: none;
          color: #fff;
          font-size: 20px;
          li {
            height: 2.5em;
            cursor: pointer;
            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 2.5em;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: wrap;
              div:nth-last-child(2) {
                @include size(12%, 100%);
                float: left;
                // background: pink;
                margin-left: 0px;
              }
              div:nth-last-child(1) {
                @include size(15%, 100%);
                color: #0096ff;
                float: right;
                // background: #0096ff;
                margin-left: 0px;
              }
            }
          }
          li:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        }
      }
      .listFoot {
        @include size(95%, 50px);
        margin: 10px auto 0 auto;

        .classPage {
          height: 35px;
          float: left;
          margin: 10px 20px 0 0;
        }

        .jumpbutton {
          @include size(70px, 35px);
          color: #fff;
          font-size: 14px;
          line-height: 35px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          float: left;
          cursor: pointer;
          margin-top: 10px;
        }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 1931px) and (max-width: 2570px) {
  .searW{
    width: 30em !important;
  }
  .sBox{
    font-size: 18px;
  }
  .search{
    width: 80px;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      width: 100%;
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      /*justify-content: space-around;*/
      box-sizing: border-box;
      padding: 2em 2em 1.2em 4em;
      .department {
        @include size(33em, 60px);
      }
      .modeldepart {
        @include size(15em, 60px);
      }
      .department,
      .modeldepart {
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 30px;
          box-sizing: border-box;
          line-height: 60px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 100%);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 60px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 50px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 20px;
          box-sizing: border-box;
          line-height: 60px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 100%);
          }
        }
      }
      .ModelSelect {
        @include size(68px, 100%);
        text-align: center;
        background: #0096ff;
        cursor: pointer;
      }
      .ModelReliefNum {
        @include size(15%, 60px);
        line-height: 60px;
        color: #cecece;
        border-radius: 4px;
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 20px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 20px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(95%, 4.6em);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 2.4em;
          color: #0096ff;
          font-size: 32px;
        }
      }
      .listCon {
        @include size(95%,calc(100% - 10em));
        margin: 0 auto 8px auto;
        overflow: hidden;
        ul {
          list-style: none;
          color: #fff;
          font-size: 22px;
          li {
            height: 2.5em;
            cursor: pointer;
            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 2.5em;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: wrap;
              div:nth-last-child(2) {
                @include size(12%, 100%);
                float: left;
                // background: pink;
                margin-left: 0px;
              }
              div:nth-last-child(1) {
                @include size(15%, 100%);
                color: #0096ff;
                float: right;
                // background: #0096ff;
                margin-left: 0px;
              }
            }
          }
          li:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        }
      }
      .listFoot {
        @include size(95%, 80px);
        margin: 10px auto 0 auto;

        .classPage {
          height: 100%;
          float: left;
          margin: 10px 20px 0 0;
        }

        .jumpbutton {
          @include size(150px, 100%);
          color: #fff;
          font-size: 32px;
          line-height: 80px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          float: left;
          cursor: pointer;
          margin-right: 2%;
          margin-top: 10px;
        }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
@media only screen and (min-width: 2571px) {
  .searW{
    width: 30em !important;
  }
  .sBox{
    font-size: 18px;
  }
  .search{
    width: 60px;
    height: 60px;
    line-height: 60px;
    font-size: 30px;
  }
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      display: -moz-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: -webkit-flex;
      display: flex;
      /*justify-content: space-around;*/
      box-sizing: border-box;
      padding: 1.2em 2em 0.6em 2em;
      .department,
      .modeldepart {
        @include size(15em, 80px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 32px;
          box-sizing: border-box;
          line-height: 80px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 100%);
          }
        }
      }
      .riskTypedepart,
      .factorTypedepart {
        @include size(20%, 80px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 50px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 32px;
          box-sizing: border-box;
          line-height: 80px;
          .fl:nth-child(1) {
            float: left;
            @include size(40%, 100%);
          }
          .fl:nth-child(2) {
            @include size(60%, 100%);
          }
        }
      }
      .ModelSelect {
        @include size(34px, 100%);
        text-align: center;
        font-size: 12px;
        background: #0096ff;
        cursor: pointer;
      }
      .ModelReliefNum {
        @include size(15%, 80px);
        line-height: 80px;
        color: #cecece;
        border-radius: 4px;
        // float: left;
        text-align: center;
        margin: 0 10px;
        // margin-right:10px;
        // background: #0096ff;
        input {
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
          border: none;
          border-radius: 4px;
          box-sizing: border-box;
          padding-left: 8px;
          // margin-right:20px;
          color: #cecece;
          outline: none;
          font-size: 32px;
        }
        input::-webkit-input-placeholder {
          color: #cecece;
          font-size: 32px;
        }
      }
    }
    .ModelReliefStepContent {
      width: 100%;
      height: 93%;
      &_tiao {
        @include size(95%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(95%, 2.5em);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 2.5em;
          color: #0096ff;
          font-size: 32px;
        }
      }
      .listCon {
        @include size(95%,calc(100% - 10em));
        margin: 0 auto 2% auto;
        overflow: hidden;
        ul {
          list-style: none;
          color: #fff;
          font-size: 34px;
          li {
            height: 2.5em;
            cursor: pointer;
            div {
              float: left;
              margin-left: 12px;
              box-sizing: border-box;
              text-align: center;
              line-height: 2.5em;
              color: #fff;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: wrap;
              div:nth-last-child(2) {
                @include size(40%, 100%);
                float: left;
                // background: pink;
                margin-left: 0px;
              }
              div:nth-last-child(1) {
                @include size(40%, 100%);
                color: #0096ff;
                float: right;
                // background: #0096ff;
                margin-left: 0px;
              }
            }
          }
          li:nth-child(even) {
            background: rgba(255, 255, 255, 0.1) !important;
          }
        }
      }
      .listFoot {
        @include size(95%, 80px);
        margin: 10px auto 0 auto;
        .classPage {
          height: 100%;
          float: left;
          margin: 10px 20px 0 0;
        }

        .jumpbutton {
          @include size(150px, 100%);
          color: #fff;
          font-size: 32px;
          line-height: 80px;
          text-align: center;
          background: deepskyblue;
          border-radius: 4px;
          float: left;
          cursor: pointer;
          margin-right: 2%;
          margin-top: 10px;
        }
      }
    }
    .Edit {
      @include size(80%, 80%);
      z-index: 50;
      background: #0096ff;
      position: absolute;
      left: 10%;
      top: 20px;
    }
    .see {
      @include size(50%, 50%);
      position: absolute;
      top: 20%;
      left: 20%;
      background: #1b203c;
      box-sizing: border-box;
      border: 1px solid #0096ff;
      .close {
        @include size(35px, 35px);
        position: absolute;
        right: -25px;
        top: -25px;
        background: url("../../../assets/images/close.png") no-repeat center
          center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
  }
  .listBj {
    background: rgba(255, 255, 255, 0.1) !important;
  }
}
</style>

// 特殊样式定义
<style lang="scss">
@media only screen and (min-width: 1921px) and (max-width: 2560px) {
  #ModelReliefStep {
    //分页标签
    .el-icon-arrow-left,
    .el-icon-arrow-right,
    .el-pager li,
    .el-pagination span:not([class*="suffix"]) {
      font-size: 18px;
    }
    .el-pagination__editor {
      height: 28px;
    }
    .el-pagination__editor.el-input .el-input__inner {
      font-size: 18px;
      height: 28px;
    }
  }
}
@media only screen and (min-width: 2561px) {
  #ModelReliefStep {
    //分页标签
    .el-icon-arrow-left,
    .el-icon-arrow-right,
    .el-pager li,
    .el-pagination span:not([class*="suffix"]) {
      font-size: 32px;
    }
    .el-pagination__editor.el-input {
      width: 100px;
    }
    .el-pagination__editor {
      height: 56px;
    }
    .el-pagination__editor.el-input .el-input__inner {
      font-size: 32px;
      height: 40px;
    }
  }
}
</style>
