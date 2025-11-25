import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { LoginPage } from "../features/login";
import { UsersPage } from "../features/gestion/iu/views/UsersPage";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoutes = () => {
    // Placeholder handlers for navigation and logout
    const handleNavigate = (section) => {
        console.log('Navigate to:', section);
    };

    const handleLogout = () => {
        console.log('Logout');
        // Add actual logout logic here
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
