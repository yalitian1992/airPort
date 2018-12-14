<template>
  <div class="ModelReliefStep"
       id="ModelReliefStep">
    <div class="ModelReliefStepTitle clearfix">
      <!-- 角色查询 -->
      <div class="department">
        <div class="itemCon fr clearfix">
          <div class="fl">角色查询</div>
          <div class="fl">
            <input type="search" v-model="roleKey">
            <div class="ModelSelect" @click="searchClick">搜索</div>
            <div class="addBtn" @click="AddFun()"></div>
            <!-- <key-value-select :data='departmentData'
                            width="150px"
                            @select='selectDepartment("departMent",$event)'></key-value-select> -->
          </div>
        </div>
      </div>
    </div>
    <div class="ModelReliefStepContent">
      <div class="ModelReliefStepContent_tiao"></div>
      <div class="listTitle">
        <div style="width:3em;">序号</div>
        <div v-for="(item,index) in systemRole.listTile"
             :key="index">{{item}}</div>
        <div style="width:25%;">操作</div>
      </div>
      <div class="listCon">
        <ul class="autoScroll" v-if="systemRole.totalCount !== 0">
          <li v-for="(itemD,indexD) in systemRole.listData"
              :key="indexD">
            <div style="width:3em;">{{(curPage - 1) * 10 + (indexD + 1)}}</div>
            <div style="width:16%;">{{itemD.ROLE_NAME}}</div>
            <div style="width:32%;">{{itemD.ROLE_DESCRIPTION}}</div>
            <div style="width:13%;">{{itemD.GEN_TIME}}</div>
            <div class="Ed" style="width:25%;">
              <span @click="EditFun(itemD.TR_ID)">编辑</span>
              <span @click="DelRole(itemD.TR_ID)">删除</span>
              <span @click="powRole(itemD)">安全</span>
              <span @click="personRole(itemD)">人员配置</span>
            </div>
          </li>
        </ul>
        <p class="noList" v-else>暂无记录</p>
      </div>
      <div class="Pagination" v-if="systemRole.totalCount !== 0">
        <div class="classPage">
          <el-pagination class="pageStyle"
                         small
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page.sync="curPage"
                         :page-size=pageSize
                         layout="total,prev, pager, next, jumper"
                         :total="systemRole.totalCount">
          </el-pagination>
        </div>
        <div class="jumpbutton">跳转</div>
      </div>
      <!--<div class="Edit"-->
           <!--v-if="isEditShow">-->
        <!--<model-factor-edit @onclose="onclose"></model-factor-edit>-->
      <!--</div>-->
      <!--<div class="see"-->
           <!--v-show="isSeeShow">-->
        <!--<div class="close"-->
             <!--@click="close()"></div>-->
      <!--</div>-->
    </div>
    <!--编辑弹框-->
    <RoleEdit ref="Edit" v-on:listenToChildEvent="ReloadInter"></RoleEdit>
    <!--添加弹框-->
    <RoleAdd ref="AddR" v-on:listenToChildEvent="ReloadInter"></RoleAdd>
    <!--权限弹框-->
    <RolePower ref="power"></RolePower>
    <!--人员配置-->
    <RolePerson ref="person"></RolePerson>
  </div>
</template>
<script>
import layer from '../../../../static/layer/layer.js'
import RoleEdit from '../systemRole/roleEdit.vue'
import RoleAdd from '../systemRole/roleAdd.vue'
import RolePower from '../systemRole/rolePower.vue'
import RolePerson from '../systemRole/rolePerson.vue'
const RoleLike = 'SystemMng/GetRoleLike'
export default {
  data () {
    return {
      systemRole: [],
      roleKey: '',
      curPage: 1,
      pageSize: 10,
      middleS: ''
    }
  },
  components: {
    RoleEdit,
    RoleAdd,
    RolePower,
    RolePerson
  },
  methods: {
    ReloadInter: function (val) {
      val && this.roleListData()
    },
    EditFun: function (id) {
      this.$refs.Edit.editChildShow(id, this.systemRole)
    },
    AddFun: function () {
      this.$refs.AddR.addChildShow(this.systemRole)
    },
    powRole: function (item) {
      this.$refs.power.powerChildShow(item)
    },
    personRole: function (info) {
      this.$refs.person.personChildShow(info)
    },
    searchClick () {
      this.curPage = 1
      this.middleS = this.roleKey
      this.roleListData()
    },
    roleListData: function () {
      var _this = this
      _this.layer.load(1, {success: function (layero) {
        document.querySelector('.layui-layer-shade').style.height = '82%'
        document.querySelector('.layui-layer-shade').style.top = '16.8%'
      },
      content: '<div style="width:100px;height:100px;position:relative;left:-1.5em;z-index:-100;top:2.5em">加载中...</div>'})
      this.post(RoleLike, {
        param: _this.middleS,
        PageIndex: _this.curPage,
        PageSize: _this.pageSize
      }, function (res) {
        _this.layer.closeAll()
        _this.systemRole = res
        if (_this.systemRole.listData.length === 0) {

        }
        localStorage.setItem('roleInfoList', JSON.stringify(_this.systemRole))
      })
    },
    DelRole: function (id) {
      let _this = this
      layer.confirm('确认删除此角色？', {icon: 3, skin: 'layer-ext-myskin', title: '提示'}, function () {
        layer.load(1)
        _this.post('CommonMethod/Delete',
          {
            modelName: 'BciaAuthorityTrole',
            deleteData: JSON.stringify({TR_ID: id})
          }, function (result) {
            layer.closeAll()
            layer.msg('删除成功')
            _this.roleListData()
          })
      }, function (index) {
        layer.close(index)
      })
    },
    handleSizeChange (val) {
      var _this = this
      _this.pageSize = val
      _this.roleListData()
    },
    handleCurrentChange (val) {
      var _this = this
      _this.curPage = val
      _this.roleListData()
    }
  },
  mounted: function () {
    this.roleListData()
  }
}
</script>
<style lang="scss" scoped>
  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  .noList{
    width: 100%;
    padding-top: 16%;
    text-align: center;
    color: #F8F8F8;
  }
  .addBtn{
    @include size(34px, 100%);
    position: absolute;
    /*right: -50px;*/
    top: 0;
    cursor: pointer;
    background: url('../../../assets/images/tree_add.png') no-repeat center/ 100% 100%;
  }
  .ModelReliefStepContent{
    .listTitle{
      div{
        @include size(20%, 100%);
        text-align: center;
      }
      div:nth-child(2){
        width:16%;
      }
      div:nth-child(3){
        width:32%;
      }
      div:nth-child(4){
        width:13%;
      }
    }
    .listCon{
      ul{
        li{
          div{
            @include size(20%, 100%);
            overflow: hidden;
            text-align: center;
          }
        }
      }
    }

    li:nth-child(2n){
      background: rgba(255,255,255,0.1);
    }
  }
  .ModelReliefStep{
    min-width: 1024px;
    min-height: 400px;
    .ModelReliefStepTitle{
      .department{
        .fl{
          position: relative;
          input{
            position: absolute;
            top: 0;
            left: 0;
            padding-left: 10px;
            @include size(100%, 100%);
            color: #fff;
            background: rgba(255,255,255,0.1);
            border: none;
            outline: none;
          }
          .ModelSelect{
            position: absolute;
            top: 0;
            right: 0;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 1376px) {
    .ModelReliefStep {
      @include size(100%, 100%);
      position: relative;
      .ModelReliefStepTitle {
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
          @include size(38px, 100%);
          text-align: center;
          background: #0096ff;
          cursor: pointer;
        }
        .addBtn{
          width: 38px;
          right: -64px;
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
          @include size(95%, 39px);
          margin-top: 10px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          div {
            height: 100%;
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            line-height: 2.5em;
            color: #0096ff;
            font-size: 15px;
          }
          div:last-child{
            text-align: center;
          }
        }
        .listCon{
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
                line-height: 30px;
                color: #fff;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: wrap;
                div:nth-last-child(2) {
                  @include size(30%, 100%);
                  float: left;
                  margin-left: 0px;
                }
                div:nth-last-child(1) {
                  @include size(30%, 100%);
                  color: #0096ff;
                  float: right;
                  // background: #0096ff;
                  margin-left: 0px;
                }
              }
              div:last-child {
                text-align: center;
                color: #0096ff;
                span {
                  margin: 0 1%;
                }
              }
            }
            /*li:nth-child(even) {*/
            /*background: rgba(255, 255, 255, 0.1) !important;*/
            /*}*/
          }
        }
        .Pagination {
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
          line-height: 250%;
          background: #0096ff;
          cursor: pointer;
        }
        .addBtn{
          right: -47px;
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
          margin-top: 10px;
          // margin-bottom: 8px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          div {
            /*@include size(8%, 100%);*/
            height: 100%;
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 45px;
            color: #0096ff;
            font-size: 16px;
          }
        }
        .listCon{
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
                /*@include size(8%, 100%);*/
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
              div:last-child{
                color: #0096ff;
              }
            }
          }
        }
        .Pagination {
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
    .ModelReliefStep {
      @include size(100%, 100%);
      position: relative;
      .ModelReliefStepTitle {
        display: flex;
        /*justify-content: space-around;*/
        box-sizing: border-box;
        padding: 1.2em 2em 0.6em 2em;
        .department{
          @include size(20em, 40px);
        }
        .modeldepart{
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
            font-size: 18px;
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
          line-height: 250%;
          background: #0096ff;
          cursor: pointer;
        }
        .addBtn{
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
            /*@include size(8%, 100%);*/
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 2.5em;
            color: #0096ff;
            font-size: 20px;
          }
        }
        .listCon{
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
              div.Ed{
                color: #0096ff;
              }
              div {
                /*@include size(8%, 100%);*/
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
          }
        }
        .Pagination {
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
    .ModelReliefStep {
      @include size(100%, 100%);
      position: relative;
      .ModelReliefStepTitle {
        width: 100%;
        display: flex;
        /*justify-content: space-around;*/
        box-sizing: border-box;
        padding: 2em 2em 1.2em 4em;
        .department{
          @include size(33em, 60px);
        }
        .modeldepart{
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
        .addBtn{
          width: 68px;
          right: -78px;
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
            /*@include size(8%, 100%);*/
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 2.5em;
            color: #0096ff;
            font-size: 32px;
          }
        }
        .listCon{
          @include size(95%, calc(100% - 10em));
          margin: 0 auto 8px auto;
          overflow: hidden;
          ul {
            list-style: none;
            color: #fff;
            font-size: 24px;
            li {
              height: 2.5em;
              cursor: pointer;
              div {
                /*@include size(8%, 100%);*/
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
              div.Ed{
                color: #0096ff;
              }
            }
          }
        }
        /*.Pagination {
          width: 100%;
        }*/
        .Pagination {
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
    .ModelReliefStep {
      @include size(100%, 100%);
      position: relative;
      .ModelReliefStepTitle {
        display: flex;
        /*justify-content: space-around;*/
        box-sizing: border-box;
        padding: 0px 33px 20px 33px;
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
          @include size(95%, 3em);
          // clear: both;
          margin-top: 10px;
          // margin-bottom: 8px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.1);
          div {
            /*@include size(8%, 100%);*/
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 2.5em;
            color: #0096ff;
            font-size: 32px;
          }
        }
        .listCon{
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
                /*@include size(8%, 100%);*/
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
            /*li:nth-child(even) {*/
            /*background: rgba(255, 255, 255, 0.1) !important;*/
            /*}*/
          }
        }
        /*.Pagination {
          width: 50%;
          height: 5%;
          margin: 30px auto;
        }*/
        .Pagination {
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
  /*.Pagination{
    position: fixed;
    bottom: 0px;
    left: 0;
    right: 0;
    height: 50px;
    padding-left: 33px;
    .pageStyle{
      float: left;
    }
    .jumpbutton{
      float: left;
      margin-left: 24px;
      width: 50px;
      height: 28px;
      color: #fff;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      border-radius: 5px;
      background-color: #0096ff;
      border: #0096ff 0px solid;
      cursor: pointer;
    }
    .el-pagination__total{
      color: #fff !important;
    }
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
      height:40px;
    }
  }*/
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
        height:28px;
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
        height:40px;
      }
    }
  }
</style>
