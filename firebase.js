import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTUOunp6CFyfGvSZJim4-NsSspOezn_hM",
  authDomain: "my-app-2641d.firebaseapp.com",
  projectId: "my-app-2641d",
  storageBucket: "my-app-2641d.appspot.com",
  messagingSenderId: "114134264187",
  appId: "1:114134264187:web:88fbfb2589cc10221275de",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

//create an account in firebase
export function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentia) => {
      const US = userCredentia.user;
    })
    .catch((error) => {
      const errorM = error.message;
    });
}
