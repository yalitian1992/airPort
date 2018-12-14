<template>
  <div :class="{nodeBox: true, moveS: nodeShow}">
    <div class="nodeChildBox autoScroll">
      <div class="name" flag="标题栏">
        <p :title="curNodeInfo.MT_NAME">{{curNodeInfo.MT_NAME}}</p>
        <span class="btn" @click="Save()">保存</span>
        <i class="back" @click="Hide"></i>
      </div>
      <div class="rule" flag="评分规则描述">
        <p class="tit"><span>评分规则</span><i @click="ruleShow = !ruleShow" :class="{Up: ruleShow, Down: !ruleShow}"></i></p>
        <textarea  class="tip autoScroll" rows="6" cols="20" v-show="ruleShow" placeholder="此处描述你的规则" v-model="simpleR.MD_RULEDESC"></textarea>
      </div>
      <div class="param" flag="设置指标项规则">
        <p class="tit">
          <span>评分参数</span>
          <em class="tipParam">显示指标筛选项</em>
          <i @click="riskParShow = !riskParShow" :class="{Up: riskParShow, Down: !riskParShow}"></i>
        </p>
        <div class="optBox">
          <div class="part1" flag="筛选指标项">
            <div v-show="riskParShow">
              <span>选择评估项：</span>
              <table class="wp100">
                <thead>
                <th>所属部门</th>
                <th>所属模块</th>
                <th>风险类型</th>
                <th>风险因子</th>
                <th>指标项</th>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <select name="optPartMent" v-model="map_queryParm.dept"  @change="map_queryParm_change()">
                      <option v-for="(partItem,parIndex) in ScorPara.DepartMent"
                            :key="parIndex"
                            :value="partItem.ORG_CODE"
                      >{{partItem.ORG_NAME}}</option>
                    </select>
                  </td>
                  <td>
                    <select name="optModular" v-model="map_queryParm.module" @change="map_queryParm_change()">
                      <option v-for="(modItem,modIndex) in ScorPara.Modular"
                            :key="modIndex"
                            :value="modItem.ORG_CODE"
                      >{{modItem.ORG_NAME}}</option>
                    </select>
                  </td>
                  <td>
                    <select name="optCoreRiskType" v-model="map_queryParm.coreRiskType" @change="map_queryParm_change()">
                      <option v-for="(criskItem,criskIndex) in ScorPara.CoreRiskType"
                            :key="criskIndex"
                            :value="criskItem.ORG_CODE"
                      >{{criskItem.ORG_NAME}}</option>
                    </select>
                  </td>
                  <td>
                    <select name="optRiskType" v-model="map_queryParm.riskType" @change="map_queryParm_change()">
                      <option v-for="(riskItem,riskindex) in ScorPara.RiskType"
                            :key="riskindex"
                            :value="riskItem.ORG_CODE"
                      >{{riskItem.ORG_NAME}}</option>
                    </select>
                  </td>
                  <td>
                    <select name="mapList" v-model="map_id">
                      <option v-for="(mapitem,maitemindex) in map_list"
                            :key="maitemindex"
                            :value="mapitem.KID"
                      >{{mapitem.KNAME}}</option>
                    </select>
                  </td>
                </tr>
                <!--测试Start-->
                <!--测试End-->
                </tbody>
              </table>
            </div>
            <!--<span class="btn" @click="HidePara()">{{btnTxt}}</span>-->
            <span  v-show="riskParShow" class="btn" @click="AddSel()">添加评估项</span>
          </div>
          <div class="part2" flag="设置指标项规则">
            <ul>
              <li class="li2" v-for="(item,index) in  mapitem_rules" :key="index">
                <div style="float:left;margin-right:4px;">
                <span>
                <div class="Sel">
                  <select v-model="item.MR_RULETYPE">
                  <option v-for="(ruletypeitem,index) in ruleType" :key="index" :value="ruletypeitem.id">{{ruletypeitem.name}}</option>
                </select>
                </div>
                  <br/>
                <span class="andS" v-if="item.MR_RULETYPE==='3'||item.MR_RULETYPE==='4'">并且</span>
                </span>
                </div>
                <div class="posi" style="float:left;">
                  <div class="Sel posi_div1">
                    <select v-model="item.MR_DATAITEMID" @change="MapitemChange(item)" >
                      <option v-for="(dataitem,index) in mapitem_list" :key="index" :value="dataitem.ITEMID">{{dataitem.ITEMNAME}}</option>
                    </select>
                  </div>
                  <div class="posi_div2" v-if="item.MR_RULETYPE==='1'" flag="矩阵">
                    <div class="Sel marL" v-if="item.MR_DATAITEMTYPE==='1'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.number" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel marL" v-else-if="item.MR_DATAITEMTYPE ==='2'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option v-for="(comparitem,index) in comparPparamDic.str" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel marL" v-else-if="item.MR_DATAITEMTYPE==='4'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.dic" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <input type="text" v-if="item.MR_DATAITEMTYPE==='1'||item.MR_DATAITEMTYPE==='2'" v-model="item.MR_COMPAREVALUE"/>
                    <select v-else v-model="item.MR_COMPAREVALUE">
                      <option  v-for="(comparitem,index) in itemDicList[item.MR_DATAITEMID]" :key="index" :value="comparitem.DVALUE" >{{comparitem.DVALUE}}</option>
                    </select>
                    <input type="text" v-model="item.MR_RESULTVALUE" placeholder="风险值" title="风险值"/>
                    <i class="add" @click="AddRule()"></i>
                    <i class="del" @click="DelRule(item)"></i>
                  </div>
                  <div class="posi_div2" v-else-if="item.MR_RULETYPE==='2'" flag="增量">
                    <div class="marL" v-if="item.MR_DATAITEMTYPE==='1'">
                      <input type="text" v-model="item.MR_BASEVAL"  placeholder="临界值" title="临界值"/>
                      <input type="text" v-model="item.MR_BASERISKVAL" placeholder="到达临界值后风险起步值"  title="到达临界值后风险起步值"/>
                      <input type="text" v-model="item.MR_INCREASEDEGREE"  placeholder="变化步长" title="变化步长"/>
                      <input type="text" v-model="item.MR_INCREASERISKVAL" placeholder="风险值增加步长" title="风险值增加步长"/>
                      <i class="add" @click="AddRule()"></i>
                      <i class="del" @click="DelRule(item)"></i>
                    </div>
                    <span class="marL" style="height: 30px;line-height: 30px;" v-else>数据项不符合增量条件</span>
                  </div>
                  <div class="posi_div2" v-else-if="item.MR_RULETYPE==='3'" flag="关系矩阵">
                    <div class="Sel marL" v-if="item.MR_DATAITEMTYPE ==='1'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.number" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel marL" v-else-if="item.MR_DATAITEMTYPE ==='4'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.dic" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <select class="marL" v-model="item.MR_COMPAREPARAM" v-else></select>
                    <input type="text"  v-if="item.MR_DATAITEMTYPE ==='1'||item.MR_DATAITEMTYPE==='2'" v-model="item.MR_COMPAREVALUE"/>
                    <select v-else v-model="item.MR_COMPAREVALUE">
                      <option  v-for="(comparitem,index) in itemDicList[item.MR_DATAITEMID]" :key="index" :value="comparitem.DVALUE" >{{comparitem.DVALUE}}</option>
                    </select>
                    <br/>
                    <div class="Sel">
                      <select diff="32" v-model="item.MR_DATAITEMID_R" @change="MapitemChange_r(item)">
                        <option v-for="(dataitem,index) in mapitem_list" :key="index" :value="dataitem.ITEMID">{{dataitem.ITEMNAME}}}</option>
                      </select>
                    </div>
                    <div class="Sel" v-if="item.MR_DATAITEMTYPE_R ==='1'">
                      <select v-model="item.MR_COMPAREPARAM_R">
                        <option  v-for="(comparitem,index) in comparPparamDic.number" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel" v-else-if="item.MR_DATAITEMTYPE_R ==='2'">
                      <select v-model="item.MR_COMPAREPARAM_R">
                        <option v-for="(comparitem,index) in comparPparamDic.str" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel" v-else-if="item.MR_DATAITEMTYPE_R ==='4'">
                      <select v-model="item.MR_COMPAREPARAM_R">
                        <option  v-for="(comparitem,index) in comparPparamDic.dic" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <select v-model="item.MR_COMPAREPARAM" v-else></select>
                    <input type="text"  v-if="item.MR_DATAITEMTYPE_R ==='1'||item.MR_DATAITEMTYPE_R ==='2'" v-model="item.MR_COMPAREVALUE_R"/>
                    <select v-else v-model="item.MR_COMPAREVALUE_R">
                      <option  v-for="(comparitem,index) in itemDicList[item.MR_DATAITEMID_R]" :key="index" :value="comparitem.DVALUE" >{{comparitem.DVALUE}}</option>
                    </select>
                    <input type="text" v-model="item.MR_RESULTVALUE" placeholder="风险值"  title="风险值"/>
                    <i class="add" @click="AddRule()"></i>
                    <i class="del" @click="DelRule(item)"></i>
                  </div>
                  <div class="posi_div2" v-else-if="item.MR_RULETYPE==='4'" flag="增量矩阵">
                    <div class="Sel marL" v-if="item.MR_DATAITEMTYPE ==='1'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.number" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel marL" v-else-if="item.MR_DATAITEMTYPE ==='2'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option v-for="(comparitem,index) in comparPparamDic.str" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <div class="Sel marL" v-else-if="item.MR_DATAITEMTYPE ==='4'">
                      <select v-model="item.MR_COMPAREPARAM">
                        <option  v-for="(comparitem,index) in comparPparamDic.dic" :key="index" :value="comparitem.id">{{comparitem.name}}</option>
                      </select>
                    </div>
                    <input type="text" v-if="item.MR_DATAITEMTYPE ==='1'||item.MR_DATAITEMTYPE ==='2'" v-model="item.MR_COMPAREVALUE" placeholder="比较值" title="比较值"/>
                    <select v-else v-model="item.MR_COMPAREVALUE">
                      <option  v-for="(comparitem,index) in itemDicList[item.MR_DATAITEMID]" :key="index" :value="comparitem.DVALUE" >{{comparitem.DVALUE}}</option>
                    </select>
                    <br/>
                    <div class="Sel">
                      <select diff="42" v-model="item.MR_DATAITEMID_R" @change="MapitemChange_r(item)">
                        <option v-for="(dataitem,index) in mapitem_list" :key="index" :value="dataitem.ITEMID">{{dataitem.ITEMNAME}}}</option>
                      </select>
                    </div>
                    <span v-if="item.MR_DATAITEMTYPE_R ==='1'">
                      <input class="MinW" type="text" v-model="item.MR_BASEVAL" placeholder="临界值" title="临界值"/>
                      <input class="MinW" type="text" v-model="item.MR_BASERISKVAL" placeholder="到达临界值后风险起步值" title="到达临界值后风险起步值"/>
                      <input class="MinW" type="text" v-model="item.MR_INCREASEDEGREE" placeholder="变化步长" title="变化步长"/>
                      <input class="MinW" type="text" v-model="item.MR_INCREASERISKVAL" placeholder="风险值增加步长" title="风险值增加步长"/>
                      <i class="add" @click="AddRule()"></i>
                      <i class="del" @click="DelRule(item)"></i>
                    </span>
                    <span v-else>数据项不符合增量矩阵条件</span>
                  </div>
                  <div class="posi_div2" v-else-if="item.MR_RULETYPE==='5'" flag="等于指标值">
                    <input type="text" v-model="item.MR_RESULTVALUE" v-show="false" title="风险值"/>
                    <i class="add marL" @click="AddRule()"></i>
                    <i class="del" @click="DelRule(item)"></i>
                  </div>
                  <span v-else>未知类型</span></div>
              </li>
            </ul>
          </div>
          <div class="part3" flag="设置默认值">
            <span title="当满足多条规则时使用选择的取值办法">请选择取值办法：</span>
            <div class="Sel">
              <select name="opt5"  v-model="simpleR.MD_HANDLETYPE">
                <option v-for="(item,index) in valType"  :key="index" :value="item.id">
                  {{item.name}}
                </option>
              </select>
            </div>
            <input type="number" v-model="simpleR.MD_MTMINVAL" placeholder="该节点最小风险值" title="该节点最小风险值">
            <input type="number" v-model="simpleR.MD_MTMAXVAL" placeholder="该节点最大风险值" title="该节点最大风险值">
            <input type="number" v-model="simpleR.MD_DEFAULTVAL" placeholder="找不到结果时默认风险值" title="找不到结果时默认风险值">
          </div>
        </div>
      </div>
      <div class="remark" flag="评分备注">
        <p class="tit"><span>评分备注</span><i @click="remarkShow = !remarkShow" :class="{Up: remarkShow, Down: !remarkShow}"></i></p>
        <!--<p class="tip">{{simpleR.MD_SCOREREMARK}}</p>-->
        <textarea class="tip autoScroll" maxlength="200" rows="5" cols="20" v-show="remarkShow" placeholder="此处设置计算结果的描述方式" v-model="simpleR.MD_SCOREREMARK"></textarea>
      </div>
      <div class="step" flag="缓解措施">
        <div class="sname">
          <p @click="DelStep()">缓解措施</p>
          <span class="btn" @click="addMeasure()">添加</span>
          <!--<span class="btn" @click="SelStep">选择缓解措施</span>-->
        </div>
        <div class="stepCon" v-for="(stepItem,stepIndex) in availablemMasures" :key="stepIndex">
          <div class="stepMain">
            <span>{{stepIndex + 1}}</span>
            <p>缓解措施：{{stepItem.KM_MEASURE}}</p>
            <i class="editIconFont" @click="EditStepN(stepItem)">编辑</i>
            <i class="delFont" @click="DelStepN(stepIndex, stepItem.KM_ID)">删除</i>
            <!--<i class="del" @click="DelStep(stepIndex)"></i>-->
          </div>
          <div class="footerTip">
            <!--<p>缓解效果：低风险</p>-->
            <!--<p>附件：<span class="fontBlue">0个附件</span></p>-->
          </div>
        </div>

        <!--旧版本~~~~~~~~勿删Start-->
        <!--<div class="stepCon" v-for="(stepItem,stepIndex) in step_list" :key="stepIndex">
          <div class="stepMain">
            <span>{{stepItem.MBM_ID}}</span>
            <p>缓解措施：{{stepItem.MBM_MEASURE}}</p>
            <i class="del" @click="DelStep(stepIndex)"></i>
          </div>
          <div class="footerTip">
            <p>缓解效果：低风险</p>
            &lt;!&ndash;<p>附件：<span class="fontBlue">0个附件</span></p>&ndash;&gt;
          </div>
        </div>-->
        <!--旧版本~~~~~~~~勿删End-->
      </div>
      <!--缓解措施弹框-->
    </div>
    <!--添加缓解措施弹框-->
    <!--<div class="addMeasureBox" v-show="addMeasureShow">-->
      <!--<div class="addMeasureBox_Content">-->
        <!--<i class="closeIcon" @click="addMeasureShow = false"></i>-->
        <!--<h4>添加缓解措施</h4>-->
    <Prompt :pro-data="ProData" v-show="ProData.show">
      <ul class="addMeasureBox">
        <li>
          <span>缓解措施：</span>
          <input type="text" maxlength="100" v-model="addMeasureTxt">
        </li>
        <!--<li>
          <span>适用等级：</span>
          <p class="selBox">
            <i class="point"></i>
            <select name="" id="">
              <option value="">测试11</option>
            </select>
          </p>
        </li>
        <li>
          <span>对接源：</span>
          <input type="text">
        </li>-->
      </ul>
      <div class="btnBox">
        <span class="btn" @click="addSure()">确定</span>
        <span class="btn grayBg" @click="ProData.show = false">取消</span>
      </div>
    </Prompt>
      <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import * as Api from '../Model/modelApi'
import layer from './../../../static/layer/layer'
import Prompt from '../../components/prompt/prompt.vue'
const GetTerminalNodeRules = 'ModelManage/GetTerminalNodeRules'
const ClassificationDic = 'ModelManage/GetAllOrganization'
const map = 'ModelManage/GetMap'
const mapitemlist = 'ModelManage/GetMapItem'
const MeasursByMapId = 'ModelManage/GetMeasursByMapId'
// const GetMap = 'ModelManage/GetMap'
export default {
  data () {
    return {
      addMeasureShow: false, // 添加缓解措施弹框显示
      addMeasureTxt: '',
      curNodeInfo: {
        MT_NAME: '终端节点名称'
      },
      nodeShow: false, // 节点面板显示
      simpleR: {
        MD_RULEDESC: '',
        MD_KID: '' // 指标项id
      },
      valType: [
        { id: 0, name: '求平均' },
        { id: 1, name: '取最小值' },
        { id: 2, name: '取最大值' },
        { id: 3, name: '求和' }
      ],
      ruleType: [
        { id: '1', name: '矩阵' },
        { id: '2', name: '增量' },
        { id: '3', name: '关系矩阵' },
        { id: '4', name: '增量矩阵' },
        { id: '5', name: '等于指标值' }
      ],
      comparPparamDic: {
        number: [
          { id: '1', name: '>' },
          { id: '2', name: '>=' },
          { id: '3', name: '=' },
          { id: '4', name: '<' },
          { id: '5', name: '<=' },
          { id: '6', name: '!=' },
          { id: '7', name: '区间' }
        ],
        str: [
          { id: '3', name: '=' },
          { id: '6', name: '!=' },
          { id: '8', name: '包含' }
        ],
        dic: [
          { id: '3', name: '=' },
          { id: '6', name: '!=' },
          { id: '8', name: '包含' }
        ]
      }, // 比较关系对象
      ScorPara: {}, // 筛选指标项的参数选项集合
      riskParShow: true,
      btnTxt: '显示指标项筛选框',
      map_queryParm: {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''
      }, // 筛选参数的集合
      map_list: [], // 指标项下拉框集合
      map_id: '', // 指标项id
      mapitem_list: [], // 数据项下拉框数据集合
      mapitem_rules: [], // 数据项规则集合
      firstMapItemId: '', // 记忆当前数据项默认id
      ruleShow: true, // 评分规则框显示
      remarkShow: true, // 评分备注框显示
      Del_Rules: [], // 要删除的数据项规则
      step_list: [], // 已选措施列表
      del_step_list: [], // 已删除措施列表
      successSave: false,
      save_step_list: [], // 保存缓解措施
      deptStructInfo: [],
      availablemMasures: [], // 缓解措施列表
      availablemMasuresDel: [], // 已删缓解措施列表
      meaEditId: '', // 缓解措施-编辑-id传值
      ProData: {
        title: '添加缓解措施',
        show: false,
        width: '500px',
        height: '210px'
      },
      itemDicList: {itemId: [{DGROUP: '', DVALUE: ''}]}
    }
  },
  components: {
    Prompt
  },
  watch: {},
  created () {},
  methods: {
    // 重新选择措施列表项_回传值
    newListStep: function (val) {
      for (let i = 0; i < val.length; i++) {
        this.step_list.push(val[i])
      }
      // this.simpleR.push(this.step_list)
    },
    // 选择措施项触发事件
    SelStep: function () {
      var _this = this
      let lastList = []
      lastList = _this.del_step_list
      _this.del_step_list = []
      _this.$refs.StepProBox.StepShow(_this.map_queryParm, lastList)
    },
    // 调用删除措施接口
    DelStep: function () {
      let delPara = []
      for (let i = 0; i < this.availablemMasuresDel.length; i++) {
        delPara.push({'KM_ID': this.availablemMasuresDel[i][0].KM_ID})
      }
      this.post('CommonMethod/Delete',
        {
          modelName: 'BciaKpiMeasures',
          deleteData: JSON.stringify(delPara)
        }, function (result) {
          this.availablemMasuresDel = []
        })
    },
    // 删除措施项
    DelStepN: function (idx, id) {
      var _this = this
      layer.confirm('确认删除此缓解措施？', {icon: 3, skin: 'layer-ext-myskin', title: '提示'}, function () {
        layer.load(1)
        _this.availablemMasuresDel.push(_this.availablemMasures.splice(idx, 1))
        layer.closeAll()
      }, function (index) {
        layer.close(index)
      })
    },
    EditStepN: function (item) {
      this.addMeasureTxt = item.KM_MEASURE
      this.meaEditId = item.KM_ID
      this.ProData.show = true
    },
    NodeRules: function (curNodeInfo) {
      var _this = this
      let id = curNodeInfo.MT_ID
      _this.curNodeInfo = curNodeInfo
      // 初始化数据
      _this.ReseatSimpleRule(id)
      _this.ReseatQueryParam()
      _this.ReseatItemRules()
      _this.ReseatMap()
      this.post(
        GetTerminalNodeRules,
        {
          param: JSON.stringify({
            treeId: String(id)
          })
        },
        function (res) {
          _this.availablemMasures = []
          if (res.availablemMasures != null) {
            _this.availablemMasures = res.availablemMasures
          }

          if (res.simpleRule != null) {
            _this.simpleR = res.simpleRule
          }
          if (res.relationRules != null) {
            _this.mapitem_rules = res.relationRules
          }
          if (res.defaultMap != null) {
            _this.map_queryParm.dept = res.defaultMap.KPART
            _this.map_queryParm.module = res.defaultMap.KMODULAR
            _this.map_queryParm.riskType = res.defaultMap.KRISKTYPE
            _this.map_queryParm.coreRiskType = res.defaultMap.KCORERISKTYPE
            _this.map_queryParm_change(res.defaultMap.KID, _this.LoadItemList)
          } else {
            _this.map_queryParm_change()
          }
        }
      )
    },
    Hide: function () {
      this.nodeShow = false
    },
    // HidePara: function () {
    //   this.riskParShow = !this.riskParShow
    //   this.btnTxt = (this.riskParShow ? '隐藏' : '显示指标项筛选框')
    // },
    Show: function (id) {
      this.nodeShow = true
      this.curNodeInfo = id
      this.ScorParam()
    },
    Save: function () {
      var _this = this
      this.DelStep()
      _this.simpleR.MD_OPERATOR = this.userInfo.TU_ID
      delete _this.simpleR.UPDATETIME
      var oknum = 0
      var okfunc = function () {
        if (oknum === 3) {
          oknum = 0
          Api.modelModifyRecord(_this.curNodeInfo.MT_MMID)
          layer.msg('保存成功')
          _this.Del_Rules = []
          _this.nodeShow = false
          // _this.successSave = true
        }
      }
      this.post(
        'CommonMethod/Save',
        {
          modelName: 'BciaModelMdefault',
          saveData: JSON.stringify(_this.simpleR)
        },
        function (result) {
          if (!result.Status) {
            layer.msg('基本规则保存失败！')
            _this.nodeShow = false
          } else {
            oknum += 1
            okfunc()
          }
        }
      )
      if (_this.mapitem_rules.length !== 0) {
        this.post(
          'CommonMethod/Save',
          {
            modelName: 'BciaModelMrule',
            saveData: JSON.stringify(_this.mapitem_rules)
          },
          function (result1) {
            if (!result1.Status) {
              layer.msg('编辑的规则未保存成功！')
            } else {
              oknum += 1
              okfunc()
            }
          }
        )
      } else {
        oknum += 1
      }

      // 保存缓解措施列表 新版 2018.9.8
      if (_this.availablemMasures.length !== 0) {
        this.post(
          'CommonMethod/Save',
          {
            modelName: 'BciaKpiMeasures',
            saveData: JSON.stringify(_this.availablemMasures)
          },
          function (result1) {
            if (!result1.Status) {
              layer.msg('缓解措施未保存成功！')
            } else {
              oknum += 1
              okfunc()
            }
          }
        )
      }

      // 保存缓解措施列表~~~~旧版 勿删 Start
      /* if (_this.step_list.length !== 0) {
        for (let i = 0; i < _this.step_list.length; i++) {
          _this.save_step_list.push({
            MSA_ID: _this.guid(),
            MSA_MTID: _this.curNodeInfo.MT_ID,
            MSA_MEASUREID: _this.step_list[i].MBM_ID
          })
        }

        this.post('CommonMethod/Save', {
          modelName: 'BciaModelMmeasuresableappled',
          saveData: JSON.stringify(_this.save_step_list)
        }, function (result1) {
          if (!result1.Status) {
            layer.msg('缓解措施未保存成功！')
          } else {
            oknum += 1
            okfunc()
          }
        })
      } */
      // 保存缓解措施列表~~~~旧版 勿删 End

      if (_this.Del_Rules.length !== 0) {
        this.post(
          'CommonMethod/Delete',
          {
            modelName: 'BciaModelMrule',
            deleteData: JSON.stringify(_this.Del_Rules)
          },
          function (delresutlt) {
            if (!delresutlt.Status) {
              layer.msg('删除的数据未保存成功！')
            } else {
              oknum += 1
              okfunc()
            }
          }
        )
      } else {
        oknum += 1
      }
    },
    ScorParam: function () {
      var _this = this
      _this.layer.load(1)
      this.post(
        ClassificationDic,
        {
          param: '{}'
        },
        function (res) {
          _this.deptStructInfo = res
          _this.autoSelect()
          _this.NodeRules(_this.curNodeInfo)
          _this.layer.closeAll()
        }
      )
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
        let result = []
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
        let result = []
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
    // 添加缓解措施按钮
    addMeasure () {
      this.meaEditId = ''
      // if (this.simpleR.MD_KID !== '') {
      if (this.map_id !== '') {
        this.addMeasureTxt = ''
        this.ProData.show = true
      } else {
        layer.msg('请添加评估项！！！')
      }
    },
    // 缓解措施列表
    MeasureFun: function (KID) {
      var _this = this
      this.post(
        MeasursByMapId,
        {
          param: JSON.stringify({
            mapId: KID
          })
        },
        function (res) {
          _this.availablemMasures = res
        }
      )
    },
    // 添加缓解措施弹框~确定
    addSure: function () {
      if (this.meaEditId !== '') {
        for (let i = 0; i < this.availablemMasures.length; i++) {
          if (this.availablemMasures[i].KM_ID === this.meaEditId) {
            this.availablemMasures[i].KM_MEASURE = this.addMeasureTxt
            break
          }
        }
      } else {
        let saveAddMeasure = {
          KM_ID: this.guid(),
          KM_KID: this.map_id,
          KM_MEASURE: this.addMeasureTxt,
          KM_APPLYLEVEL: '',
          KM_SOURELINK: ''
        }
        this.availablemMasures.push(saveAddMeasure)
      }
      this.ProData.show = false
    },
    AddSel: function () {
      var _this = this
      if (_this.map_id === '') {
        layer.msg('请选择指标项！！！')
        _this.simpleR.MD_KID = ''
        return false
      } else {
        _this.simpleR.MD_KID = _this.map_id
        _this.MeasureFun(_this.simpleR.MD_KID) // 缓解措施列表
        layer.confirm(
          '添加评估项将清除现有规则，确认添加？',
          {
            skin: 'layer-ext-myskin',
            icon: 3,
            btn: ['确定', '取消'] // 按钮
          },
          function (index) {
            layer.close(index)
            _this.DellAllMapItems()
            _this.ReseatItemRules()
            _this.post(
              mapitemlist,
              { param: JSON.stringify({ mapId: _this.map_id }) },
              function (itemlist) {
                if (itemlist != null) {
                  _this.mapitem_list = itemlist
                  _this.firstMapItemId = itemlist[0].ITEMID
                  for (let i in itemlist) {
                    _this.setItemRepairDic(itemlist[i].ITEMID)
                  }
                  _this.AddRule(itemlist[0].ITEMID)
                }
                let remark = ''
                for (let i in itemlist) {
                  remark +=
                    itemlist[i].ITEMNAME +
                    ':[' +
                    itemlist[i].OUTPUTFIELD +
                    '];'
                }
                _this.simpleR.MD_SCOREREMARK = remark
              }
            )
          }
        )
      }
    },
    map_queryParm_change: function (mapId, func) {
      var _this = this
      _this.autoSelect()
      _this.post(
        map,
        { param: JSON.stringify(_this.map_queryParm) },
        function (mapresult) {
          if (mapresult.length !== 0) {
            _this.map_list = mapresult
            if (mapId !== undefined && mapId != null) {
              _this.map_id = mapId
            } else {
              _this.map_id = mapresult[0].KID
            }
          } else {
            _this.map_list = []
            _this.map_id = ''
          }
          if (func !== undefined) {
            func()
          }
        }
      )
    },
    LoadItemList: function () {
      var _this = this
      if (_this.map_id === '') {
        layer.msg('请选择指标项！！！')
        return false
      } else {
        _this.post(
          mapitemlist,
          { param: JSON.stringify({ mapId: _this.map_id }) },
          function (itemlist) {
            _this.mapitem_list = itemlist
            _this.firstMapItemId = itemlist[0].ITEMID
            for (let i in itemlist) {
              _this.setItemRepairDic(itemlist[i].ITEMID)
            }
          }
        )
      }
    },
    FindMapItemType: function (MapItemId) {
      var _this = this
      let result = ''
      for (var i in _this.mapitem_list) {
        if (_this.mapitem_list[i].ITEMID === MapItemId) {
          result = _this.mapitem_list[i].OUTPUTTYPE
          break
        }
      }
      if (result === null || result === undefined || result === '') {
        result = '1'
      }
      return result
    }, // 根据数据项id查找其类型
    AddRule: function (MapItemId) {
      let _this = this
      let config = {
        itype: '1',
        itemid: ''
      }
      if (MapItemId !== undefined) {
        config.itype = _this.FindMapItemType(MapItemId)
        config.itemid = MapItemId
      } else {
        config.itype = _this.FindMapItemType(_this.firstMapItemId)
        config.itemid = _this.firstMapItemId
      }

      let item = {
        MR_ID: _this.guid(),
        MR_MTID: _this.curNodeInfo.MT_ID,
        MR_RULETYPE: '1',
        MR_DATAITEMID: config.itemid,
        MR_DATAITEMTYPE: config.itype,
        MR_COMPAREPARAM: '',
        MR_COMPAREVALUE: null,
        MR_DATAITEMID_R: config.itemid,
        MR_DATAITEMTYPE_R: config.itype,
        MR_COMPAREPARAM_R: null,
        MR_COMPAREVALUE_R: null,
        MR_GENTIME: null,
        MR_RESULTVALUE: null,
        MR_BASEVAL: '',
        MR_BASERISKVAL: '',
        MR_INCREASEDEGREE: '',
        MR_INCREASERISKVAL: ''
      }
      this.mapitem_rules.push(item)
    },
    ReseatSimpleRule: function (treeid) {
      let userId = this.userInfo.TU_ID
      let _this = this
      this.simpleR = {
        MD_ID: _this.guid(),
        MD_MTID: treeid,
        MD_RULEDESC: '',
        MD_MTMINVAL: 1,
        MD_MTMAXVAL: 10,
        MD_HANDLETYPE: 2,
        MD_DEFAULTVAL: 1,
        MD_SCOREREMARK: '',
        MD_KID: '',
        MD_OPERATOR: userId
      }
    },
    ReseatQueryParam: function () {
      var _this = this
      _this.map_queryParm = {
        dept: '',
        module: '',
        coreRiskType: '',
        riskType: ''
      }
      _this.autoSelect()
    },
    ReseatItemRules: function () {
      let _this = this
      _this.mapitem_rules = []
    },
    ReseatMap: function () {
      let _this = this
      _this.map_list = []
      _this.map_id = ''
    },
    DellAllMapItems: function () {
      var _this = this
      for (var i in _this.mapitem_rules) {
        _this.Del_Rules.push({ MR_ID: _this.mapitem_rules[i].MR_ID })
      }
      _this.mapitem_rules = []
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      )
    },
    MapitemChange: function (mapitem) {
      var _this = this
      for (var i in _this.mapitem_rules) {
        if (_this.mapitem_rules[i].MR_ID === mapitem.MR_ID) {
          _this.mapitem_rules[i].MR_DATAITEMTYPE = _this.FindMapItemType(
            mapitem.MR_DATAITEMID
          )
          break
        }
      }
    },
    MapitemChange_r: function (mapitem) {
      var _this = this
      for (var i in _this.mapitem_rules) {
        if (_this.mapitem_rules[i].MR_ID === mapitem.MR_ID) {
          _this.mapitem_rules[i].MR_DATAITEMTYPE_R = _this.FindMapItemType(
            mapitem.MR_DATAITEMID_R
          )
          break
        }
      }
    },
    DelRule: function (mapitem) {
      var _this = this
      _this.Del_Rules.push({ MR_ID: mapitem.MR_ID })
      var length = _this.mapitem_rules.length
      for (var i = 0; i < length; i++) {
        if (_this.mapitem_rules[i] === mapitem) {
          if (i === 0) {
            _this.mapitem_rules.shift() // 删除并返回数组的第一个元素
          } else if (i === length - 1) {
            _this.mapitem_rules.pop() // 删除并返回数组的最后一个元素
          } else {
            _this.mapitem_rules.splice(i, 1) // 删除下标为i的元素
          }
        }
      }
    },
    async setItemRepairDic (itemId) {
      let data = await Api.getItemRepaireDic(itemId)
      let old = this.itemDicList
      data = data.data
      let temp = []
      for (let i in data) {
        temp.push(data[i])
      }
      old[itemId] = temp
      this.itemDicList = {}
      this.itemDicList = old
    }
  },
  mounted: function () {
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@mixin inputBg() {
  background: rgba(255, 255, 255, 0.2);
}
/*编辑节点弹框样式*/
@mixin titStyle() {
  .tit {
    position: relative;
    border-bottom: 1px solid #fff;
    span {
      display: inline-block;
      @include size(90px, 32px);
      @include inputBg;
      line-height: 32px;
      text-align: center;
      color: #0096ff;
      border-radius: 3px;
      border: 1px solid #fff;
      border-bottom: none;
    }
  }
  .tit > i {
    display: block;
    @include size(12px, 7px);
    position: absolute;
    top: 8px;
    right: 0px;
    cursor: pointer;
  }
  .tit > i.Up {
    background: url("../../assets/images/sort-up-active-nomal-icon.png")
      no-repeat center / 100% 100%;
  }
  .tit > i.Down {
    background: url("../../assets/images/sort-down-active-nomal-icon.png")
      no-repeat center / 100% 100%;
  }
}
@mixin inputBorder {
  border-radius: 5px;
  border: 1px solid darkgray;
  background: #dedede;
}

.MinW{
  width: 62px;
}
/*添加缓解措施弹框Start*/
/*.addMeasureBox {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  &_Content {
    position: absolute;
    top: 20%;
    left: 30%;
    width: 500px;
    padding: 20px;
    background-color: #101431;
    border-radius: 5px;
    color: white;
    border: 1.5px solid #555c86;*/
    /*.closeIcon {
      position: absolute;
      right: 3px;
      top: 3px;
      width: 30px;
      height: 30px;
      cursor: pointer;
      border-radius: 5px;
      background: url("../../assets/images/close.png") no-repeat center/100%
        100%;
    }*/
    h4 {
      width: 100%;
      height: 50px;
      font-size: 18px;
      font-weight: inherit;
      line-height: 50px;
      border-bottom: 1px solid #3f70a2;
    }
    ul.addMeasureBox {
      margin-top: 30px;
      li {
        width: 80%;
        margin: 0 auto 15px auto;
        .selBox {
          position: relative;
          display: inline-block;
          .point {
            display: inline-block;
            position: absolute;
            top: 18%;
            right: 2%;
            width: 12px;
            height: 16px;
            background: url("../../assets/images/sort-down-active-nomal-icon.png")
              no-repeat center/contain;
          }
        }
        span {
          display: inline-block;
          width: 25%;
        }
        input,
        select {
          @include size(190px, 28px);
        }
        input {
          padding: 0 10px;
          color: #fff;
          background: rgba(255, 255, 255, 0.2);
          border: none;
        }
      }
    }
    .btnBox {
      margin-top: 40px;
      text-align: center;
      span {
        margin: 0 20px;
      }
    }
  /*}*/
/*}*/
/*添加缓解措施弹框End*/
textarea {
  overflow-y: scroll !important;
}

.addFont, .delFont, .editIconFont {
  display: inline-block;
  /*@include size(20px, 20px);*/
  margin-left: 4px;
  font-style: normal;
  color: #1e9fff;
  cursor: pointer;
}
.editIcon{
  /*background: green;*/
}
.del {
  display: inline-block;
  @include size(20px, 20px);
  border-radius: 50%;
  overflow: hidden;
  background: url("../../assets/images/close.png") no-repeat center/100% 100%;
}
.add {
  display: inline-block;
  @include size(20px, 20px);
  border-radius: 50%;
  overflow: hidden;
  background: url("../../assets/images/r_add.png") no-repeat center/100% 100%;
}
.fontBlue {
  color: #1e9fff;
}
input,
select {
  color: #fff;
  background: rgba(255, 255, 255, 0.2);
  border: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.moveS {
  position: absolute;
  top: 0 !important;
  right: 10px !important;
}
.btn {
  display: inline-block;
  height: 30px;
  padding: 0 8px;
  cursor: pointer;
  color: #fff;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  background: #1e9fff;
}
.nodeBox {
  position: absolute;
  top: 0;
  right: -800px;
  @include size(770px, 100%);
  overflow: hidden;
  z-index: 10;
}
.nodeChildBox {
  padding: 12px;
  background: #0f1535;
  color: #fff;
  border-radius: 5px 5px 0px / 5px 5px;
  border: 1.5px solid #555c86;
  .name {
    position: relative;
    @include size(100%, 50px);
    padding: 0 5px 0 5px;
    line-height: 50px;
    border-bottom: 1px solid #3f70a2;
    float: left;
    .back {
      @include size(14px, 22px);
      position: absolute;
      right: 9px;
      top: 17px;
      cursor: pointer;
      background: url("../../assets/images/h1_05.png") no-repeat center/100%
        100%;
    }
    p {
      float: left;
      width: 80%;
      height: 2.3em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
    span {
      float: right;
      margin: 1.9% 30px 0 0;
    }
  }
  .rule,
  .param,
  .remark,
  .step {
    width: 100%;
    @include titStyle;
    margin-top: 15px;
    .tip {
      margin: 0 auto;
      padding: 2px 4px;
      color: #fff;
      font-size: 12px;
      @include inputBg;
      border: none;
    }
  }
  .rule {
    margin-top: 70px;
    overflow: hidden;
  }
  .remark{
    overflow: hidden;
  }
  .param {
    .tit {
      em {
        display: inline-block;
        width: 18%;
        margin-left: 30%;
        text-align: center;
        font-size: 12px;
        background: url("../../assets/images/YES.png") no-repeat left/contain;
      }
    }
    .optBox {
      margin-top: 15px;
      font-size: 13px;
      select {
        display: inline-block;
        @include size(109px, 30px);
        line-height: 30px;
        color: #fff;
      }
      tbody{
        select{
          width: 140px;
        }
      }
      .btn {
        margin: 1.5% 0 0 0px;
      }
      .part1 {
        table > thead > th {
          text-align: left;
        }
      }
      .part2,
      .part3 {
        margin-top: 10px;
      }
      .part2 {
        min-height: 100px;
        ul {
          li {
            margin: 5px auto;
            overflow: hidden;
          }
          li.li2 {
            width: 101%;
            padding-top: 15px;
            .andS {
              display: inline-block;
              margin-left: 10px;
              height: 40px;
              line-height: 40px;
            }
            .posi{
              position: relative;
              width: 81%;
              &_div1,&_div2 {
                position: absolute;
              }
              &_div1{
                z-index: 10;
              }
              &_div2{
                .marL {
                  margin-left: 111px;
                }
              }
              .Sel{
                margin-right: 4px;
                margin-bottom: 5px;
              }
            }

            input {
              @include size(102px, 30px);
              padding-left: 4px;
              margin-right: 5px;
            }
            .del {
              position: relative;
              top: 5px;
              margin-left: 4px;
            }
            .add {
              position: relative;
              top: 5px;
            }
          }
        }
        input {
          @include size(95px, 30px);
          padding: 0 8px;
        }
      }
      .part3 {
        border-top: 1px dashed rgba(255, 255, 255, 0.2);
        padding-top: 23px;
        input {
          @include size(95px, 30px);
          margin: 0 0 0 8px;
          padding: 0 8px;
        }
      }
    }
  }
  .step {
    margin: 8px auto 10px auto;
    .sname {
      width: 99.5%;
      margin-top: 20px;
      overflow: hidden;
      p {
        float: left;
      }
      span {
        float: right;
        font-size: 14px;
      }
    }
    .stepCon {
      margin-top: 10px;
      font-size: 12px;
      .stepMain {
        span,
        p {
          display: inline-block;
        }
        span,
        i {
          position: relative;
          top: 1%;
        }
        span {
          @include size(22px, 22px);
          line-height: 22px;
          text-align: center;
          border-radius: 50%;
          border: 1px solid #1e9fff;
          color: #1e9fff;
        }
        p {
          margin: 0 8px;
          width: 84%;
          vertical-align: middle;
        }
      }
      .footerTip {
        margin-top: 10px;
        border-top: 1px solid gray;
        padding: 2px 0 0 32px;
        p {
          display: inline-block;
          width: 48%;
        }
      }
    }
  }
}
.wp100 {
  width: 100%;
}

select{
  padding: 0 6px 0 3px;
}

td {
  @include size(112px, 30px);
  margin: 1%;
}
.Sel{
  display: inline-block;
  @include size(103px, 30px);
}
td,.Sel{
  position: relative;
}
td:before,td:after,.Sel:before,.Sel:after{
  content: "";
  display: inline-block;
  position: absolute;
  top: 0;
  height: 100%;
}
td:before,.Sel:before{
  background: #0f1535;
}
td:after,.Sel:after{
  /* 添加select右侧下拉小图标 */
  background: rgba(255, 255, 255, 0.2) url("../../assets/images/sort-down-active-nomal-icon.png")
  no-repeat center/contain;
  background-size: 12px 8px;
}
td:before {
  right: 0;
  width: 40px;
}
td:after {
  right: 10px;
  width: 30px;
}
.Sel:before,.Sel:after {
  right: 0;
  width:30px;
}
option {
 color: #606266;
}
</style>
