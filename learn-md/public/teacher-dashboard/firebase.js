import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import {
  initializeFirestore,
  persistentLocalCache,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkbDbr1QL-9lI4WcYZJPaTiPlNjlvyzxs",
  authDomain: "learn-md-c0119.firebaseapp.com",
  projectId: "learn-md-c0119",
  storageBucket: "learn-md-c0119.firebasestorage.app",
  messagingSenderId: "945956164832",
  appId: "1:945956164832:web:c9d62497e29316f98c2c85"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

export default app;
