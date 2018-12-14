<template>
  <!-- 报警总数，橙色预警，红色预警 -->
  <div class="AAndRAlert">
    <div class="AAndRAlert_item fl">
      <div class="AAndRAlert_item_img fl">
        <img src="../../../assets/images/baojing.png">
      </div>
      <div class="AAndRAlert_item_text fl">
        <div class="AAndRAlert_item_text_title">报警总数</div>
        <div class="AAndRAlert_item_text_number">{{AAndRAlertData.alert_totalCounts||''}}</div>
      </div>
    </div>
    <div class="AAndRAlert_item fl">
      <div class="AAndRAlert_item_img fl">
        <img src="../../../assets/images/yujing.png">
      </div>
      <div class="AAndRAlert_item_text fl">
        <div class="AAndRAlert_item_text_title">高风险报警</div>
        <div class="AAndRAlert_item_text_number">{{AAndRAlertData.alert_orangeCounts||''}}</div>
      </div>
    </div>
    <div class="AAndRAlert_item fl">
      <div class="AAndRAlert_item_img fl">
        <img src="../../../assets/images/hongse.png">
      </div>
      <div class="AAndRAlert_item_text fl">
        <div class="AAndRAlert_item_text_title">击穿报警</div>
        <div class="AAndRAlert_item_text_number">{{AAndRAlertData.alert_redCounts||''}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  components: {},
  data () {
    return {
    }
  },
  computed: {
    ...mapState('SecurityStore', ['AAndRAlertData'])
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.AAndRAlert {
  width: 100%;
  height: 100%;
  padding-left: 15%;
  &_item {
    width: 26.85%;
    height: 100%;
    margin-right: 5%;
    &_img {
      width: 50%;
      height: 100%;
      line-height: 850%;
      text-align: center;
      img {
        width: 75%;
        height: 55%;
        vertical-align: middle;
      }
    }
    &_text {
      width: 50%;
      height: 100%;
      &_title {
        width: 100%;
        height: 50%;
        line-height: 400%;
        font-size: 120%;
        text-align: center;
      }
      &_number {
        width: 100%;
        height: 50%;
        font-size: 150%;
        font-weight: bold;
        text-align: center;
      }
    }
  }
}
@media only screen and (max-width: 1376px) {
  .AAndRAlert {
    width: 100%;
    height: 100%;
    padding-left: 4%;
    &_item {
      width: 26.85%;
      height: 100%;
      margin-right: 5%;
      &_img {
        width: 50%;
        height: 100%;
        line-height: 600%;
        text-align: center;
        // border:1px solid red;
        img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
        }
      }
      &_text {
        width: 50%;
        height: 100%;
        &_title {
          width: 100%;
          height: 50%;
          line-height: 400%;
          font-size: 120%;
          text-align: center;
          font-size:14px;
        }
        &_number {
          width: 100%;
          height: 50%;
          font-size: 150%;
          font-weight: bold;
          text-align: center;
          font-size:16px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1377px) and (max-width: 1410px) {
  .AAndRAlert {
    width: 100%;
    height: 100%;
    padding-left: 15%;
    &_item {
      width: 26.85%;
      height: 100%;
      margin-right: 5%;
      &_img {
        width: 50%;
        height: 100%;
        line-height: 650%;
        text-align: center;
        // border:1px solid red;
        img {
          width: 60px;
          height: 60px;
          vertical-align: middle;
        }
      }
      &_text {
        width: 50%;
        height: 100%;
        &_title {
          width: 100%;
          height: 50%;
          line-height: 400%;
          font-size: 120%;
          text-align: center;
          font-size:16px;
        }
        &_number {
          width: 100%;
          height: 50%;
          font-size: 150%;
          font-weight: bold;
          text-align: center;
          font-size:18px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1411px) and (max-width: 1930px) {
  .AAndRAlert {
    width: 100%;
    height: 100%;
    padding-left: 10%;
    &_item {
      width: 26.85%;
      height: 100%;
      margin-right: 5%;
      &_img {
        width: 50%;
        height: 100%;
        line-height: 700%;
        text-align: center;
        // border:1px solid red;
        img {
          width: 70px;
          height: 70px;
          vertical-align: middle;
        }
      }
      &_text {
        width: 50%;
        height: 100%;
        &_title {
          width: 100%;
          height: 50%;
          line-height: 400%;
          font-size: 120%;
          text-align: center;
          font-size:18px;
        }
        &_number {
          width: 100%;
          height: 50%;
          font-size: 150%;
          font-weight: bold;
          text-align: center;
          font-size:20px;
        }
      }
    }
  }
}
@media only screen and (min-width: 1931px) {
  .AAndRAlert {
    width: 100%;
    height: 100%;
    padding-left: 15%;
    &_item {
      width: 26.85%;
      height: 100%;
      margin-right: 5%;
      &_img {
        width: 50%;
        height: 100%;
        line-height: 1150%;
        text-align: center;
        // border:1px solid red;
        img {
          width: 100px;
          height: 100px;
          vertical-align: middle;
        }
      }
      &_text {
        width: 50%;
        height: 100%;
        &_title {
          width: 100%;
          height: 50%;
          line-height: 400%;
          font-size: 120%;
          text-align: center;
          font-size:30px;
        }
        &_number {
          width: 100%;
          height: 50%;
          font-size: 150%;
          font-weight: bold;
          text-align: center;
          font-size:32px;
        }
      }
    }
  }
}
</style>
