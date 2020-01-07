import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Home from '@/views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import('@/views/About.vue'),
	},
	{
		path: '/profile/:user_id',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
	},
]

const router = new VueRouter({
	routes,
})

export default router
