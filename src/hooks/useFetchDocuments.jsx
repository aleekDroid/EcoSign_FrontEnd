import { useState, useEffect } from 'react';
import { getAllDocuments } from '../services/documentService'; 

export function useFetchDocuments() {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getAllDocuments()
            .then(data => {
                setDocuments(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener documentos:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, []); // El array vacío [] asegura que se ejecute sólo al montar el componente.

    return { documents, isLoading, error };
}