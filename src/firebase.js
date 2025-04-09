import { initializeApp } from "firebase/app";
import {
  getAuth,
  RecaptchaVerifier,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8cfpa-XcqEtFZAfG_KSxLTrqek8_K2UE",
  authDomain: "cha-rapido-3e278.firebaseapp.com",
  projectId: "cha-rapido-3e278",
  storageBucket: "cha-rapido-3e278.firebasestorage.app",
  messagingSenderId: "1032507751242",
  appId: "1:1032507751242:web:ce817b6c9d1256691e1fb3",
  measurementId: "G-QGTVQ91BJQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

await setPersistence(auth, browserLocalPersistence);
export { auth, db, RecaptchaVerifier };
