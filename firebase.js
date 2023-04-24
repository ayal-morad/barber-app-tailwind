import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCTUOunp6CFyfGvSZJim4-NsSspOezn_hM",
  authDomain: "my-app-2641d.firebaseapp.com",
  projectId: "my-app-2641d",
  storageBucket: "my-app-2641d.appspot.com",
  messagingSenderId: "114134264187",
  appId: "1:114134264187:web:88fbfb2589cc10221275de",
  databaseURL: "https://my-app-2641d-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// get RealTime database reference
export const database = getDatabase(app);

//create an account in firebase

