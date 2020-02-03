<template>
	<div class="login container">
		<form class="card-panel" @submit.prevent="login">
			<h2 class="center deep-purple-text">It's time to login!</h2>
			<div class="field">
				<label for="email">Email</label>
				<input type="email" name="email" v-model="email" />
			</div>
			<div class="field">
				<label for="password">Password</label>
				<input type="password" name="password" v-model="password" />
			</div>
			<div class="field center last">
				<button class="btn deep-purple">Login</button>
			</div>
			<Feedback :message="feedback" />
		</form>
	</div>
</template>

<script>
import { auth } from '../firebase/init'
import Feedback from '@/components/Feedback'

const inputErrAn = input => {
	input.classList.remove('wrong')
	void input.offsetWidth
	input.classList.add('wrong')
}

export default {
	name: 'Login',
	components: {
		Feedback,
	},
	data() {
		return {
			email: null,
			password: null,
			feedback: null,
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
		login() {
			// checking if every input is filled
			// if not indicates that to the user & stopping function
			this.feedback = null
			this.checkInput([...document.querySelectorAll('input')])
			if (!this.email || !this.password) return

			auth
				.signInWithEmailAndPassword(this.email, this.password)
				.then(() => this.$router.push({ name: 'MapView' }))
				.catch(err => err.message && (this.feedback = err.message))
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

.login
	max-width: 500px
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