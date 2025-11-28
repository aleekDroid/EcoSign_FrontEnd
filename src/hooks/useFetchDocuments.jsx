import { useState, useEffect, useCallback } from 'react';
import { getAllDocuments, getDocumentsByUserId } from '../services/documentService';
import localforage from "localforage";

// Este hook lo dejamos igual, ya funcionaba bien
export function useFetchDocuments(page = 1, size = 100, filters = {}) {
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ totalPages: 0, totalElements: 0 });

    const fetchDocs = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        getAllDocuments(page, size, filters)
            .then(data => {
                setDocuments(data.userFiles || data.entity || []);
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

    useEffect(() => {
        fetchDocs();
    }, [fetchDocs]);

    return { documents, isLoading, error, pagination, refetch: fetchDocs };
}

// ESTE ES EL QUE MODIFICAMOS PARA ARREGLAR EL ERROR
export function useFetchDocumentsForUser() {

    const [documents, setDocuments] = useState([]);
    const [pagination, setPagination] = useState({ totalPages: 1, totalElements: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Convertimos la lógica en una función reutilizable con useCallback
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // A. Obtenemos el ID del usuario de la BD local
            const userId = await localforage.getItem('user_id');

            if (!userId) {
                throw new Error("No se encontró el ID de usuario en sesión.");
            }

            // B. Llamamos al endpoint
            const data = await getDocumentsByUserId(userId);

            setDocuments(data.userFiles || []);
            setPagination({
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.currentPage
            });

        } catch (err) {
            console.error("Error al obtener documentos del usuario:", err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, []); // Array de dependencias vacío para que no se re-cree constantemente

    // 2. El useEffect ahora solo llama a esa función
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // 3. ¡AQUÍ ESTÁ LA SOLUCIÓN! Agregamos 'refetch: fetchData' al return
    return { 
        documents, 
        pagination, 
        isLoading, 
        error, 
        refetch: fetchData 
    };
};