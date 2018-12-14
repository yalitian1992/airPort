
// (function (doc, win) {
//   setRem()
//   var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
//     var recalc = function () {
//         setRem()
//     }
//   if (!doc.addEventListener) { return }
//   win.addEventListener(resizeEvt, recalc, false)
//   // doc.addEventListener('DOMContentLoaded', recalc, false);
// })(document, window)

// function setRem () {
//   var docEl = document.documentElement
//   var clientWidth = docEl.clientWidth
//   if (!clientWidth) {
//     return
//   }
//   docEl.style.fontSize = 100 * (clientWidth / 1080) + 'px'
// }
