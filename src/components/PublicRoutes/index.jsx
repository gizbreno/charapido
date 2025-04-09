import { Navigate } from 'react-router-dom';
import { auth } from '../../firebase';

export default function PublicRoute({ children }) {
  const user = auth.currentUser;
  return user ? <Navigate to="/" /> : children;
}