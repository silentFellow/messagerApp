import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from '@firebase/firestore'

const app = initializeApp({
  apiKey: "AIzaSyDOMiXGhVpUOQ_JNg5EsjpJ2DhxULWRa5U",
  authDomain: "messengerapp-42955.firebaseapp.com",
  databaseURL: "https://messengerapp-42955-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "messengerapp-42955",
  storageBucket: "messengerapp-42955.appspot.com",
  messagingSenderId: "660001933210",
  appId: "1:660001933210:web:e9bbc3d499494d63925c23",
  measurementId: "G-PMQQ9H7ZXB"
})

export const auth = getAuth(app);
export const google = new GoogleAuthProvider();
export const storage = getStorage(app);
export const db = getFirestore(app);