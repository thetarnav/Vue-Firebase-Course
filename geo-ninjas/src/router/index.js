import Vue from 'vue'
import VueRouter from 'vue-router'
import MapView from '../views/MapView.vue'
import { auth } from '../firebase/init'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'MapView',
		component: MapView,
		meta: {
			requiresAuth: true,
		},
	},
	{
		path: '/signup',
		name: 'SignUp',
		component: () => import('@/views/SignUp.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('@/views/Login.vue'),
	},
	{
		path: '/profile/:id',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
		meta: {
			requiresAuth: true,
		},
	},
]

const router = new VueRouter({
	routes,
	mode: 'history',
})

// check if route requires authentication
router.beforeEach((to, from, next) =>
	to.meta.requiresAuth && auth.currentUser === null
		? next({ name: 'Login' })
		: next(),
)

export default router
