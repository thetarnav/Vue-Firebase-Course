// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from 'firebase/app'

// Add the Firebase products that you want to use
require('firebase/firestore')

// Your web app's Firebase configuration
import firebaseConfig from './firebase_config'

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()

export default firestore
