<template>
	<div class="map-view">
		<div class="google-map" id="map"></div>
	</div>
</template>

<script>
import { db } from '../firebase/init'
import firebase from 'firebase/app'

const random = (min, max, mathFunc) => {
	let w = Math.random() * (max - min) + min
	return !mathFunc ? w : Math[mathFunc](w)
}

export default {
	name: 'MapView',
	props: ['user'],
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
			// creating markers from users locations:
			db.collection('users')
				.get()
				.then(snapshot =>
					snapshot.forEach(doc => {
						const data = doc.data(),
							{ latitude: lat, longitude: lng } = data.geolocation,
							position = { lat, lng }

						if (!data.geolocation) return
						const circle = new google.maps.Circle({
							strokeColor: '#ffffff',
							strokeOpacity: 0.7,
							strokeWeight: 1,
							fillColor: '#5e35b1',
							fillOpacity: 0.5,
							center: position,
							radius: 40000,
							map,
						})
						const marker = new google.maps.Marker({
							position: position,
							title: data.alias,
							map,
						})
						// adding click event to the marker:
						marker.addListener('click', () =>
							this.$router.push({
								name: 'Profile',
								params: { id: doc.id },
							}),
						)
					}),
				)
		},
	},
	mounted() {
		this.renderMap()
	},
	watch: {
		user: function() {
			if (!this.user) return
			if (navigator.geolocation)
				navigator.geolocation.getCurrentPosition(
					// 1st parameter -> callback function: success
					// updating coords from user geolocation
					pos => {
						let { latitude: lat, longitude: lng } = pos.coords
						lat += random(-0.2, 0.2)
						lng += random(-0.2, 0.2)
						this.lat = lat
						this.lng = lng

						// updating user geolocation in the database
						db.collection('users')
							.doc(this.user.id)
							.update({
								geolocation: new firebase.firestore.GeoPoint(lat, lng),
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
			this.renderMap()
		},
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