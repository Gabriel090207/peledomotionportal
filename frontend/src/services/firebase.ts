// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyALk5CEJwp13eZRm4HDNiq03clY8h4LyQw",
  authDomain: "pele-do-motion.firebaseapp.com",
  projectId: "pele-do-motion",
  storageBucket: "pele-do-motion.firebasestorage.app",
  messagingSenderId: "179807111892",
  appId: "1:179807111892:web:8152bc39d82aad784b0941",
  measurementId: "G-93M2XCBP3S"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

