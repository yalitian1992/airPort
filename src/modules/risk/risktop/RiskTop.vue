<template>
  <!-- eslint-disable   -->
  <div class="rotateTop">
    <table></table>
    <div class="rotate_title" style="position: fixed;margin-top: 3em;">
      <div :class="{Titlebj:TitleKey === 2}" @mouseover="treeHoverStatus=true" @mouseout="treeHoverStatus=false" style="position: relative;">
        <span @click="selectTitle(3)">树视图</span>
        <ul class="selectBox" :class="{block:treeHoverStatus}">
          <li @click="selectTitle(3)" :class="{active:viewStatus===3?true:false}">管理结构</li>
          <li @click="selectTitle(4)" :class="{active:viewStatus===4?true:false}">风险结构</li>
        </ul>
      </div>
      <div :class="{Titlebj:TitleKey !== 2}" @mouseover="circleHoverStatus=true" @mouseout="circleHoverStatus=false" style="position: relative;">
        <span @click="selectTitle(0)">环视图</span>
        <ul class="selectBox"  :class="{block:circleHoverStatus}">
          <li @click="selectTitle(0)" :class="{active:viewStatus===0?true:false}">管理结构</li>
          <li @click="selectTitle(1)" :class="{active:viewStatus===1?true:false}">风险结构</li>
        </ul></div>

    </div>

    <!-- 1. 拓扑图展示 -->
    <!--<div class="treeView"   >-->
      <div class="rotateBox"
           ref="rotateBox"
           v-show="!viewShow"
         >
        <!-- 第三圈 -->
        <div class="rotateBox_three"
             ref="three">
          <ul class="rotateBox_three_box">
            <li v-for="(item,index) in threeData1"
                :key="index"
                :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                @click="threeClick(item,index)"
                v-if="TitleKey === 0  "
                @mousemove="onMousemoveTooltip2($event,item)"
                @mouseleave="onMouseleaveTooltip2($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
            <li v-for="(item,index) in threeData1"
                :key="index"
                :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                @click="threeClick(item,index)"
                v-if="TitleKey === 1"
                @dblclick="threeClickModel(item,index)"
                @mousemove="onMousemoveTooltip3($event,item,3)"
                @mouseleave="onMouseleaveTooltip3($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
          </ul>
        </div>
        <!-- 第二圈 -->
        <div class="rotateBox_second"
             ref="second">
          <ul class="rotateBox_second_box"
              id="secondUL">
            <li v-for="(item,index) in secondList"
                :key="index"
                :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                @click="secondClick(item,index)"
                v-if="TitleKey === 0  "
                @dblclick="secondClickModel(item,index)"
                @mousemove="onMousemoveTooltip3($event,item,2)"
                @mouseleave="onMouseleaveTooltip3($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
            <li v-for="(item,index) in secondList"
                :key="index"
                :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                @click="secondClick(item,index)"
                v-if="TitleKey === 1"
                @dblclick="secondClickModel(item,index)"
                @mousemove="onMousemoveTooltip3($event,item,2)"
                @mouseleave="onMouseleaveTooltip3($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
          </ul>
        </div>
        <!-- 第一圈 -->
        <div class="rotateBox_content"
             ref="content">
          <ul class="rotateBox_content_main">
            <li :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                v-for="(item,index) in StairList"
                v-if="TitleKey === 0"
                :key="index"
                @click="firstClick(item,index)"
                @dblclick="firstClickModel(item,index)"
                @mousemove="onMousemoveTooltip3($event,item,1)"
                @mouseleave="onMouseleaveTooltip3($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
            <li :class="(item.value<=3&&item.value>0)?'activeBlue':(item.value<=6&&item.value>3?'activeYellow':(item.value<=9&&item.value>6?'activeOrange':(item.value<=10&&item.value>9?'activeRed':'')))"
                v-for="(item,index) in StairList"
                v-if="TitleKey === 1"
                :key="index"
                @click="firstClick(item,index)"
                @mousemove="onMousemoveTooltip2($event,item)"
                @mouseleave="onMouseleaveTooltip2($event)">
              <div><span>{{item.name}}</span></div>
              <div>{{item.value}}</div>
            </li>
          </ul>
        </div>
        <!-- 中间部分 -->
        <div class="rotateBox_center"
             @click="rootClick"
             @mousemove="onMousemoveTooltip1($event)"
             @mouseleave="onMouseleaveTooltip1()"
             :class="centerNumber<=3&&centerNumber>0?'BgCenterBlue':(centerNumber<=6&&centerNumber>3?'BgCenterYellow':(centerNumber<=9&&centerNumber>6?'BgCenterOrange':(centerNumber<=10&&centerNumber>9?'BgCenterRed':'')))">
          <!--<p :class="centerNumber<=3&&centerNumber>0?'CenterBlue':(centerNumber<=6&&centerNumber>3?'CenterYellow':(centerNumber<=9&&centerNumber>6?'CenterOrange':(centerNumber<=10&&centerNumber>9?'CenterRed':'')))">{{centerNumber}}</p>
          <span :class="centerNumber<=3&&centerNumber>0?'CenterBlue':(centerNumber<=6&&centerNumber>3?'CenterYellow':(centerNumber<=9&&centerNumber>6?'CenterOrange':(centerNumber<=10&&centerNumber>9?'CenterRed':'')))">BCIA</span>-->
          <p>{{centerNumber}}</p>
          <span>BCIA</span>
        </div>
      </div>
    <!--</div>-->


    <!-- 2. 树图展示 -->
    <div class="treeView"
         v-if="viewShow">
      <Tree ref="rTree"></Tree>
    </div>

    <!-- 移入显示详细内容 -->
    <!-- 可以跳转的tooltip -->
      <div class="tooltip3"
           @mousemove="mouseMoveTanBox()"
           @mouseleave="mouseLeaveTanBox()"
           :style="{top:tooltipTop+'px',left:tooltipLeft+'px'}"
           v-show="isShowTooltip3 || tanBoxShow">
      <div class="name">{{toolTip3Name}}</div>
      <div class="jump"
           @dblclick="jumpDetail()">双击该图标进入详情页</div>
      <div class="clearfix"
           :class="toolTip3Number<=3&&toolTip3Number>0?'tooltip3CenterBlue':(toolTip3Number<=6&&toolTip3Number>3?'tooltip3CenterYellow':(toolTip3Number<=9&&toolTip3Number>6?'tooltip3CenterOrange':(toolTip3Number<=10&&toolTip3Number>9?'tooltip3CenterRed':'')))">
        <div class="box fl"></div>
        <div class=" fl ">{{toolTip3Number}}分</div>
        <div class="fl"
             v-if="toolTip3Number<=3 && toolTip3Number>0">(良好)</div>
        <div class="fl"
             v-if="toolTip3Number<=6&&toolTip3Number>3">(需关注)</div>
        <div class="fl"
             v-if="toolTip3Number<=9&&toolTip3Number>6">(高风险)</div>
        <div class="fl"
             v-if="toolTip3Number<=10&&toolTip3Number>9">(击穿风险)</div>
      </div>
      <div class="currentWarning">
        <div class="box"></div>当前报警：{{alarmcount}}个
      </div>
    </div>
    <!-- 不可以跳转的tooltip -->
    <div class="tooltip2"
         :style="{top:tooltipTop+'px',left:tooltipLeft+'px'}"
         v-show="isShowTooltip2">
      <div class="name">{{toolTip2Name}}</div>
      <div class="clearfix"
           :class="toolTip2Number<=3&&toolTip2Number>0?'tooltip2CenterBlue':(toolTip2Number<=6&&toolTip2Number>3?'tooltip2CenterYellow':(toolTip2Number<=9&&toolTip2Number>6?'tooltip2CenterOrange':(toolTip2Number<=10&&toolTip2Number>9?'tooltip2CenterRed':'')))">
        <div class="box fl"></div>
        <div class=" fl ">{{toolTip2Number}}分</div>
        <div class="fl"
             v-if="toolTip2Number<=3 && toolTip2Number>0">(良好)</div>
        <div class="fl"
             v-if="toolTip2Number<=6&&toolTip2Number>3">(需关注)</div>
        <div class="fl"
             v-if="toolTip2Number<=9&&toolTip2Number>6">(高风险)</div>
        <div class="fl"
             v-if="toolTip2Number<=10&&toolTip2Number>9">(击穿风险)</div>
      </div>
      <div class="currentWarning">
        <div class="box"></div>当前报警：{{alarmcount}}个
      </div>
    </div>
    <!-- 中间大圆的tooltip -->
    <div class="tooltip1"
         :style="{top:tooltipTop+'px',left:tooltipLeft+'px'}"
         v-show="isShowTooltip1">
      <div class="name">首都机场：{{centerNumber}}分</div>
      <div class="clearfix"
           :class="centerNumber<=3&&centerNumber>0?'tooltip1CenterBlue':(centerNumber<=6&&centerNumber>3?'tooltip1CenterYellow':(centerNumber<=9&&centerNumber>6?'tooltip1CenterOrange':(centerNumber<=10&&centerNumber>9?'tooltip1CenterRed':'')))">
        <div class="box fl"></div>
        <div class=" fl ">风险等级：</div>
        <div class="fl"
             v-if="centerNumber<=3 && centerNumber>0">(良好)</div>
        <div class="fl"
             v-if="centerNumber<=6&&centerNumber>3">(需关注)</div>
        <div class="fl"
             v-if="centerNumber<=9&&centerNumber>6">(高风险)</div>
        <div class="fl"
             v-if="centerNumber<=10&&centerNumber>9">(击穿风险)</div>
      </div>
      <div class="currentWarning">
        <div class="box"></div>当前报警：{{ceteralarmcount}}个
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState, mapMutations, mapActions } from "vuex";
import Tree from "../Tree/Tree.vue";
// import  manageData  from  "../../../../../../../../1111.json"
export default {
  components: {
    Tree
  },
  data() {
    return {
      tooltipJumpTreeId: "",
      tooltipJumpName: "",
      tooltipJumpValue: "",
      tanBoxShow: false,
      toolTip3Number: "",
      toolTip3Name: "",
      toolTip3dbclickName: "",
      toolTip2Number: "",
      toolTip2Name: "",
      TitleKey: 2,
      isShowTooltip1: false,
      isShowTooltip2: false,
      isShowTooltip3: false,
      tooltipTop: 0,
      tooltipLeft: 0,
      twocontenNum: null,
      threecontenNum: null,
      //点击第一层的第几个
      firstIndex: 0,
      //有第二层的时候，第二层的状态
      isShowSecond: false,
      // 只有第三层的时候，第三层的状态
      isShowThree: false,
      threeData: [
        {
          url: require("../../../assets/images/icon-01.png")
        },
        {
          url: require("../../../assets/images/icon-02.png")
        },
        {
          url: require("../../../assets/images/icon-03.png")
        },
        {
          url: require("../../../assets/images/icon-04.png")
        },
        {
          url: require("../../../assets/images/icon-05.png")
        },
        {
          url: require("../../../assets/images/icon-06.png")
        },
        {
          url: require("../../../assets/images/icon-07.png")
        },
        {
          url: require("../../../assets/images/icon-08.png")
        }
      ],
      fullHeight: document.documentElement.clientHeight,
      screenWidth: document.body.clientWidth,
      angle: null,
      centerNumber: null,
      //第一层数据
      StairList: null,
      //第二层数据
      secondList: null,
      //第三层数据
      threeData1: null,
      num: null,
      rotateAngle: null,
      treeIdTop: "",
      //点击第一层的第几个
      firstClickIndex: 0,
      //点击第二层的第几个
      secondClickIndex: null,
      indexTwo: null,
      //点击第三层的第几个
      threeClickIndex: null,
      //点击的是第几层
      clickIndex: 1,
      //点击第二层，判断第三层是否显示
      isSecondThreeShow: false,
      timer: null,
      name: "",
      //点击第一层的name
      firstName: "",
      //点击第二层的name
      secondName: "",
      //预警个数
      alarmcount: null,
      //中间的预警个数
      ceteralarmcount: null,
      // 拓扑图及树图切换显示状态
      viewShow: true,
      treeHoverStatus:false,
      circleHoverStatus:false,
      viewStatus:3
    };
  },
  created() {
    this.getManageData();
    this.getRiskViewData();
  },
  computed: {
    ...mapState("RiskStore", [
      "manageData",
      "riskViewData",
      "treeId",
      "indexData",
      "riskfactoryrankConData",
      "RiskSafeCurve",
      "RiskData"
    ]),
    getparams() {
      return JSON.stringify({
        modelType: String(this.indexData),
        treeId: String(this.treeId)
      });
    }
  },
  methods: {
    ...mapMutations("RiskStore", ["setTreeId", "setIndexData"]),
    ...mapActions("RiskStore", [
      "getManageData",
      "getRiskViewData",
      "getRiskFactor",
      "getRiskSafeCurve",
      "getRiskData",
      "getRiskDataDetail",
      "getRiskfactorCount",
      "getRiskTopDetailSafeCurve",
      "getRiskDetailFactor"
    ]),
    watchJsonData(val) {
      if (val && val.length > 0 && val[0]) {
        if (this.$refs.second) this.$refs.second.style.opacity = 0;
        // this.twocontenNum =
        //   val[0].children[0].children[parseInt(val.length / 2)] &&
        //   val[0].children[0].children[parseInt(val.length / 2)].value;

        // this.threecontenNum =
        //   val &&
        //   val[0] &&
        //   val[0].children &&
        //   val[0].children[0] &&
        //   val[0].children[0].children &&
        //   val[0].children[0].children[0] &&
        //   val[0].children[0].children[0].children  &&
        // val[0].children[0].children[0].children[Math.ceil(val.length / 2)] &&
        //   val[0].children[0].children[0].children[Math.ceil(val.length / 2)]
        //     .value;

        this.centerNumber = val[0].value;
        this.ceteralarmcount = val[0].alarmcount;
        this.StairList = val[0].children;

        // this.threeData1 = val[0].children[0].children[0].children;

        this.num = val[0].count;
        this.angle = ((360 / this.num) * 2 * Math.PI) / 360;
        this.rotateAngle = 360 / this.num;
        this.firstRotate();
      }
    },
    watchtreeId(val) {
      this.treeIdTop = val;
      this.setTreeId(val);
      this.getRiskFactor(this.getparams);
      this.getRiskSafeCurve(this.getparams);
      this.getRiskData(this.getparams);
    },
    rootClick(){
      if(this.viewStatus===0){
        this.selectTitle(0)
      }
      if(this.viewStatus===1){
        this.selectTitle(1)
      }
    },
    firstClick(item, index) {
      console.log(111)
      this.clickIndex = 1; //点击的是第一层
      this.firstName = item.name;
      this.firstIndex = index; //点击的是第一层第几个
      this.isShowTooltip = false; // tooltip  不显示
      this.treeIdTop = item && item.id; //  点击的第一层的圆圈代表的treeId
      this.setTreeId(item && item.id); //  点击的第一层的圆圈代表的treeId
      var tempindex = parseInt(
        item &&
          item.children &&
          item.children.length &&
          item.children.length / 2
      );
      let length =
        item && item.children && item.children.length && item.children.length;
      for (var i = 0; i < length; i++) {
        var childName =
          item && item.children && item.children[i] && item.children[i].dept;

        if (childName === "FA") {
          tempindex = i;
          break;
        }
      }
      this.secondClickIndex = tempindex;
      this.indexTwo = tempindex;

      //第二层默认的是第几个
      //  要么  第二层  为  true    ||  ||  第二层 和 第三层  都为  true
      //  点击的时候scale(0), this.isShowSecond  = false

      // 当 this.isShowSecond  为  false   ||   ||  第二层 和 第三层   都为false   的时候  ，
      //点击的时候scale(1), this.isShowSecond  = true

      //如果第二层有东西

      if (item.count !== 0) {
        this.secondList = item && item.children;
        //  有第二层  ，第二层  或者  第三层 会 出现
        //当点击的还是这一个圆圈
        if (this.firstClickIndex == index) {
          //为true的时候  第二层和第三层都消失
          if (this.isShowSecond || this.isSecondThreeShow) {
            if (this.$refs.second) this.$refs.second.style.opacity = 0;
            if (this.$refs.second)
              this.$refs.second.style.transform = 'rotate(' + index *
                this.rotateAngle + 'deg) scale(0)';
            this.$refs.second.style.msTransform = 'rotate(' + index *
              this.rotateAngle + 'deg) scale(0)';
            this.isShowSecond = false;
            if (this.$refs.three) this.$refs.three.style.transform = 'scale(0)';
            if (this.$refs.three)
              this.$refs.three.style.msTransform = 'scale(0)';

            this.isSecondThreeShow = false;
          } else {
            //为false的时候 第二层出现
            //第二层的所有的li
            //  this.twocontenNum   点击第一层的某个之后，第二层的内容的选中的样式的默认是中间的一个，该内容存储的是第一层点击的时候，第二层选中带颜色的是第几个
            this.twocontenNum = item && item.children[tempindex].value;
            if (this.$refs.second) {
              this.$refs.second.style.opacity = 1;
              this.$refs.second.style.transform = 'rotate(' + index *
                this.rotateAngle + 'deg)  scale(1)';
              this.$refs.second.style.msTransform = 'rotate(' + index *
                this.rotateAngle + 'deg)  scale(1)';
            }
            if (this.$refs.three) this.$refs.three.style.transform = 'scale(0)';
            if (this.$refs.three)
              this.$refs.three.style.msTransform = 'scale(0)';
            this.isShowSecond = true;
            this.isSecondThreeShow = false;

            this.secondLiTransfer(tempindex);
            this.secondRotate(index); //第二层旋转
          }
        } else {
          //当点击的不再是这个的时候
          //为false的时候 第二层出现
          //第二层的所有的li

          //  this.twocontenNum     value的值
          this.twocontenNum = item && item.children[tempindex].value;
          if (this.$refs.second) {
            console.log(222)
            this.$refs.second.style.opacity = 1;

            this.$refs.second.style.transform = 'rotate(' + index *
            this.rotateAngle + 'deg) scale(1)';
            this.$refs.second.style.msTransform = 'rotate(' + index *
            this.rotateAngle + 'deg) scale(1)';

            // this.$refs.second.style.transform = `rotate(${index *
            //   this.rotateAngle}deg) scale(1)`;
            // this.$refs.second.style.msTransform = `rotate(${index *
            //   this.rotateAngle}deg) scale(1)`;
          }
          if (this.$refs.three) this.$refs.three.style.transform = 'scale(0)';
          if (this.$refs.three) this.$refs.three.style.msTransform = 'scale(0)';
          this.isShowSecond = true;
          this.isSecondThreeShow = false;
          this.secondLiTransfer(tempindex);
          this.secondRotate(index); //第二层旋转
        }
      } else {
        if (this.$refs.second) this.$refs.second.style.opacity = 0;
        if (this.$refs.second)
          this.$refs.second.style.transform = 'rotate(' + index *
            this.rotateAngle + 'deg) scale(0)';
        this.$refs.second.style.msTransform = 'rotate(' + index *
          this.rotateAngle + 'deg) scale(0)';
        let threeCenterBigindex = parseInt(
          item &&
            item.children &&
            item.children[0] &&
            item.children[0].children &&
            item.children[0].children.length / 2
        );

        let threeCenterBigValue =
          item &&
          item.children &&
          item.children[0] &&
          item.children[0].children[threeCenterBigindex].value;

        //  只有第三层
        //当点击的还是这一个圆圈
        if (this.firstClickIndex == index) {
          //为true的时候 第三层消失
          if (this.isShowThree) {
            if (this.$refs.three) {
              this.$refs.three.style.opacity = 0;
              this.$refs.three.style.transform = 'scale(0)';
              this.$refs.three.style.msTransform = 'scale(0)';
            }
            this.isShowThree = false;
          } else {
            //为false的时候 第三层出现
            if (this.$refs.three) {
              this.$refs.three.style.opacity = 1;
              this.$refs.three.style.transform = 'scale(1)';
              this.$refs.three.style.msTransform = 'scale(1)';
            }
            this.isShowThree = true;
            this.$nextTick(() => {
              let ThreeUl =
                this.$refs.three &&
                this.$refs.three.getElementsByTagName("ul")[0];
              if (threeCenterBigValue <= 3 && threeCenterBigValue > 0) {
                ThreeUl.setAttribute("class", "threeBigGreen");
              } else if (threeCenterBigValue <= 6 && threeCenterBigValue > 3) {
                ThreeUl.setAttribute("class", "threeBigYellow");
              } else if (threeCenterBigValue <= 9 && threeCenterBigValue > 6) {
                ThreeUl.setAttribute("class", "threeBigOrange");
              } else if (threeCenterBigValue <= 10 && threeCenterBigValue > 9) {
                ThreeUl.setAttribute("class", "threeBigRed");
              }
            });
          }
        } else {
          //当点击的不再是这个的时候
          if (this.$refs.three) {
            this.$refs.three.style.opacity = 1;
            this.$refs.three.style.transform = 'scale(1)';
            this.$refs.three.style.msTransform = 'scale(1)';
          }

          this.isShowThree = true;
          this.$nextTick(() => {
            let ThreeUl =
              this.$refs.three &&
              this.$refs.three.getElementsByTagName("ul")[0];
            if (threeCenterBigValue <= 3 && threeCenterBigValue > 0) {
              ThreeUl.setAttribute("class", "threeBigGreen");
            } else if (threeCenterBigValue <= 6 && threeCenterBigValue > 3) {
              ThreeUl.setAttribute("class", "threeBigYellow");
            } else if (threeCenterBigValue <= 9 && threeCenterBigValue > 6) {
              ThreeUl.setAttribute("class", "threeBigOrange");
            } else if (threeCenterBigValue <= 10 && threeCenterBigValue > 9) {
              ThreeUl.setAttribute("class", "threeBigRed");
            }
          });
        }

        if (this.$refs.three)
          this.$refs.three.getElementsByTagName(
            "ul"
          )[0].style.transform = 'rotate(' + this.firstIndex *
            this.rotateAngle + 'deg)';
        if (this.$refs.three)
          this.$refs.three.getElementsByTagName(
            "ul"
          )[0].style.msTransform = 'rotate(' + this.firstIndex *
            this.rotateAngle + 'deg)';
        this.threeData1 =
          item &&
          item.children &&
          item.children[0] &&
          item.children[0].children;

        this.threeLiTransfer(
          parseInt(this.threeData1 && this.threeData1.length / 2)
        );
      }

      this.firstClickIndex = index; //点击的是第一层第几个
    },
    secondClick(item, index) {
      this.clickIndex = 2;
      this.indexTwo = index;
      this.secondName = item.name;
      this.treeIdTop = item && item.id;
      this.setTreeId(item && item.id);

      this.$nextTick(() => {
        this.secondLiTransfer(index);

        if (item.children.length !== 0) { // 修改部分
          this.threecontenNum =
            item.children[parseInt(item.children.length / 2)].value;
          this.isShowTooltip = false;
          this.threeData1 = item.children;
        } else {
          this.threeData1 = {}
        }
        let threeCenterindex = parseInt(
          this.threeData1 && this.threeData1.length / 2
        );
        let threeCenterValue =
          this.threeData1 &&
          this.threeData1[threeCenterindex] &&
          this.threeData1[threeCenterindex].value;
        this.threeLiTransfer(
          parseInt(this.threeData1 && this.threeData1.length / 2)
        );

        if (this.$refs.second) {
          this.$refs.second.style.opacity = 1;
          this.$refs.second.style.transform = 'rotate(' + this.firstIndex *
            this.rotateAngle + 'deg) scale(0.85)';
          this.$refs.second.style.msTransform = 'rotate(' + this.firstIndex *
            this.rotateAngle + 'deg) scale(0.85)';
          this.$nextTick(() => {
            let secondLiDom =
              this.$refs.second &&
              this.$refs.second
                .getElementsByTagName("ul")[0]
                .getElementsByTagName("li");
            if (secondLiDom) {
              for (let i = 0; i < secondLiDom.length; i++) {
                secondLiDom[i].style.opacity = 1;
                secondLiDom[i].style.transform = 'rotate(-' + this.firstIndex *
                  this.rotateAngle + 'deg)';
                secondLiDom[i].style.msTransform = 'rotate(-' + this.firstIndex *
                  this.rotateAngle + 'deg)';
              }
            }
          });
        }

        /**
         * 当点击第二层的时候，如果第三层没有显示，就显示第三层
         * 如果第三层显示，就让第三层消失
         */
        //点击的还是这个圆圈
        if (this.secondClickIndex == index) {
          //点击的是默认的
          // 为true的时候  第三层消失
          if (this.isSecondThreeShow) {
            if (this.$refs.three) {
              this.$refs.three.style.opacity = 0;
              this.$refs.three.style.transform = 'scale(0)';
              this.$refs.three.style.msTransform = 'scale(0)';
            }

            this.isSecondThreeShow = false;
          } else {
            //为false的时候 第三层出现

            if (this.$refs.three) {
              this.$refs.three.style.opacity = 1;
              this.$refs.three.style.transform = 'scale(1)';
              this.$refs.three.style.msTransform = 'scale(1)';
            }

            this.isSecondThreeShow = true;
            this.$nextTick(() => {
              let ThreeUl =
                this.$refs.three &&
                this.$refs.three.getElementsByTagName("ul")[0];
              if (threeCenterValue <= 3 && threeCenterValue > 0) {
                ThreeUl && ThreeUl.setAttribute("class", "threeGreen");
              } else if (threeCenterValue <= 6 && threeCenterValue > 3) {
                ThreeUl && ThreeUl.setAttribute("class", "threeYellow");
              } else if (threeCenterValue <= 9 && threeCenterValue > 6) {
                ThreeUl && ThreeUl.setAttribute("class", "threeOrange");
              } else if (threeCenterValue <= 10 && threeCenterValue > 9) {
                ThreeUl && ThreeUl.setAttribute("class", "threeRed");
              }
            });
          }
        } else {
          //当点击的不再是这个的时候
          if (this.$refs.three) {
            this.$refs.three.style.opacity = 1;
            this.$refs.three.style.transform = 'scale(1)';
            this.$refs.three.style.msTransform = 'scale(1)';
          }

          this.isSecondThreeShow = true;
          this.$nextTick(() => {
            let ThreeUl =
              this.$refs.three &&
              this.$refs.three.getElementsByTagName("ul")[0];

            if (threeCenterValue <= 3 && threeCenterValue > 0) {
              ThreeUl && ThreeUl.setAttribute("class", "threeGreen");
            } else if (threeCenterValue <= 6 && threeCenterValue > 3) {
              ThreeUl && ThreeUl.setAttribute("class", "threeYellow");
            } else if (threeCenterValue <= 9 && threeCenterValue > 6) {
              ThreeUl && ThreeUl.setAttribute("class", "threeOrange");
            } else if (threeCenterValue <= 10 && threeCenterValue > 9) {
              ThreeUl && ThreeUl.setAttribute("class", "threeRed");
            }
          });
        }
        this.secondClickIndex = index;

        if (this.$refs.three)
          this.$refs.three.getElementsByTagName(
            "ul"
          )[0].style.transform = 'rotate(' + this.firstIndex *
            this.rotateAngle + 'deg)';
        this.$refs.three.getElementsByTagName(
          "ul"
        )[0].style.msTransform = 'rotate(' + this.firstIndex *
          this.rotateAngle + 'deg)';
      });
    },
    threeClick(item, index) {
      this.clickIndex = 3;
      this.treeIdTop = item && item.id;
      this.setTreeId(item && item.id);
      this.threeClickIndex = index;

      this.threeLiTransfer(index);

      this.threecontenNum = item.value;
      let threeCenterBigindex = parseInt(
        this.threeData1 && this.threeData1.length / 2
      );
      let threeCenterBigValue =
        this.threeData1 &&
        this.threeData1[threeCenterBigindex] &&
        this.threeData1[threeCenterBigindex].value;
      let count = this.StairList[this.firstClickIndex].count;

      if (count !== 0) {
        // 有第二层，点击第三层
        this.$nextTick(() => {
          let threeLiDom = this.$refs.three
            .getElementsByTagName("ul")[0]
            .getElementsByTagName("li");
          if (this.threecontenNum <= 3 && this.threecontenNum > 0) {
            threeLiDom[index].setAttribute("class", "activeBlue");
          } else if (this.threecontenNum <= 6 && this.threecontenNum > 3) {
            threeLiDom[index].setAttribute("class", "activeYellow");
          } else if (this.threecontenNum <= 9 && this.threecontenNum > 6) {
            threeLiDom[index].setAttribute("class", "activeOrange");
          } else if (this.threecontenNum <= 10 && this.threecontenNum > 9) {
            threeLiDom[index].setAttribute("class", "activeRed");
          } else {
            threeLiDom[index].setAttribute("class", "");
          }
          let threeCenterValue = item.value;
          this.$nextTick(() => {
            let ThreeUl =
              this.$refs.three &&
              this.$refs.three.getElementsByTagName("ul")[0];
            if (threeCenterValue <= 3 && threeCenterValue > 0) {
              ThreeUl.setAttribute("class", "threeGreen");
            } else if (threeCenterValue <= 6 && threeCenterValue > 3) {
              ThreeUl.setAttribute("class", "threeYellow");
            } else if (threeCenterValue <= 9 && threeCenterValue > 6) {
              ThreeUl.setAttribute("class", "threeOrange");
            } else if (threeCenterValue <= 10 && threeCenterValue > 9) {
              ThreeUl.setAttribute("class", "threeRed");
            }
          });
        });
      } else {
        this.$nextTick(() => {
          let ThreeUl =
            this.$refs.three && this.$refs.three.getElementsByTagName("ul")[0];
          if (threeCenterBigValue <= 3 && threeCenterBigValue > 0) {
            ThreeUl.setAttribute("class", "threeBigGreen");
          } else if (threeCenterBigValue <= 6 && threeCenterBigValue > 3) {
            ThreeUl.setAttribute("class", "threeBigYellow");
          } else if (threeCenterBigValue <= 9 && threeCenterBigValue > 6) {
            ThreeUl.setAttribute("class", "threeBigOrange");
          } else if (threeCenterBigValue <= 10 && threeCenterBigValue > 9) {
            ThreeUl.setAttribute("class", "threeBigRed");
          }
        });
      }
    },
    firstRotate(index) {
      this.$nextTick(() => {
        let firstLiDom =
          this.$refs.content &&
          this.$refs.content
            .getElementsByTagName("ul")[0]
            .getElementsByTagName("li");
        setTimeout(() => {
          if (firstLiDom) {
            for (let i = 0; i < firstLiDom.length; i++) {
              firstLiDom[i].style.top =
                190 - Math.cos(this.angle * i) * 190 + "px";
              firstLiDom[i].style.left =
                Math.sin(this.angle * i) * 190 + 190 - 7 + "px";
            }
          }
        }, 1);
      });
    },
    secondRotate(index) {
      this.$nextTick(() => {
        let secondLiDom =
          this.$refs.second &&
          this.$refs.second
            .getElementsByTagName("ul")[0]
            .getElementsByTagName("li");

        let angle = ((360 / 32) * 2 * Math.PI) / 360;
        if (
          secondLiDom &&
          secondLiDom !== undefined &&
          secondLiDom !== null &&
          secondLiDom.length > 0
        ) {
          for (let i = 0; i < secondLiDom.length; i++) {
            secondLiDom[i].style.transform = 'rotate(' + -index *
              this.rotateAngle + 'deg)';
            secondLiDom[i].style.msTransform = 'rotate(' + -index *
              this.rotateAngle + 'deg)';
          }
        }
      });
    },
    secondLiTransfer(index) {
      this.$nextTick(() => {
        let secondLiDom =
          this.$refs.second &&
          this.$refs.second
            .getElementsByTagName("ul")[0]
            .getElementsByTagName("li");
        let angle = ((360 / 28) * 2 * Math.PI) / 360;
        if (secondLiDom) {
          for (let i = 0; i < secondLiDom.length; i++) {
            if (i == index) {
              secondLiDom[i].style.top = "5px";
              secondLiDom[i].style.left = 350 - (index - i) * 70 + "px";
            } else if (i < index) {
              secondLiDom[i].style.top =
                350 - Math.cos(angle * (index - i)) * 350 + "px";
              secondLiDom[i].style.left =
                -Math.sin(angle * (index - i)) * 350 + 350 + "px";
            } else {
              secondLiDom[i].style.top =
                350 - Math.cos(angle * (index - i)) * 350 + "px";
              secondLiDom[i].style.left =
                -Math.sin(angle * (index - i)) * 350 + 350 + "px";
              350 - Math.cos(angle * (index - i)) * 350 + "px";
              secondLiDom[i].style.left =
                -Math.sin(angle * (index - i)) * 350 + 350 + "px";
            }
          }
        }
      });
    },
    threeLiTransfer(index) {
      this.$nextTick(() => {
        let threeLiDom =
          this.$refs.three &&
          this.$refs.three
            .getElementsByTagName("ul")[0]
            .getElementsByTagName("li");
        let angle = ((360 / 64) * 2 * Math.PI) / 360;
        if (threeLiDom) {
          for (let i = 0; i < threeLiDom.length; i++) {
            threeLiDom[i].style.transform = 'rotate(' + -this.firstIndex *
              this.rotateAngle + 'deg)';
            threeLiDom[i].style.msTransform = 'rotate(' + -this.firstIndex *
              this.rotateAngle + 'deg)';
            threeLiDom[i].style.top =
              400 - Math.cos(angle * (index - i)) * 400 + "px";
            threeLiDom[i].style.left =
              -Math.sin(angle * (index - i)) * 600 + 400 - 30 + "px";
          }
        }
      });
    },
    jumpDetail() {
      this.$router.push({
        path: "/Application/RiskDetails",
        query: {
          modelType: this.indexData,
          treeId: this.tooltipJumpTreeId,
          name: this.toolTip3dbclickName,
          value: this.toolTip3Number
        }
      });
    },
    mouseMoveTanBox() {
      this.tanBoxShow = true;
    },
    mouseLeaveTanBox() {
      // setTimeout(() => {
        this.tanBoxShow = false;
      // }, 1000);
    },
    onMousemoveTooltip3(e, item, index) {
      this.toolTip3Number = item.value;
      this.tooltipJumpTreeId = item.id;
      this.alarmcount = item.alarmcount;
      this.isShowTooltip3 = true;
      this.toolTip3Name = item.name;
      if (index == 1) {
        this.toolTip3dbclickName = item.name;
      } else if (index == 2) {
        var nameFirst = this.StairList[this.firstIndex].name;
        var namesecond = item.name;
        this.toolTip3dbclickName = nameFirst + ">" + namesecond;
      } else if (index == 3) {
        var firstName = this.StairList[this.firstIndex].name;
        var secondName = this.secondList[this.indexTwo].name;
        var threeName = item.name;
        this.toolTip3dbclickName =
          firstName + ">" + secondName + ">" + threeName;
      }
      if (e.clientY < 230) {
        this.tooltipTop = e.clientY + 10;
      } else if (e.clientY > 320) {
        this.tooltipTop = e.clientY - 150;
      } else {
        this.tooltipTop = e.clientY - 50;
      }
      this.tooltipLeft = e.clientX + 30;
    },
    onMouseleaveTooltip3(e) {
      // setTimeout(() => {
        this.isShowTooltip3 = false;
      // }, 1000);
    },
    onMousemoveTooltip2(e, item) {
      this.toolTip2Number = item.value;
      this.toolTip2Name = item.name;
      this.isShowTooltip2 = true;
      this.alarmcount = item.alarmcount;
      if (e.clientY < 230) {
        this.tooltipTop = e.clientY + 10;
      } else if (e.clientY > 320) {
        this.tooltipTop = e.clientY - 150;
      }else {
        this.tooltipTop = e.clientY - 50;
      }
      this.tooltipLeft = e.clientX + 30;
    },
    onMouseleaveTooltip2(e) {
      this.isShowTooltip2 = false;
    },
    onMousemoveTooltip1(e) {
      this.isShowTooltip1 = true;

      if (e.clientY < 230) {
        this.tooltipTop = e.clientY + 10;
      } else {
        this.tooltipTop = e.clientY - 100;
      }
      this.tooltipLeft = e.clientX + 30;
    },
    onMouseleaveTooltip1() {
      this.isShowTooltip1 = false;
    },
    selectTitle(item) {
      let _this=this
      this.viewStatus=item
      switch (item){
        case 1:
        case 0:
          this.viewShow = false;
          this.setTreeId("");
          this.TitleKey = item;
          this.isShowSecond = false;
          this.setIndexData(item);
          this.isShowSecond = false;
          this.isShowThree = false;
          this.isSecondThreeShow = false;
          if (this.$refs.second) {
            this.$refs.second.style.opacity = 0;
            this.$refs.second.style.transform = 'scale(0)';
            this.$refs.second.style.msTransform = 'scale(0)';
          }
          if (this.$refs.three) {
            this.$refs.three.style.opacity = 0;
            this.$refs.three.style.transform = 'scale(0)';
            this.$refs.three.style.msTransform = 'scale(0)';
          }
          if (item === 0) {
            this.watchJsonData(this.manageData);
          } else if (item === 1) {
            this.watchJsonData(this.riskViewData);
          }
          break
        case 3:
        case 4:
          _this.viewShow = true;
          _this.TitleKey = 2;
          _this.setTreeId("");
          setTimeout(function () {
            _this.$refs.rTree.toggleBtn(parseInt(item)-3)
          },100)

          break
        default:break
      }
    },
    onesizeBox() {
      var w = this.screenWidth;
      let h = document.body.clientHeight;
      if (this.$refs.rotateBox) {
        if (w >= 2560 && this.$refs.rotateBox) {
          this.$refs.rotateBox.style.transform = "scale(1.3)";
          this.$refs.rotateBox.style.msTransform = "scale(1.3)";
          document.getElementsByClassName("rotateTop")[0].style.height =
            "1220px";
        } else if (w >= 1930) {
          this.$refs.rotateBox.style.transform = "scale(0.84)";
          this.$refs.rotateBox.style.msTransform = "scale(0.84)";
        } else if (w >= 1400 && w < 1930) {
          this.$refs.rotateBox.style.transform = "scale(0.7)";
          this.$refs.rotateBox.style.msTransform = "scale(0.7)";
          document.getElementsByClassName("rotateTop")[0].style.height =
            "680px";
        } else if (w>=1360 && w < 1400) {
          this.$refs.rotateBox.style.transform = "scale(0.6)";
          this.$refs.rotateBox.style.msTransform = "scale(0.6)";
          document.getElementsByClassName("rotateTop")[0].style.height =
            "590px";
          document.getElementsByClassName("rotateTop")[0].style.border =
            "1px solid transparent";
        }
         if(h<443){
          this.$refs.rotateBox.style.transform = "scale(0.4)";
          this.$refs.rotateBox.style.msTransform = "scale(0.4)";
          document.getElementsByClassName("rotateTop")[0].style.height =
            "590px";
          document.getElementsByClassName("rotateTop")[0].style.border =
            "1px solid transparent";
        }
      }
    },
    handleResize(event) {
      this.fullHeight = document.documentElement.clientHeight;
    },
    threeClickModel(item) {
      var firstName = this.StairList[this.firstIndex].name;
      var secondName = this.secondList[this.indexTwo].name;
      var threeName = item.name;
      var nameData = firstName + ">" + secondName + ">" + threeName;
      this.clickIndex = 3;
      this.$router.push({
        path: "/Application/RiskDetails",
        query: {
          modelType: this.indexData,
          treeId: this.treeId,
          name: nameData,
          value: item.value
        }
      });
    },
    secondClickModel(item) {
      var nameFirst = this.StairList[this.firstIndex].name;
      var namesecond = item.name;
      var nameData = nameFirst + ">" + namesecond;
      this.clickIndex = 2;
      this.$router.push({
        path: "/Application/RiskDetails",
        query: {
          modelType: this.indexData,
          treeId: this.treeId,
          name: nameData,
          value: item.value
        }
      });
    },
    firstClickModel(item) {
      this.clickIndex = 1;
      this.$router.push({
        path: "/Application/RiskDetails",
        query: {
          modelType: this.indexData,
          treeId: this.treeId,
          name: item.name,
          value: item.value
        }
      });
    },
    //数据实时刷新的时候，拓扑图继续显示
    topoShow(val) {
      //没有第二层，第三层展开的时候
      if (this.isShowThree) {
        let data3 = val[0].children;
        let three = data3.filter(o => {
          return o.name == this.firstName;
        });

        let threeData =
          three &&
          three[0] &&
          three[0].children &&
          three[0].children[0] &&
          three[0].children[0].children &&
          three[0].children[0].children;
        this.threeData1 = threeData;
      }

      //第二层展开的时候
      if (this.isShowSecond) {
        this.$refs.second.style.opacity = 1;
        let data2 = val[0].children;
        let second = data2.filter(o => {
          return o.name == this.firstName;
        });
        let secondData =
          second && second[0] && second[0].children && second[0].children;
        this.secondList = secondData;
      }
      //第二层，第三层展开的时候
      if (this.isSecondThreeShow && !this.isShowThree) {
        let data23 = val[0].children;
        let secondThree = data23.filter(o => {
          return o.name == this.firstName;
        });
        let secondThreeWrap =
          secondThree &&
          secondThree[0] &&
          secondThree[0].children &&
          secondThree[0].children.filter(m => {
            return m.name == this.secondName;
          });
        let secondThreeData =
          secondThreeWrap &&
          secondThreeWrap[0] &&
          secondThreeWrap[0].children &&
          secondThreeWrap[0].children;
        this.threeData1 = secondThreeData;
      }
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.getRiskFactor(this.getparams);
      this.getRiskSafeCurve(this.getparams);
      this.getRiskData(this.getparams);
      if (this.viewStatus  ===0  ||  this.viewStatus ===3) {
        this.getManageData();
      }
      if (this.viewStatus ===1 || this.viewStatus ===4) {
        this.getRiskViewData();
      }
    }, 9000);

    const _t = this;
    _t.onesizeBox();
    window.onresize = function(e) {
      _t.screenWidth = document.body.clientWidth;
      _t.onesizeBox();
    };
  },
  beforeDestroy() {
    if (this.timer) {
      //如果定时器还在运行 或者直接关闭，不用判断
      clearInterval(this.timer); //关闭
    }
    this.timer = null;
  },
  watch: {
    indexData(val) {
      // this.TitleKey = val;
    },
    manageData(val) {
      if (this.viewStatus  ===0  ||  this.viewStatus ===3) {
        this.watchJsonData(val);
        this.topoShow(val);
        // console.log("manageData:", val);
      }
    },
    riskViewData(val) {
      if (this.viewStatus  ===1  ||  this.viewStatus ===4) {
        this.watchJsonData(val);
        this.topoShow(val);
      }
    },
    treeId(val) {
      this.watchtreeId(val);
    },
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  .rotateBox_center{
    cursor: pointer;
  }
.clearfix {
  &:before,
  &:after {
    content: "";
    display: table;
  }
  &:after {
    clear: both;
    overflow: hidden;
  }
}
@mixin size($width, $height) {
  width: $width;
  height: $height;
}

.rotateTop{
  width:100%;
  height:100%;
}
.rotate_title {
  box-sizing: border-box;
  padding-top: 20px;
  padding-left: 20px;
  text-align: center;
  line-height: 40px;
  color: #fff;
  font-size: 16px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 11;
  div {
    @include size(148px, 40px);
    cursor: pointer;
    float: left;
    background: url("../../../assets/images/title-bj3.png") no-repeat center
      center;
    background-size: 100% 100%;
  }
  div:hover {
    background: url("../../../assets/images/bj-title-hover.png") no-repeat
      center center;
    background-size: 100% 100%;
  }
}
.Titlebj {
  background: url("../../../assets/images/title-bj2.png") no-repeat center
    center !important;
  background-size: 148px 40px !important;
}
.selectBox{
  position: absolute;
  width: 96%;
  top:100%;
  display: none;
  margin: 0 auto;
  padding: 2px;
  border-radius: 4px;
  background: rgba(80, 73, 255, 0.18);
  li:hover{
    background: #5f92a2;
  }
  .active{
    background: #3a8ee6;
  }
}
.block{
  display: block;
}
.rotateBox {
  transform: scale(0.6);
  -ms-transform: scale(0.6);
  -moz-transform: scale(0.6);
  -webkit-transform: scale(0.6);
  -o-transform: scale(0.6);
  position: relative;
  width: 701px;
  height: 701px;
  margin: 0 auto;
  background: url("../../../assets/images/fangbj.png") no-repeat;
  margin-top: 60px;
  &_three {
    position: absolute;
    top: -50px;
    left: -50px;
    width: 800px;
    height: 800px;
    border-radius: 50%;
    transition: 1s;
    transform: scale(0);
    ul.threeGreen {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/three-green.png") no-repeat center
        62px;
      background-size: 391px 100px;
    }
    ul.threeYellow {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/three-yellow.png") no-repeat
        center 62px;
      background-size: 391px 100px;
    }
    ul.threeOrange {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/three-orange.png") no-repeat
        center 62px;
      background-size: 391px 100px;
    }
    ul.threeRed {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/three-red.png") no-repeat center
        62px;
      background-size: 391px 100px;
    }
    ul.threeBigGreen {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/threeBigGreen.png") no-repeat
        260px 64px;
      background-size: 280px 184px;
    }
    ul.threeBigYellow {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/threeBigYellow.png") no-repeat
        260px 64px;
      background-size: 280px 184px;
    }
    ul.threeBigOrange {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/threeBigOrange.png") no-repeat
        260px 64px;
      background-size: 280px 184px;
    }
    ul.threeBigRed {
      position: relative;
      height: 100%;
      transition: 1s;
      text-align: center;
      background: url("../../../assets/images/threeBigRed.png") no-repeat 260px
        64px;
      background-size: 280px 184px;
    }
    ul {
      div {
        max-width: 100%;
        overflow: hidden;
        span{
          display: block;
          line-height: 16px;
          max-height: 32px;
          overflow: hidden;
        }
      }
      li {
        position: absolute;
        width: 60px;
        height: 60px;
        display: -webkit-inline-box;
        display: -moz-inline-box;
        display: -ms-inline-flexbox;
        display: -webkit-inline-flex;
        display: inline-flex;
        text-align: center;
        transition: 0.6s;
        font-size: 12px;
        box-sizing: border-box;
        border: 1px solid royalblue;
        cursor: pointer;
        border-radius: 50%;
        word-break: break-all;
        text-overflow: ellipsis;
        box-sizing: border-box;
        padding: 0.8% 5px 0 5px;
        flex-direction: column;
        div:nth-child(2) {
          margin-top: 3.8px;
        }
      }
      .activeBlue {
        background-color: #0096ff;
        border: none;
        box-shadow: 0 0 10px #0096ff;
      }
      .activeYellow {
        background-color: #ffdc00;
        border: none;
        box-shadow: 0 0 10px #ffdc00;
      }
      .activeOrange {
        background-color: #ff7300;
        border: none;
        box-shadow: 0 0 10px #ff7300;
      }
      .activeRed {
        background-color: #ff0000;
        border: none;
        box-shadow: 0 0 10px #ff0000;
      }
    }
  }

  &_second {
    position: absolute;
    width: 701px;
    height: 701px;
    border-radius: 50%;
    transition: 1s;
    &_box {
      position: relative;
      height: 100%;
      text-align: center;
      background: url("../../../assets/images/bj-3.png") no-repeat 315px 1px;
      background-size: 80px 174px;
      padding: 5px;
      div {
        max-width: 100%;
        span{
          display: block;
          max-height: 40px;
          line-height: 20px;
          overflow: hidden;
        }
      }
      li {
        position: absolute;
        display: inline-flex;
        align-items: center;
        width: 70px;
        height: 70px;
        padding: 0.7em 5px 0 5px;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border: 1px solid royalblue;
        border-radius: 50%;
        cursor: pointer;
        transition: 0.3s;
        margin-left: -30px;
        margin-top: 1px;
        flex-direction: column;
      }
      .activeBlue {
        background-color: #0096ff;
        border: none;
        box-shadow: 0 0 10px #0096ff;
      }
      .activeYellow {
        background-color: #ffdc00;
        border: none;
        box-shadow: 0 0 10px #ffdc00;
      }
      .activeOrange {
        background-color: #ff7300;
        border: none;
        box-shadow: 0 0 10px #ff7300;
      }
      .activeRed {
        background-color: #ff0000;
        border: none;
        box-shadow: 0 0 10px #ff0000;
      }
    }
  }
  &_content {
    position: absolute;
    bottom: 157px;
    left: 157px;
    width: 386px;
    height: 386px;
    color: #fff;
    transition: 1s;
    // background: url('../../../assets/images/dfangbj.png') no-repeat;
    transform: scale(0.8);
    &_main {
      position: relative;
      height: 100%;
      div {
        max-width: 100%;
        text-align: center;
        span{
          display: block;
          max-height: 52px;
          line-height: 26px;
          overflow: hidden;
        }
      }
      li {
        position: absolute;
        width: 100px;
        height: 100px;
        display: inline-flex;
        text-align: center;
        color: #fff;
        font-size: 20px;
        border: 2px solid royalblue;
        border-radius: 50%;
        box-sizing: border-box;
        cursor: pointer;
        box-shadow: 0 0 10px royalblue;
        transition: 0.3s;
        padding: 4% 5px 0 5px;
        margin-left: -40px;
        margin-top: -40px;
        flex-direction: column;
      }
      .activeBlue {
        background-color: #0096ff;
        border: none;
        box-shadow: 0 0 10px #0096ff;
      }
      .activeYellow {
        background-color: #ffdc00;
        border: none;
        box-shadow: 0 0 10px #ffdc00;
      }
      .activeOrange {
        background-color: #ff7300;
        border: none;
        box-shadow: 0 0 10px #ff7300;
      }
      .activeRed {
        background-color: #ff0000;
        border: none;
        box-shadow: 0 0 10px #ff0000;
      }
    }
  }
  &_center {
    position: absolute;
    width: 141px;
    height: 141px;
    bottom: 280px;
    left: 280px;
    text-align: center;
    color: #fff;
    border-radius: 100%;
    p {
      font-size: 50px;
      line-height: 100px;
    }
    span {
      font-size: 20px;
    }
  }
  .activeCenterBlue {
    border: 3px solid #0096ff;
  }
  .activeCenterYellow {
    border: 3px solid #ffdc00;
  }
  .activeCenterOrange {
    border: 3px solid #ff7300;
  }
  .activeCenterRed {
    border: 3px solid #ff0000;
  }
}
// 中间大圆的tooltip
.tooltip1,.tooltip2,.tooltip3{
  z-index: 9999;
}
.tooltip1 {
  position: fixed;
  width: 206px;
  height: 140px;
  background: #3962d8;
  border-radius: 5px;
  .name {
    margin-left: 25px;
    margin-top: 8px;
    box-sizing: border-box;
    font-size: 18px;
    color: #fff;
    height: 38px;
    line-height: 38px;
    -ms-word-break: break-all;
    word-break: break-all;
  }
  .tooltip1CenterBlue {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #0096ff;
    .box {
      background: #0096ff;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 5px;
      margin-top: 15px;
    }
  }
  .tooltip1CenterYellow {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ffdc00;
    .box {
      background: #ffdc00;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip1CenterOrange {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff7300;
    .box {
      background: #ff7300;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip1CenterRed {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff0000;
    .box {
      background: #ff0000;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .currentWarning {
    margin-left: 25px;
    box-sizing: border-box;
    color: #ff6600;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    .box {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff6600;
      display: inline-block;
      margin-right: 5px;
    }
  }
}
// 不可以跳转的tooltip
.tooltip2 {
  position: fixed;
  width: 206px;
  background: #3962d8;
  border-radius: 5px;
  .name {
    margin: 8px 15px;
    box-sizing: border-box;
    font-size: 18px;
    color: #fff;
    line-height: 38px;
    -ms-word-break: break-all;
    word-break: break-all;
  }
  .tooltip2CenterBlue {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #0096ff;
    .box {
      background: #0096ff;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip2CenterYellow {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ffdc00;
    .box {
      background: #ffdc00;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip2CenterOrange {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff7300;
    .box {
      background: #ff7300;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip2CenterRed {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff0000;
    .box {
      background: #ff0000;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .currentWarning {
    margin-left: 25px;
    box-sizing: border-box;
    color: #ff6600;
    font-size: 16px;
    height: 36px;
    line-height: 36px;
    .box {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff6600;
      display: inline-block;
      margin-right: 5px;
    }
  }
}
//  可以跳转的tooltip
.tooltip3 {
  position: fixed;
  width: 216px;
  background: #3962d8;
  border-radius: 5px;
  .name {
    margin: 8px 15px;
    box-sizing: border-box;
    font-size: 18px;
    color: #fff;
    line-height: 38px;
    -ms-word-break: break-all;
    word-break: break-all;
  }
  .jump {
    margin-left: 25px;
    box-sizing: border-box;
    font-size: 16px;
    color: #fff;
    height: 26px;
    line-height: 26px;
    cursor: pointer;
  }
  .tooltip3CenterBlue {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #0096ff;
    .box {
      background: #0096ff;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip3CenterYellow {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ffdc00;
    .box {
      background: #ffdc00;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip3CenterOrange {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff7300;
    .box {
      background: #ff7300;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .tooltip3CenterRed {
    margin-left: 25px;
    height: 36px;
    line-height: 36px;
    box-sizing: border-box;
    font-size: 16px;
    color: #ff0000;
    .box {
      background: #ff0000;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-top: 15px;
      margin-right: 5px;
    }
  }
  .currentWarning {
    margin-left: 25px;
    box-sizing: border-box;
    color: #ff6600;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
    .box {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #ff6600;
      display: inline-block;
      margin-right: 5px;
    }
  }
}
.BgCenterBlue {
  background: #0096ff;
}
.BgCenterYellow {
  background: #ffdc00;
}
.BgCenterOrange {
  background: #ff7300;
}
.BgCenterRed {
  background: #ff0000;
}
.CenterBlue {
  color: #0096ff;
}
.CenterYellow {
  color: #ffdc00;
}
.CenterOrange {
  color: #ff7300;
}
.CenterRed {
  color: #ff0000;
}

// 树图位置
.treeView {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-wrap: wrap;
}
@media only screen and (max-width: 1376px) {
  .rotate_title {
    line-height: 30px;
    color: #fff;
    font-size: 12px;
    div {
      @include size(105px, 30px);
      cursor: pointer;
      float: left;
      background: url("../../../assets/images/title-bj3.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
    div:hover {
      background: url("../../../assets/images/bj-title-hover.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
  }
  .Titlebj {
    background: url("../../../assets/images/title-bj2.png") no-repeat center
      center !important;
    background-size: 105px 30px !important;
  }
  .rotateBox {
    margin-top: -106px;
  }
  // 树图位置
  .treeView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .rotate_title {
    line-height: 35px;
    font-size: 14px;
    div {
      @include size(130px, 35px);
      cursor: pointer;
      float: left;
      background: url("../../../assets/images/title-bj3.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
    div:hover {
      background: url("../../../assets/images/bj-title-hover.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
  }
  .Titlebj {
    background: url("../../../assets/images/title-bj2.png") no-repeat center
      center !important;
    background-size: 130px 35px !important;
  }
  .rotateBox {
    margin-top: -50px;
  }
  // 树图位置
  .treeView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .rotate_title{
    div{
      @include size(148px, 38px);
    }
  }
  .rotateBox {
    margin-top: 5px;
  }
  .treeView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}
@media only screen and (min-width: 1931px) {
  .rotate_title {
    line-height: 65px;
    font-size: 26px;
    padding-top: 30px;
    padding-left: 70px;
    box-sizing: border-box;
    div {
      @include size(220px, 65px);
      cursor: pointer;
      float: left;
      background: url("../../../assets/images/title-bj3.png") no-repeat center
        center;
      background-size: 100% 100%;
    }
    div:hover {
      background: url("../../../assets/images/bj-title-hover.png") no-repeat
        center center;
      background-size: 100% 100%;
    }
  }
  .Titlebj {
    background: url("../../../assets/images/title-bj2.png") no-repeat center
      center !important;
    background-size: 220px 65px !important;
  }
  .rotateBox {
    margin-top: 212px;
  }
  // 树图位置
  .treeView {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
}

/*---------------------------------------------------------------------------*/
/*@media only screen and (min-width: 1411px) and (max-width: 1920px) {*/
  /*.rotateBox{*/
    /*&_three{*/
      /*ul{*/
        /*div{*/
          /*max-height: 32px;*/
        /*}*/
      /*}*/
    /*}*/
    /*&_second{*/
      /*&_box{*/
        /*div{*/
          /*max-height: 44px;*/
        /*}*/
      /*}*/
    /*}*/
    /*&_content{*/
      /*&_main{*/
        /*div{*/
          /*max-height: 63%;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
/*}*/
/*@media only screen and (min-width: 1921px){*/
  /*.rotateBox{*/
    /*&_three{*/
      /*ul{*/
        /*div{*/
          /*max-height: 32px;*/
        /*}*/
      /*}*/
    /*}*/
    /*&_second{*/
      /*&_box{*/
        /*div{*/
          /*max-height: 44px;*/
        /*}*/
      /*}*/
    /*}*/
    /*&_content{*/
      /*&_main{*/
        /*div{*/
          /*max-height: 2.3em;*/
        /*}*/
      /*}*/
    /*}*/
  /*}*/
/*}*/

  .selectItem{
  margin: 0;
  padding: 0;
  li{
    padding: 1em;
    border-radius: 4px;
    cursor: pointer;
  }
  li:hover{
    background: #1e9fff;
  }
}
</style>
