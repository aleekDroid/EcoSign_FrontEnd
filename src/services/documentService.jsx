import api from "./api";
import localforage from "localforage";

const ENDPOINT_URL = 'api/file/get/AllDocuments';

export async function getAllDocuments(page = 1, size = 100, filters = {}) {

    try {
        console.log(`[UserFileService] Solicitando usuarios  Page: ${page}, Size: ${size}`, filters);
        const queryParams = {
            page: page,
            size: size,
            ...filters
        };

        const cleanParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, v]) => v != null && v !== '')
        );

        const response = await api.get(ENDPOINT_URL, {
            params: cleanParams
        });

        const data = response.data;

        if (data.codeStatus === 'OK') {
            return {
                userFiles: data.entity || [],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                currentPage: data.currentPage
            };
        } else {
            throw new Error(data.message || "Error al obtener usuarios");
        }

    } catch (error) {
        console.error("[UserService] Error:", error);
        throw error;
    }
}

export async function getDocumentsByUserId(userId) {
    try {
        const response = await api.get(`/api/file/get/filesBy/${userId}`);
        const data = response.data;

        if (data.codeStatus === 'OK') {
            // Tu endpoint devuelve la lista en 'entity'
            return {
                userFiles: data.entity || [],
                totalPages: 1,
                totalElements: (data.entity || []).length,
                currentPage: 1
            };
        } else {
            throw new Error(data.message || "Error al obtener documentos del usuario");
        }
    } catch (error) {
        console.error("[DocumentService] Error:", error);
        throw error;
    }
}

export async function uploadDocument(file) {
    try {
        // 1. Obtenemos el ID del usuario logueado.
        const userId = await localforage.getItem('user_id');
        if (!userId) throw new Error("No se pudo identificar al usuario (Falta ID).");

        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('fileName', file.name);
        formData.append('category', 'AVISO');

        
        // El backend espera un ENUM, revisar que 'ACTIVO' exista en FileStatus.java
        // Revisar si es activo o active.
        formData.append('status', 'PENDIENTE');

        const response = await api.post('/api/file/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        const data = response.data;

        if (data.codeStatus === 'OK' || response.status === 200) {
            return data.entity;
        } else {
            throw new Error(data.message || "Error al subir el documento");
        }
    } catch (error) {
        console.error("[DocumentService] Error subiendo archivo:", error);
        throw error;
    }
}