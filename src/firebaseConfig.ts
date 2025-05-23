import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoLY2y0yPnELRweInRpsTskrg5FA1OUT4",
  authDomain: "jetlockfx.firebaseapp.com",
  projectId: "jetlockfx",
  storageBucket: "jetlockfx.firebasestorage.app",
  messagingSenderId: "75333179968",
  appId: "1:75333179968:web:546c4bcf25cddc615cdda5",
  measurementId: "G-W66M6HE15S"
};



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries





// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db,analytics };