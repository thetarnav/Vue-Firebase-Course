<template>
	<div class="navbar">
		<nav class="deep-purple darken-1">
			<div class="container">
				<router-link :to="{name: 'MapView'}">GeoNinjas</router-link>
				<ul class="right">
					<li>
						<router-link :to="{name: 'SignUp'}">Sign up</router-link>
					</li>
					<li>
						<router-link :to="{name: 'Login'}">Login</router-link>
					</li>
					<li>
						<a @click="logout()">Logout</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
import { auth } from '../firebase/init'

export default {
	name: 'Navbar',
	data() {
		return {}
	},
	methods: {
		logout() {
			auth.signOut().then(() => {
				this.$router.push({ name: 'Login' })
			})
		},
	},
}
</script>

<style>
</style>