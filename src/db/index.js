import firebase from "firebase/app";
import 'firebase/firestore';

const db = firebase.initializeApp(
  {
    apiKey: "AIzaSyCjQgmeUJ6I6aDSKFc2PhtO9iACZ68E_X4",
    authDomain: "servicario-88272.firebaseapp.com",
    databaseURL: "https://servicario-88272.firebaseio.com",
    projectId: "servicario-88272",
    storageBucket: "servicario-88272.appspot.com",
    messagingSenderId: "121234654779",
    appId: "1:121234654779:web:3e3da810f574ed08ea7e1e",
    measurementId: "G-CX5EMCX52G"
  }
).firestore();

export default db;
export const {Timestamp} = firebase.firestore;