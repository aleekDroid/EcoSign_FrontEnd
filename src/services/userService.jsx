import api from "./api"; // Tu instancia de Axios configurada con el Token

// Endpoint base (sin el host, ya que api.js tiene baseURL)
const ENDPOINT_URL = '/api/user/get/AllUsers';

/**
 * Obtiene la lista de usuarios paginados y filtrados.
 * @param {number} page - Número de página (empezando en 1 según tu backend)
 * @param {number} size - Tamaño de la página
 * @param {object} filters - Objeto con filtros opcionales (roleId, status, email)
 */
export async function getAllUsers(page = 1, size = 100, filters = {}) {
    try {
        console.log(`[UserService] Solicitando usuarios (Sin Cifrado). Page: ${page}, Size: ${size}`, filters);

        // 1. Construir los parámetros de consulta (Query Params)
        const queryParams = {
            page: page,
            size: size,
            ...filters
        };

        // 2. Limpieza: Eliminamos claves con valor null, undefined o string vacío
        const cleanParams = Object.fromEntries(
            Object.entries(queryParams).filter(([_, v]) => v != null && v !== '')
        );

        // 3. Llamada al API
        const response = await api.get(ENDPOINT_URL, {
            params: cleanParams
        });

        // 4. Procesar respuesta directa (JSON plano)
        const data = response.data;

        if (data.codeStatus === 'OK') {
            return {
                users: data.entity,
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
};

export const deleteUserService = async (userId, statutsParam) => {
    try {
        const status = statutsParam;
        const response = await api.delete(`/api/user/delete/${userId}/${status}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUserRole = async (userId, newRoleId) => {
    try {
        const payload = {
            role: newRoleId
        };
        const response = await api.put(`/api/user/update/${userId}`, payload);
        return response.data;
    } catch (error) {
        throw error;
    }
};