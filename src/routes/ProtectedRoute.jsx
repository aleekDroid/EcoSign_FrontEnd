import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import localforage from "localforage";

const TOKEN_KEY = "jwt_auth_token";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await localforage.getItem(TOKEN_KEY);
            setAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <div>Cargando...</div>;

    return authenticated ? children : <Navigate to="/login" replace />;
}