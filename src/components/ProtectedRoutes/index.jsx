import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import {BounceLoader} from 'react-spinners'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); 
  }, []);

  if (user === undefined) {
    // você pode colocar um spinner aqui se quiser
    return <div className="h-full w-full flex items-center justify-center bg-botoes"><BounceLoader color="#5b6f44" size={50} /></div>;
  }

  return user ? children : <Navigate to="/login" />;
}