<template>
	<div class="blogs">
		<h2>Blog</h2>
		<input type="text" v-model="searchTerm" />
		<div v-for="post in filteredPosts" :key="post.id">
			<h3 v-html="post.title"></h3>
			<p>{{ post.body | snippet }}</p>
		</div>
	</div>
</template>

<script>
import axios from 'axios'

const wait = (time, resolveValue) =>
	new Promise(resolve => setTimeout(() => resolve(resolveValue), time))

export default {
	name: 'Blogs',
	data() {
		return {
			posts: [],
			searchTerm: '',
		}
	},
	methods: {},
	computed: {
		filteredPosts(){
			const search = this.searchTerm
			if (search == '' || search == ' ') return this.posts

			const filtered =  this.posts.filter(post => post.title.match(search)),
			regex = new RegExp(search, 'gmi'),
			highlighted = filtered.map(post => ({
				...post,
				title: post.title.replace(regex, `<b class="highlight">${search}</b>`)
				}))
			
			return highlighted
		}
	},
	created() {
		axios
			.get('https://jsonplaceholder.typicode.com/posts/')
			// .then(response => wait(2000, response))
			.then(response => {
				this.posts = response.data
			})
			.catch(console.log)
	},
}
</script>

<style>
.blogs .highlight {
	background: yellow;
}
</style>
