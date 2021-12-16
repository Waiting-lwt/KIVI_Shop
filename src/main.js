// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {request, formatDate} from './utils/api'
import axios from 'axios' // 引入 axios库
import VueCookies from 'vue-cookies' // 引入 cookie库
// import 'swiper/dist/css/swiper.min.css' // 引入 swiper 轮播图组件
// import 'swiper/dist/js/swiper.min'

Vue.config.productionTip = false

Vue.prototype.$request = request
Vue.prototype.$formatDate = formatDate
Vue.prototype.$axios = axios
Vue.prototype.$Base64 = require('js-base64').Base64

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  VueCookies,
  components: { App },
  template: '<App/>'
})
