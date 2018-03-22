// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap'
import VueResource from 'vue-resource'
import { store } from './store/store';

Vue.use(VueResource);
Vue.http.headers.common['X-Requested-With'] = 'XMLHttpRequest'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
