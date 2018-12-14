<template>
    <div class="mw-input" :class="{isDisabled:disabled,'mw-input-onFocus':isFocus}">
      <input class="mw-input-in" :type="getType" v-focus="onFocus" :value="value" @compositionstart="compositionstart" @compositionend="compositionend" v-on:input="out" :placeholder="placeholder" :disabled="disabled" @focus="setFocus(true)" @blur="setFocus(false)"/>
      <span class="close" v-show="clearable&&(value.length>0?true:false)" @click="clearText"></span>
    </div>
</template>

<script>
export default {
  name: 'mw-input',
  model: {
    prop: 'value',
    event: 'out'
  },
  props: {
    value: String,
    placeholder: String,
    disabled: Boolean,
    clearable: Boolean,
    type: String
  },
  computed: {
    getType () {
      if (this.type === undefined) {
        return 'text'
      }
      return this.type
    }
  },
  directives: {
    focus: {
      // 指令的定义
      componentUpdated: function (el, binding) {
        if (binding.value) {
          el.focus()
        }
      }
    }
  },
  data () {
    return {
      onFocus: false,
      cpLock: false, // 是否输入法模式
      isFocus: false
    }
  },
  methods: {
    out (event) {
      this.$emit('out', event.target.value)
    },
    compositionstart () {
      this.cpLock = true
    },
    compositionend () {
      this.cpLock = false
    },
    clearText () {
      this.$emit('out', '')
    },
    setFocus (res) {
      this.isFocus = res
    }
  }
}
</script>
<style>
  .mw-input{
    font-size: 14px;
    width: 100%;
    height: 40px;
    color: black;
    border-radius: 4px;
    background-color: #fff;
    border: 1px solid #aec7cc;
    vertical-align: middle;
  }
  .mw-input .mw-input-in{
    background-color: rgba(0,0,0,0);
    background-image: none;
  }
</style>
<style scoped>
  .mw-input{
    position: relative;
    display: inline-block;
    cursor: auto;
    box-sizing: border-box;

    overflow: hidden;
  }
  .mw-input-onFocus{
    box-shadow: 0px 0px 9px 1px rgba(141, 145, 134, 0.81);
  }
  .mw-input .mw-input-in{
    -webkit-appearance: none;
    border-radius:inherit;
    border:none;
    box-sizing: border-box;
    display: inline-block;
    font-size: inherit;
    outline: none;
    color:inherit;
    padding: 0 1rem;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
    height: 100%;
    cursor: inherit;
  }
.mw-input .mw-input-in:focus{
  box-sizing: border-box;
  box-shadow: 10px 10px red;
  -webkit-transition:border linear .1ms,-webkit-box-shadow linear .2ms;
  border-color: rgba(41, 55, 142, 0.75);
  -webkit-box-shadow:0 0 10px rgba(111,1,32,3);
}
  .isDisabled{
    cursor: not-allowed;
  }
  .mw-input  .close {
    color: black;
    line-height: 20px;
    width: 1em;
    font-size: 100%;
    padding: 1px;
    top: calc(50% - 0.5em);
    right: 10px;
    position: absolute;
    overflow:hidden;
    display: none;
  }
.mw-input  .close:hover{
  cursor: pointer;
  display: inline;
}
.mw-input .mw-input-in:focus+.close{
  display: inline-block;
}
/* use cross as close button */
.mw-input .close::before {
  content: "\2716";
  font-size:inherit;
}
</style>
