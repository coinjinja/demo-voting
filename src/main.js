import Vue from 'vue'
import VueNativeSock from 'vue-native-websocket'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const userId = '48ae0f19-2574-344a-9109-5f07004bf411'
Vue.use(VueNativeSock, `wss://push.coinjinja.com/sub/direct_transfer?user_id=${userId}`, {
  reconnection: true,
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
