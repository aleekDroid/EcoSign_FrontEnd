// src/services/api.js
import axios from 'axios';
import localforage from 'localforage';

// 1. Define una clave para guardar el token
const JWT_TOKEN_STORAGE_KEY = 'jwt_auth_token';
const USER_ROLE_ID = 'user_role';
const USER_ID = 'user_id';
const USER_NAME = 'user_name';
// 2. Crea la instancia de axios
const api = axios.create({
    baseURL: 'https://the-workers-gateway.zeabur.app'
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

export const setUserId = async (id) => {
    if (id) {
        // 4. GUARDA el id en IndexedDB (asíncrono)
        await localforage.setItem(USER_ID, id);

        console.log('[API.js] Id establecido y guardado en IndexedDB.');
    } else {

        await localforage.removeItem(USER_ID);

        console.log('[API.js] Id borrado de axios e IndexedDB.');
    }
};

export const setUserName = async (name) => {
    if (name) {
        // 4. GUARDA el name en IndexedDB (asíncrono)
        await localforage.setItem(USER_NAME, name);

        console.log('[API.js] Nombre establecido y guardado en IndexedDB.');
    } else {

        await localforage.removeItem(USER_NAME);

        console.log('[API.js] Nombre borrado de axios e IndexedDB.');
    }
};

export const getUserName = async () => {
    return await localforage.getItem('user_name');
};

export const setUserRole = async (role) => {
    if (role) {
        // 4. GUARDA el role en IndexedDB (asíncrono)
        await localforage.setItem(USER_ROLE_ID, role);

        console.log('[API.js] Role establecido y guardado en IndexedDB.');
    } else {

        await localforage.removeItem(USER_ROLE_ID);

        console.log('[API.js] Role borrado de axios e IndexedDB.');
    }
};

export default api;