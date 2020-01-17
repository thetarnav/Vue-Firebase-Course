<template>
	<div class="home container">
		<div v-for="smoothie in smoothies" :key="smoothie.id" class="card" @click="editSmoothie($event, smoothie.slug)" :data-slug="smoothie.slug">
			<div class="card-content">
				<div class="card-management">
					<i class="material-icons management-btn edit">edit</i>
					<i class="material-icons management-btn delete" @click="deleteSmoothie(smoothie.id)">delete</i>
				</div>
				<h2 class="indigo-text">{{ smoothie.title }}</h2>
				<ul class="ingredients">
					<li v-for="(ing, index) in smoothie.ingredients" :key="index">
						<span class="chip">{{ ing }}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import db from '../firebase/init'

export default {
	name: 'Home',
	data() {
		return {
			smoothies: [],
			clickedOn: null,
		}
	},
	methods: {
		deleteSmoothie(id) {
			// delete document from firestore
			db.collection('smoothies')
				.doc(id)
				.delete()
				.then(() => {
					this.smoothies = this.smoothies.filter(
						smoothie => smoothie.id !== id,
					)
				})
		},
		updateSlug(slug){
this.clickedOn = slug
		},
		editSmoothie(e, slug) {
			if (e.target.classList.contains('delete')) return
			
			this.$router.push({ name: 'EditSmoothie', params: { slug } })
		},
	},
	created() {
		// fetch data from firestore
		db.collection('smoothies')
			.get()
			.then(snapshot => {
				// snapshot represents state of 'smoothies' collection in current point of time.
				// collection contains documents, and the document contains fields
				snapshot.forEach(document => {
					let smoothie = document.data()
					smoothie.id = document.id
					this.smoothies.push(smoothie)
				})
			})
	},
}
</script>

<style lang="scss" scoped>
.home {
	display: grid;
	grid-template: 'a a a';
	grid-gap: 30px;
	margin-top: 60px;
}
h2 {
	font-size: 1.8em;
	text-align: center;
	margin-top: 0;
}
.ingredients {
	margin: 30px auto;
}
li {
	display: inline-block;
}
.card {
	cursor: pointer;
}
.card-management {
	position: absolute;
	bottom: 8px;
	right: 8px;

	display: flex;
}
.management-btn {
	margin-left: 2px;
	padding: 4px;
	color: #aaa;
	font-size: 1.4em;

	opacity: 0;
	transition: opacity 0.2s, color 0.1s;
}
.card:hover .management-btn {
	opacity: 1;
}
.management-btn:hover {
	color: rgb(117, 117, 117);
}
</style>
