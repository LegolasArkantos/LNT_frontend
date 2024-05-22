// firebase.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};
// const firebaseConfig = {
//   apiKey: "AIzaSyBBkvVgnjPh-_Lj2PKhb-7CU1DO8vlZc74",
//   authDomain: "learn-and-track.firebaseapp.com",
//   projectId: "learn-and-track",
//   storageBucket: "learn-and-track.appspot.com",
//   messagingSenderId: "648773157425",
//   appId: "1:648773157425:web:17aabdaf2b95d8238dcb10",
//   measurementId: "G-N5Q5ZERVKG"
// };
  

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

export default app;