import Vue from 'vue'
import VueRouter from 'vue-router'
import MapView from '../views/MapView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'MapView',
		component: MapView,
	},
]

const router = new VueRouter({
  routes
})

export default router
