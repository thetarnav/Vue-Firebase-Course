<template>
	<div id="app">
		<Navbar :user="user" />
		<router-view :user="user" />
	</div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

import { db, auth } from './firebase/init'

export default {
	components: {
		Navbar,
	},
	data() {
		return {
			user: null,
		}
	},
	created() {
		auth.onAuthStateChanged(user => {
			if (user) {
				db.collection('users')
					.where('uid', '==', user.uid)
					.get()
					.then(snapshot =>
						snapshot.forEach(
							doc =>
								(this.user = {
									...doc.data(),
									id: doc.id,
								}),
						),
					)
			} else {
				this.user = null
			}
		})
	},
}
</script>

<style lang="sass">
body
	background: #efefef
.card, .card-panel
	box-shadow: none
</style>
