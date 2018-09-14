import Vue from 'vue'
import App from './App.vue'
import VueNativeSock from 'vue-native-websocket'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueNativeSock, 'wss://push.coinjinja.com/sub/direct_transfer?user_id=07065d64-fd33-39b5-b275-9a2cc4806ef4', {
  reconnection: true,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
