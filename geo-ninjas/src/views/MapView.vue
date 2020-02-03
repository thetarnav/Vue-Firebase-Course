<template>
	<div class="map-view">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
import { db, auth } from '../firebase/init'

export default {
	name: 'MapView',
	data() {
		return {
			lat: 53,
			lng: -2,
		}
	},
	methods: {
		renderMap() {
			const mapEl = document.querySelector('#map')
			const map = new google.maps.Map(mapEl, {
				center: {
					lat: this.lat,
					lng: this.lng,
				},
				zoom: 6,
				maxZoom: 15,
				minZoom: 3,
				streetViewControl: false,
			})
		},
	},
	mounted() {
		this.renderMap()
		console.log(auth.currentUser);
		
	},
}
</script>

<style lang="sass" scoped>
.google-map 
	width: 100%
	height: 100%
	margin: 0 auto
	background: #fff
	position: absolute
	top: 0
	left: 0
	z-index: -1
</style>