import { Routes, Route, useNavigate } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { LoginPage } from "../features/login";
import { UsersPage } from "../features/gestion/iu/views/UsersPage";
import { ProtectedRoute } from "./ProtectedRoute";
import { logoutUser } from "../features/login/services/authService";

const AppRoutes = () => {
    const navigate = useNavigate();

    // Placeholder handlers for navigation and logout
    const handleNavigate = (section) => {
        console.log('Navigate to:', section);
    };

    const handleLogout = () => {
        logoutUser();
        navigate('/login');
    };

    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage/>} />
            <Route
                path="/gestion"
                element={
                    <ProtectedRoute>
                        <UsersPage onNavigate={handleNavigate} onLogout={handleLogout} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/gestion/interesados"
                element={
                    <ProtectedRoute>
                        <UsersPage onNavigate={handleNavigate} onLogout={handleLogout} />
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
};

export default AppRoutes;
