import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Welcome',
		component: Welcome,
	},
	{
		path: '/chat',
		name: 'Chat',
		component: () => import('../views/Chat.vue'),
		props: true,
		beforeEnter: (to, from, next) => {
			if (to.params.name) next()
			else next({ name: 'Welcome' })
		}
	},
]

const router = new VueRouter({
	routes,
})

export default router
