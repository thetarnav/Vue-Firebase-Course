import firebase from 'firebase/app'
import config from './firebase_config'

require('firebase/firestore')

// Initialize Firebase
const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()

export default firestore
