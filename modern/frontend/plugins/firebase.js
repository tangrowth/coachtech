import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: "AIzaSyDPu8ZW0KXUQVqFVXk5kSA8P1dc8nhbJHs",
      authDomain: "sample-2e918.firebaseapp.com",
      projectId: "sample-2e918",
      storageBucket: "sample-2e918.appspot.com",
      messagingSenderId: "1012216950212",
      appId: "1:1012216950212:web:738aed0a5647b399234891",
      measurementId: "G-0Q14NW53SP"
    }
  )
}

export default firebase