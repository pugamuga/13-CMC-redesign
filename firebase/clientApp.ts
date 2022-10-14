import firebase from "firebase/app"
import  "firebase/auth"
import  "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    appId: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  };