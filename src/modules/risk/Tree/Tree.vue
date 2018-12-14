<template>
  <div class="treeWrap">
    <div class="treeWrap_btnWrap">
    <!--  <el-button :type="manageStyle"
                 size="small"
                 @click="toggleBtn(0)">管理树</el-button>
      <el-button :type="riskStyle"
                 size="small"
                 @click="toggleBtn(1)">风险树</el-button>-->
    </div>
    <div class="treeWrap_manageTree"
         v-if="treeStatus">
      <ManageTree />
    </div>
    <div class="treeWrap_riskTree"
         v-if="!treeStatus">
      <RiskTree />
    </div>
  </div>
</template>
<script>
/*eslint-disable */
import { mapState, mapActions,mapMutations } from "vuex";
import ManageTree from "../Tree/ManageTree.vue";
import RiskTree from "../Tree/RiskTree.vue";
export default {
  components: {
    ManageTree,
    RiskTree
  },
  created() {},
  data() {
    return {
      manageStyle: "primary",
      riskStyle: "info",
      treeStatus: true
    };
  },
  computed: {},
  methods: {
    ...mapMutations("RiskStore", ["setTreeId", "setIndexData"]),
    toggleBtn(item) {
      if (item == 0) {
        this.setTreeId('')
        this.setIndexData(0)
        this.manageStyle = "primary";
        this.riskStyle = "info";
        this.treeStatus = true;
      }
      if (item == 1) {
        this.setTreeId('')
        this.setIndexData(1)
        this.riskStyle = "primary";
        this.manageStyle = "info";
        this.treeStatus = false;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@mixin size($width, $height) {
  width: $width;
  height: $height;
}
.treeWrap {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  .treeWrap_btnWrap {
    width: 185px;
    height: 40px;
    position: absolute;
    top: 60px;
    left: 35%;
    z-index: 1;
  }
  .treeWrap_manageTree {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
   justify-content: center;
   align-content: center;
  //  align-items: center;
   flex-wrap: wrap;
   overflow: hidden;
  }
  .treeWrap_riskTree {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
   justify-content: center;
   align-content: center;
  //  align-items: center;
   flex-wrap: wrap;
   overflow: hidden;
  }
}
</style>
<style lang="scss">
</style>
