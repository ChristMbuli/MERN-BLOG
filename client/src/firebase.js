// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "etando-d1fdc.firebaseapp.com",
  projectId: "etando-d1fdc",
  storageBucket: "etando-d1fdc.appspot.com",
  messagingSenderId: "86749025201",
  appId: "1:86749025201:web:803ddf5ff952f33d00e390",
  measurementId: "G-XWPKYJ11JL"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
