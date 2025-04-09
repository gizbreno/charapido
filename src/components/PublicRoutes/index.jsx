import { Navigate } from 'react-router-dom';
import {useEffect} from 'react'
import { auth,configurarPersistencia } from '../../firebase';

export default function PublicRoute({ children }) {
  useEffect(() => {
    configurarPersistencia().catch((e) => {
      console.error('Erro ao configurar persistência:', e);
    });
  }, []);
  const user = auth.currentUser;
  return user ? <Navigate to="/" /> : children;
}