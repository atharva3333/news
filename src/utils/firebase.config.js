// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence, setPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAHXjY0Se7__8wM9Ydey7cSpgmyFRdyB0A",
  authDomain: "social-e6f25.firebaseapp.com",
  projectId: "social-e6f25",
  storageBucket: "social-e6f25.appspot.com",
  messagingSenderId: "986659905802",
  appId: "1:986659905802:web:dfd36072b399590be41af3",
  measurementId: "G-HGSW158PHC"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);

// auth.setPersistence("local");

// follow https://stackoverflow.com/questions/42878179/how-to-persist-a-firebase-login
(async () => {
  await setPersistence(auth, browserLocalPersistence);
})();
