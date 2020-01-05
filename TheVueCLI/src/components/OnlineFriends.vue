<template>
	<div id="onlineFriends">
		<h2>Online Friends</h2>
		<div v-for="(friend, index) in friends" :key="index">
         <i>{{index}}</i>
         <span v-if="friend.online">{{friend.name}}</span>
      </div>
	</div>
</template>

<script>
export default {
	name: 'OnlineFriends',
   props: ["friends"],
	data() {
		return {
			
		}
	},
}
</script>

<style lang="sass" scoped>

</style>