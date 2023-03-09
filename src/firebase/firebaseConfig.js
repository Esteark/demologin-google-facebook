// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpVbmUtZDfpFLAhS4V95Me3a-Ah_yMy_Q",
  authDomain: "fir-logindemo-19689.firebaseapp.com",
  projectId: "fir-logindemo-19689",
  storageBucket: "fir-logindemo-19689.appspot.com",
  messagingSenderId: "1037608247081",
  appId: "1:1037608247081:web:5c97cde6c7abb170c42138",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const facebook = new FacebookAuthProvider();
