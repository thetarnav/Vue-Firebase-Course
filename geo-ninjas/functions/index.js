const functions = require('firebase-functions')

// initializing accessibility to firestore database:
const admin = require('firebase-admin')
admin.initializeApp()

// function responsible for checking alias uniqueness
exports.checkAlias = functions.https.onCall((data, context) => {
	const ref = admin
		.firestore()
		.collection('users')
		.doc(data.slug)

	return ref
		.get()
		.then(doc => ({
			unique: !doc.exists,
		}))
		.catch(() => {
			throw new functions.https.HttpsError('failed to connect')
		})
})
