import router from '@/router/index'
import store from '@/store/index'
import Vue from 'vue'
import App from './App.vue'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
