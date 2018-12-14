var echarts = require('echarts')

var eachartHelper = function () {
  this.resize = function () {
  }
}
eachartHelper.prototype = {
  getMychartById: function getMychartById (id) {
    let _this = this
    var myChart = echarts.init(document.getElementById(id))
    addEventOnResize(function () {
      _this.resize()
      myChart.resize()
    })
    return myChart
  }
}
function addEventOnResize (fn) {
  var originFn = window.onresize
  window.onresize = function () {
    originFn && originFn()
    fn()
  }
}
export default eachartHelper
