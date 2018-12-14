<template>
    <div class="modelEdit" id="modelEdit">
      <div class="modelEditTitle">
        <div>风险因子</div>
        <div>引导员资质</div>
      </div>
      <div class="modelEditData">
        <div>数据来源</div>
        <div>
          <el-select v-model="valueSourceData1" placeholder="请选择">
            <el-option
              v-for="item in dataSourceData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <key-value-select :data='dataSourceData'
                            width="200px"
                            @select='selectSourceData("SourceData",$event)'></key-value-select> -->
        </div>
        <div>
          <el-select v-model="valueSourceData2" placeholder="请选择">
            <el-option
              v-for="item in dataSourceData"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <!-- <key-value-select :data='dataSourceData'
                            width="200px"
                            @select='selectSourceData("SourceData",$event)'></key-value-select> -->
        </div>
      </div>
      <div class="modelEditContent">
       <div class="modelMeasures">
          <div class="refiel">
            <div class="tiao"></div>
            <div class="refielText">评分规则</div>
            <div class="tiao"></div>
            <div class="refielContent">
              <div class="refielContent1">
                <div class="refielContent1_item fl">
                  <el-select v-model="value1" placeholder="请选择">
                    <el-option
                      v-for="item in duringData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='duringData'
                            width="155px"
                            @select='selectSourceData("duringData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item fl num">1.3</div>
                <div class="refielContent1_item fl">
                  <el-select v-model="value2" placeholder="请选择">
                    <el-option
                      v-for="item in riskData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='riskData'
                            width="155px"
                            @select='selectSourceData("riskData",$event)'></key-value-select> -->
                </div>
                <div class="itemAlarm">是否报警</div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value3" placeholder="请选择">
                    <el-option
                      v-for="item in policeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='policeData'
                            width="107px"
                            @select='selectSourceData("policeData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value4" placeholder="请选择">
                    <el-option
                      v-for="item in PushObjectData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='PushObjectData'
                            width="197px"
                            @select='selectSourceData("PushObjectData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value5" placeholder="请选择">
                    <el-option
                      v-for="item in noticeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='noticeData'
                            width="124px"
                            @select='selectSourceData("noticeData",$event)'></key-value-select> -->
                </div>
                <div class="addhao fl">+</div>
                <div class="delhao fl">-</div>
              </div>
              <div class="refielContent1">
                <div class="refielContent1_item fl">
                  <el-select v-model="value6" placeholder="请选择">
                    <el-option
                      v-for="item in duringData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='duringData'
                            width="155px"
                            @select='selectSourceData("duringData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item fl num">9</div>
                <div class="refielContent1_item fl">
                  <el-select v-model="value7" placeholder="请选择">
                    <el-option
                      v-for="item in riskData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='riskData'
                            width="155px"
                            @select='selectSourceData("riskData",$event)'></key-value-select> -->
                </div>
                <div class="itemAlarm">是否报警</div>
                <div class="refielContent1_item item1 fl">
                   <el-select v-model="value8" placeholder="请选择">
                    <el-option
                      v-for="item in policeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='policeData'
                            width="107px"
                            @select='selectSourceData("policeData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value9" placeholder="请选择">
                    <el-option
                      v-for="item in PushObjectData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='PushObjectData'
                            width="197px"
                            @select='selectSourceData("PushObjectData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value10" placeholder="请选择">
                    <el-option
                      v-for="item in noticeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='noticeData'
                            width="124px"
                            @select='selectSourceData("noticeData",$event)'></key-value-select> -->
                </div>
                <div class="addhao fl">+</div>
                <div class="delhao fl">-</div>
              </div>
              <div class="refielContent1">
                <div class="refielContent1_item fl">
                  <el-select v-model="value11" placeholder="请选择">
                    <el-option
                      v-for="item in duringData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='duringData'
                            width="155px"
                            @select='selectSourceData("duringData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item fl num">1.0</div>
                <div class="refielContent1_item fl">
                  <el-select v-model="value12" placeholder="请选择">
                    <el-option
                      v-for="item in riskData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='riskData'
                            width="155px"
                            @select='selectSourceData("riskData",$event)'></key-value-select> -->
                </div>
                <div class="itemAlarm">是否报警</div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value13" placeholder="请选择">
                    <el-option
                      v-for="item in policeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='policeData'
                            width="107px"
                            @select='selectSourceData("policeData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value14" placeholder="请选择">
                    <el-option
                      v-for="item in PushObjectData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='PushObjectData'
                            width="197px"
                            @select='selectSourceData("PushObjectData",$event)'></key-value-select> -->
                </div>
                <div class="refielContent1_item item1 fl">
                  <el-select v-model="value15" placeholder="请选择">
                    <el-option
                      v-for="item in noticeData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <key-value-select :data='noticeData'
                            width="124px"
                            @select='selectSourceData("noticeData",$event)'></key-value-select> -->
                </div>
                <div class="addhao fl">+</div>
                <div class="delhao fl">-</div>
              </div>
               <div class="refielContent2">
                  <div class="fl value">最低值</div>
                  <div class="refielContent1_item fl">
                    <el-select v-model="value16" placeholder="请选择">
                      <el-option
                        v-for="item in duringData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!-- <key-value-select :data='duringData'
                              width="140px"
                              @select='selectSourceData("duringData",$event)'></key-value-select> -->
                  </div>
                  <div class="fl value">最高值</div>
                  <div class="refielContent1_item fl">
                    <el-select v-model="value17" placeholder="请选择">
                      <el-option
                        v-for="item in riskData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!-- <key-value-select :data='riskData'
                              width="140px"
                              @select='selectSourceData("riskData",$event)'></key-value-select> -->
                  </div>
                  <div class="fl value">默认值</div>
                  <div class="refielContent1_item item1 fl">
                    <el-select v-model="value18" placeholder="请选择">
                      <el-option
                        v-for="item in policeData"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                    <!-- <key-value-select :data='policeData'
                              width="140px"
                              @select='selectSourceData("policeData",$event)'></key-value-select> -->
                  </div>
              </div>
            </div>
          </div>
          <div class="refielMethod1">
            <div class="tiao"></div>
            <div class="refielMethod1Text">缓解措施</div>
            <div class="tiao"></div>
            <div class="refielMethod1Content">
              <div class="refielMethod1Contentadd">
                更换引导员
                <div>-</div>
              </div>
              <div class="refielMethod1Contentdel">
                添加新的缓冲措施
                <div>+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tiao1"></div>
      <div class="delfactor">
        <div @click="del()">删除因子</div>
        <div @click="cancel()">取消</div>
        <div @click="sure()">确认</div>
      </div>
    </div>
</template>

<script>
// 区间 during
// 风险 risk
// 报警 police
// 推送对象 PushObject
// 通知 notice
import KeyValueSelect from '../../../components/KeyValueSelect.vue'
import Dictionary from '../../../util/dictionary.js'
const { dataSource, during, risk, police, PushObject, notice } = Dictionary
// const { dataSource, during, police, PushObject, notice } = Dictionary
export default {
  components: {
    KeyValueSelect
  },
  props: ['isEditShow'],
  data () {
    return {
      editbjKey: 0,
      addShow: false,
      dataSourceData: [{ label: '请选择', value: null }, ...dataSource],
      dataSource: null,
      duringData: [{ label: '请选择区间', value: null }, ...during],
      riskData: [{ label: '请选择风险', value: null }, ...risk],
      policeData: [{ label: '请选择', value: null }, ...police],
      PushObjectData: [{ label: '请选择推送对象', value: null }, ...PushObject],
      noticeData: [{ label: '请选择方式', value: null }, ...notice],
      valueSourceData1: '',
      valueSourceData2: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      value18: '',
      factorTypeData: [{ label: '请选择', value: null }, ...notice],
      factorType: null
    }
  },
  methods: {
    // selectTitle (item) {
    //   this.editbjKey = item
    // },
    select (item) {
      this.editbjKey = item
    },
    selectSourceData (item) {
      this.dataSource = item.value
    },
    sure () {
      this.$emit('onclose')
    },
    cancel () {
      this.$emit('onclose')
    },
    del () {
      this.$emit('onclose')
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
@media  only screen  and (max-width: 1376px){
    .modelEdit{
      @include size(100%,100%);
      box-sizing:border-box;
      padding-top:30px;
      background: #1b203c;
      // 头部
      .modelEditTitle{
        @include size(100%,30px);
        font-size: 14px;
        color:#fff;
        margin-bottom: 10px;
        div{
          @include size(100%,100%);
          line-height: 30px;
          float: left;
          padding: 0px 28px;
          background: rgba(255,255,255,0.1);
          cursor: pointer;
          margin-bottom: 10px;
          border-radius: 4px;
          &:nth-child(1){
            @include size(150px,100%);
            color: #0096ff;
            background: none;
          }
          &:nth-child(2){
            @include size(200px,100%);
            padding-left:10px;
            color:#c2c3c4;
          }
        }
      }
      .modelEditData{
        @include size(100%,30px);
        font-size: 14px;
        margin-bottom: 10px;
        div{
          line-height: 23px;
          float: left;
          display: block;
          border-radius: 4px;
          &:nth-child(1){
            @include size(150px,100%);
            color: #0096ff;
            background: none;
            // border:1px solid #0096ff;
            padding: 0px 28px;
          }
          &:nth-child(2){
            @include size(200px,100%);
            padding: 0px;
            margin-right: 18px;
            div{
              @include size(100%,100%);
              padding-left:0;
              padding-right:0;
            }
          }
          &:nth-child(3){
            @include size(200px,100%);
            padding: 0px;
            div{
              @include size(100%,100%);
              padding-left:0;
              padding-right:0;
            }
          }
        }
      }
      .delfactor{
        @include size(100%,10%);
        color: #fff;
        line-height:28px;
        font-size: 12px;
        text-align: center;
        box-sizing: border-box;
        padding:1.5% 10px;
        div{
          &:nth-child(1){
            @include size(10%,30px);
            background:#0096ff;
            border-radius: 4px;
            cursor: pointer;
            float: left;
            margin-left:2%;
          }
          &:nth-child(2){
            @include size(56px,30px);
            background:#0096ff;
            border-radius: 4px;
            cursor: pointer;
            float: right;
            margin-right:20px;
          }
          &:nth-child(3){
            @include size(56px,30px);
            background: #c2c3c4;
            border-radius: 4px;
            cursor: pointer;
            float: right;
            margin-right:10px;
            // background:pink;
          }
        }
      }
      .modelEditContent{
        @include size(95%,72%);
        border-left:1px solid rgba(255,255,255,0.1);
        border-right:1px solid rgba(255,255,255,0.1);
        margin:0 auto;
        .modelMeasures{
          @include size(100%,100%);
          color:#fff;
          font-size:14px;
          .refiel{
            @include size(100%,65%);
            .tiao{
              @include size(100%,1px);
              background: url('../../../assets/images/bt-bj.png') no-repeat center center;
            }
            .refielText{
              @include size(100%,30px);
              line-height: 30px;
              color:#0096ff;
              box-sizing:border-box;
              padding-left:10px;
            }
            &Content{
              @include size(100%,80%);
              display:flex;
              flex-direction:column;
              justify-content:space-between;
              box-sizing: border-box;
              padding-top:15px;
              &1{
                @include size(100%,30px);
                margin-left:5px;
                // 是否报警
                .itemAlarm{
                  @include size(10%,100%);
                  float: left;
                  line-height:30px;
                  font-size:12px;
                }
                &_item{
                  @include size(11%,100%);
                  float: left;
                  margin-right:2%;
                }
                .num{
                  background: rgba(255,255,255,0.1);
                  border-radius: 4px;
                }
                &_item:nth-child(2){
                  // @include size(155px,42px);
                  font-size: 12px;
                  line-height: 30px;
                  box-sizing:border-box;
                  padding-left: 8px;
                  color:rgba(255,255,255,0.7);
                  // background: rgba(255,255,255,0.1);
                }
                .addhao{
                  @include size(30px,30px);
                  background: #0096ff;
                  font-size: 48px;
                  text-align:center;
                  line-height: 30px;
                  float: left;
                  margin-right: 1%;
                  cursor: pointer;
                }
                .delhao{
                  @include size(30px,30px);
                  float: left;
                  background: #ff0000;
                  font-size: 48px;
                  text-align:center;
                  line-height: 24px;
                  cursor: pointer;
                }
              }
              &2{
                @include size(100%,30px);
                // background: pink;
                // margin-top:40px;
                .refielContent1_item{
                  color:#fff;
                  // background: none;
                  // background: #0096ff;
                  // background: rgba(255,255,255,0.1);
                }
                .value{
                  @include size(9%,30px);
                  float: left;
                  text-align: center;
                  line-height: 30px;
                  // background: #0096ff;
                  font-size: 12px;
                  // display: inline-block;
                }
              }
            }
          }
          .refielMethod1{
            @include size(100%,20%);
            // background: #0096ff;
            .tiao{
              @include size(100%,1px);
              background: url('../../../assets/images/bt-bj.png') no-repeat center center;
            }
            &Text{
              @include size(100%,30px);
              line-height: 30px;
              color:#0096ff;
              box-sizing:border-box;
              padding-left:10px;
            }
            &Content{
              @include size(80%,33px);
              box-sizing: border-box;
              padding:10px;
              &add{
                @include size(20%,25px);
                display: inline-block;
                background: rgba(255,255,255,0.1);
                box-sizing:border-box;
                padding-left:10px;
                color:#8e8e8e;
                line-height: 25px;
                font-size: 12px;
                float: left;
                margin-right:10px;
                div{
                  @include size(25px,25px);
                  background: #ff0000;
                  font-size: 24px;
                  text-align: center;
                  line-height: 25px;
                  color: #fff;
                  float: right;
                  cursor: pointer;
                }
              }
              &del{
                @include size(25%,25px);
                display: inline-block;
                background: rgba(255,255,255,0.1);
                box-sizing:border-box;
                padding-left:10px;
                color:#8e8e8e;
                line-height: 25px;
                font-size: 12px;
                float: left;
                div{
                  @include size(25px,25px);
                  background: #0096ff;
                  font-size: 24px;
                  text-align: center;
                  line-height: 25px;
                  color: #fff;
                  float: right;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      .tiao1{
        @include size(95%,1px);
        margin-left:2.4%;
        background: url('../../../assets/images/bt-bj.png') no-repeat center center;
      }
    }
    .editbj{
      background: url('../../../assets/images/edit.png') no-repeat center center !important;
      background-size: 100% 100%;
    }
}
@media only screen  and (min-width: 1377px) and (max-width: 1410px){
  .modelEdit{
    @include size(100%,100%);
    box-sizing:border-box;
    padding-top:30px;
    background: #1b203c;
    // 头部
    .modelEditTitle{
      @include size(100%,40px);
      font-size: 16px;
      color:#fff;
      margin-bottom: 10px;
      div{
        @include size(100%,100%);
        line-height: 40px;
        float: left;
        padding: 0px 28px;
        background: rgba(255,255,255,0.05);
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 4px;
        &:nth-child(1){
          @include size(150px,100%);
          color: #0096ff;
          background: none;
        }
        &:nth-child(2){
          @include size(200px,100%);
          font-size: 14px;
          padding-left:15px;
          color:#c2c3c4;
        }
      }
    }
    .modelEditData{
      @include size(100%,40px);
      font-size: 16px;
      margin-bottom: 10px;
      div{
        line-height: 23px;
        float: left;
        display: block;
        border-radius: 4px;
        &:nth-child(1){
          @include size(150px,100%);
          color: #0096ff;
          background: none;
          padding: 0px 28px;
          line-height: 40px;
        }
        &:nth-child(2){
          @include size(200px,100%);
          padding: 0px;
          margin-right: 18px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
        &:nth-child(3){
          @include size(200px,100%);
          padding: 0px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
      }
    }
    // 删除
    .delfactor{
      @include size(100%,10%);
      color: #fff;
      line-height:38px;
      font-size: 14px;
      text-align: center;
      box-sizing: border-box;
      padding:1.5% 10px;
      div{
        &:nth-child(1){
          @include size(10%,38px);
          background:#0096ff;
          border-radius: 4px;
          cursor: pointer;
          float: left;
          margin-left:2%;
        }
        &:nth-child(2){
          @include size(80px,38px);
          background:#0096ff;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right:20px;
        }
        &:nth-child(3){
          @include size(80px,38px);
          background: #c2c3c4;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right:10px;
          // background:pink;
        }
      }
    }
    .modelEditContent{
      @include size(95%,70%);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:16px;
        .refiel{
          @include size(100%,65%);
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          .refielText{
            @include size(100%,40px);
            line-height: 40px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
          }
          &Content{
            @include size(100%,80%);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            box-sizing: border-box;
            padding-top:15px;
            &1{
              @include size(100%,40px);
              margin-left:10px;
              // 是否报警
              .itemAlarm{
                @include size(10%,100%);
                float: left;
                line-height:40px;
                font-size:14px;
              }
              &_item{
                @include size(11%,100%);
                float: left;
                margin-right:2%;
              }
              .num{
                background: rgba(255,255,255,0.05);
                border-radius: 4px;
              }
              &_item:nth-child(2){
                font-size: 14px;
                line-height: 40px;
                box-sizing:border-box;
                padding-left: 8px;
                color:rgba(255,255,255,0.7);
              }
              .addhao{
                @include size(40px,40px);
                background: #0096ff;
                font-size: 48px;
                text-align:center;
                line-height: 40px;
                float: left;
                margin-right: 1%;
                cursor: pointer;
              }
              .delhao{
                @include size(40px,40px);
                float: left;
                background: #ff0000;
                font-size: 48px;
                text-align:center;
                line-height: 34px;
                cursor: pointer;
              }
            }
            &2{
              @include size(100%,40px);
              .refielContent1_item{
                color:#fff;
              }
              .value{
                @include size(9%,40px);
                float: left;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
              }
            }
          }
        }
        .refielMethod1{
          @include size(100%,20%);
          // background: #0096ff;
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          &Text{
            @include size(100%,40px);
            line-height: 40px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
          }
          &Content{
            @include size(80%,33px);
            box-sizing: border-box;
            padding:10px;
            &add{
              @include size(20%,35px);
              display: inline-block;
              background: rgba(255,255,255,0.1);
              box-sizing:border-box;
              padding-left:10px;
              color:#8e8e8e;
              line-height: 35px;
              font-size: 14px;
              float: left;
              margin-right:10px;
              div{
                @include size(35px,35px);
                background: #ff0000;
                font-size: 30px;
                text-align: center;
                line-height: 35px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
            &del{
              @include size(25%,35px);
              display: inline-block;
              background: rgba(255,255,255,0.1);
              box-sizing:border-box;
              padding-left:10px;
              color:#8e8e8e;
              line-height: 35px;
              font-size: 14px;
              float: left;
              div{
                @include size(35px,35px);
                background: #0096ff;
                font-size: 30px;
                text-align: center;
                line-height: 35px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .tiao1{
      @include size(95%,1px);
      margin-left:2.4%;
      background: url('../../../assets/images/bt-bj.png') no-repeat center center;
    }
  }
  .editbj{
    background: url('../../../assets/images/edit.png') no-repeat center center !important;
    background-size: 100% 100%;
  }
}
@media only screen  and (min-width: 1411px) and (max-width: 1930px){
  .modelEdit{
    @include size(100%,100%);
    box-sizing:border-box;
    padding-top:30px;
    background: #1b203c;
    // 头部风险因子
    .modelEditTitle{
      @include size(100%,40px);
      font-size: 18px;
      color:#fff;
      margin-bottom: 15px;
      div{
        @include size(100%,100%);
        line-height: 40px;
        float: left;
        padding: 0px 28px;
        background: rgba(255,255,255,0.05);
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 4px;
        &:nth-child(1){
          @include size(150px,100%);
          color: #0096ff;
          background: none;
        }
        &:nth-child(2){
          @include size(200px,100%);
          font-size:14px;
          padding-left:15px;
        }
      }
    }
    // 数据来源
    .modelEditData{
      @include size(100%,40px);
      font-size: 18px;
      margin-bottom: 15px;
      div{
        line-height: 23px;
        float: left;
        display: block;
        border-radius: 4px;
        &:nth-child(1){
          @include size(150px,100%);
          color: #0096ff;
          background: none;
          padding: 0px 28px;
          line-height:40px;
        }
        &:nth-child(2){
          @include size(200px,100%);
          padding: 0px;
          margin-right: 18px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
        &:nth-child(3){
          @include size(200px,100%);
          padding: 0px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
      }
    }
    // 删除
    .delfactor{
      @include size(100%,10%);
      color: #fff;
      line-height:42px;
      font-size: 16px;
      text-align: center;
      box-sizing: border-box;
      padding:1.5% 10px;
      div{
        line-height:35px;
        font-size:14px;
        cursor: pointer;
        border-radius: 4px;
        &:nth-child(1){
          @include size(10%,35px);
          background:#0096ff;
          float: left;
          margin-left:2%;
        }
        &:nth-child(2){
          @include size(70px,35px);
          background:#0096ff;
          float: right;
          margin-right:20px;
        }
        &:nth-child(3){
          @include size(70px,35px);
          background: #c2c3c4;
          float: right;
          margin-right:10px;
        }
      }
    }
    .modelEditContent{
      @include size(96%,70%);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        font-size:18px;
        .refiel{
          @include size(100%,65%);
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          .refielText{
            @include size(100%,50px);
            line-height: 50px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
          }
          &Content{
            @include size(100%,80%);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            box-sizing: border-box;
            padding-top:20px;
            &1{
              @include size(100%,40px);
              margin-left:15px;
              // 是否报警
              .itemAlarm{
                @include size(10%,100%);
                float: left;
                line-height:40px;
                font-size:16px;
              }
              &_item{
                @include size(11%,100%);
                float: left;
                margin-right:2%;
              }
              .num{
                background: rgba(255,255,255,0.05);
                border-radius: 4px;
              }
              &_item:nth-child(2){
                font-size: 16px;
                line-height: 40px;
                box-sizing:border-box;
                padding-left: 8px;
                color:rgba(255,255,255,0.7);
              }
              .addhao{
                @include size(40px,40px);
                background: #0096ff;
                font-size: 48px;
                text-align:center;
                line-height: 40px;
                float: left;
                margin-right: 1%;
                cursor: pointer;
              }
              .delhao{
                @include size(40px,40px);
                float: left;
                background: #ff0000;
                font-size: 48px;
                text-align:center;
                line-height: 34px;
                cursor: pointer;
              }
            }
            &2{
              @include size(100%,40px);
              .refielContent1_item{
                color:#fff;
              }
              .value{
                @include size(9%,40px);
                float: left;
                text-align: center;
                line-height: 40px;
                font-size: 14px;
              }
            }
          }
        }
        .refielMethod1{
          @include size(100%,20%);
          // background: #0096ff;
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          &Text{
            @include size(100%,50px);
            line-height: 50px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
          }
          &Content{
            @include size(80%,33px);
            box-sizing: border-box;
            padding:15px;
            &add{
              @include size(20%,40px);
              display: inline-block;
              background: rgba(255,255,255,0.1);
              box-sizing:border-box;
              padding-left:15px;
              color:#8e8e8e;
              line-height: 40px;
              font-size: 16px;
              float: left;
              margin-right:15px;
              div{
                @include size(40px,40px);
                background: #ff0000;
                font-size: 30px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
            &del{
              @include size(25%,40px);
              display: inline-block;
              background: rgba(255,255,255,0.05);
              box-sizing:border-box;
              padding-left:10px;
              color:#8e8e8e;
              line-height: 40px;
              font-size: 16px;
              float: left;
              div{
                @include size(40px,40px);
                background: #0096ff;
                font-size: 30px;
                text-align: center;
                line-height: 40px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .tiao1{
      @include size(95%,1px);
      margin-left:2.4%;
      background: url('../../../assets/images/bt-bj.png') no-repeat center center;
    }
  }
  .editbj{
    background: url('../../../assets/images/edit.png') no-repeat center center !important;
    background-size: 100% 100%;
  }
}
@media only screen  and (min-width: 1931px){
  .modelEdit{
    @include size(100%,100%);
    box-sizing:border-box;
    padding-top:30px;
    background: #1b203c;
    // 头部
    .modelEditTitle{
      @include size(94%,80px);
      font-size: 26px;
      color:#fff;
      margin:20px auto;
      div{
        @include size(100%,100%);
        line-height: 80px;
        float: left;
        padding: 0 28px;
        background: rgba(255,255,255,0.05);
        cursor: pointer;
        margin-bottom: 10px;
        border-radius: 4px;
        &:nth-child(1){
          @include size(200px,100%);
          color: #0096ff;
          background: none;
        }
        &:nth-child(2){
          @include size(300px,100%);
        }
      }
    }
    .modelEditData{
      font-size: 24px;
      margin-bottom: 15px;
      @include size(94%,80px);
      margin:0 auto;
      div{
        line-height: 23px;
        float: left;
        display: block;
        border-radius: 4px;
        line-height:60px;
        &:nth-child(1){
          @include size(200px,100%);
          color: #0096ff;
          background: none;
          padding: 0px 28px;
          line-height: 80px;
        }
        &:nth-child(2){
          @include size(300px,100%);
          padding: 0px;
          margin-right: 18px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
        &:nth-child(3){
          @include size(300px,100%);
          padding: 0px;
          div{
            @include size(100%,100%);
            padding-left:0;
            padding-right:0;
          }
        }
      }
    }
    // 删除
    .delfactor{
      @include size(100%,10%);
      color: #fff;
      line-height:60px;
      font-size: 26px;
      text-align: center;
      box-sizing: border-box;
      padding:1.5% 10px;
      div{
        &:nth-child(1){
          @include size(10%,60px);
          background:#0096ff;
          border-radius: 4px;
          cursor: pointer;
          float: left;
          margin-left:2%;
        }
        &:nth-child(2){
          @include size(130px,60px);
          background:#0096ff;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right:20px;
        }
        &:nth-child(3){
          @include size(130px,60px);
          background: #c2c3c4;
          border-radius: 4px;
          cursor: pointer;
          float: right;
          margin-right:10px;
        }
      }
    }
    .modelEditContent{
      @include size(92%,70%);
      border-left:1px solid rgba(255,255,255,0.1);
      border-right:1px solid rgba(255,255,255,0.1);
      margin:0 auto;
      .modelMeasures{
        @include size(100%,100%);
        color:#fff;
        // 评分标准
        .refiel{
          @include size(100%,70%);
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          .refielText{
            @include size(100%,80px);
            line-height: 80px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
            font-size:26px;
          }
          &Content{
            @include size(100%,80%);
            display:flex;
            flex-direction:column;
            justify-content:space-between;
            box-sizing: border-box;
            padding-top:20px;
            &1{
              @include size(100%,80px);
              margin-left:15px;
              // 是否报警
              .itemAlarm{
                @include size(10%,100%);
                float: left;
                font-size:24px;
                line-height:80px;
                text-align:center;
              }
              &_item{
                @include size(11%,100%);
                float: left;
                margin-right:2%;
              }
              .num{
                background: rgba(255,255,255,0.1);
                border-radius: 4px;
              }
              &_item:nth-child(2){
                font-size: 26px;
                line-height: 40px;
                box-sizing:border-box;
                padding-left: 8px;
                color:rgba(255,255,255,0.7);
                line-height:80px;
                text-align:center;
              }
              .addhao{
                @include size(60px,60px);
                background: #0096ff;
                font-size: 60px;
                text-align:center;
                line-height: 60px;
                float: left;
                margin-right: 1%;
                cursor: pointer;
              }
              .delhao{
                @include size(60px,60px);
                float: left;
                background: #ff0000;
                font-size: 60px;
                text-align:center;
                line-height: 45px;
                cursor: pointer;
              }
            }
            &2{
              @include size(100%,80px);
              .refielContent1_item{
                color:#fff;
              }
              .value{
                @include size(9%,80px);
                float: left;
                text-align: center;
                line-height: 80px;
                font-size: 24px;
              }
            }
          }
        }
        // 缓解措施
        .refielMethod1{
          @include size(100%,20%);
          .tiao{
            @include size(100%,1px);
            background: url('../../../assets/images/bt-bj.png') no-repeat center center;
          }
          &Text{
            @include size(100%,80px);
            line-height: 80px;
            color:#0096ff;
            box-sizing:border-box;
            padding-left:10px;
            font-size: 26px;
          }
          &Content{
            @include size(80%,60px);
            box-sizing: border-box;
            padding:15px;
            &add{
              @include size(20%,60px);
              display: inline-block;
              background: rgba(255,255,255,0.1);
              box-sizing:border-box;
              padding-left:15px;
              color:#8e8e8e;
              line-height: 60px;
              font-size: 20px;
              float: left;
              margin-right:15px;
              div{
                @include size(60px,60px);
                background: #ff0000;
                font-size: 80px;
                text-align: center;
                line-height: 50px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
            &del{
              @include size(25%,60px);
              display: inline-block;
              background: rgba(255,255,255,0.1);
              box-sizing:border-box;
              padding-left:10px;
              color:#8e8e8e;
              line-height: 60px;
              font-size: 20px;
              float: left;
              div{
                @include size(60px,60px);
                background: #0096ff;
                font-size: 80px;
                text-align: center;
                line-height: 60px;
                color: #fff;
                float: right;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
    .tiao1{
      @include size(95%,1px);
      margin-left:2.4%;
      background: url('../../../assets/images/bt-bj.png') no-repeat center center;
    }
  }
  .editbj{
    background: url('../../../assets/images/edit.png') no-repeat center center !important;
    background-size: 100% 100%;
  }
}
@media  only screen  and (max-width: 1376px){
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
    height:30px;
  }
}
</style>
