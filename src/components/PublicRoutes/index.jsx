import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = ainda carregando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div>Carregando...</div>; // ou um loading spinner
  }

  return user ? <Navigate to="/" /> : children;
}