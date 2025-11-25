import api from "./api";

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