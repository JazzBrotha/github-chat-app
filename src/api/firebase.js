import firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyCrgeXqurYdIT49kFcBdUG5mHwtfvmje88',
  authDomain: 'react-chat-app-ee391.firebaseapp.com',
  databaseURL: 'https://react-chat-app-ee391.firebaseio.com',
  projectId: 'react-chat-app-ee391',
  storageBucket: 'react-chat-app-ee391.appspot.com',
  messagingSenderId: '594522987014'
}
firebase.initializeApp(config)

export const provider = new firebase.auth.GithubAuthProvider()

export const auth = firebase.auth()

// firebase.auth().signOut().then(function() {
//   // Sign-out successful.
// }).catch(function(error) {
//   // An error happened.
// })

export default firebase
