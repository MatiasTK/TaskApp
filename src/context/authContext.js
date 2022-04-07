import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase.js";
import { db } from "../firebase.js";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const authContext = createContext();

export const useAuth = () => {
  /* Hook React para no tener que importar usecontext cada ves que quiero usarlo */
  const context = useContext(authContext);
  if (!context) throw new Error("There is no auth provider");
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const createFirestore = async (collectionData) => {
    try {
      const userId = auth.currentUser.uid;

      const docSnap = await getDoc(doc(db,'users',userId));
      if(docSnap.exists()){
        return;
      }

      const data = collection(db,'users');
      await setDoc(doc(data, userId), {tasks: Array(0), taskname: 'My Tasks', username: (user.displayName || user.email) + ' Task App'});
    } catch (error) {
      console.error("Error añadiendo documento ", error);
    }
  }

  const saveFirestore = async (collectionData) => {
    try {
      const userId = auth.currentUser.uid;
      const data = collection(db,'users');
      await updateDoc(doc(data, userId), collectionData);
    } catch (error) {
      console.error("Error actualizando documento ", error);
    }
  };

  const getFirestore = async (collectionName) => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      return docSnap.data()[collectionName];
    }else{
      return undefined;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe;
  }, []);

  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
        createFirestore,
        saveFirestore,
        getFirestore,
      }}
    >
      {children}
    </authContext.Provider>
  );
}

/* 
Explicacion de este archivo:
Este archivo se va a utilizar para almacenar las credenciales de autenticacion y asi poder pasarle esas credenciales a todos los demas archivos.
Otra cosa que se me ocurre que se podia hacer es pasar las credenciales directamente desde App pero parece que esta es la mejor manera
*/
