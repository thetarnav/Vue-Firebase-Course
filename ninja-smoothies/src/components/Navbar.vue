<template>
	<nav class="navbar nav-extended indigo darker-2">
		<div class="nav-content">
			<router-link :to="{ name: 'Home' }">
				<span class="nav-title">Ninja Smoothies</span>
			</router-link>
			<a class="btn-floating btn-large halfway-fab pink">
				<router-link :to="{ name: 'AddSmoothie' }">
					<i class="material-icons">add</i>
				</router-link>
			</a>
		</div>
	</nav>
</template>

<script>
export default {
	name: 'Navbar',
	data() {
		return {}
	},
	methods: {
		redToAddSmoothie() {
			this.$router.push({ name: 'AddSmoothie' })
		},
		redToHome() {
			this.$router.push({ name: 'Home' })
		},
	},
}
</script>

<style scoped lang="sass">
nav
	padding-left: 32px
</style>