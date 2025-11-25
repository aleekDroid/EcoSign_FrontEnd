import { useState, useEffect } from 'react';
import { getAllDocuments } from '../services/documentService'; 

export function useFetchDocuments(page = 1, size = 100, filters = {}) {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ totalPages: 0, totalElements: 0 }); // Extra útil

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        getAllDocuments()
            .then(data => {
                setDocuments(data.userFiles || []);
                setPagination({
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.currentPage
                });

                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error al obtener documentos:", err);
                setError(err.message);
                setIsLoading(false);
            });
    }, [page, size, JSON.stringify(filters)]);

    return { documents, isLoading, error };
}