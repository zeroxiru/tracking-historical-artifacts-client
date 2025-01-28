
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 console.log(import.meta.env.VITE_apiKey)
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD7e-5OwcMOKJ7nVdpYhBROtz1LLnqVeSQ",
    authDomain: "historical-artifacts-tra-94c22.firebaseapp.com",
    projectId: "historical-artifacts-tra-94c22",
    storageBucket: "historical-artifacts-tra-94c22.firebasestorage.app",
    messagingSenderId: "421192516811",
    appId: "1:421192516811:web:baf1785e1966f575c9874e"
  };
  


 const app = initializeApp(firebaseConfig);
 export default app;
 