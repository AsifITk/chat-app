// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEggPEqSkJ9iL1CVyq15H7U1UXA5X6tG4",
  authDomain: "chat-app-4472a.firebaseapp.com",
  databaseURL:
    "https://chat-app-4472a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chat-app-4472a",
  storageBucket: "chat-app-4472a.appspot.com",
  messagingSenderId: "123657185458",
  appId: "1:123657185458:web:f63d9e7a2030d63e8e01ab",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

export { auth, database };
