import firebase from 'firebase/app'
import config from './firebase_config'

require('firebase/firestore')
require('firebase/auth')

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config),
	db = firebaseApp.firestore(),
	auth = firebase.auth()

export { db, auth }
