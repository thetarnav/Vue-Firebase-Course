<template>
	<div class="chat container">
		<h2 class="center teal-text">Real-time chat</h2>
		<div class="card">
			<div class="card-content">
				<ul class="messages">
					<li v-for="{id, name, content, timestamp} in messages" :key="id">
						<span class="teal-text">{{name}}</span>
						<span class="grey-text text-darken-3 message">{{content}}</span>
						<span class="grey-text time">{{timestamp}}</span>
					</li>
				</ul>
			</div>
			<div class="card-action">
				<NewMessage :name="name" />
			</div>
		</div>
	</div>
</template>

<script>
import NewMessage from '../components/NewMessage'
import db from '../firebase/init'

export default {
	name: 'Chat',
	components: {
		NewMessage,
	},
	props: ['name'],
	data() {
		return {
			messages: [],
		}
	},
	created() {
		const ref = db.collection('messages').orderBy('timestamp')
		ref.onSnapshot(snapshot => {
			const changes = snapshot.docChanges()
			changes.forEach(change => {
				if (change.type !== 'added') return

				const doc = change.doc,
					id = doc.id,
					{ name, content, timestamp } = doc.data()
				this.messages.push({
					id,
					name,
					content,
					timestamp,
				})
			})
		})
	},
}
</script>

<style lang="sass" scoped>
.container
	max-width: 400px
h2
	font-size: 2.6em
	margin-bottom: 40px

span
	font-size: 1.4em

.message
	margin-left: 10px

.time
	display: block
	font-size: 1.2em
</style>