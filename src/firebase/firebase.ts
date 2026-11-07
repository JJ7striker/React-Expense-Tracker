// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "service-desk-ai-a6f00.firebaseapp.com",
  projectId: "service-desk-ai-a6f00",
  storageBucket: "service-desk-ai-a6f00.firebasestorage.app",
  messagingSenderId: "387993455924",
  appId: "1:387993455924:web:9f103c585e74d3f36a6961",
  measurementId: "G-8BMLXXJSCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);