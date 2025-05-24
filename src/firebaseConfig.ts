import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAcVuKVGy1C15epg7z289dS9bIQ9Arz4g",
  authDomain: "jetlockfx-ce438.firebaseapp.com",
  projectId: "jetlockfx-ce438",
  storageBucket: "jetlockfx-ce438.firebasestorage.app",
  messagingSenderId: "83719976328",
  appId: "1:83719976328:web:e6d7e9191f82bd01de763d",
  measurementId: "G-EWV7RRZB9N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth,"fjhdsjfhdskfjlshdkjfhasdkjf");

const db = getFirestore(app);
console.log(db);

const analytics = getAnalytics(app);

// // Email link authentication function
// export const sendEmailLink = async (email) => {
//   const actionCodeSettings = {
//     // URL you want to redirect back to. The domain (www.example.com) for this
//     // URL must be in the authorized domains list in the Firebase Console.
//     url: 'https://jetlockfx.firebaseapp.com/finishSignUp',
//     // This must be true.
//     handleCodeInApp: true,
//     iOS: {
//       bundleId: 'com.example.ios'
//     },
//     android: {
//       packageName: 'com.example.android',
//       installApp: true,
//       minimumVersion: '12'
//     },
//     dynamicLinkDomain: 'jetlockfx.page.link'
//   };

//   try {
//     await sendSignInLinkToEmail(auth, email, actionCodeSettings);
//     // The link was successfully sent. Inform the user.
//     // Save the email locally so you don't need to ask the user for it again
//     // if they open the link on the same device.
//     window.localStorage.setItem('emailForSignIn', email);
//     console.log('Email link sent successfully');
//     return { success: true, message: 'Email link sent successfully' };
//   } catch (error) {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error('Error sending email link:', errorCode, errorMessage);
//     return { success: false, error: errorCode, message: errorMessage };
//   }
// };

export { app, auth, db,analytics};