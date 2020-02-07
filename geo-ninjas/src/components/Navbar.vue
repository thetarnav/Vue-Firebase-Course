<template>
	<div class="navbar">
		<nav class="deep-purple darken-1">
			<div class="container">
				<router-link :to="{name: 'MapView'}" class="brand-logo left">GeoNinjas!</router-link>
				<ul class="right">
					<li v-if="!user">
						<router-link :to="{name: 'SignUp'}">Sign up</router-link>
					</li>
					<li v-if="!user">
						<router-link :to="{name: 'Login'}">Login</router-link>
					</li>
					<li v-if="user">
						<router-link
							:to="{
								name: 'Profile',
								params: { id: user.id },
							}"
						>{{ user.alias }}</router-link>
					</li>
					<li v-if="user">
						<a @click="logout()">Logout</a>
					</li>
				</ul>
			</div>
		</nav>
	</div>
</template>

<script>
import { db, auth } from '../firebase/init'

export default {
	name: 'Navbar',
	props: ['user'],
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