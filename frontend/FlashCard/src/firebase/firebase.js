import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCp1RICqQYEwFgCMvpaLIjlSlubsQJtpLY",
  authDomain: "neuronote-a8f98.firebaseapp.com",
  projectId: "neuronote-a8f98",
  storageBucket: "neuronote-a8f98.firebasestorage.app",
  messagingSenderId: "244913514546",
  appId: "1:244913514546:web:aede90b0aba9807c5eb42b",
  measurementId: "G-CZJ83ER3V0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider()

//Handle Google Login
const handleGoogleLogin = async(setError) => {
  try{
    const result = await signInWithPopup(auth, googleProvider);
    console.log('Google Sign-In:', result.user)
    setError('');
  }catch (err){
    console.log(err);
    setError('Google Sign-In failed');
  }
}

//HANDLE Login using Email and Password
const handleSubmit = async (e, setError) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log('User signed in:', userCred.user);
    setError('');
  } catch (err) {
    console.log(err);
    setError('Invalid email or password');
    throw err; 
  }

  e.target.reset();
};

export {auth, googleProvider, handleGoogleLogin, handleSubmit}