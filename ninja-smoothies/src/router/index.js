import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/add',
		name: 'AddSmoothie',
		component: () => import('../views/AddSmoothie.vue'),
	},
	{
		path: '/edit/:slug',
		name: 'EditSmoothie',
		component: () => import('../views/EditSmoothie.vue'),
	},
]

const router = new VueRouter({
  routes
})

export default router
