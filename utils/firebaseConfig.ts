import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGL1Cw3u8PeW-IUOsLyZF1C02usqFuH10",
  authDomain: "to-do-list-96e2a.firebaseapp.com",
  projectId: "to-do-list-96e2a",
  storageBucket: "to-do-list-96e2a.firebasestorage.app",
  messagingSenderId: "613127523511",
  appId: "1:613127523511:web:82dd1e3cd5bb2854e69132",
  measurementId: "G-33CGWC5QH4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);