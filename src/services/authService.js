import api, { setAuthToken } from './api';
import * as keyUtils from '../utils/keyUtils';

// Llama a esto una vez para configurar IndexedDB (localforage)
keyUtils.setupStorage();

/*
 * Maneja el login del usuario y la configuración de claves en UN SOLO PASO.
 */
export const loginUser = async (email, password) => {
    console.log(`[AuthService] Iniciando login para: ${email}`);
    try {
        // --- TAREA 1: GENERAR CLAVES PRIMERO ---
        await keyUtils.clearClientKeys();
        const { privateKeyHex, publicKeyHex } = keyUtils.generateClientEccKeys();
        console.log(`[AuthService] Claves ECC generadas (Pública: ${publicKeyHex.substring(0, 20)}...)`);

        // --- TAREA 2: LLAMAR A LOGIN CON TODO ---
        console.log('[AuthService] Enviando credenciales y clave pública a /api/auth/login...');
        const response = await api.post('/api/auth/login', {
            email: email,
            password: password,
            eccToken: publicKeyHex
        });

        if (!(response.data && response.data.codeStatus === 'OK')) {
            throw new Error(response.data.message || 'Credenciales inválidas');
        }

        const { entity } = response.data;
        const { token } = entity; // El 'id' ya no es necesario aquí
        console.log('[AuthService] Login exitoso. Token (con claim ECC) recibido.');

        // --- TAREA 3: GUARDAR EL TOKEN Y LA CLAVE PRIVADA ---
        // Guarda el JWT (que ya tiene la clave pública)
        await setAuthToken(token);

        // Guarda la clave privada (que coincide con la pública que enviamos)
        await keyUtils.saveClientPrivateKey(privateKeyHex);
        await keyUtils.saveClientPublicKey(publicKeyHex);

        console.log('[AuthService] LOGIN COMPLETO: Token y clave privada guardados.');
        return entity;

    } catch (err) {
        console.error('❌ [AuthService] Error en el servicio de login:', err);

        // --- ROLLBACK ---
        await keyUtils.clearClientKeys();

        const errorMessage = err.response?.data?.message || err.message || 'Error al iniciar sesión';
        throw new Error(errorMessage);
    }
};

/**
 * Maneja el cierre de sesión
 */
export const logoutUser = async () => {
    console.log('[AuthService] Iniciando cierre de sesión...');
    await keyUtils.clearClientKeys();
    await setAuthToken(null);
    console.log('[AuthService] Cierre de sesión completado.');
};