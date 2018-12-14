<template>
  <div class="stepBox" v-show="ShowCro">
    <div class="step"
         v-drag
         @mousedown="move=true"
         @mouseup="move=false"
         :style="move?'cursor':''">
      <h4>选择缓解措施<i @click="ShowCro = false"></i></h4>
      <div class="stepContent">
        <div class="search">
          <label>所属部门：
            <select name="" v-model="steplist.dept">
              <option v-for="(partItem,parIndex) in childScorPara.DepartMent"
                      :key="parIndex"
                      :value="partItem.DCODE"
              >{{partItem.DVALUE}}</option>
            </select>
          </label>
          <label>所属模块：
            <select name="" v-model="steplist.module">
              <option v-for="(modItem,modIndex) in childScorPara.Modular"
                      :key="modIndex"
                      :value="modItem.DCODE"
              >{{modItem.DVALUE}}</option>
            </select>
          </label>
          <label>风险类型：
            <select name="" v-model="steplist.coreRiskType">
              <option v-for="(criskItem,criskIndex) in childScorPara.CoreRiskType"
                      :key="criskIndex"
                      :value="criskItem.DCODE"
              >{{criskItem.DVALUE}}</option>
            </select>
          </label>
          <label>风险因子：
            <select name="" v-model="steplist.riskType">
              <option v-for="(riskItem,riskindex) in childScorPara.RiskType"
                      :key="riskindex"
                      :value="riskItem.DCODE"
              >{{riskItem.DVALUE}}</option>
            </select>
          </label>
          <span class="btn" @click="StepListFun()">查询</span>
        </div>
        <div class="tableBox">
          <table class="stepTable" border="0" cellspacing="0" cellpadding="0">
            <thead>
            <th :class="{thWidth: index === 0 || index === 1 || index === 3 || index === 4 || index === 5 || index === 6 || index === 9}"
                v-for="(item,index) in listTitle"
                :key="index">{{item}}</th>
            </thead>
            <tbody>
            <tr v-for="(item,index) in MBM_list" :key="index">
              <td>
                <input type="checkbox" :value="index" v-model="indexSelectList">
              </td>
              <td>{{item.MBM_ID}}</td>
              <td>{{item.MBM_NO}}</td>
              <td>{{item.MBM_FACTOR}}</td>
              <td>{{item.MBM_DEPT}}</td>
              <td>{{item.MBM_MOUDLE}}</td>
              <td>{{item.MBM_RISKTYPE}}</td>
              <td>{{item.MBM_FACTORTYPE}}</td>
              <td>{{item.MBM_MEASURE}}</td>
              <td>{{item.MBM_RISKLEVEL}}</td>
              <td>{{item.MBM_EVALUATE}}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div class="footerBox">
          <div class="Pagination">
            <el-pagination @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page.sync="currentPage3"
                           :page-size="10"
                           layout="prev, pager, next, jumper"
                           :total="4">
            </el-pagination>
            <div class="jumpbutton">跳转</div>
          </div>
          <div class="btnBox">
            <span class="sure" @click="Confirm">确定</span>
            <span class="cancel grayBg" @click="ShowCro = false">取消</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const GetBaseMeasures = 'ModelManage/GetBaseMeasures'
export default {
  data () {
    return {
      listTitle: [
        '选择',
        '序号',
        '编号',
        '风险因子',
        '部门',
        '模块',
        '风险类型',
        '风险因子类型',
        '缓解措施',
        '风险等级',
        '风险评价'
      ],
      move: false,
      currentPage3: 0,
      ShowCro: false, // 措施列表框是否显示
      MBM_list: {}, // 初始全部列表
      MBM_list_new: [], // 最新措施列表
      indexSelectList: [], // 选中项的id集合
      newsteplist: {},
      steplist: {
        dept: 'FA',
        module: 'AR',
        riskType: 'AD',
        coreRiskType: 'ADAT'
      },
      childScorPara: {} // 查询条件
    }
  },
  // props: ['isSave'],
  methods: {
    StepShow: function (list, delList) {
      this.steplist = list
      this.indexSelectList = []
      if (delList.length !== 0) {
        for (let i = 0; i < delList.length; i++) {
          this.MBM_list.push(delList[i][0])
        }
      }
      // this.steplist = list
      this.ShowCro = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    StepListFun: function () {
      return false
      var _this = this
      this.post(GetBaseMeasures, {
        param: JSON.stringify(_this.steplist)
      }, function (res) {
        _this.MBM_list = res
      })
    },
    Confirm: function () {
      this.MBM_list_new = []
      for (let i = 0; i < this.indexSelectList.length; i++) {
        this.MBM_list_new.push(this.MBM_list[this.indexSelectList[i]])
      }
      for (let i = 0; i < this.indexSelectList.length; i++) {
        this.MBM_list.splice(this.indexSelectList[0], 1)
      }
      this.$emit('ParentList', this.MBM_list_new)
      this.ShowCro = false
    }
  },
  mounted: function () {
    this.StepListFun()
    this.childScorPara = JSON.parse(localStorage.getItem('SelectPara'))
  }
}
</script>
<style lang="scss" scoped>
  /*@mixin size($width, $height) {
    width: $width;
    height: $height;
  }*/
  .thWidth{
    width: 4% !important;
  }
  .Pagination{
    margin-top: 25px;
    display: flex;
      .jumpbutton{
        margin-left: 24px;
        margin-top: 4px;
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
  }
  .el-pagination{
    text-align: center;
    .el-pager{
      li{
        font-size: 12px !important;
        color: darkgray !important;
      }
    }
  }
  .el-pagination .btn-next, .el-pagination .btn-prev{
    color: #1E9FFF;
    background: none;
  }
  .el-pagination button:disabled{
    background: #1E9FFF !important;
  }
  .el-pager li{
    font-size: 12px !important;
    color: darkgray !important;
  }
  .btn{
    display: inline-block;
    height: 28px;
    padding: 0 8px;
    cursor: pointer;
    color: #fff;
    line-height: 28px;
    text-align: center;
    border-radius: 5px;
    background: #1E9FFF;
  }
  .stepBox{
    color: black;
    padding-top: 50px;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,0.7);
    .step{
      position: absolute;
      top: 20%;
      left: 10%;
      background-color:#101431;
      color:white;
      width: 1050px;
      margin: 0 auto;
      border-radius: 5px;
      h4{
        position: relative;
        height: 35px;
        line-height: 35px;
        padding: 0 10px;
        font-weight: inherit;
        color: #fff;
        background: #1b2d6c;
        i{
          cursor: pointer;
          position: absolute;
          right: 10px;
          top: 5px;
          display: block;
          width: 25px;
          height: 25px;
          border-radius: 5px;
          background: url("../../assets/images/close.png") no-repeat center/100% 100%;
        }
      }
      .stepContent{
        overflow: hidden;
        padding: 10px 10px 25px 10px;
        .search{
          font-size: 14px;
          label{
            margin-left: 30px;
            select{
              width: 95px;
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              padding: 0px;
            }
          }
          .btn{
            position: relative;
            top: 3px;
            margin-left: 15px;
          }
        }
        .tableBox{
          margin-top: 15px;
          overflow: scroll;
        }
        .footerBox{
          position: relative;
        }
        .stepTable{
          border-top: 1.5px solid #1E9FFF;
          font-size: 12px;
          thead,tbody{
            height: 32px;
            text-align: center;
          }
          thead{
            font-size: 14px;
            color: #3f70a2;
            th{
              width: 8%;
            }
          }
          tbody{
            margin-top: 10px;
            color: #a0a0a0;
            tr{
              height: 22px;
            }
            td{
              overflow: hidden;
              input{
                margin-top: 1px;
              }
            }
            tr:nth-child(2n){
              background: rgba(255,255,255,0.2);
            }
          }
        }
        .btnBox{
          position: absolute;
          top: 0;
          right: 0;
          /*float: right;*/
          span{
            display: inline-block;
            height: 28px;
            padding: 0 8px;
            cursor: pointer;
            line-height: 28px;
            text-align: center;
            border-radius: 5px;
            color: #fff;
            background: #1E9FFF;
          }
        }
      }
    }
  }
  input,select,option{
    cursor: pointer;
    color: #fff;
    background-color:#3F445D;
    border: none;
  }
</style>
