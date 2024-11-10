import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/useUser';

export default function ProtectedRoute() {
  const { user } = useUser();
  return user && user.token ? <Outlet /> : <Navigate to="/signin" />;
}
