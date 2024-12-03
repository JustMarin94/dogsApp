// firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore"; // Import Firestore methods

const firebaseConfig = {
  apiKey: "AIzaSyAcEBsAOa1JT7BhuYNEl3lfkov9veF5fV4",
  authDomain: "dogsapp-6be98.firebaseapp.com",
  projectId: "dogsapp-6be98",
  storageBucket: "dogsapp-6be98.firebasestorage.app",
  messagingSenderId: "777823072053",
  appId: "1:777823072053:web:a4d8d3c0130009e969e67c",
  measurementId: "G-PT1J8PDYL5",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore

// Export the Firestore instance and necessary methods
export { db, collection, getDocs, addDoc };
