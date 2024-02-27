import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-c609b.firebaseapp.com",
  projectId: "mern-auth-c609b",
  storageBucket: "mern-auth-c609b.appspot.com",
  messagingSenderId: "814541703354",
  appId: "1:814541703354:web:9c6bfb7d6847e778d59a83",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
