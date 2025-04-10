import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { BounceLoader } from "react-spinners";
import { useEffect, useState } from "react";

export default function PublicRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-botoes">
        <BounceLoader color="#5b6f44" size={50} />
      </div>
    );
  }

  return user ? <Navigate to="/" /> : children;
}
