<template>
	<div class="chat container">
		<h2 class="center teal-text">Real-time chat</h2>
		<div class="card">
			<div class="card-content">
				<ul class="messages" v-chat-scroll>
					<li v-for="{ id, name, content, formatedTime } in messages" :key="id">
						<span class="teal-text">{{ name }}</span>
						<span class="grey-text text-darken-3 message">
							{{
							content
							}}
						</span>
						<span class="grey-text time">
							{{
							formatedTime
							}}
						</span>
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
import moment from 'moment'

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
					formatedTime: moment(timestamp).fromNow(),
				})
			})
		})
		window.setInterval(() => {
			this.messages.forEach(message => {
				message.formatedTime = moment(message.timestamp).fromNow()
			})
		}, 60000);
	},
	// computed: {
	// 	reverseOrder(){
	// 		const copy = [...this.messages]
	// 		return copy.reverse()
	// 	}
	// },
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
	font-size: 1em
.messages
	max-height: 300px
	overflow: auto

	&::-webkit-scrollbar
		width: 3px
	&::-webkit-scrollbar-track
		background: #ddd
	&::-webkit-scrollbar-thumb
		background: #aaa
</style>
