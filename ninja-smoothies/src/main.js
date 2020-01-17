import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.config.keyCodes = {
	'next-item': [186, 9, 188],
}

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
