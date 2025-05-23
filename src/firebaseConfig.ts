import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAoLY2y0yPnELRweInRpsTskrg5FA1OUT4", // Your project's API Key
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "jetlockfx.firebaseapp.com", // Your Auth Domain
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "jetlockfx", // Your Project ID
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "jetlockfx.appspot.com", // Your Cloud Storage Bucket
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "75333179968", // Your Messaging Sender ID (Project Number)
  // appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID_FROM_FIREBASE_CONSOLE", // <<== Get this from Project Settings!
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-490328172" // Your Google Analytics Measurement ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };