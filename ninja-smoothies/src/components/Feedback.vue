<template>
	<div class="feedback">
		<transition name="feedback-fade" mode="out-in">
			<strong :key="message" class="center-align red-text">{{ message }}</strong>
		</transition>
	</div>
</template>

<script>
export default {
	name: 'Feedback',
	props: ['message'],
}
</script>

<style lang="scss" scoped>
strong {
	display: block;
	height: 22px;
	transition: opacity 0.2s, transform 0.2s;
}
.feedback-fade-enter,
.feedback-fade-leave-to {
	opacity: 0;
	transform: translateY(10px);
}
.feedback-fade-leave-to {
	opacity: 0;
	transform: translateY(-10px);
}
</style>