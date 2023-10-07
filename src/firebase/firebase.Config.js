// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZcKvX5qwkavJCi0qEojiDIwNo4Ctbuqk",
  authDomain: "user-email-password-auth-5221a.firebaseapp.com",
  projectId: "user-email-password-auth-5221a",
  storageBucket: "user-email-password-auth-5221a.appspot.com",
  messagingSenderId: "943091332520",
  appId: "1:943091332520:web:52e779d98ce5b33edc199d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;