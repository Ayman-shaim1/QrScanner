import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDTImEYVtk_TqjxS6VANqjzBxUXzly7d2I",
  authDomain: "e-trajet.firebaseapp.com",
  projectId: "e-trajet",
  storageBucket: "e-trajet.appspot.com",
  messagingSenderId: "860287497741",
  appId: "1:860287497741:web:986b3999e2bcf6f1d94744",
  measurementId: "G-SNKN9TKJNT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
