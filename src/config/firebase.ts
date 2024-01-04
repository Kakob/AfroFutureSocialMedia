// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCetkKNYLxnHMsyMlQZcDhA8C0BHYUgLr0",
  authDomain: "react-tutorial-d1483.firebaseapp.com",
  projectId: "react-tutorial-d1483",
  storageBucket: "react-tutorial-d1483.appspot.com",
  messagingSenderId: "1018940150176",
  appId: "1:1018940150176:web:c32480ae6a5d61aea8d4c5",
  measurementId: "G-7SVTDZ27M0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);