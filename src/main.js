// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '../node_modules/swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from '@/store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from "./assets/js/axios.js";
import tool from './assets/js/tool.js';
import '@/assets/css/reset.css';
import { VTree, VSelectTree } from 'vue-tree-halower'
import echarts from 'echarts'
import './assets/js/dataFormat.js'
import VueQuillEditor  from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor);
Vue.use(Vuex)
Vue.use(VTree)
Vue.use (VSelectTree)
Vue.use(iView)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$axios = axios;
Vue.prototype.$tool = tool;
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
/* eslint-disable no-new */
window.newVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
