import { createContext, useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore/lite';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Firebase
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    stroageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
  }  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  const signOutUser = async() => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('korean-vocab.user');
      setSignedInUser(null);
    } catch(err) {
      console.log(err);
    }
  }

  const saveUserToDb = async(userId) => {
    const user = sessionStorage.getItem('korean-vocab.user');
    if(user) {
      await setDoc(doc(db, "users", userId), JSON.parse(user));
      setSignedInUser(user);
    }
  }

  const fetchUserFromDb = async(userId) => {
    const snap = await getDoc(doc(db, "users", userId));
    if(snap.exists()) {
      const user = snap.data();
      setSignedInUser(user);
      sessionStorage.setItem('korean-vocab.user', JSON.stringify(user));
    }
    else {
      await saveUserToDb(userId);
    }
  }

  const authenticateUser = async(isRegister, email, password, firstName, lastName) => {
    try {
      if(isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);

        try {
          const user = {
            firstName,
            lastName,
            email
          };
          sessionStorage.setItem('korean-vocab.user', JSON.stringify(user));
        } catch(err) {
          console.log(err);
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch(err) {
      switch(err.code) {
        case "auth/email-already-in-use":
          setErrorMessage("email already in use");
          break;
        default:
          setErrorMessage("something went wrong");
      }
    }
  }

  useEffect(() => {
    if(signedInUser) {
      setErrorMessage("");
    }
  }, [signedInUser]);

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        const userId = user.uid;
        await fetchUserFromDb(userId);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signedInUser, authenticateUser, signOutUser, errorMessage, setErrorMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };