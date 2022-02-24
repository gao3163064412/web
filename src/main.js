import Vue from 'vue'

import Cookies from 'js-cookie'

import Element from 'element-ui'
import './assets/styles/element-variables.scss'
import Print from 'vue-print-nb'
import '@/assets/styles/index.scss' // global css
import '@/assets/styles/ruoyi.scss' // ruoyi css
import '@/assets/styles/slb.scss' // slb专用样式
import '@/assets/styles/form.scss'
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission'
import '../src/assets/icon/iconfont.css'
import '../src/assets/icon2/iconfont.css'
import './assets/icons' // icon
import './permission' // permission control
import { getDicts } from "@/api/system/dict/data";
import { getConfigKey } from "@/api/system/config";
import { parseTime, resetForm, addDateRange, selectDictLabel, selectDictLabels, download, my_downLoad, handleTree } from "@/utils/ruoyi";
import Pagination from "@/components/Pagination";
import preventReClick from './directive/preventReClick'
import VueSession from 'vue-session';
// 自定义表格工具扩展
import RightToolbar from "@/components/RightToolbar"

import JsonViewer from 'vue-json-viewer'
 
// Import JsonViewer as a Vue.js plugin
Vue.use(JsonViewer)


Vue.prototype.$EventBus = new Vue();



// 全局方法挂载
Vue.prototype.preventReClick = preventReClick
Vue.prototype.getDicts = getDicts
Vue.prototype.getConfigKey = getConfigKey
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.download = download
Vue.prototype.my_downLoad = my_downLoad
Vue.prototype.handleTree = handleTree

Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}

// 全局组件挂载
Vue.component('Pagination', Pagination)
Vue.component('RightToolbar', RightToolbar)

Vue.use(permission, VueSession)
Vue.use(Print);

import * as filters from "./utils/filter"   //新增过滤器
// register global utility filters 注册全局过滤 此处是新添加内容002
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

import { EleResize } from "../src/utils/resize";
Vue.prototype.EleResize=EleResize


// 引入rem2px设置的js文件
// import './utils/rem'







import { Transfer,Table,DatePicker } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
Vue.use(Transfer)
Vue.use(Table)
Vue.use(DatePicker)



/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
  //123
