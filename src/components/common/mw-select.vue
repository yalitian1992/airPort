<template>
<div class="mw-select" :class="{active:isActive}" :id="id" @click="toActive">
  <div class="select-title">
    <input @click="open" class="selectText"  :value="seletItemText" placeholder="请选择" type="text" readonly/>
    <i v-show="isCloseStatus" class="up"></i>
    <i v-show="!isCloseStatus" class="down"></i>
  </div>
<div v-show="isCloseStatus" :class="{'mw-select-option-box':true}">
  <ul class="mw-select-option">
    <li class="mw-select-option-item" :class="{'mw-select-option-item-active':(item[label]===seletItemText?true:false)}" v-for="(item,index) in selectList" :key="index" @click="itemSelect(item)">
      <span class="item-text">{{item[label]}}</span></li>
  </ul>
</div>
</div>
</template>

<script>
export default {
  name: 'mw-select',
  model: {
    prop: 'activeItem',
    event: 'out'
  },
  props: {
    data: Array,
    label: String,
    value: String,
    activeItem: Object
  },
  computed: {
    selectList () {
      if (this.data !== undefined) {
        return this.data
      } else {
        return []
      }
    },
    seletItemText () {
      if (this.activeItem !== undefined) {
        if (this.activeItem[this.label] === undefined) {
          if (this.data.length > 0) {
            alert('as')
            this.$emit('out', this.data[0]) // 无默认值时默认选择第一项
          } else {
            return ''
          }
        } else {
          return this.activeItem[this.label]
        }
      } else {
        return this.selectItem.label
      }
    }
  },
  data () {
    return {
      id: '',
      isCloseStatus: false,
      selectItem: {label: ''},
      isActive: false
    }
  },
  methods: {
    toActive () {
      this.isActive = true
    },
    itemSelect (item) {
      this.isCloseStatus = false
      this.selectItem.label = item[this.label] === undefined ? '' : item[this.label]
      this.$emit('out', item)
    },
    guid () {
      var S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      }
      return (
        S4() +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        '-' +
        S4() +
        S4() +
        S4()
      )
    },
    open () {
      this.isCloseStatus = !this.isCloseStatus
    },
    handleBodyClick (e) {
      let stop = false
      var x = e.target
      var result = []
      while (x.tagName !== 'BODY' && !stop) {
        result.push(x)
        x = x.parentNode
        if (x.id === this.id) {
          stop = true
        }
      }
      if (this.isCloseStatus && !stop) {
        this.isCloseStatus = false
      }
      if (!stop) {
        this.isActive = false
      }
    }
  },
  created () {
    this.id = this.guid()
  },
  mounted () {
    document
      .querySelector('body')
      .addEventListener('click', this.handleBodyClick)// 实现点击其他地方关闭下拉选项
  },
  beforeDestroy () {
    document
      .querySelector('body')
      .removeEventListener('click', this.handleBodyClick)// 控件销毁时移除绑定的事件
  }
}
</script>
<style>
  .mw-select {
    font-size: 16px;
    width: 100%;
    color: #606266;
    cursor: auto;
    background-color: #fff;
    vertical-align: bottom;
  }
</style>
<style scoped>
.mw-select {
  position: relative;
  display: inline-block;
  border-radius: 4px;
  cursor: auto;
  padding: 0px !important;
  border: 1px solid #aec7cc;
  background-color: #fff;
  box-sizing: border-box;

}
.active{
  border: 1px solid #4288ff;
}
.mw-select .select-title {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
}
.mw-select .selectText {
  width: calc(100% - 2em);
  height: 100%;
  border: none;
  background: inherit;
  margin: 0;
  padding: 0 0 0 6px;
  font-size: inherit;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
::-webkit-input-placeholder {
  /* WebKit, Blink, Edge */
  color: #dcdfe6;
  font-weight: 200;
}
:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #dcdfe6;
  font-weight: 200;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #dcdfe6;
  font-weight: 200;
}
:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #dcdfe6;
  font-weight: 200;
}
.mw-select-option-box {
  position: absolute;
  border: 1px solid #a2a2a2;
  box-shadow: rgb(162, 162, 162) 0px 1px 9px 2px;
  margin: 2px 0 0 0;
  padding: 0;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  background: inherit;
  border-radius: 5px;
  z-index: 999999;
}
.mw-select-option-bo-top {
  margin: 2px 0 0 0;
  padding: 0;
  width: 100%;
  max-height: 300px;
  overflow: hidden;
  background: inherit;
  border-radius: 5px;
}
.mw-select-option {
  margin: 0;
  padding: 6px 0;
  box-sizing: border-box;
  width: calc(100% + 18px);
  max-height: inherit;
  overflow-y: scroll;
  overflow-x: hidden;
  background: inherit;
}
.mw-select-option-item {
  width: 100%;
  list-style: none;
  height: 2em;
  box-sizing: border-box;
  line-height: 200%;
  padding: 0 6px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  background: inherit;
}
.mw-select-option-item:hover {
  cursor: pointer;
  background: #d1b5ff;
  box-shadow: #a2a2a2 1px 1px 1px 1px;
}
.mw-select-option-item-active{
  background: #d1b5ff;
  box-shadow: #a2a2a2 1px 1px 1px 1px;
}
.item-text {
}
.up {
  position: absolute;
  top: calc(50% - 0.17em);
  right: 1em;
  border-left: 0.35em solid transparent;
  border-right: 0.35em solid transparent;
  border-bottom: 0.35em solid #acafb6;
}
.down {
  position: absolute;
  top: calc(50% - 0.17em);
  right: 1em;
  border-left: 0.35em solid transparent;
  border-right: 0.35em solid transparent;
  border-top: 0.35em solid #acafb6;
}
</style>
