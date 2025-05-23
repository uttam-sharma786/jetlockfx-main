import { initializeApp } from 'firebase/app';
import { getAuth, sendSignInLinkToEmail } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// import { getAnalytics } from "firebase/analytics";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

// Email link authentication function
export const sendEmailLink = async (email) => {
  const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://jetlockfx.firebaseapp.com/finishSignUp',
    // This must be true.
    handleCodeInApp: true,
    iOS: {
      bundleId: 'com.example.ios'
    },
    android: {
      packageName: 'com.example.android',
      installApp: true,
      minimumVersion: '12'
    },
    dynamicLinkDomain: 'jetlockfx.page.link'
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    // The link was successfully sent. Inform the user.
    // Save the email locally so you don't need to ask the user for it again
    // if they open the link on the same device.
    window.localStorage.setItem('emailForSignIn', email);
    console.log('Email link sent successfully');
    return { success: true, message: 'Email link sent successfully' };
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error('Error sending email link:', errorCode, errorMessage);
    return { success: false, error: errorCode, message: errorMessage };
  }
};

export { app, auth, db};