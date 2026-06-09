import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;