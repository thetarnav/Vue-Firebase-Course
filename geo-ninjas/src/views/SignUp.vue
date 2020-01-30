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
				<input type="text" name="alias" v-model="alias" />
			</div>
			<div class="field center last">
				<button class="btn deep-purple">Sign up</button>
			</div>
			<Feedback :message="feedback"/>
		</form>
	</div>
</template>

<script>
import Feedback from '@/components/Feedback'

import slugify from 'slugify'
import db from '@/firebase/init'

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
			this.feedback = null
			if (unfilled) {
				this.feedback = "Don't leave empty " + unfilled.name
				inputErrAn(unfilled)
			}
		},
		signUp() {
			this.checkInput([...document.querySelectorAll('input')])
			if (!this.email || !this.password || !this.alias) return
			this.slug = slugify(this.alias, {
				replacement: '-',
				remove: /[$*_+~.()'"!\-:@]/g,
				lower: true,
			})
			const ref = db.collection('users').doc(this.slug)
			ref.get().then(doc => {
				if (doc.exists) {
					this.feedback = "This alias is already taken"
				}
			})
			console.log(this.slug);
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
	max-width: 400px
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