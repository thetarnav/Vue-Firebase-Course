<template>
	<div class="welcome container">
		<div class="card">
			<div class="card-content center-align">
				<h2 class="teal-text">Welcome</h2>
				<form @submit.prevent="enterChat">
					<label for="name">Type your name:</label>
					<input type="text" name="name" v-model="name" />
					<Feedback :message="feedback" />
					<button class="btn teal">Enter Chat</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Welcome',
	components: {
		Feedback: () => import('../components/Feedback'),
	},
	data() {
		return {
			name: null,
			feedback: null,
		}
	},
	methods: {
		enterChat() {
			const { name } = this
			if (!name) this.feedback = 'You must have a name!'
			else this.$router.push({ name: 'Chat', params: { name } })
		},
	},
}
</script>

<style lang="sass" scoped>
.welcome
  max-width: 400px
  margin-top: 100px

h2
  font-size: 3em
  margin-bottom: 30px 

label
  font-size: .9rem

input
  text-align: center
  margin-bottom: 15px

button
  margin: 10px auto
</style>