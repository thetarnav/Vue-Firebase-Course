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
			lng: 15,
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
				zoom: 5,
				maxZoom: 15,
				minZoom: 3,
				streetViewControl: false,
			})
		},
	},
	mounted() {
		// get user geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				// 1st parameter -> callback function: success
				// updating coords from user geolocation
				pos => {
					const { latitude: lat, longitude: lng } = pos.coords
					this.lat = lat
					this.lng = lng
					this.renderMap()

					// updating user geolocation in the database
					const userId = auth.currentUser.uid,
						collection = db.collection('users')
					collection
						.where('user_id', '==', userId)
						.get()
						.then(snapshot => {
							snapshot.forEach(doc => {
								collection.doc(doc.id).update({
									geolocation: {
										lat,
										lng,
									},
								})
							})
						})
				},
				// 2nd parameter -> callback function: failure
				// logging error
				console.log,
				// 3rd parameter -> options
				// maximumAge: gets stored info about user geolocation if its not older than 1min
				// timeout: max 3s to get the location
				{ maximumAge: 60000, timeout: 3000 },
			)
		} else {
			// positions the map by default values
			this.renderMap()
		}
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