// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpYURCd-xiSrkrnPVFIRLFgs0NUPBFNHo",
  authDomain: "netflix-gpt-e2f00.firebaseapp.com",
  projectId: "netflix-gpt-e2f00",
  storageBucket: "netflix-gpt-e2f00.firebasestorage.app",
  messagingSenderId: "1070704863151",
  appId: "1:1070704863151:web:2e30493ed2ffd4f2f5315a",
  measurementId: "G-WQ31CLYJZN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
