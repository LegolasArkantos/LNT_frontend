// firebase.js

import { initializeApp } from 'firebase/app';

// Your Firebase configuration
const firebaseConfig = {

    apiKey: "AIzaSyBBkvVgnjPh-_Lj2PKhb-7CU1DO8vlZc74",
  
    authDomain: "learn-and-track.firebaseapp.com",
  
    projectId: "learn-and-track",
  
    storageBucket: "learn-and-track.appspot.com",
  
    messagingSenderId: "648773157425",
  
    appId: "1:648773157425:web:17aabdaf2b95d8238dcb10",
  
    measurementId: "G-N5Q5ZERVKG"
  
  };
  

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

export default app;