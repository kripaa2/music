import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";   // ⭐ THIS WAS MISSING

const firebaseConfig = {
  apiKey: "AIzaSyAHd2EovG4L_HxSf-7H4uUDCP8aYXr0D4s",
  authDomain: "music-lyrics-app-2da02.firebaseapp.com",
  projectId: "music-lyrics-app-2da02",
  storageBucket: "music-lyrics-app-2da02.firebasestorage.app",
  messagingSenderId: "367556770462",
  appId: "1:367556770462:web:14c348c187856ec21b998f"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);   // ⭐ ABSOLUTELY REQUIRED
