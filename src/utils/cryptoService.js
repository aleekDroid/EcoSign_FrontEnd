//cryptoService.js
import {PrivateKey, encrypt, PublicKey} from 'eciesjs';
import { Buffer } from 'buffer';
import { loadClientPrivateKeyHex } from './keyUtils';
import * as secp from '@noble/secp256k1';
import CryptoJS from "crypto-js";
import { ec as EC } from "elliptic";

const ec = new EC("secp256k1");

export const decryptServerResponse = async (payload) => {
    console.log("⬇️ RESPUESTA CIFRADA RECIBIDA:", payload);

    try {
        // VALIDACIÓN rápida
        if (!payload || !payload.encryptedKey || !payload.encryptedData || !payload.iv) {
            throw new Error("Payload incompleto: se necesita encryptedKey, encryptedData e iv.");
        }

        // Llamamos a hybridDecrypt que ya implementaste: hace ECDH/HKDF/AES-GCM y devuelve el JSON/texto descifrado
        const result = await hybridDecrypt(payload);

        // hybridDecrypt ya parsea JSON si corresponde; devolvemos el resultado tal cual
        console.log("✅ Resultado hybridDecrypt:", result);
        return result;

    } catch (err) {
        console.error("❌ ERROR FINAL decryptServerResponse:", err);
        throw err;
    }
};
/**
 * Cifra una petición.
 */
export const encryptClientRequest = async (data, backendPublicKeyBase64) => {
    try {
        // ... (Generación de AES queda IGUAL) ...
        const aesKey = await window.crypto.subtle.generateKey(
            { name: 'AES-GCM', length: 256 }, true, ['encrypt']
        );
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const dataString = JSON.stringify(data);
        const encryptedDataArrayBuffer = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv }, aesKey, new TextEncoder().encode(dataString)
        );
        const aesKeyRaw = await window.crypto.subtle.exportKey('raw', aesKey);
        const aesKeyBuffer = Buffer.from(aesKeyRaw);

        // --- 👇 AQUÍ EL CAMBIO (DE 33 A 65) ---

        const x509KeyBuffer = Buffer.from(backendPublicKeyBase64, 'base64');

        // Java exporta 'secp256k1' como UNCOMPRESSED por defecto (65 bytes).
        // El formato X.509 tiene un header, y la clave cruda está al final.
        // Extraemos los últimos 65 bytes (04 + X + Y).
        const rawPublicKeyBuffer = x509KeyBuffer.slice(x509KeyBuffer.length - 65);

        // Convertir a Hex para eciesjs
        const rawPublicKeyHex = rawPublicKeyBuffer.toString('hex');

        // Validamos rápido antes de enviar (para que veas en consola si funcionó)
        if (rawPublicKeyHex.substring(0, 2) !== '04') {
            console.warn("⚠️ OJO: La clave pública no empieza con '04', podría fallar.");
        }

        // 4. Cifrar la clave AES
        const encryptedKeyBuffer = encrypt(rawPublicKeyHex, aesKeyBuffer);

        const finalPayload = {
            encryptedKey: encryptedKeyBuffer.toString('base64'),
            encryptedData: Buffer.from(encryptedDataArrayBuffer).toString('base64'),
            iv: Buffer.from(iv).toString('base64')
        };

        console.log('⬆️ PETICIÓN CIFRADA ENVIADA (al Backend):', finalPayload);
        return finalPayload;

    } catch (err) {
        console.error('❌ Error al cifrar la petición:', err);
        throw new Error('No se pudo cifrar la petición.');
    }
};

// HYBRID MANUAL DECRYPTION

function hexToBytes(hex) {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return bytes;
}

function bytesToHex(bytes) {
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// ------------------------------------------
// HKDF-SHA256
// ------------------------------------------
function hkdf(inputKeyMaterial, info) {
    const key = CryptoJS.lib.WordArray.create(inputKeyMaterial);
    const salt = CryptoJS.enc.Hex.parse("00000000000000000000000000000000");

    const prk = CryptoJS.HmacSHA256(key, salt);
    const infoWA = CryptoJS.enc.Utf8.parse(info);

    const okm = CryptoJS.HmacSHA256(infoWA, prk);
    return hexToBytes(okm.toString());
}

// ------------------------------------------
// AES-GCM ENCRYPT
// ------------------------------------------
function aesEncrypt(plaintextBytes, keyBytes) {
    const iv = CryptoJS.lib.WordArray.random(12);

    const encrypted = CryptoJS.AES.encrypt(
        CryptoJS.lib.WordArray.create(plaintextBytes),
        CryptoJS.lib.WordArray.create(keyBytes),
        {
            iv,
            mode: CryptoJS.mode.GCM,
            format: CryptoJS.format.OpenSSL,
        }
    );

    return {
        ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
        iv: CryptoJS.enc.Hex.stringify(iv),
    };
}

// ------------------------------------------
// AES-GCM DECRYPT
// ------------------------------------------
function aesDecrypt(ciphertextB64, ivHex, keyBytes) {
    const decrypted = CryptoJS.AES.decrypt(
        {
            ciphertext: CryptoJS.enc.Base64.parse(ciphertextB64),
        },
        CryptoJS.lib.WordArray.create(keyBytes),
        {
            iv: CryptoJS.enc.Hex.parse(ivHex),
            mode: CryptoJS.mode.GCM,
        }
    );

    return new Uint8Array(decrypted.words.length * 4).map((_, i) => {
        const word = decrypted.words[Math.floor(i / 4)];
        return (word >> (24 - (8 * (i % 4)))) & 0xff;
    });
}

// ------------------------------------------
// HYBRID ENCRYPT
// ------------------------------------------
export function hybridEncrypt(serverPubKeyHex, dataObj) {
    const serverPubKey = ec.keyFromPublic(serverPubKeyHex, "hex");

    // 1) Generar clave efímera
    const ephKey = ec.genKeyPair();
    const ephPub = ephKey.getPublic();

    // 2) Obtener secreto ECIES
    const shared = ephKey.derive(serverPubKey.getPublic()); // BN
    const sharedBytes = hexToBytes(shared.toString(16).padStart(64, "0"));

    // 3) HKDF → AES key
    const aesKey = hkdf(sharedBytes, "AES-HKDF");

    // 4) Encriptar datos JSON
    const plaintextBytes = new TextEncoder().encode(JSON.stringify(dataObj));
    const encrypted = aesEncrypt(plaintextBytes, aesKey);

    return {
        encryptedKey: bytesToHex(ephPub.encode("array")),
        encryptedData: encrypted.ciphertext,
        iv: encrypted.iv,
    };
}

// ------------------------------------------
// HYBRID DECRYPT
// ------------------------------------------
export function hybridDecrypt(clientPrivHex, encryptedKeyHex, encryptedData, iv) {
    const clientKey = ec.keyFromPrivate(clientPrivHex, "hex");

    const ephPubBytes = hexToBytes(encryptedKeyHex);
    const ephPub = ec.keyFromPublic(ephPubBytes, "array");

    // ECIES shared secret
    const shared = clientKey.derive(ephPub.getPublic());
    const sharedBytes = hexToBytes(shared.toString(16).padStart(64, "0"));

    // HKDF → AES key
    const aesKey = hkdf(sharedBytes, "AES-HKDF");

    // AES-GCM decrypt
    const decryptedBytes = aesDecrypt(encryptedData, iv, aesKey);
    const jsonString = new TextDecoder().decode(decryptedBytes);

    return JSON.parse(jsonString);
}