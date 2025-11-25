import localforage from "localforage";
import api from "./api";

export const signDocument = async (documentId) => {
    try {
        // 1. Obtener ID localmente
        const userId = await localforage.getItem('user_id');

        // 2. Hacer la petición con la estructura exacta del curl
        const payload = {
            documentId: documentId,
            userId: userId
        };

        const response = await api.post('/api/file/sign', payload);

        return response.data;

    } catch (error) {
        throw error;
    }
};