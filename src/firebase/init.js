import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyA6d9mfp_bgUcoXalcWoh39qIKylG74VFo',
  authDomain: 'resume-app-ff3d7.firebaseapp.com',
  databaseURL: 'https://resume-app-ff3d7.firebaseio.com',
  projectId: 'resume-app-ff3d7',
  storageBucket: 'resume-app-ff3d7.appspot.com',
  messagingSenderId: '751184880825'
}

const fire = firebase.initializeApp(config)

const db = fire.firestore()
const storage = fire.storage()
const auth = firebase.auth()

// Export firebase
export default fire
export {
  auth,
  db,
  storage
}
