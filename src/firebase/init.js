import firebase from 'firebase/app'
// eslint-disable-next-line no-unused-vars
import firestore from 'firebase/firestore'
// eslint-disable-next-line no-unused-vars
import storage from 'firebase/firebase-storage'

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyA6d9mfp_bgUcoXalcWoh39qIKylG74VFo',
  authDomain: 'resume-app-ff3d7.firebaseapp.com',
  databaseURL: 'https://resume-app-ff3d7.firebaseio.com',
  projectId: 'resume-app-ff3d7',
  storageBucket: 'resume-app-ff3d7.appspot.com',
  messagingSenderId: '751184880825'
}

const firebaseApp = firebase.initializeApp(config)
const db = firebaseApp.firestore()
// Export firestore database
export default db
export const resumeStorage = firebaseApp.storage()
