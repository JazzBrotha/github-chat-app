import firebase from 'firebase'
const config = {
  apiKey: 'AIzaSyBVjw4O9iQBIs2Q8tseXxf7MSayxLCUO4A',
  authDomain: 'simple-gh-chat.firebaseapp.com',
  databaseURL: 'https://simple-gh-chat.firebaseio.com',
  projectId: 'simple-gh-chat',
  storageBucket: 'simple-gh-chat.appspot.com',
  messagingSenderId: '59806792121'
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
