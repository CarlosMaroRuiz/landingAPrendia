import { Routes, Route } from "react-router-dom";
import { LandingPage } from "../features/landing";
import { LoginPage } from "../features/login";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage/>} />
        </Routes>
    );
};

export default AppRoutes;
