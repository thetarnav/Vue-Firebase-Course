<template>
	<div v-if="id" class="edit-smoothie container">
		<h2 class="center-align indigo-text">Edit {{title}}</h2>
		<Feedback :message="feedback" />
		<form @submit.prevent="EditSmoothie">
			<div class="field add-ingredient">
				<label for="add-ingredient">Add new ingredient</label>
				<input
					id="ingInput"
					type="text"
					autocomplete="off"
					name="add-ingredient"
					@keydown.prevent.next-item="addIng"
					v-model="another"
				/>
				<div class="ingredients">
					<span
						class="chip actual"
						v-for="(ing, index) in ingredients"
						:key="index"
						@click="delIng(ing)"
					>
						{{ ing }}
						<div class="delete">
							<i class="material-icons">delete</i>
						</div>
					</span>
					<span v-if="another" class="chip written">{{ another }}</span>
				</div>
			</div>
			<div class="center-align">
				<button class="pink btn">Update Smoothie</button>
			</div>
		</form>
	</div>
</template>

<script>
import db from '@/firebase/init'

const inputErrAn = input => {
	input.classList.remove('wrong')
	void input.offsetWidth
	input.classList.add('wrong')
}

export default {
	name: 'EditSmoothie',
	components: {
		Feedback: () => import('../components/Feedback'),
	},
	data() {
		return {
			slug: this.$route.params.slug,
			title: null,
			ingredients: null,
			id: null,
			another: null,
			feedback: null,
		}
	},
	created() {
		const ref = db.collection('smoothies').where('slug', '==', this.slug)
		ref.get().then(snapshot =>
			snapshot.forEach(doc => {
				const { title, ingredients } = doc.data()
				this.title = title
				this.ingredients = ingredients
				this.id = doc.id
			}),
		).catch(err => {
			console.error(err)
			this.$router.push({name: 'Home'})
		})
	},
	methods: {
		addIng() {
			const ing = this.another
			this.feedback = null

			if (!ing) {
				inputErrAn(ingInput)
				this.feedback = 'Ingredient cannot be empty'
				return
			}
			if (this.ingredients.find(item => item === ing)) {
				inputErrAn(ingInput)
				this.feedback = 'This ingredient is already in the recipe'
				return
			}
			this.another = null
			this.ingredients.push(ing)
		},
		delIng(name) {
			this.ingredients = this.ingredients.filter(ing => ing !== name)
		},
		EditSmoothie() {
			let isEmpty = false
			this.feedback = null
			if (!this.ingredients.length) {
				inputErrAn(ingInput)
				this.feedback = 'This smoothie needs some ingredients'
				isEmpty = true
			}
			if (!this.title) {
				inputErrAn(titleInput)
				this.feedback = 'Every Smoothie needs a title'
				isEmpty = true
			}
			if (isEmpty) return

			db.collection('smoothies').doc(this.id)
				.update({
					title: this.title,
					ingredients: this.ingredients,
					slug: this.slug,
				})
				.then(() => this.$router.push({ name: 'Home' }))
				.catch(err => {
					this.feedback = 'Sorry, something went wrong'
					console.error(err)
				})
		},
	},
}
</script>

<style lang="scss" scoped>
@mixin angry-wiggle($left: -10px, $right: 10px, $duration: 0.4s, $delay: 0s) {
	@keyframes angry-wiggle {
		0% {
			border-bottom: 1px solid red;
			box-shadow: 0 1px 0 0 red;
		}
		25% {
			transform: translateX($left);
		}
		50% {
			transform: translateX($right);
		}
		75% {
			transform: translateX($left * 0.7);
		}
		100% {
			transform: translateX(0);
			border-bottom: 1px solid red;
			box-shadow: 0 1px 0 0 red;
		}
	}
	animation: angry-wiggle $duration $delay ease;
}

.edit-smoothie {
	margin-top: 60px;
	padding: 20px;
	max-width: 500px;
}
h2 {
	font-size: 2em;
	margin: 15px auto 20px auto;
}
.field {
	margin-bottom: 30px;
	margin-top: 40px;
	&:first-of-type {
		margin-top: 15px;
	}
}
label {
	font-size: 0.9rem;
}
.ingredients {
	margin-top: 20px;
	min-height: 37px;
}
input[type='text'].wrong {
	@include angry-wiggle;
}
.actual {
	position: relative;
	cursor: pointer;
	.delete {
		opacity: 0;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		display: flex;
		border-radius: 200px;
		background-color: #e4e4e4;

		transition: opacity 0.1s;
	}
	i {
		margin: auto;
		margin-top: 5px;
	}
	&:hover .delete {
		opacity: 1;
	}
}
.written {
	opacity: 0.6;
}
</style>