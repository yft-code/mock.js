import Vue from 'vue'

import Cookies from 'js-cookie'
import Storage from 'vue-ls'
const defaultSettings = require('./settings.js')
import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // 全局样式

import App from './App'
import store from './store'
import router from './router'

import './icons' // icon
import './utils/error-log' // error log

import * as filters from './filters' // global filters

// 本地开发使用mock，不需要mock时注释即可
if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})
Vue.use(Storage, defaultSettings.storageOptions)

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
