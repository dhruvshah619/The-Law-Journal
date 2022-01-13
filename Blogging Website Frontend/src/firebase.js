import firebase from "firebase";
const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyA6hNqummc0XdWsblwcaM4Dp5mulnaAAX0",
  authDomain: "the-law-journal.firebaseapp.com",
  projectId: "the-law-journal",
  storageBucket: "the-law-journal.appspot.com",
  messagingSenderId: "302047557153",
  appId: "1:302047557153:web:371a2163619ee992ddd560",
  measurementId: "G-9FNEWE1RYK"
});
const db=firebaseApp.firestore();
const auth=firebaseApp.auth();
const storage=firebaseApp.storage();
export {db,auth,storage};