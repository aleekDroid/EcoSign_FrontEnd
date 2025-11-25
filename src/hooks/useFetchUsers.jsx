import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/userService';

export function useFetchUsers(page = 1, size = 100, filters = {}) {
    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 0, totalElements: 0 }); // Extra útil
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getAllUsers(page, size, filters)
            .then(data => {
                setUsers(data.users || []);

                // Guardamos la info de paginación por si la necesitas
                setPagination({
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.currentPage
                });

                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener usuarios:", err);
                setError(err.message);
                setIsLoading(false);
            });

    }, [page, size, JSON.stringify(filters)]);

    return { users, pagination, isLoading, error };
}