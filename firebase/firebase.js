// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbgo-42NaY9EDs36su0PDuPjPSb36NhfE",
  authDomain: "reelsapp-9a540.firebaseapp.com",
  projectId: "reelsapp-9a540",
  storageBucket: "reelsapp-9a540.appspot.com",
  messagingSenderId: "346937563279",
  appId: "1:346937563279:web:214cc5529d24caa17c38fa",
  measurementId: "G-PDE9CWK56H"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export {firebase};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);