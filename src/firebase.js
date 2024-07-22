// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAzUbsXhRQi84-sxqF2paO3OCPPzI0HZNs",
  authDomain: "financetracker-4abea.firebaseapp.com",
  projectId: "financetracker-4abea",
  storageBucket: "financetracker-4abea.appspot.com",
  messagingSenderId: "997774137362",
  appId: "1:997774137362:web:a44a01074a5df75394a0cb",
  measurementId: "G-0DJLHQQGYH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };