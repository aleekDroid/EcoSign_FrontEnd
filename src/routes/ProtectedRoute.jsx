import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import localforage from "localforage";

export default function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await localforage.getItem('jwt_auth_token');
            setAuthenticated(!!token);
            setLoading(false);
        };

        checkAuth();
    }, []);

    if (loading) return <div>Cargando...</div>;

    return authenticated ? children : <Navigate to="/login" replace />;
}