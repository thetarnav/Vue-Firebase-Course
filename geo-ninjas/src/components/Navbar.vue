<template>
	<div class="navbar">
		<nav class="deep-purple darken-1">
			<div class="container">
				<router-link :to="{name: 'MapView'}" class="brand-logo left">GeoNinjas!</router-link>
				<ul class="right">
					<li v-if="!loggedIn">
						<router-link :to="{name: 'SignUp'}">Sign up</router-link>
					</li>
					<li v-if="!loggedIn">
						<router-link :to="{name: 'Login'}">Login</router-link>
					</li>
					<li v-if="loggedIn">
						<a>{{ alias }}</a>
					</li>
					<li v-if="loggedIn">
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
	data() {
		return {
			loggedIn: null,
			alias: null,
		}
	},
	methods: {
		logout() {
			auth.signOut().then(() => {
				this.$router.push({ name: 'Login' })
			})
		},
	},
	created() {
		auth.onAuthStateChanged(user => {
			this.loggedIn = Boolean(user)
			if (user) {
				db.collection('users')
					.where('user_id', '==', user.uid)
					.get()
					.then(snapshot => snapshot.forEach(doc => (this.alias = doc.data().alias)))
					.catch(() => (this.alias = null))
			}
		})
	},
}
</script>

<style>
</style>