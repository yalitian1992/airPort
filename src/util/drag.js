window.drag = function (oDrag, handle) {
  var disX = 0
  var disY = 0
  handle = handle || oDrag
  handle.style.cursor = 'move'
  handle.onmousedown = function (e) {
    e = e || event
    e.preventDefault()
    disX = e.clientX - oDrag.offsetLeft
    disY = e.clientY - oDrag.offsetTop
    document.onmousemove = function (e) {
      e = e || event
      var Left = e.clientX - disX
      var Top = e.clientY - disY
      var maxleft = document.documentElement.offsetWidth - oDrag.offsetWidth
      var maxtop = document.documentElement.clientHeight - oDrag.offsetHeight
      if (Left < 0) {
        Left = 0
      } else if (Left > maxleft) {
        Left = maxleft
      };
      if (Top < 0) {
        Top = 0
      } else if (Top > maxtop) {
        Top = maxtop
      };
      oDrag.style.left = Left + 'px'
      oDrag.style.top = Top + 'px'
    }
    document.onmouseup = function () {
      document.onmousemove = null
      document.onmouseup = null
    }
  }
  // 最大化按钮
  /* max.onclick = function () {
var maxwidth = document.documentElement.clientWidth - 2
var maxheight = document.documentElement.clientHeight - 2
oDrag.style.top = 0
oDrag.style.left = 0
oDrag.style.width = maxwidth + 'px'
oDrag.style.height = maxheight + 'px'
this.style.display = 'none'
revert.style.display = 'block'
} */

  // 还原按钮
  /*   revert.onclick = function () {
var width = 300
var height = 300
oDrag.style.top = '100px'
oDrag.style.left = '100px'
oDrag.style.width = width + 'px'
oDrag.style.height = height + 'px'
this.style.display = 'none'
max.style.display = 'block'
}
*/
}
