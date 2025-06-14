import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyANhyCJjWKajMIylI0oYkauQHw2K_znk0Y",
  authDomain: "vibecheck-98275.firebaseapp.com",
  projectId: "vibecheck-98275",
  storageBucket: "vibecheck-98275.firebasestorage.app",
  messagingSenderId: "873843638444",
  appId: "1:873843638444:web:7cc474317c8cc178e8df09",
  measurementId: "G-48CTPM9B9R",
  databaseURL: "https://vibecheck-98275.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
