import {getFirestore,collection} from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZumRBmbpd95a0ZvDzRXbzywOt7EyWYgE",
  authDomain: "fmbnk-dcc6d.firebaseapp.com",
  projectId: "fmbnk-dcc6d",
  storageBucket: "fmbnk-dcc6d.firebasestorage.app",
  messagingSenderId: "1044565673563",
  appId: "1:1044565673563:web:d05002a2ad437f20d1217e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const userCollection = collection(db,"users")
