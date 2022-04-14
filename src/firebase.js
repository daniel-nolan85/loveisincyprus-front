import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// firebase config
const config = {
  apiKey: 'AIzaSyD5i-7mzOfElEclsTXHYtMVciGJ8ZgSs90',
  authDomain: 'loveisincyprus-bc07d.firebaseapp.com',
  projectId: 'loveisincyprus-bc07d',
  storageBucket: 'loveisincyprus-bc07d.appspot.com',
  messagingSenderId: '287492142604',
  appId: '1:287492142604:web:679491e689932f2c5e2029',
  measurementId: 'G-L3P9C8YGWR',
};
// initialize firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
