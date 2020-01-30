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
	{
		path: '/signup',
		name: 'SignUp',
		component: () => import('@/views/SignUp.vue'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
