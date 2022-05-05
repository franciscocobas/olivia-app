import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8_OTVJIoZlLxbTl49hMNuYx1vNOSUqBI",
  authDomain: "olivia-app-31ec5.firebaseapp.com",
  projectId: "olivia-app-31ec5",
  storageBucket: "olivia-app-31ec5.appspot.com",
  messagingSenderId: "294095486453",
  appId: "1:294095486453:web:9ca4f5c18ea2011ab0f4bc",
};

const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export {app, database};
