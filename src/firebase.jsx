import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD7EstqKGmKarMMrsZtIYj84YsQhz1BbYU",
    authDomain: "todo-app-1f2a4.firebaseapp.com",
    databaseURL: "https://todo-app-1f2a4.firebaseio.com",
    projectId: "todo-app-1f2a4",
    storageBucket: "todo-app-1f2a4.appspot.com",
    messagingSenderId: "95290593749",
    appId: "1:95290593749:web:2890922978cca110e42d5c",
    measurementId: "G-8EFL2B4RT7"
  })

  const db = firebaseApp.firestore();

  export default db ;