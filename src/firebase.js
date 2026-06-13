
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAxfHdAS4f2jOV_6-VjbiqvV038NVyOtm0",
  authDomain: "yash-5f600.firebaseapp.com",
  projectId: "yash-5f600",
  storageBucket: "yash-5f600.firebasestorage.app",
  messagingSenderId: "884118857772",
  appId: "1:884118857772:web:0e0010b821dc04e1194989",
  measurementId: "G-W85Z1S6YYM"
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const analytics = getAnalytics(app);
const firestore=getFirestore(app);
export {app,auth ,firestore};