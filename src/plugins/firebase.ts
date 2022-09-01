import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrDW_geNUSQ_xwJx95jjHbBnkNBpzvsSw",
  authDomain: "vue-axios-30475.firebaseapp.com",
  projectId: "vue-axios-30475",
  storageBucket: "vue-axios-30475.appspot.com",
  messagingSenderId: "901277628208",
  appId: "1:901277628208:web:f538fe236ffdb945e07af5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
