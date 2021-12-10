import { initializeApp } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore"
import { addDoc, collection, getFirestore,getDocs, query, onSnapshot } from "firebase/firestore"; 
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut ,
  updatePassword,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBay5ILraynSm8MEoiSEAwm7GFZb0osLgc",
  authDomain: "fipugram-70baa.firebaseapp.com",
  projectId: "fipugram-70baa",
  storageBucket: "fipugram-70baa.appspot.com",
  messagingSenderId: "499046831692",
  appId: "1:499046831692:web:2e3a1e23608ae50a7e06e9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Cloud Firestore through Firebase
import 'firebase/firestore'



const db = getFirestore();
//Fetching Data


export {
  firebase,
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut ,
  updatePassword,
  db,
  addDoc,
  collection,
  getFirestore,
  getDocs,
  query,
  onSnapshot
};
