<template>
  <div class="ModelReliefStep"
       id="ModelReliefStep">
    <div class="FloatBox">
      <div class="Left">
        <div class="Left_menu">
          <el-tree :data="menuTree" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
          <!--<ul>
            <li>安全实况</li>
            <li>拓扑视图</li>
            <li>风险地图</li>
            <li>安全统计</li>
            <li>模型管理
              <ul>
                <li>模型管理</li>
                <li>风险警告</li>
              </ul>
            </li>
          </ul>-->
        </div>
      </div>
      <div class="Right">
        <div class="ModelReliefStepTitle clearfix">
          <!--菜单信息-->
          <div class="menuInfo">
            <div class="ModelReliefStepContent_tiao"></div>
            <div class="menuInfo_txt">
              <p>
                <span>菜单名称</span>
                <span>{{curNodeInfo.RIGHT_NAME}}</span>
              </p>
              <p>
                <span>描述</span>
                <span>{{curNodeInfo.label}}</span>
              </p>
            </div>
          </div>
          <!-- 菜单名称 -->
          <div class="department">
            <div class="itemCon fr clearfix">
              <div class="fl">菜单名称</div>
              <div class="fl">
                <input type="search">
                <div class="ModelSelect">搜索</div>
                <div class="addBtn" @click="addMenu"></div>
                <!-- <key-value-select :data='departmentData'
                                width="150px"
                                @select='selectDepartment("departMent",$event)'></key-value-select> -->
              </div>
            </div>
          </div>
          <!-- 搜索 -->
          <!--<div class="ModelSelect">搜索</div>-->
        </div>
        <div class="ModelReliefStepContent">
          <div class="ModelReliefStepContent_tiao"></div>
          <div class="listTitle">
            <div v-for="(item,index) in systemMenuTitle"
                 :key="index">{{item}}</div>
          </div>
          <ul>
            <li v-for="(itemD,indexD) in curNodeInfo.children"
                :key="indexD">
              <div>{{itemD.RIGHT_NAME}}</div>
              <div>{{itemD.link}}</div>
              <div>{{itemD.status}}</div>
              <div>{{itemD.creater}}</div>
              <div>{{itemD.GEN_TIME}}</div>
              <div class="Ed">
                <span>编辑</span>
                <span>删除</span>
              </div>
            </li>
          </ul>
          <!--<div class="Pagination">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage3"
                           :page-size="100"
                           layout="prev, pager, next, jumper"
                           :total="1000">
            </el-pagination>
          </div>-->
          <!--<div class="Edit"
               v-if="isEditShow">
            <model-factor-edit @onclose="onclose"></model-factor-edit>
          </div>
          <div class="see"
               v-show="isSeeShow">
            <div class="close"
                 @click="close()"></div>
          </div>-->
        </div>
      </div>
    </div>
    <panel_ae_Menu ref="AE"></panel_ae_Menu>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data () {
    return {
      systemMenuData: [
        {
          menuName: '安全实况',
          link: 'www.baidu.com',
          status: '有效',
          creater: '系统管理员',
          createTime: '2018-7-26 10：50'
        },
        {
          menuName: '安全实况',
          link: 'www.baidu.com',
          status: '有效',
          creater: '系统管理员',
          createTime: '2018-7-26 10：50'
        },
        {
          menuName: '安全实况',
          link: 'www.baidu.com',
          status: '有效',
          creater: '系统管理员',
          createTime: '2018-7-26 10：50'
        }
      ]
    }
  },
  computed: mapState({
    menuTree (state) {
      return state.systemStore.MenuData.menuTree
    },
    systemMenuTitle (state) {
      return state.systemStore.MenuData.systemMenuTitle
    },
    curNodeInfo (state) {
      return state.systemStore.MenuData.curNodeInfo
    },
    defaultProps (state) {
      return state.systemStore.MenuData.defaultProps
    }
  }),
  methods: {
    ...mapMutations('systemStore', ['loadMenuTree', 'setCurNodeInfo']),
    handleNodeClick (data) {
      this.setCurNodeInfo(data)
    },
    addMenu () {
      this.$refs.AE.show()
    }
  },
  mounted () {
    this.loadMenuTree()
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.ModelReliefStep {
  margin-top: 60px;
  overflow: hidden;
  .FloatBox {
    margin: 0 auto;
    width: 96%;
    display: flex;
    .Left {
      .el-tree {
        background: none;
        color: #fff;
        .el-tree-node:focus > .el-tree-node__content {
          background-color: #6a3636;
        }
        .el-tree-node:hover > .el-tree-node__content {
          color: #324cc8;
          background-color: #00ff0000;
        }
      }
      div {
        width: 200px;
        font-size: 14px;
        ul {
          li {
            position: relative;
            height: 30px;
            line-height: 30px;
            ul {
              margin-left: 20px;
              font-size: 12px;
            }
          }
          li:after {
            display: block;
            position: absolute;
            left: 0;
            top: 0;
            width: 10px;
            height: 10px;
            background: blue;
          }
        }
      }
    }
    .Right {
      width: 100%;
      margin-left: 38px;
      border-left: 1.6px solid rgba(255, 255, 255, 0.3);
      .ModelReliefStepTitle {
        .menuInfo {
          width: 100%;
          h5 {
            height: 30px;
            line-height: 30px;
            color: #0096ff;
            font-weight: inherit;
            padding-left: 10px;
          }
          .menuInfo_txt {
            background: rgba(255, 255, 255, 0.1);
            font-size: 14px;
            padding-left: 10px;
            p {
              height: 38px;
              line-height: 38px;
              span:nth-child(1) {
                display: inline-block;
                width: 14%;
              }
            }
          }
        }
        .department {
          margin: 18px 0 16px 0;
          padding-left: 10px;
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
              right: -50px;
              top: 0;
              cursor: pointer;
              background: url("../../../assets/images/tree_add.png") no-repeat
                center/ 100% 100%;
            }
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 1366px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      /*display: flex;*/
      /*justify-content: space-around;*/
      box-sizing: border-box;
      /*padding: 0px 33px 20px 0px;*/
      .department,
      .modeldepart {
        @include size(27%, 40px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 14px;
          box-sizing: border-box;
          line-height: 30px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
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
            @include size(60%, 30px);
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
      height: 601.9px;
      &_tiao {
        @include size(100%, 1px);
        margin: 0 auto;
        background: url("../../../assets/images/bt-bj.png") no-repeat center
          center;
        background-size: 100% 100%;
      }
      .listTitle {
        @include size(100%, 32px);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          @include size(12%, 100%);
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          /*text-align: center;*/
          line-height: 32px;
          color: #3f70a2;
          font-size: 12px;
        }
        div:last-child {
          text-align: center;
        }
      }
      ul {
        @include size(100%, 78%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          // height: 40px;
          height: 5.5%;
          cursor: pointer;
          div {
            @include size(12%, 100%);
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            /*text-align: center;*/
            line-height: 26px;
            color: #fff;
            font-size: 12px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: wrap;
            /*div:nth-last-child(2) {
                @include size(30%, 100%);
                float: left;
                // background: pink;
                margin-left: 0px;
              }
              div:nth-last-child(1) {
                @include size(30%, 100%);
                color: #0096ff;
                float: right;
                // background: #0096ff;
                margin-left: 0px;
              }*/
          }
          div:last-child {
            text-align: center;
            color: #0096ff;
            span {
              margin: 0 9px;
            }
          }
        }
        /*li:nth-child(even) {*/
          /*background: rgba(255, 255, 255, 0.1) !important;*/
        /*}*/
      }
      .Pagination {

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
@media only screen and (min-width: 1367px) and (max-width: 1400px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      /*display: flex;*/
      /*justify-content: space-around;*/
      box-sizing: border-box;
      /*padding: 0px 33px 20px 0px;*/
      .department,
      .modeldepart {
        @include size(27%, 40px);
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
            @include size(75%, 30px);
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
            @include size(60%, 30px);
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
        @include size(95%, 5%);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          @include size(8%, 100%);
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 32px;
          color: #3f70a2;
          font-size: 20px;
        }
      }
      ul {
        @include size(95%, 82%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          // height: 40px;
          height: 5.5%;
          cursor: pointer;
          div {
            @include size(8%, 100%);
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 38px;
            color: #fff;
            font-size: 16px;
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
      .Pagination {
        width: 50%;
        height: 5%;
        margin: 30px auto;
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

@media only screen and (min-width: 1401px) and (max-width: 1920px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      /*display: flex;*/
      /*justify-content: space-around;*/
      box-sizing: border-box;
      /*padding: 0px 33px 20px 0px;*/
      .department,
      .modeldepart {
        @include size(27%, 40px);
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
            @include size(75%, 30px);
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
            @include size(60%, 30px);
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
        @include size(95%, 5%);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          @include size(8%, 100%);
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 32px;
          color: #3f70a2;
          font-size: 20px;
        }
      }
      ul {
        @include size(95%, 82%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          // height: 40px;
          height: 6%;
          cursor: pointer;
          div {
            @include size(8%, 100%);
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 56px;
            color: #fff;
            font-size: 18px;
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
      .Pagination {
        width: 50%;
        height: 5%;
        margin: 30px auto;
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
@media only screen and (min-width: 1921px) and (max-width: 2560px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      /*display: flex;*/
      /*justify-content: space-around;*/
      box-sizing: border-box;
      /*padding: 0px 33px 20px 0px;*/
      .department,
      .modeldepart {
        @include size(27%, 60px);
        // background: #0096ff;
        border-radius: 10px;
        margin-right: 30px;
        .itemCon {
          @include size(100%, 100%);
          color: #cecece;
          font-size: 20px;
          box-sizing: border-box;
          line-height: 60px;
          .fl:nth-child(1) {
            @include size(25%, 100%);
          }
          .fl:nth-child(2) {
            @include size(75%, 30px);
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
            @include size(60%, 30px);
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
        @include size(95%, 5%);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          @include size(8%, 100%);
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 65px;
          color: #3f70a2;
          font-size: 32px;
        }
      }
      ul {
        @include size(95%, 87%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          // height: 40px;
          height: 6%;
          cursor: pointer;
          div {
            @include size(8%, 100%);
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 68px;
            color: #fff;
            font-size: 20px;
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
      .Pagination {
        width: 50%;
        height: 5%;
        margin: 30px auto;
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
@media only screen and (min-width: 2561px) {
  .ModelReliefStep {
    @include size(100%, 100%);
    position: relative;
    .ModelReliefStepTitle {
      /*display: flex;*/
      /*justify-content: space-around;*/
      box-sizing: border-box;
      /*padding: 0px 33px 20px 0px;*/
      .department,
      .modeldepart {
        @include size(27%, 80px);
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
            @include size(75%, 30px);
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
            @include size(60%, 30px);
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
        @include size(95%, 5%);
        // clear: both;
        margin-top: 10px;
        // margin-bottom: 8px;
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.1);
        div {
          @include size(8%, 100%);
          float: left;
          margin-left: 12px;
          box-sizing: border-box;
          text-align: center;
          line-height: 130px;
          color: #3f70a2;
          font-size: 32px;
        }
      }
      ul {
        @include size(95%, 87%);
        list-style: none;
        color: #fff;
        overflow: hidden;
        font-size: 12px;
        margin: 0 auto;
        li {
          margin-bottom: 5px;
          // height: 40px;
          height: 6%;
          cursor: pointer;
          div {
            @include size(8%, 100%);
            float: left;
            margin-left: 12px;
            box-sizing: border-box;
            text-align: center;
            line-height: 135px;
            color: #fff;
            font-size: 32px;
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
      .Pagination {
        width: 50%;
        height: 5%;
        margin: 30px auto;
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
