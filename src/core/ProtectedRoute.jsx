import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../features/login/services/authService';

export const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};
