<template>
  <div id="app">
    <router-view />
    <rain v-show="(type==='rain')" :is-show="(type==='rain')" ></rain>
  </div>
</template>

<script>
import SnowJs from './util/snow'
import Rain from './components/common/rain'
export default {
  name: 'App',
  components: {Rain},
  data: function () {
    return {
      type: 'snow'
    }
  },
  mounted () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) { this.isIe = true } else {
      switch (this.type) {
        case 'snow':
          let snowJs2 = new SnowJs()
          snowJs2.snowCharacter = '<img class="Snowflake" style="width: 100%;height: 100%;" src="../static/weather/snow/Snowflake.png">'
          snowJs2.flakesMax = 80
          snowJs2.flakesMaxActive = 80
          snowJs2.animationInterval = 40
          snowJs2.followMouse = true
          snowJs2.fallSpeed = 0.1
          /*  snowJs2.toggleSnow() */
          /* let snowJs3 = new SnowJs()
          snowJs3.snowCharacter = '&hearts;'
          snowJs3.flakesMax = 60
          snowJs3.flakesMaxActive = 60
          snowJs3.animationInterval = 40
          snowJs3.followMouse = false
          snowJs3.fallSpeed = 5
          snowJs3.toggleSnow() */
          break
        case 'hail':
          let snowJs = new SnowJs()
          snowJs.snowCharacter = '<img class="Snowflake" style="width: 100%;height: 100%;border-radius: 50%;margin: 0;padding: 0;" src="../static/weather/hail/hail6.png">'
          snowJs.flakesMax = 80
          snowJs.flakeWidth = 18
          snowJs.flakeHeight = 18
          snowJs.flakesMaxActive = 80
          snowJs.animationInterval = 20
          snowJs.followMouse = false
          snowJs.fallSpeed = 12
          break
        default:break
      }
    }
  },
  updated () {
    /* this.type = 'rain' */
    /* snowJs.stop() */
  }
}
</script>

<style>
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    background-size: cover;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .Snowflake{animation:linear spin infinite 20s;-webkit-animation:linear spin infinite 20s;-moz-animation:linear spin infinite 20s;pointer-events:none;}
  @keyframes spin{
    0% {transform:rotate(0deg);}
    100% {transform:rotate(359deg);}
  }
  @-webkit-keyframes spin{
    0% {-webkit-transform:rotate(0deg);}
    100% {-webkit-transform:rotate(359deg);}
  }
  @-moz-keyframes spin{
    0% {-moz-transform:rotate(0deg);}
    100% {-moz-transform:rotate(359deg);}
  }
</style>
