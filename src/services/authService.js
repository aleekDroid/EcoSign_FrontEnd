import api, {setAuthToken, setUserId, setUserName, setUserRole} from './api';
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

        // Limpiamos cualquier residuo anterior para evitar conflictos
        await keyUtils.clearClientKeys();

        // --- TAREA 2: LLAMAR A LOGIN CON TODO ---
        console.log('[AuthService] Enviando credenciales y clave pública a /api/auth/login...');
        const response = await api.post('/api/auth/login', {
            email: email,
            password: password
        });

        if (!(response.data && response.data.codeStatus === 'OK')) {
            if(response.status === 429){
                throw new Error('Limite de peticiones alcanzado. Reintentalo en un minuto');
            }
            throw new Error(response.data.message || 'Credenciales inválidas');
        }

        const { entity } = response.data;
        if (entity.status === 'INACTIVO') {
            throw new Error("Este usuario está inactivo. Contacte al administrador.");
        }

        const { token } = entity;
        console.log('[AuthService] Login exitoso. Token (con claim ECC) recibido.');

        // --- TAREA 3: GUARDAR EL TOKEN Y LA CLAVE PRIVADA ---
        const safeName = (entity.name || '').trim();
        const safeLastName = (entity.lastName || '').trim();
        const fullName = `${safeName} ${safeLastName}`.trim() || 'Usuario';

        // Guarda el JWT (que ya tiene la clave pública)
        await setAuthToken(token);
        await setUserRole(entity.roleId);
        await setUserId(entity.id);
        await setUserName(fullName);

        console.log('[AuthService] LOGIN COMPLETO: Token y role privada guardados.');
        return entity;

    } catch (err) {
        console.error('❌ [AuthService] Error en el servicio de login:', err);

        // --- ROLLBACK ---
        await keyUtils.clearClientKeys();

        if (err.response && err.response.status === 429) {
            throw new Error('Demasiados intentos de inicio de sesión. Por favor, inténtelo más tarde.');
        }

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
//  Limpiar también el nombre para que no aparezca al recargar
    await setUserName(null);
    console.log('[AuthService] Cierre de sesión completado.');
};