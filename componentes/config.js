// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBo6WsQsBifxcsL5x1cI_THkYq5Zs200jw",
  authDomain: "buddy-393020.firebaseapp.com",
  projectId: "buddy-393020",
  storageBucket: "buddy-393020.appspot.com",
  messagingSenderId: "536023908057",
  appId: "1:536023908057:web:4904308f1ed5771b8408c8",
  measurementId: "G-4HDD2RN33N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);