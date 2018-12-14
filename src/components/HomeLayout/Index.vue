<template>
    <div class="content">
        <div class="rotate">
            <RotateView></RotateView>
        </div>
    </div>
</template>
<script>
import RotateView from './RotateView.vue'
export default {
  components: {
    RotateView
  }
}
</script>
<style lang="scss" scoped>
.content{
    width: 100%;
    height: 100%;
    background: url('../../assets/images/bj.png') no-repeat;
    .rotate{
        width: 100%;
        height: 100%;
    }
}
</style>
