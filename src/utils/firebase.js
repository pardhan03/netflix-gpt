// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4wU6ROgFkAAhKrmDTvA8kHssmp7kJYiw",
  authDomain: "netflixgpt-80e36.firebaseapp.com",
  projectId: "netflixgpt-80e36",
  storageBucket: "netflixgpt-80e36.appspot.com",
  messagingSenderId: "77052622186",
  appId: "1:77052622186:web:9c60521839fb3e7351a113",
  measurementId: "G-K826928W3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
