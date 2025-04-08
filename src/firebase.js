// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-news-31acd.firebaseapp.com",
  projectId: "mern-news-31acd",
  storageBucket: "mern-news-31acd.firebasestorage.app",
  messagingSenderId: "748762894750",
  appId: "1:748762894750:web:d310a8dbf81a814f90468f",
  measurementId: "G-EV2Y37J9MC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
