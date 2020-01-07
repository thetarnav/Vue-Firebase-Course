<template>
	<div class="profile">
		<h2>Profile for {{ userId }}</h2>
		<p>
			User is {{ userIds.find(id => id === userId) ? '' : 'not' }} registered
		</p>
	</div>
</template>

<script>
export default {
	name: 'Profile',
	props: ['userIds'],
	data() {
		return {
			userId: this.$route.params.user_id,
		}
	},
	watch: {
		$route: function() {
			this.userId = this.$route.params.user_id
		},
	},
}
</script>

<style></style>
