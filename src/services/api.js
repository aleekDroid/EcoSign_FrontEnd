// src/services/api.js
import axios from 'axios';
import localforage from 'localforage'; // 👈 Importamos localforage

// 1. Define una clave para guardar el token
const JWT_TOKEN_STORAGE_KEY = 'jwt_auth_token';
const USER_ROLE_ID = 'user_role';
// 2. Crea la instancia de axios
const api = axios.create({
    baseURL: 'http://localhost:8080'
});

api.interceptors.request.use(
    async (config) => {
        // A. Busca el token en IndexedDB justo antes de enviar
        const token = await localforage.getItem(JWT_TOKEN_STORAGE_KEY);

        // B. Si existe, inyéctalo en el header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Función ASÍNCRONA para establecer (y persistir) el token JWT.
 */
export const setAuthToken = async (token) => {
    if (token) {
        // 3. Aplica el token a los headers de axios
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // 4. GUARDA el token en IndexedDB (asíncrono)
        await localforage.setItem(JWT_TOKEN_STORAGE_KEY, token);

        console.log('[API.js] Token establecido y guardado en IndexedDB.');
    } else {
        // 5. QUITA el token de los headers
        delete api.defaults.headers.common['Authorization'];

        // 6. BORRA el token de IndexedDB (asíncrono)
        await localforage.removeItem(JWT_TOKEN_STORAGE_KEY);

        console.log('[API.js] Token borrado de axios e IndexedDB.');
    }
};

export const setUserRole = async (role) => {
    if (role) {
        // 4. GUARDA el role en IndexedDB (asíncrono)
        await localforage.setItem(USER_ROLE_ID, role);

        console.log('[API.js] Token establecido y guardado en IndexedDB.');
    } else {

        await localforage.removeItem(USER_ROLE_ID);

        console.log('[API.js] Role borrado de axios e IndexedDB.');
    }
};


/**
 * 7. "RE-HIDRATACIÓN" ASÍNCRONA
 * Esta función debe ser llamada por tu app ANTES de cargar
 */
export const rehydrateSession = async () => {
    try {
        const storedToken = await localforage.getItem(JWT_TOKEN_STORAGE_KEY);
        if (storedToken) {
            console.log('[API.js] Sesión re-hidratada desde IndexedDB.');
            await setAuthToken(storedToken);
        } else {
            console.log('[API.js] No se encontró token en IndexedDB.');
        }
    } catch (e) {
        console.error('[API.js] No se pudo re-hidratar la sesión.', e);
        await setAuthToken(null);
    }
};

export default api;