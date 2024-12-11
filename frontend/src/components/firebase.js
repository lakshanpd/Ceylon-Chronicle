// firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAORYTm7e4CN1z0X8FROe1aArTqReXmIVo",
  authDomain: "ceylon-chronicle.firebaseapp.com",
  projectId: "ceylon-chronicle",
  storageBucket: "ceylon-chronicle.appspot.com",
  messagingSenderId: "442004502127",
  appId: "1:442004502127:web:4029e9a1534defc35d3f9a",
  measurementId: "G-EMKLRP2360",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
// You can also export other Firebase services like auth if needed
export { storage, auth, googleProvider };
