// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/'
import request from './util/request'
import requestA from './util/request_A'
import Mv from './util/common'
import 'element-ui/lib/theme-chalk/index.css'
import './util/index.css'
import DrawerLayout from 'vue-drawer-layout'
import VueDND from 'awe-dnd'
import layer from '../static/layer/layer'
import htmlToImage from './util/htmlToImage'
// 弹框拖动
import vueDrag from 'vue-dragging'
import 'babel-polyfill'
import '../static/layer/MySkin/style.css'
import './util/drag'

// 弹框拖动
Vue.use(vueDrag)
Vue.use(VueDND)
Vue.use(requestA)
Vue.use(htmlToImage)
Vue.config.productionTip = false
Vue.prototype.Mv = Mv
Vue.use(DrawerLayout)
Vue.use(ElementUI)
Vue.prototype.layer = layer
window.request = request
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
