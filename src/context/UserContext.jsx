import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const auth = getAuth();

  //function to serach user
  const buscarUsuarioPorTelefone = async (numeroTelefone) => {
    try {
      const q = query(
        collection(db, "users"),
        where("phone", "==", numeroTelefone)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        const dados = doc.data();

        return { id: doc.id, ...dados };
      } else {
        console.log("Usuário não encontrado.");
        return null;
      }
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser.phoneNumber);
        const userfinded = buscarUsuarioPorTelefone(
          firebaseUser.phoneNumber
        ).then((uss) => setUser(uss));
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleUpdateUser = async (userData) => {
    let docRef = doc(db, "users", userData.id);
    try {
      setLoadingUpdate(true);
      await updateDoc(docRef, userData);

      setUser(userData);
      setLoadingUpdate(false);
      return { sucess: true };
    } catch (error) {
      console.log(error);
      setLoadingUpdate(false);
      return { sucess: false };
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, handleUpdateUser, loadingUpdate }}
    >
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);
