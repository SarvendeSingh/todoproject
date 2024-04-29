// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJTxI5mKY_Pq0dqXTaSVmALpylS8b64qI",
  authDomain: "todolist-97aed.firebaseapp.com",
  projectId: "todolist-97aed",
  storageBucket: "todolist-97aed.appspot.com",
  messagingSenderId: "474516017068",
  appId: "1:474516017068:web:7c3193e6b0ab65cf9b7409"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);