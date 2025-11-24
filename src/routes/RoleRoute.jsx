import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import localforage from "localforage";

export default function RoleRoute({ children, allowedRoles }) {
    const [loading, setLoading] = useState(true);
    const [allowed, setAllowed] = useState(false);

    useEffect(() => {
        const checkRole = async () => {
            const role = await localforage.getItem("user_role");
            setAllowed(allowedRoles.includes(role));
            setLoading(false);
        };

        checkRole();
    }, []);

    if (loading) return <div>Cargando...</div>;

    return allowed ? children : <Navigate to="/login" replace />;
}
