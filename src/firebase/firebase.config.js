// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhd8Y-WBwOCbfA-TLdjMCrlJ5w7n6_RWU",
  authDomain: "user-email-authenticatio-cddac.firebaseapp.com",
  projectId: "user-email-authenticatio-cddac",
  storageBucket: "user-email-authenticatio-cddac.appspot.com",
  messagingSenderId: "558275565183",
  appId: "1:558275565183:web:184ed955a7d2cd3381914a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;