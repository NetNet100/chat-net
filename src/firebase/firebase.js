import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAHF0RerSsU5Hna84zRFFaD-ntUOeUQWik",
    authDomain: "startfromnew-9522b.firebaseapp.com",
    databaseURL: "https://startfromnew-9522b.firebaseio.com/",
    projectId: "startfromnew-9522b",
    storageBucket: "startfromnew-9522b.appspot.com",
    messagingSenderId: "77549111294",
    appId: "1:77549111294:web:5c2cd01de3c245e16362af",
    measurementId: "G-EDYZ94ZSZ1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;