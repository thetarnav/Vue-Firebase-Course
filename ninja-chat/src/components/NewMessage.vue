<template>
	<div class="new-message">
		<form @submit.prevent="addMessage">
			<div class="field">
				<label for="new-message">New Message</label>
				<input type="text" name="new-message" v-model="newMessage" />
			</div>
			<button class="btn-small teal">
				<i class="material-icons">send</i>
			</button>
		</form>
		<Feedback :message="feedback" v-if="feedback" />
	</div>
</template>

<script>
import db from '../firebase/init'

export default {
	name: 'NewMessage',
	components: {
		Feedback: () => import('./Feedback'),
	},
	props: ['name'],
	data() {
		return {
			newMessage: null,
			feedback: null,
		}
	},
	methods: {
		addMessage() {
			if (!this.newMessage)
				this.feedback = 'You must enter something in order to send it'
			else if (this.newMessage.length > 100) this.feedback = 'Keep messages shorter please'
			else {
				db.collection('messages')
					.add({
						content: this.newMessage,
						name: this.name,
						timestamp: Date.now(),
					})
					.catch(console.error)
				this.newMessage = null
				this.feedback = null
			}
		},
	},
}
</script>

<style lang="scss" scoped>
form {
	display: flex;
	justify-content: stretch;
	align-items: flex-end;
	margin-bottom: 5px;
}
.field {
	flex-grow: 1;
	margin-right: 20px;
}
button {
	margin-bottom: 5px;
}
</style>