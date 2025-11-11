import { useState, useEffect } from 'react';
import { getAllUsers } from '../services/userService'; 

export function useFetchUsers() {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getAllUsers()
            .then(data => {
                setUsers(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener usuarios:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []); // El array vacío [] asegura que se ejecute solo al montar el componente.

    return { users, isLoading, error };
}