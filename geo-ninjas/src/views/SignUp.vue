<template>
	<div class="sign-up container">
		<form class="card-panel" @submit.prevent="signUp">
			<h2 class="center deep-purple-text">Create a new ninja</h2>
			<div class="field">
				<label for="email">Email</label>
				<input type="email" name="email" v-model="email" />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input type="password" name="password" v-model="password" />
			</div>
			<div class="field">
				<label for="alias">Alias</label>
				<input autocomplete="off" type="text" name="alias" v-model="alias" />
			</div>
			<div class="field center last">
				<button class="btn deep-purple">Sign up</button>
			</div>
			<Feedback :message="feedback" />
		</form>
	</div>
</template>

<script>
import Feedback from '@/components/Feedback'

import slugify from 'slugify'
import { db, auth } from '../firebase/init'
import firebase from 'firebase/app'
import functions from 'firebase/functions'

const inputErrAn = input => {
	input.classList.remove('wrong')
	void input.offsetWidth
	input.classList.add('wrong')
}

export default {
	name: 'SignUp',
	components: {
		Feedback,
	},
	data() {
		return {
			email: null,
			password: null,
			alias: null,
			feedback: null,
			slug: null,
		}
	},
	methods: {
		checkInput(inputs) {
			const unfilled = inputs.find(input => !input.value)
			if (unfilled) {
				this.feedback = "Don't leave empty " + unfilled.name
				inputErrAn(unfilled)
			}
		},
		signUp() {
			// checking if every input is filled
			// if not indicates that to the user & stopping function
			this.feedback = null
			this.checkInput([...document.querySelectorAll('input')])
			if (!this.email || !this.password || !this.alias) return

			// now we create slug from inputted alias
			this.slug = slugify(this.alias, {
				replacement: '-',
				remove: /[$*_+~.()'"!\-:@]/g,
				lower: true,
			})

			// checking if the slug already exists in the database
			// and if it does: alerting that to the user & stopping function
			const checkAlias = firebase.functions().httpsCallable('checkAlias')
			checkAlias({ slug: this.slug })
				.then(result => {
					console.log(result.data.unique)
					if (!result.data.unique) {
						this.feedback = 'This alias is already taken'
						inputErrAn(document.querySelector('input[name=alias]'))
						return
					}
					// now we can sign up a new user in the firebase auth:
					auth
						.createUserWithEmailAndPassword(this.email, this.password)
						// if signing up was successful proceeding to creating relative user document inside firestore:
						.then(cred => {
							db.collection('users')
								.doc(this.slug)
								.set({
									alias: this.alias,
									geolocation: null,
									uid: cred.user.uid,
								})
						})
						.then(() => this.$router.push({ name: 'MapView' }))
						.catch(err => (this.feedback = err.message))
				})
				.catch(err => {
					console.error(err)
					this.feedback = 'Something went wrong, Sorry!'
				})
		},
	},
}
</script>

<style lang="sass" scoped>
=angry-wiggle($left: -10px, $right: 10px, $duration: 0.7s, $delay: 0s)
	@keyframes angry-wiggle
		0%
			background: transparent

		16% 
			background: transparent
			transform: translateX(0)

		32%
			transform: translateX($left)

		50%
			transform: translateX($right)
			background: rgba(255,0,0, 0.1)

		66%
			transform: translateX($left * 0.7)

		82%
			transform: translateX(0)

		100%
			background: transparent

	animation: angry-wiggle $duration $delay ease

input.wrong
  +angry-wiggle

.sign-up
	max-width: 450px
	margin-top: 60px
h2
	font-size: 2.4em
	margin-bottom: 20px
.field
	margin: 20px 0
	&.last
		margin-bottom: 12px
form
	padding-bottom: 12px
</style>