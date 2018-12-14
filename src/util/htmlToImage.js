// 下面两个package要单独安装
import html2Canvas from 'html2canvas'

export default{
  install (Vue, options) {
    Vue.prototype.getImage = function (selector) {
      html2Canvas(document.querySelector(selector), {
        // allowTaint: true
        useCORS: true// 看情况选用上面还是下面的，
      }).then(function (canvas) {
        console.log(canvas)
        var imgUri = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream') // 获取生成的图片的url
        window.location.href = imgUri // 下载图片
      }
      )
    }
  }
}
