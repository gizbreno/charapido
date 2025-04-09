import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined); // undefined = carregando

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); // limpa o listener quando o componente desmontar
  }, []);

  if (user === undefined) {
    // você pode colocar um spinner aqui se quiser
    return <div>Carregando...</div>;
  }

  return user ? children : <Navigate to="/login" />;
}