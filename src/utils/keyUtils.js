import { PrivateKey } from 'eciesjs';
import localforage from 'localforage';


// Esta es solo la "etiqueta" o "nombre" para guardar en IndexedDB
const PRIVATE_KEY_STORAGE_KEY = 'client_ecc_private_key';
const PUBLIC_KEY_STORAGE_KEY = 'client_ecc_public_key';
/**
 * Configura localforage (opcional, pero recomendado)
 */
export const setupStorage = () => {
    localforage.config({
        name: 'EcoSignApp',
        storeName: 'keyStore',
        description: 'Almacén seguro para claves de cifrado'
    });
};

/**
 * Genera un nuevo par de claves ECC (pública y privada).
 */
export const generateClientEccKeys = () => {
    const privateKey = new PrivateKey();
    const privateKeyHex = privateKey.toHex();
    const publicKeyHex = privateKey.publicKey.toHex(true);

    return { privateKeyHex, publicKeyHex };
};

/**
 * Guarda la clave privada ECC del cliente en IndexedDB.
 */
export const saveClientPrivateKey = async (privateKeyHex) => {
    console.log('Guardando clave privada en IndexedDB.');
    try {
        await localforage.setItem(PRIVATE_KEY_STORAGE_KEY, privateKeyHex);
    } catch (err) {
        console.error('Error al guardar la clave privada:', err);
    }
};

export const saveClientPublicKey = async (publicKeyHex) => {
    console.log('Guardando clave publica en IndexedDB.');
    try {
        await localforage.setItem(PUBLIC_KEY_STORAGE_KEY, publicKeyHex);
    } catch (err) {
        console.error('Error al guardar la clave publica:', err);
    }
};

/**
 * Carga la clave privada ECC del cliente desde IndexedDB.
 */
export const loadClientPrivateKeyHex = async () => {
    try {
        const key = await localforage.getItem(PRIVATE_KEY_STORAGE_KEY);
        if (!key) {
            throw new Error('Clave privada no encontrada. El usuario debe iniciar sesión.');
        }
        return key;
    } catch (err) {
        console.error('Error al cargar la clave privada:', err);
        throw err;
    }
};

export const loadClientPublicKeyHex = async () => {
    try {
        const key = await localforage.getItem(PUBLIC_KEY_STORAGE_KEY);
        if (!key) {
            throw new Error('Clave public no encontrada. El usuario debe iniciar sesión.');
        }
        return key;
    } catch (err) {
        console.error('Error al cargar la clave publica:', err);
        throw err;
    }
};

/**
 * Borra las claves del cliente (para un cierre de sesión).
 */
export const clearClientKeys = async () => {
    try {
        await localforage.removeItem(PRIVATE_KEY_STORAGE_KEY);
        console.log('Claves de cliente borradas.');
    } catch (err) {
        console.error('Error al borrar las claves:', err);
    }
};