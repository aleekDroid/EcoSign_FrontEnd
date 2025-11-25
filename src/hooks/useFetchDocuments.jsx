import { useState, useEffect } from 'react';
import {getAllDocuments, getDocumentsByUserId} from '../services/documentService';
import localforage from "localforage";


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

export function useFetchDocumentsForUser() {

    const [documents, setDocuments] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, totalElements: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);
        setError(null);

        const fetchData = async () => {
            try {
                // 1. Obtenemos el ID del usuario de la BD local
                const userId = await localforage.getItem('user_id');

                if (!userId) {
                    throw new Error("No se encontró el ID de usuario en sesión.");
                }

                // 2. Llamamos al endpoint específico para ese usuario
                // Nota: Este endpoint no parece soportar paginación por query params (?page=1),
                // así que solo pasamos el ID.
                const data = await getDocumentsByUserId(userId);

                if (isMounted) {
                    setDocuments(data.userFiles || []);

                    setPagination({
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.currentPage
                    });
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Error al obtener documentos:", err);
                    setError(err.message);
                }
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        fetchData();

        return () => { isMounted = false; };
    }, []);

    return { documents, pagination, isLoading, error };
}