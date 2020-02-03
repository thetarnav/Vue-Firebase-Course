import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from './firebase/init'

Vue.config.productionTip = false

// wait for firebase auth to init before creating the app:
let app = null
auth.onAuthStateChanged(() => {
	if (app) return
	app = new Vue({
		router,
		render: h => h(App),
	}).$mount('#app')
})
