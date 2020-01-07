<template>
	<div id="app">
		<Navbar :userIds='userIds' />
		<router-view :userIds='userIds' />
	</div>
</template>

<script>
import Navbar from './components/Navbar'

export default {
	name: 'App',
	data() {
		return {
			userIds: ['1', '2', '3', '4'],
		}
	},
	components: {
		Navbar,
	},
}
</script>

<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
