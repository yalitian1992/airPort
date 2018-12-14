var WS = function () {
  this.ws = null
}
WS.prototype = {
  setUrl: function (url) {
    if (navigator.userAgent.indexOf('MSIE 9.0') > 0) {
      alert('ie9不支持WebSocket,无法显示位置信息,请选用较新的浏览器')
      return false
    }
    if (url !== undefined) {
      var _this = this
      this.ws = new WebSocket('ws://' + url)
      this.ws.onopen = function (d) {
        _this.onopen(JSON.parse(d.data))
      }
      this.ws.onmessage = function (d) {
        _this.onmessage(JSON.parse(d.data))
      }
      this.ws.onclose = function (d) {
        _this.onclose(JSON.parse(d.data))
      }
      this.ws.onerror = function (d) {
        _this.onerror(JSON.parse(d.data))
      }
    }
  },
  onopen: function () {},
  onclose: function () {},
  onmessage: function () {},
  onerror: function () {},
  close: function () {
    this.ws.close()
  }
}
