import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var fbConfig = {
  apiKey: "AIzaSyDbtUMDnWhw8MPEMIetw4-jRa7p8egZgHI",
  authDomain: "property24mock-bf46a.firebaseapp.com",
  projectId: "property24mock-bf46a",
  storageBucket: "property24mock-bf46a.appspot.com",
  messagingSenderId: "713219223732",
  appId: "1:713219223732:web:086047db8f20c6096a67e1",
  measurementId: "G-81ZL19GNEX"
};
// Initialize Firebase
firebase.initializeApp(fbConfig);
firebase.analytics();

export default fbConfig;