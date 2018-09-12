import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import VueNativeSock from 'vue-native-websocket'
Vue.use(VueNativeSock, 'wss://push.coinjinja.com/sub/direct_transfer?user_id=f1431814-716f-34a9-8b71-eb59c21f8d74', {
  reconnection: true,
})

new Vue({
  render: h => h(App)
}).$mount('#app')
