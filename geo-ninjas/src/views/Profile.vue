<template>
	<div class="profile container">
		<div v-if="profile" class="card">
			<h2 class="deep-purple-text center">{{profile.alias}}'s Wall</h2>
			<ul class="comments collection">
				<li v-for="(comment, index) in sortedComments" :key="index">
					<div class="line">
						<div class="deep-purple-text from">{{comment.from}}</div>
						<div class="grey-text time">{{comment.formatedTime}}</div>
					</div>
					<p class="grey-text text-darken-2 content">{{comment.content}}</p>
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
	computed: {
		sortedComments() {
			return this.comments.sort((a, b) =>
				a.timestamp < b.timestamp ? 1 : -1,
			)
		},
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
					from: this.user.alias,
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
						timestamp: data.timestamp.seconds,
						formatedTime: moment(data.timestamp.toMillis()).fromNow(),
					})
				})
			})
	},
}
</script>

<style lang="sass" scoped>
.card
	padding: 20px
	margin-top: 60px
h2
	font-size: 2em
	margin-top: 0
ul
	border: none
	max-height: 40vh
	overflow-y: auto

	&::-webkit-scrollbar
		width: 3px
	&::-webkit-scrollbar-track
		background: #ddd
	&::-webkit-scrollbar-thumb
		background: #aaa
li
	padding: 10px 0
	border-bottom: 1px solid #eee
.line
	display: flex
	align-items: center
.time
	font-size: .8em
	padding-top: 3px
	margin-left: 8px
.from
	font-size: 1.1em
	font-weight: 700
.content
	margin: 10px 0
</style>