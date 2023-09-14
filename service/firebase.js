import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCyTFNT4CE8NhqJ7LQVP56F-UsfxiKXm88",
    authDomain: "lms-server-129fb.firebaseapp.com",
    projectId: "lms-server-129fb",
    storageBucket: "lms-server-129fb.appspot.com",
    messagingSenderId: "612371031697",
    appId: "1:612371031697:web:ff32b5845b439864eac130",
    measurementId: "G-B90CNE0KLV"
};

const firebase = () => initializeApp(firebaseConfig);

export default firebase;
