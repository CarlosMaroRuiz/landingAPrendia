import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/login/services/authService';

export const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
