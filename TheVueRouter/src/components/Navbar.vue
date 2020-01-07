<template>
	<nav class="navbar">
		<div class="row">
			<router-link :to="{ name: 'Home' }">Home</router-link>|
			<router-link :to="{ name: 'About' }">About</router-link>
		</div>
		<div class="row">
			<h4>Profiles:</h4>
			<router-link
				v-for="userId in userIds"
				:key="userId"
				:to="{ name: 'Profile', params: { user_id: userId } }"
			>{{ userId }}</router-link>
		</div>
		<div class="row">
			<button @click="redirect('Home')">Redirect to Home</button>
			<button @click="redirect(-1)">go back</button>
			<button @click="redirect(1)">go Forward</button>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	props: ['userIds'],
	data() {
		return {}
	},
	methods: {
		redirect(name) {
			typeof name == 'string'
				? this.$router.push({ name })
				: this.$router.go(name)
		},
	},
}
</script>

<style lang="sass" scoped>
nav
	padding: 30px

	a
		display: inline
		padding: 5px
		margin: 0 5px
		font-weight: bold
		color: #2c3e50

		&.router-link-exact-active
			color: purple

.row
	margin-top: 10px

h4
	display: inline
</style>
