import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { initializeApp } from "firebase/app";

const apiKeyENV = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomainENV = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectIdENV = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucketENV = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderIdENV = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appIdENV = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;
const measurementIdENV = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

const appData ={
  apiKey:apiKeyENV ,
  authDomain:authDomainENV ,
  projectId: projectIdENV,
  storageBucket: storageBucketENV,
  messagingSenderId:messagingSenderIdENV ,
  appId:appIdENV ,
  measurementId: measurementIdENV,
}

console.log(appData)

const app = initializeApp({
  apiKey:apiKeyENV ,
  authDomain:authDomainENV ,
  projectId: projectIdENV,
  storageBucket: storageBucketENV,
  messagingSenderId:messagingSenderIdENV ,
  appId:appIdENV ,
  measurementId: measurementIdENV,
});

export const auth = getAuth(app);

export default app;
