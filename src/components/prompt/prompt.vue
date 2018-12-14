<template>
  <div class="dragBox">
    <div :id="drag" class="drag" :style="{width: ProData.width, height: ProData.height}" ref="draS">
      <i class="close" @click="close"></i>
      <a class="min" href="javascript:"></a>
      <a class="max" href="javascript:"></a>
      <a class="revert" href="javascript:"></a>
      <div class="title">
        {{ProData.title}}
      </div>
      <div class="resizeL"></div>
      <div class="resizeT"></div>
      <div class="resizeR"></div>
      <div class="resizeB"></div>
      <div class="resizeLT"></div>
      <div class="resizeRT"></div>
      <div class="resizeRB"></div>
      <div class="resizeLB"></div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    ProData: {}
  },
  computed: {
    wShow () {
      return this.ProData.show
    }
  },
  watch: {
    wShow (val) {
      let _this = this
      var dragMinWidth = 300
      var dragMinHeight = 300
      var oDrag = document.querySelector(`#` + this.drag)
      var oTitle = document.querySelector('#' + this.drag + ' .title')
      var min = document.querySelector('#' + this.drag + ' .min')
      var max = document.querySelector('#' + this.drag + ' .max')
      var revert = document.querySelector('#' + this.drag + ' .revert')
      var close = document.querySelector('#' + this.drag + ' .close')
      var resizeL = document.querySelector('#' + this.drag + ' .resizeL')
      var resizeB = document.querySelector('#' + this.drag + ' .resizeB')
      var resizeR = document.querySelector('#' + this.drag + ' .resizeR')
      var resizeT = document.querySelector('#' + this.drag + ' .resizeT')
      var resizeLT = document.querySelector('#' + this.drag + ' .resizeLT')
      var resizeLB = document.querySelector('#' + this.drag + ' .resizeLB')
      var resizeRT = document.querySelector('#' + this.drag + ' .resizeRT')
      var resizeRB = document.querySelector('#' + this.drag + ' .resizeRB')
      function drag (oDrag, handle) {
        var disX = 0
        var disY = 0
        var Left = 0
        var Top = 0
        var maxleft = 0
        var maxtop = 0
        handle = handle || oDrag
        handle.style.cursor = 'move'
        handle.onmousedown = function (e) {
          e = e || event
          e.preventDefault()
          disX = e.clientX - oDrag.offsetLeft
          disY = e.clientY - oDrag.offsetTop
          document.onmousemove = function (e) {
            e = e || event
            Left = e.clientX - disX
            Top = e.clientY - disY
            maxleft = document.documentElement.offsetWidth - oDrag.offsetWidth
            maxtop = document.documentElement.clientHeight - oDrag.offsetHeight
            if (Left < 0) {
              Left = 0
            } else if (Left > maxleft) {
              Left = maxleft
            }
            if (Top < 0) {
              Top = 0
            } else if (Top > maxtop) {
              Top = maxtop
            }
            oDrag.style.left = Left + 'px'
            oDrag.style.top = Top + 'px'
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
        max.onclick = function () {
          var maxwidth = document.documentElement.clientWidth - 2
          var maxheight = document.documentElement.clientHeight - 2
          oDrag.style.top = 0
          oDrag.style.left = 0
          oDrag.style.width = maxwidth + 'px'
          oDrag.style.height = maxheight + 'px'
          this.style.display = 'none'
          revert.style.display = 'block'
        }
        revert.onclick = function () {
          var width = 300
          var height = 300
          oDrag.style.top = '100px'
          oDrag.style.left = '100px'
          oDrag.style.width = width + 'px'
          oDrag.style.height = height + 'px'
          this.style.display = 'none'
          max.style.display = 'block'
        }
        min.onclick = close.onclick = function () {
          // oDrag.style.display='none';
        }
      }
      function resize (oparent, handle, isleft, istop, lookx, looky) {
        var disX = 0
        var disY = 0
        handle = handle || oDrag
        handle.onmousedown = function (e) {
          e = e || event
          e.preventDefault()
          disX = e.clientX - this.offsetLeft
          disY = e.clientY - this.offsetTop
          var iparenttop = oparent.offsetTop
          var iparentleft = oparent.offsetLeft
          var iparentwidth = oparent.offsetWidth
          var iparentheight = oparent.offsetHeight

          document.onmousemove = function (e) {
            e = e || event
            var iL = e.clientX - disX
            var iT = e.clientY - disY
            var maxw =
              document.documentElement.clientWidth - oparent.offsetLeft - 2
            var maxh =
              document.documentElement.clientHeight - oparent.offsetTop - 2
            var iw = isleft ? iparentwidth - iL : handle.offsetWidth + iL
            var ih = istop ? iparentheight - iT : handle.offsetHeight + iT
            if (isleft) {
              oparent.style.left = iparentleft + iL + 'px'
            }
            if (istop) {
              oparent.style.top = iparenttop + iT + 'px'
            }
            if (iw < dragMinWidth) {
              iw = dragMinWidth
            } else if (iw > maxw) {
              iw = maxw
            }
            if (lookx) {
              oparent.style.width = iw + 'px'
            }
            if (ih < dragMinHeight) {
              ih = dragMinHeight
            } else if (ih > maxh) {
              ih = maxh
            }
            if (looky) {
              oparent.style.height = ih + 'px'
            }
            if (
              (isleft && iw === dragMinWidth) ||
              (istop && ih === dragMinHeight)
            ) {
              document.onmousemove = null
            }
            return false
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
            _this.$emit('resize')
          }
        }
      }
      (function () {
        drag(oDrag, oTitle)
        resize(oDrag, resizeB, false, false, false, true)
        resize(oDrag, resizeR, false, false, true, false)
        resize(oDrag, resizeT, false, true, false, true)
        resize(oDrag, resizeL, true, false, true, false)
        resize(oDrag, resizeRB, false, false, true, true)
        resize(oDrag, resizeRT, false, true, true, true)
        resize(oDrag, resizeLT, true, true, true, true)
        resize(oDrag, resizeLB, true, false, true, true)
      })()
      let wHeight = document.documentElement.clientHeight
      let top = wHeight - oDrag.clientHeight
      let wWidth = document.documentElement.clientWidth
      let left = wWidth - oDrag.clientWidth
      oDrag.style.top = (top / 2 + 'px').toString()
      oDrag.style.left = (left / 2 + 'px').toString()
      if ('msDoNotTrack' in window.navigator) {
        oDrag.className = oDrag.className.replace(/(^|\s+)fadeOut(?=$|\s+)/, 'fadeIn')
      } else {
        oDrag.classList.remove('fadeOut')
        oDrag.classList.add('fadeIn')
      }
    }
  },
  data () {
    return {
      show: false,
      conInfo: {},
      drag: '',
      renderFlag: 0
    }
  },
  created () {
    this.drag = this.guid()
  },
  methods: {
    guid () {
      var S4 = function () {
        let randomN = (((1 + Math.random()) * 0x10000) | 0)
          .toString(16)
          .substring(1)
          .replace(/[^a-z]+/gi, '')
        return randomN
      }
      return S4() + S4() + S4()
    },
    close () {
      let _this = this
      var el = document.querySelector(`#` + this.drag)
      if ('msDoNotTrack' in window.navigator) {
        el.className = el.className.replace(/(^|\s+)fadeIn(?=$|\s+)/, 'fadeOut')
      } else {
        el.classList.remove('fadeIn')
        el.classList.add('fadeOut')
      }

      setTimeout(function () {
        _this.ProData.show = false
      }, 450)
    }
  },
  mounted () {
    /* oDrag.style.top = 'calc(calc(100% - ' + this.ProData.height + ') / 2)'
    oDrag.style.left = 'calc(calc(100% - ' + this.ProData.width + ') / 2)' */
  }
}
</script>
<style type="text/css" scoped>
* {
  padding: 0;
  margin: 0;
  /*color: #000;*/
  text-decoration: none;
}
.dragBox {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1800;
}

.drag {
  position: absolute;
  padding: 16px;
  font-size: 14px;
  box-shadow: 2px 2px 5px gray;
  background: #101431;
  border-radius: 5px;
  bottom: 0px;
  right: 0px;
  color: white;
  border: 1.5px solid #555c86;

}
.title {
  width: 100%;
  height: 40px;
  text-align: left;
  font-size: 18px;
  font-weight: inherit;
  line-height: 40px;
  border-bottom: 1px solid #3f70a2;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
.min {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 50px;
}
.max {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 30px;
}
.revert {
  width: 15px;
  height: 15px;
  font-size: 15px;
  position: absolute;
  top: 10px;
  right: 30px;
  display: none;
}
.close {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 7px;
  display: inline-block;
  cursor: pointer;
}
.close:before,
.close:after {
  content: "";
  position: absolute;
  top: 50%;
  width: 20px;
  left: 0px;
  height: 1px;
  background-color: #fff;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.close:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.resizeB {
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  cursor: n-resize;
}
.resizeL {
  width: 2px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  cursor: w-resize;
}
.resizeT {
  width: 100%;
  height: 2px;
  position: absolute;
  top: 0;
  cursor: n-resize;
}
.resizeR {
  width: 2px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  cursor: w-resize;
}

.resizeLT {
  width: 2px;
  height: 2px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: auto;
  cursor: nw-resize;
}
.resizeLB {
  width: 2px;
  height: 2px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: auto;
  cursor: ne-resize;
}
.resizeRT {
  width: 2px;
  height: 2px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: auto;
  cursor: ne-resize;
}
.resizeRB {
  width: 2px;
  height: 2px;
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: auto;
  cursor: nw-resize;
}
.content {
  /*position: absolute;
    top:38px;
    left: 0;*/
  /*border: 1px solid red;*/
  height: calc(100% - 42px);
  width: calc(100% - 4px);
  margin: 2px;
  font-size: 15px;
  overflow: auto;
}
.fadeIn{
  animation:fadeIn 0.5s;
  -webkit-animation:fadeIn 0.5s; /* Safari and Chrome */
}
@keyframes fadeIn
 {
   from {transform: scale(0.2);
     opacity: 0;}
   to {transform: scale(1);
     opacity: 1;}
 }

@-webkit-keyframes fadeIn /* Safari and Chrome */
{
  from {transform: scale(0.2);
    opacity: 0;}
  to {transform: scale(1);
    opacity: 1;}
}

.fadeOut{
  animation:fadeOut 0.5s;
  -webkit-animation:fadeOut 0.5s; /* Safari and Chrome */
}
@keyframes fadeOut
{
  from {transform: scale(1);
    opacity: 1;}
  to {transform: scale(0.1);
    opacity: 0;}
}

@-webkit-keyframes fadeOut /* Safari and Chrome */
{
  from {transform: scale(1);
    opacity: 1;}
  to {transform: scale(0.1);
    opacity: 0;}
}
</style>
