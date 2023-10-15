// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const RNfirebaseConfig = {
  apiKey: "AIzaSyCIU-UZsRjKvZBwYWN4InZaDm74atnjHnA",
  authDomain: "stj-gold-app.firebaseapp.com",
  projectId: "stj-gold-app",
  storageBucket: "stj-gold-app.appspot.com",
  messagingSenderId: "726168036110",
  appId: "1:726168036110:web:73d8eed98254b3d1f56d5f"
};


const app = initializeApp(RNfirebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export { app };