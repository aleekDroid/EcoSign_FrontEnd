// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9gLp_OUOkmrU1b8g6RcxTZ0zbBLd4ANo",
  authDomain: "ecosignv1.firebaseapp.com",
  projectId: "ecosignv1",
  storageBucket: "ecosignv1.firebasestorage.app",
  messagingSenderId: "506442211688",
  appId: "1:506442211688:web:60d4c461bba676cd5ff6dd",
  measurementId: "G-TG5B71FMSQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);