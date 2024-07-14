import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAPAtEouiQp7VRAtr08wHvL9_CUC3bynEM",
  authDomain: "real-estate-ff033.firebaseapp.com",
  projectId: "real-estate-ff033",
  storageBucket: "real-estate-ff033.appspot.com",
  messagingSenderId: "312071522450",
  appId: "1:312071522450:web:2de0b82ea24260da53fe4b",
  measurementId: "G-CX3L1CHZB8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

const analytics = getAnalytics(app);

export { app, firestore, storage, analytics };
