import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCtuGCnSZwvJJGow9ejQkMxPpyiMF7NWiA",
    authDomain: "employee-15a38.firebaseapp.com",
    projectId: "employee-15a38",
    storageBucket: "employee-15a38.appspot.com",
    messagingSenderId: "988787229179",
    appId: "1:988787229179:web:5c7090d432f78203cb8b5e",
  };
   
  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export default app;