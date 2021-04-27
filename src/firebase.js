import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDmYP_Lbcu8RgEi2oHcE5oyy5jEIP5ztM4",
  authDomain: "wash-a2846.firebaseapp.com",
  databaseURL: "https://wash-a2846.firebaseio.com",
  projectId: "wash-a2846",
  storageBucket: "wash-a2846.appspot.com",
  messagingSenderId: "1007400993047",
  appId: "1:1007400993047:web:05ec37d23c3f66b7e13752"
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const path = database.ref("/game");
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();