import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCUy1eU1R5DoQbMmbNf8tX6DAPpnhVyA6A",
  authDomain: "imtihon-532ae.firebaseapp.com",
  projectId: "imtihon-532ae",
  storageBucket: "imtihon-532ae.appspot.com",
  messagingSenderId: "176957101138",
  appId: "1:176957101138:web:32852abda0deda4aebfb8b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);

export { auth, googleProvider };
