import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { LoginPage } from "../features/login";
import { UsersPage, DashboardPage } from "../features/gestion/iu/views";
import { GestionLayout } from "../features/gestion/iu/layouts";
import { ProtectedRoute } from "./ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            {/* Gestion routes with shared layout */}
            <Route
                path="/gestion"
                element={
                    <ProtectedRoute>
                        <GestionLayout title="Registros" />
                    </ProtectedRoute>
                }
            >
                <Route index element={<DashboardPage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="interesados" element={<UsersPage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
