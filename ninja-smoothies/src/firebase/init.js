// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
var firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/firestore");

// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: 'AIzaSyB-Ul6_VcJN3tg34tDexP0m25giDej8J9M',
	authDomain: 'udemy-vue-course-smoothies.firebaseapp.com',
	databaseURL: 'https://udemy-vue-course-smoothies.firebaseio.com',
	projectId: 'udemy-vue-course-smoothies',
	storageBucket: 'udemy-vue-course-smoothies.appspot.com',
	messagingSenderId: '229295936000',
	appId: '1:229295936000:web:9bddeee4e3152dc2e7fee5',
	measurementId: 'G-QDQFWGSNS2',
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

const firestore = firebaseApp.firestore()

export default firestore