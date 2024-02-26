import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { initializeApp } from "firebase/app";

var firebaseConfig = {
    apiKey: "AIzaSyCydDfQf65BoKp7SC5lNMPgyIaIwPf6xdw",
    authDomain: "login-e085d.firebaseapp.com",
    projectId: "login-e085d",
    storageBucket: "login-e085d.appspot.com",
    messagingSenderId: "138992350553",
    appId: "1:138992350553:web:5bb4a68683d82e98184848",
    measurementId: "G-MHS9Z9718L"
};

let app = initializeApp(firebaseConfig);
export const dataBase = getFirestore(app);
export const auth = getAuth(app);