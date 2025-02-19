import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";
import { setPersistence, browserLocalPersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCFZzi8SRaFo9ceYOvYQqpJeuR1qzQ9z_s",
  authDomain: "tempfirebase-c3828.firebaseapp.com",
  projectId: "tempfirebase-c3828",
  storageBucket: "tempfirebase-c3828.firebasestorage.app",
  messagingSenderId: "581686416201",
  appId: "1:581686416201:web:cdd16bf559466b65eec098",
  measurementId: "G-X9JP402MZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);

// Enable offline persistence
try {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.log('Multiple tabs open. Persistence available in first tab only.');
    } else if (err.code === 'unimplemented') {
      console.log('Browser does not support persistence.');
    }
  });
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// After initializing auth
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log('Persistence set to LOCAL');
  })
  .catch((error) => {
    console.error('Error setting persistence:', error);
  }); 