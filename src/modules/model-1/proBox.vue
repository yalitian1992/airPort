<template>
  <div :class="{nodeBox: true, moveS: nodeShow}">
    <div class="nodeEditBox autoScroll">
      <div class="name">
        <p>{{Title}}</p>
        <span class="btn" @click="Save()">保存</span>
        <i class="back" @click="Hide"></i>
      </div>
      <ul class="tabBox">
        <li :class="{objTitle: tabID === index}" v-for="(item, index) in tabList" :key="index" @click="TabDiff(index)">{{item.name}}</li>
      </ul>
      <!--模糊隶属算法-->
      <div v-show="true" class="Subject" v-if="tabID === 1">
        <div class="rule">
          <p><span>规则设置</span></p>
          <ul>
            <li v-for= "(item, index) in subNode.ChildrensRule" :key = "index">
              <label for="">{{item.NODENAME}}：<input type="number" v-model="item.MTE_PERCENTAGE">%</label>
            </li>
          </ul>
        </div>
        <div class="method">
          <p><span>特列算法</span></p>
          <ul>
            <li>
              <label for="">
                <input type="radio" v-model="train" value="weightVal">变权：
                <input class="weight"
                       type="text"
                       v-model="WeightTXT"
                       :readonly="train !== 'weightVal'"
                       oninput="if(value < 0 || value > 1)value = 0">选择变权时输入0-1之间的变权系数
              </label>
            </li>
            <li>
              <label for="">
                <input type="radio" v-model="train" value="maxVal">取高值
              </label>
            </li>
          </ul>
        </div>
      </div>
      <!--分类算法-->
      <div class="Category" v-if="tabID === 0">
        <div class="measure">
          <p class="title"><span>度量</span></p>
          <div class="measure_header">
            <select name="" id="" v-model="DuL">
              <option value=0>度量0</option>
              <option value=1>度量1</option>
              <option value=2>度量2</option>
            </select>
            <ul>
              <li v-if="SDuL === '0'">求因素的取值向量R各分量的最大值，即M=max（R），得分大于等于4的指标得分之和S.</li>
              <li v-if="SDuL === '1'">求因素的取值向量R各分量的最大值，即M=max（R），指标得分在4-6之间的指标数目S<sub>M</sub>和指标得分在7-9之间的指标数目S<sub>H</sub>.</li>
              <li v-if="SDuL === '2'">求因素的取值向量R各分量的最大值，即M=max（R），指标得分在4-6之间的指标数目S<sub>M</sub>，指标得分为7或者8的指标数目S<sub>H0</sub>，指标得分为9的指标数目S<sub>H1</sub>.</li>
            </ul>
          </div>
          <div class="measure_content">
            <div v-if="SDuL === '0'">
              <!--度量0-->
                <!--M<=6-->
              <div class="formulaBox">
                <p>当M &le; 6 时</p>
                <div class="formula Z1">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 150px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>4,</p>
                      <p>5,</p>
                      <p>6,</p>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T1.t1" placeholder="t1" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T1.t2" placeholder="t2" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T1.t3" placeholder="t3" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T1.t4" placeholder="t4" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S &le; </p>
                      <p> &lt; S &le; </p>
                      <p> &lt; S &le; </p>
                      <p> &lt; S &le; </p>
                      <p> &lt; S &le; </p>
                      <p> &nbsp;&nbsp; S &gt; </p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T1.t1" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t1"></p>
                      <p><input type="number" v-model="T1.t2" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t2"></p>
                      <p><input type="number" v-model="T1.t3" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t3"></p>
                      <p><input type="number" v-model="T1.t4" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t4"></p>
                      <p><input type="number" v-model="T1.t5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t5"></p>
                      <p><input type="number" v-model="T1.t5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t5"></p>
                    </li>
                  </ul>
                </div>
              </div>
                <!--M>6-->
              <div class="formulaBox">
                <p>当M &gt; 6 时</p>
                <div class="formula Z2">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 75px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T1.t6" placeholder="t6" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S &le; </p>
                      <p> &lt; S &le; </p>
                      <p> &nbsp;&nbsp; S &gt; </p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T1.t6" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t6"></p>
                      <p><input type="number" v-model="T1.t7" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t7"></p>
                      <p><input type="number" v-model="T1.t7" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="t7"></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="SDuL === '1'">
              <!--度量1-->
                <!--M<=6-->
              <div class="formulaBox">
                <p>当M &le; 6 时，S<sub>H</sub>=0，令</p>
                <div class="formula F1">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 150px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>4,</p>
                      <p>5,</p>
                      <p>6,</p>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T2.n1" placeholder="n1" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T2.n2" placeholder="n2" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T2.n3" placeholder="n3" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T2.n4" placeholder="n4" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &gt; </p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T2.n1" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n1"></p>
                      <p><input type="number" v-model="T2.n2" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n2"></p>
                      <p><input type="number" v-model="T2.n3" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n3"></p>
                      <p><input type="number" v-model="T2.n4" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n4"></p>
                      <p><input type="number" v-model="T2.n5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n5"></p>
                      <p><input type="number" v-model="T2.n5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n5"></p>
                    </li>
                  </ul>
                </div>
              </div>
                <!--M>6-->
              <div class="formulaBox">
                <p>当M &gt; 6 时</p>
                <div class="formula F2">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 75px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T2.n6" placeholder="n6" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> </p>
                    </li>
                    <li style="margin-right: 14px;">
                      <p><input type="number" v-model="T2.n6" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n6"></p>
                      <p><input type="number" v-model="T2.n7" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n7"></p>
                      <p></p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T2.n8" placeholder="n8" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>H</sub> &le; </p>
                      <p> &lt; S<sub>H</sub> &le; </p>
                      <p></p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T2.n8" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n8"></p>
                      <p><input type="number" v-model="T2.n9" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n9"></p>
                      <p>其它</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div v-if="SDuL === '2'">
              <!--度量2-->
                <!--M<=6,SH1=0,SH2=0-->
              <div class="formulaBox">
                <p>当M &le; 6 时，S<sub>H0</sub>=0，S<sub>H1</sub>=0</p>
                <div class="formula S1">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 150px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>4,</p>
                      <p>5,</p>
                      <p>6,</p>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T3.n1" placeholder="n1" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T3.n2" placeholder="n2" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T3.n3" placeholder="n3" disabled="disabled"></p>
                      <p><input type="text" maxlength="3" v-model="T3.n4" placeholder="n4" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &gt; </p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T3.n1" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n1"></p>
                      <p><input type="number" v-model="T3.n2" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n2"></p>
                      <p><input type="number" v-model="T3.n3" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n3"></p>
                      <p><input type="number" v-model="T3.n4" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n4"></p>
                      <p><input type="number" v-model="T3.n5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n5"></p>
                      <p><input type="number" v-model="T3.n5" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n5"></p>
                    </li>
                  </ul>
                </div>
              </div>
                <!--M>6,SH1=0-->
              <div class="formulaBox">
                <p>当M &gt; 6 时，S<sub>H1</sub>=0，令</p>
                <div class="formula S2">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 75px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>7,</p>
                      <p>8,</p>
                      <p>9,</p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T3.n6" placeholder="n6" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &le; </p><sub></sub>
                      <p> &lt; S<sub>M</sub> &le; </p>
                      <p> &nbsp;&nbsp; S<sub>M</sub> &gt; </p>
                    </li>
                    <li style="margin-right: 14px;">
                      <p><input type="number" v-model="T3.n6" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n6"></p>
                      <p><input type="number" v-model="T3.n7" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n7"></p>
                      <p><input type="number" v-model="T3.n7" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n7"></p>
                    </li>
                    <li>
                      <p></p>
                      <p><input type="text" maxlength="3" v-model="T3.n8" placeholder="n8" disabled="disabled"></p>
                      <p></p>
                    </li>
                    <li>
                      <p> &nbsp;&nbsp; S<sub>H0</sub> &le; </p>
                      <p> &lt; S<sub>H0</sub> &le; </p>
                      <p> &nbsp;&nbsp; S<sub>H0</sub> &gt; </p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T3.n8" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n8"></p>
                      <p><input type="number" v-model="T3.n9" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n9"></p>
                      <p><input type="number" v-model="T3.n9" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n9"></p>
                    </li>
                  </ul>
                </div>
              </div>
                <!--M>6,SH1>=1-->
              <div class="formulaBox">
                <p>当M &gt; 6 时，S<sub>H1</sub> &ge; 1</p>
                <div class="formula S3">
                  <p class="R">R=</p>
                  <div style="width: 20px;height: 50px;" class="dakuohao"></div>
                  <ul class="symbol">
                    <li>
                      <p>9,</p>
                      <p>10,</p>
                    </li>
                    <li>
                      <p> S<sub>H1</sub> &le;</p><sub></sub>
                      <p> S<sub>H1</sub> &gt;</p>
                    </li>
                    <li>
                      <p><input type="number" v-model="T3.n10" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n10"></p>
                      <p><input type="number" v-model="T3.n10" oninput="if(value.length > 3)value = value.slice(0, 3)" placeholder="n10"></p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-show="false" class="Overstep">
          <p class="title"><span>越级计算</span></p>
          <div class="yueji">
            <span>是否越级计算:</span>
            <input type="radio" v-model="Count" value=0><i>否</i>
            <input type="radio" v-model="Count" value=1><i>是</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Api from '../Model/modelApi'
import d3 from '../../../static/tree/d3-v3/d3-v3'
import layer from './../../../static/layer/layer'
const getNodeRule = 'ModelManage/GetCombinNodeRule' // 父节点控制面板
export default {
  data () {
    return {
      nodeShow: false, // 节点面板显示
      Title: '',
      Sum: 0,
      WeightTXT: '',
      train: '',
      subNode: {},
      tabID: 0,
      tabList: [
        {name: '分类算法'},
        {name: '模糊隶属算法'}
      ],
      // 向量区间默认值
      // n0 = c(6,8,10,12,14,11,13)
      // n1 = c(1,2,3,4,6,2,4,1,2)
      // n2 = c(1,2,3,4,6,2,4,1,2,2)
      T1: {
        t1: '6',
        t2: '8',
        t3: '10',
        t4: '12',
        t5: '14',
        t6: '11',
        t7: '13'
      },
      T2: {
        n1: '1',
        n2: '2',
        n3: '3',
        n4: '4',
        n5: '6',
        n6: '2',
        n7: '4',
        n8: '1',
        n9: '2'
      },
      T3: {
        n1: '1',
        n2: '2',
        n3: '3',
        n4: '4',
        n5: '6',
        n6: '2',
        n7: '4',
        n8: '1',
        n9: '2',
        n10: '2'
      },
      Count: 0,
      DuL: '0', // 选择度量值
      SDuL: '0',
      StringT: '',
      curNodeInfo: {},
      isNull: true
    }
  },
  watch: {
    DuL (val) {
      var _this = this
      _this.SDuL = val
      if (_this.SDuL === '1') {
        setTimeout(function () {
          _this.createdBraces('dakuohao')
        }, 100)
      }
      if (_this.SDuL === '2') {
        setTimeout(function () {
          _this.createdBraces('dakuohao')
        }, 100)
      }
    }
  },
  created () {
  },
  methods: {
    // 区间向量是否为空
    VectorNon (array) {
      for (let i in array) {
        if (array[i] === '') {
          this.isNull = false
          layer.msg('向量区间不能为空！')
          return false
        } else {
          this.isNull = true
        }
      }
      return this.isNull
    },
    // 公式n1-9传参字符串拼接
    StringF (para) {
      this.isNull = true
      this.StringT = ''
      for (let i in para) {
        this.StringT += para[i] + ','
      }
    },
    // 公式赋初值
    IniValue (list, Def) {
      let len = 0
      for (let i in list) {
        if (len <= Def.length) {
          list[i] = Def[len]
          len++
        }
      }
    },
    // Tab切换
    TabDiff (id) {
      this.tabID = id
      let _this = this
      setTimeout(function () {
        _this.createdBraces('dakuohao')
      }, 100)
    },
    // 大括号样式
    createdBraces (className) {
      d3.selectAll('.' + className + '>svg').remove()
      let ls = d3.selectAll('.' + className)
      ls.each(function (p, j) {
        let h = this.offsetHeight // 高度
        let w = this.offsetWidth // 宽度
        let svg = d3.select(this)
          .append('svg')
          .attr('width', w) // 设定宽度
          .attr('height', h) // 设定高度
        svg.append('path')
          .attr('d', function () {
            var str = 'M' + w + ',' + '0'
            return str + ' C' + w * 0.2 + ',0 ' + (w + ',' + h * 0.5 + ' ') + (0 + ',' + h / 2 + ' ') + ('C' + w + ',' + h / 2 + ' ') + (w * 0.2 + ',' + h + ' ') + (w + ',' + h)
          })
          .style('stroke-width', '2px')
          .attr('fill', 'none')
          .attr('stroke', '#fff')
      })
    },
    // 父节点控制面板接口
    GetNodeRule (id) {
      var _this = this
      this.post(getNodeRule, {param: JSON.stringify({
        TreeId: String(id)
      })}, function (res) {
        _this.subNode = res
        _this.Checked()
        _this.WeightTXT = _this.subNode.CurNodeRule.MTE_VARYINGWEIGHT
        _this.Title = _this.subNode.CurNodeRule.NODENAME
        _this.tabID = _this.subNode.CurNodeRule.MTE_ALGORITHMTYPE - 1
        _this.Count = _this.subNode.CurNodeRule.MTE_ISSKIPLEVEL
        _this.DuL = _this.subNode.CurNodeRule.MTE_RISKMEASURE.toString()
        // 公式返回值不为空
        if (_this.subNode.CurNodeRule.MTE_CLASSICVECTOR !== null) {
          let NewValue = []
          NewValue = _this.subNode.CurNodeRule.MTE_CLASSICVECTOR.split(',')
          switch (_this.subNode.CurNodeRule.MTE_RISKMEASURE) {
            case 0:
              _this.IniValue(_this.T1, NewValue)
              break
            case 1:
              _this.IniValue(_this.T2, NewValue)
              break
            case 2:
              _this.IniValue(_this.T3, NewValue)
              break
          }
        }
        setTimeout(function () {
          _this.createdBraces('dakuohao')
        }, 100)
        _this.nodeShow = true
        console.log('子节点')
      })
    },
    Checked: function () {
      switch (this.subNode.CurNodeRule.MTE_RULETYPE) {
        case 1:
          this.train = 'weightVal'
          break
        case 2:
          this.train = 'maxVal'
          break
      }
    },
    Save: function () {
      var _this = this
      _this.Sum = 0
      let saveData = []
      for (let i = 0; i < _this.subNode.ChildrensRule.length; i++) {
        _this.Sum = _this.Sum + parseInt(_this.subNode.ChildrensRule[i].MTE_PERCENTAGE)
        saveData.push({
          MTE_ID: _this.subNode.ChildrensRule[i].MTE_ID,
          MTE_PERCENTAGE: parseInt(_this.subNode.ChildrensRule[i].MTE_PERCENTAGE),
          MTE_PTREEID: _this.subNode.ChildrensRule[i].MTE_PTREEID,
          MTE_RULETYPE: _this.subNode.ChildrensRule[i].MTE_RULETYPE,
          MTE_VARYINGWEIGHT: _this.subNode.ChildrensRule[i].MTE_VARYINGWEIGHT
        })
      }

      switch (_this.DuL) {
        case '0': if (_this.VectorNon(_this.T1)) {
          _this.StringF(_this.T1)
        }
          break
        case '1': if (_this.VectorNon(_this.T2)) {
          this.StringF(_this.T2)
        }
          break
        case '2': if (_this.VectorNon(_this.T3)) {
          this.StringF(_this.T3)
        }
          break
      }
      saveData.push({
        MTE_ID: _this.subNode.CurNodeRule.MTE_ID,
        MTE_PERCENTAGE: parseInt(_this.subNode.CurNodeRule.MTE_PERCENTAGE),
        MTE_PTREEID: _this.subNode.CurNodeRule.MTE_PTREEID,
        MTE_RULETYPE: _this.train === 'weightVal' ? 1 : 2,
        MTE_VARYINGWEIGHT: _this.train === 'weightVal' ? _this.WeightTXT : 0.1,
        MTE_ALGORITHMTYPE: _this.tabID + 1,
        MTE_RISKMEASURE: _this.DuL,
        MTE_CLASSICVECTOR: _this.StringT.slice(0, _this.StringT.length - 1),
        MTE_ISSKIPLEVEL: _this.Count
      })
      if (_this.tabID === 1) {
        // 模糊隶属算法
        console.log(11111111111)
        if (_this.Sum !== 100) {
          layer.msg('规则设置百分比需等于100！')
          _this.Sum = 0
        } else {
          this.post('CommonMethod/Save',
            {
              modelName: 'BciaModelMtreeextend',
              saveData: JSON.stringify(saveData)
            },
            function (result) {
              Api.modelModifyRecord(_this.curNodeInfo.MT_MMID)
              layer.msg('保存成功！')
              _this.nodeShow = false
            })
        }
      } else {
        // 分类算法
        console.log(222222222222)
        if (_this.isNull === true) {
          // 向量区间不为空
          this.post('CommonMethod/Save',
            {
              modelName: 'BciaModelMtreeextend',
              saveData: JSON.stringify(saveData)
            },
            function (result) {
              Api.modelModifyRecord(_this.curNodeInfo.MT_MMID)
              layer.msg('保存成功！')
              _this.nodeShow = false
            })
        }
      }
    },
    Hide: function () {
      this.nodeShow = false
    },
    Show: function (curnodeinfo) {
      this.nodeShow = true
      this.curNodeInfo = curnodeinfo
      this.GetNodeRule(curnodeinfo.MT_ID)
    }
  },
  mounted: function () {
    this.GetNodeRule()
  }
}
</script>
<style lang="scss" scoped>
  /*body{

    scrollbar-arrow-color: blue; !*上下按钮上三角箭头的颜色*!
    scrollbar-face-color: #CBCBCB; !*滚动条凸出部分的颜色*!
    scrollbar-3dlight-color: blue; !*滚动条亮边的颜色*!
    scrollbar-highlight-color: #333; !*滚动条空白部分的颜色*!
    scrollbar-shadow-color: yellow; !*滚动条阴影的颜色*!
    scrollbar-darkshadow-color: green; !*滚动条强阴影的颜色*!
    scrollbar-track-color: #eee; !*滚动条背景颜色*!

    scrollbar-base-color: black; !*滚动条的基本颜色*!
    !*以上2项适用与：body、div、textarea、iframe*!
  }
  ::-webkit-scrollbar {  !* 滚动条整体部分 *!
    width:1px;
    margin-right:0px
  }
  ::-webkit-scrollbar-button { !* 滚动条两端的按钮 *!
    width:0px;
    height:0px;
  }
  ::-webkit-scrollbar:horizontal {
    height:10px;
    margin-bottom:2px
  }
  ::-webkit-scrollbar-track {  !* 外层轨道 *!
    border-radius: 10px;
  }
  ::-webkit-scrollbar-track-piece {  !*内层轨道，滚动条中间部分 *!
    background-color: #333333;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {  !* 滑块 *!
    width:1px;
    border-radius: 5px;
    background: #CBCBCB;
  }
  ::-webkit-scrollbar-corner { !* 边角 *!
    width: 10px;
    background-color: red;
  }
  ::-webkit-scrollbar-thumb:hover { !* 鼠标移入滑块 *!
    background: #909090;
  }*/

  @mixin size($width, $height) {
    width: $width;
    height: $height;
  }
  /*公式盒子高度样式*/
  @mixin liHeight($height,$id) {
    .formula.#{$id}{
      height: $height;
      .R{
        height: $height;
        line-height: $height;
      }
    }
  }
  /*编辑节点弹框样式*/
  @mixin titStyle() {
    p{
      position: relative;
      border-bottom: 1px solid #fff;
      span{
        display: block;
        @include size (100px, 30px);
        line-height: 30px;
        text-align: center;
        color: #0096ff;
        background: rgba(255,255,255,0.2);
        border-radius: 3px;
        border-top: 1px solid #fff;
        border-left: 1px solid #fff;
        border-right: 1px solid #fff;
      }
    }
    /*p:before{
      width: 77%;
      position: absolute;
      top: 11px;
      right: 0px;
      content: "";
      display: block;
      border-top: 1.3px solid #1E9FFF;
    }*/
  }
  @mixin inputBorder{
    border-radius: 5px;
    border: 1px solid darkgray;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button{
    -webkit-appearance: none;
  }
  /*placeholder字体样式设置*/
  input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: rgba(255,255,255,0.8);
  }
  input:-moz-placeholder, textarea:-moz-placeholder {
    color: rgba(255,255,255,0.8);
  }
  input::-moz-placeholder, textarea::-moz-placeholder {
    color: rgba(255,255,255,0.8);
  }
  input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color: rgba(255,255,255,0.8);
  }
  /*火狐浏览器input(type = number) 去掉上下箭头*/
  input[type=number] {
    -moz-appearance:textfield;
  }
  .moveS{
    position: absolute;
    top: 0 !important;
    right: 10px !important;
  }
  .nodeBox{
    position: absolute;
    top: 30px;
    right: -800px;
    @include size(750px, 100%);
    overflow: hidden;
    z-index: 10;
  }
  .nodeEditBox{
    padding: 20px;
    background: #0f1535;
    color: white;
    border-radius: 5px 5px 0px / 5px 5px;
    border: 1.5px solid #555c86;
    .name{
      position: relative;
      @include size(100%, 50px);
      padding: 0 5px 0 5px;
      line-height: 50px;
      border-bottom: 1px solid #3f70a2;
      float: left;
      .back{
        @include size(14px, 22px);
        position: absolute;
        right: 9px;
        top: 14px;
        cursor: pointer;
        background: url('../../assets/images/h1_05.png') no-repeat center/100% 100%;
      }
      p{
        float: left;
        width: 80%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      span{
        float: right;
        display: block;
        @include size (60px, 34px);
        margin: 1.5% 30px 0 0;
        cursor: pointer;
        color: #fff;
        line-height: 34px;
        text-align: center;
        border-radius: 5px;
        background: #1E9FFF;
      }
      .btn{
        display: inline-block;
        height: 30px;
        padding: 0 8px;
        cursor: pointer;
        color: #fff;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background: #1E9FFF;
      }
    }
    .tabBox{
      font-size: 14px;
      line-height: 30px;
      li{
        display: inline-block;
        @include size(105px,30px);
        text-align: center;
        cursor: pointer;
        background: url('../../assets/images/title-bj3.png') no-repeat 50%;
        background-size: 100% 100%;
      }
      li.objTitle{
        background: url('../../assets/images/title-bj2.png') no-repeat 50%;
        background-size: 100% 100%;
      }
    }
    .Subject{
      .rule{
        margin-top: 30px;
        @include titStyle;
        ul{
          text-align: right;
          margin-right: 12%;
          font-size: 14px;
          li{
            margin: 10px auto;
            input{
              margin: 0 10px 0 30px;
              padding-right: 10px;
              text-align: right;
              height: 28px;
            }
          }
        }
      }
      .method{
        margin-top: 36px;
        @include titStyle;
        ul{
          margin-left: 30px;
          font-size: 14px;
          li{
            margin: 10px auto;
            .weight{
              @include size(50px, 28px);
              text-align: center;
              padding-left: 3px;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .Category{
      margin-top: 30px;
      .measure{
        p.title{
          position: relative;
          border-bottom: 1px solid #fff;
          span{
            display: block;
            @include size (100px, 30px);
            line-height: 30px;
            text-align: center;
            color: #0096ff;
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
            border-top: 1px solid #fff;
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
          }
        }
        &_header{
          position: relative;
          width: 100%;
          margin-top: 20px;
          overflow: hidden;
          select,ul{
            float: left;
            line-height: 30px;
          }
          select{
            @include size(120px, 30px);
            width: 120px;
            option {
              color: black;
            }
          }
          ul{
            margin-left: 10px;
            font-size: 14px;
          }
        }
        &_header:after{
          content: "";
          display: inline-block;
          position: absolute;
          top: 8%;
          left: 104px;
          @include size(12px, 16px);
          /* 添加select右侧下拉小图标 */
          background: url("../../assets/images/sort-down-active-nomal-icon.png")
          no-repeat center/contain;
        }
        &_content{
          margin-top: 15px;
          .formulaBox{
            margin: 20px auto 0 auto;
            width: 90%;
            @include liHeight(150px,Z1);
            @include liHeight(75px,Z2);
            @include liHeight(150px,F1);
            @include liHeight(75px,F2);
            @include liHeight(150px,S1);
            @include liHeight(75px,S2);
            @include liHeight(50px,S3);

            .formula{
              margin: 0 auto;
              width: 62%;
              overflow: hidden;
              .R{
                float: left;
                width: 10%;
              }
              .dakuohao{
                float: left;
              }
              .symbol{
                float: right;
                width: 83%;
                li{
                  float: left;
                  width: 10%;
                  p{
                    height: 25px;
                    line-height: 25px;
                    input{
                      width: 100%;
                      height: 80%;
                      text-align: center;
                      font-size: 16px;
                    }
                  }
                }
                li:nth-child(3){
                  width: 16%;
                  text-align: center;
                }
              }
            }
            .formula.F1,.formula.S1{
              li:nth-child(3){
                width: 18%;
              }
            }
            .formula.F2,.formula.S2{
              li:nth-child(3),li:nth-child(6){
                width: 18%;
              }
            }
            .formula.S3{
              li:nth-child(2){
                width: 14%;
              }
            }
            .formula.S2{
              li:nth-child(6){
                width: 20%;
              }
            }
          }
        }
      }
      .Overstep{
        margin-top: 20px;
        p.title{
          position: relative;
          border-bottom: 1px solid #fff;
          span{
            display: block;
            @include size (100px, 30px);
            line-height: 30px;
            text-align: center;
            color: #0096ff;
            background: rgba(255,255,255,0.2);
            border-radius: 3px;
            border-top: 1px solid #fff;
            border-left: 1px solid #fff;
            border-right: 1px solid #fff;
          }
        }
        .yueji{
          margin: 10px 0 0 30px;
          font-size: 14px;
          span{
            margin-right: 20px;
            font-size: 16px;
          }
          input{
            position: relative;
            top: 2px;
            margin-right: 8px;
          }
          i{
            margin-right: 20px;
            font-style: normal;
          }
        }
      }
    }
    input,select{
      color: #fff;
      background: rgba(255,255,255,0.2);
      border: none;
      /* 将默认的select选择框样式清除 */
      /*appearance:none !important;*/
      /*-moz-appearance:none !important;*/
      /*-webkit-appearance:none !important;*/
      /*-ms-appearance:none !important;*/
    }
  }
</style>
