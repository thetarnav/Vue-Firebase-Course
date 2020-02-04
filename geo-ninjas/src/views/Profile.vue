<template>
	<div class="profile container">
		<div v-if="profile" class="card">
			<h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
		</div>
	</div>
</template>

<script>
import { db } from '../firebase/init'

export default {
	name: 'Profile',
	data() {
		return {
			profile: null,
		}
	},
	created() {
		const ref = db.collection('users'),
			{id} = this.$route.params
		ref.doc(id)
			.get()
			.then(user => (this.profile = user.data()))
	},
}
</script>

<style>
</style>