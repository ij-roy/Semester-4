import { initializeApp } from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBDKr94BCGxIt3NlVGP3vbkmWFCd6W8KNM",
    authDomain: "smarthaazri.firebaseapp.com",
    projectId: "smarthaazri",
    storageBucket: "smarthaazri.firebasestorage.app",
    messagingSenderId: "323959621565",
    appId: "1:323959621565:android:173b5d778fa01a078ef4d4"
  };
  

const app = initializeApp(firebaseConfig);
export { app, auth };