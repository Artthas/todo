import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDndsEVDtusqyYLFvGA1D3tFro8iCN3FXo",
  authDomain: "todo-864ee.firebaseapp.com",
  projectId: "todo-864ee",
  storageBucket: "todo-864ee.appspot.com",
  messagingSenderId: "911715580458",
  appId: "1:911715580458:web:b4508920ae23130c396153",
  measurementId: "G-K415XXMP25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
export const db = getFirestore(app);
