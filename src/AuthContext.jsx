import { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from 'firebase/firestore/lite';
import { auth, db } from "./assets/firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [signedInUser, setSignedInUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  const signOutUser = async() => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('korean-vocab.user');
      setSignedInUser(null);
      setCurrentUserId(null);
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

  const updateUserData = async(userId, updatedUser) => {
    const snap = await getDoc(doc(db, "users", userId));
    if(snap.exists()) {
      await setDoc(doc(db, "users", userId), updatedUser);

      setSignedInUser(updatedUser);
      sessionStorage.setItem('korean-vocab.user', JSON.stringify(updatedUser));
    }
  };

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

        const user = {
          firstName,
          lastName,
          email
        };
        sessionStorage.setItem('korean-vocab.user', JSON.stringify(user));
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch(err) {
      throw new Error(err.code);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user) {
        const userId = user.uid;
        setCurrentUserId(userId);
        await fetchUserFromDb(userId);
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={{ signedInUser, currentUserId, authenticateUser, signOutUser, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };