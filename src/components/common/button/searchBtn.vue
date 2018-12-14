<template>
      <div class="searchBtn" type="primary" @click="search">搜索</div>
</template>

<script>
export default {
  name: 'searchBtn',
  methods: {
    search () {
      this.$emit('click')
    }
  }
}
</script>
<style>
  .searchBtn {
    line-height: 40px;
    width: 5em;
    height: 40px;
    vertical-align: middle;
  }
</style>
<style scoped>
.searchBtn {
  display: inline-block;
  margin: 0 0 0 1em;
  color: #fff;
  font-size: 0.9em;

  text-align: center;
  background: deepskyblue;
  border-radius: 4px;

  cursor: pointer;
}
@media only screen and (max-width: 1376px){
  .searchBtn{
    height: 30px;
    line-height: 30px;
  }
}
</style>
