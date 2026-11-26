// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCNVIq7K7C158L_tVVwPUwYhO7AqszkRE",
  authDomain: "amzn-analytics-repository.firebaseapp.com",
  projectId: "amzn-analytics-repository",
  storageBucket: "amzn-analytics-repository.firebasestorage.app",
  messagingSenderId: "375464980244",
  appId: "1:375464980244:web:e6f6c5dbd5b1d3b61e9c01",
  measurementId: "G-GFJHNLVWVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);