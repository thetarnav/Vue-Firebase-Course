<template>
	<div class="profile container">
		<div v-if="profile" class="card">
			<h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
			<ul class="comments collection">
				<li v-for="(comment, index) in comments" :key="index">
					<div class="deep-purple-text">{{comment.from}}</div>
					<div class="grey-text text-darken-2">{{comment.content}}</div>
					<div class="grey-text">{{comment.formatedTime}}</div>
				</li>
			</ul>
			<form @submit.prevent="addComment">
				<div class="field">
					<label for="comment">Add a comment:</label>
					<input type="text" name="comment" v-model="newComment" />
				</div>
				<div class="field">
					<Feedback :message="feedback" />
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import { db } from '../firebase/init'
import moment from 'moment'

export default {
	name: 'Profile',
	components: {
		Feedback: () => import('../components/Feedback'),
	},
	props: ['user'],
	data() {
		return {
			profile: null,
			newComment: null,
			feedback: null,
			comments: [],
		}
	},
	methods: {
		addComment() {
			this.feedback = null
			if (!this.newComment) {
				this.feedback = 'You have to write something'
				return
			}

			db.collection('comments')
				.add({
					to: this.$route.params.id,
					from: this.user.id,
					content: this.newComment,
					timestamp: db._firebaseApp.firebase_.firestore.Timestamp.now(),
				})
				.then(() => (this.newComment = null))
		},
	},
	created() {
		const { id } = this.$route.params

		// profile date
		db.collection('users')
			.doc(id)
			.get()
			.then(user => (this.profile = user.data()))

		// comments
		db.collection('comments')
			.where('to', '==', id)
			.onSnapshot(snapshot => {
				const changes = snapshot.docChanges()
				changes.forEach(change => {
					if (change.type !== 'added') return
					const data = change.doc.data()
					this.comments.unshift({
						from: data.from,
						content: data.content,
						formatedTime: moment(data.timestamp.toMillis()).fromNow(),
					})
				})
			})
	},
}
</script>

<style>
</style>