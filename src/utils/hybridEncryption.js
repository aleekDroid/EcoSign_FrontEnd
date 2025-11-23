// HybridEncryption.js
import CryptoJS from "crypto-js";

/**
 * Recibe:
 *  - backendPublicKey (string Base64)
 *  - payload: cualquier objeto JS
 */
export async function hybridEncrypt(backendPublicKeyPem, payload) {
    console.log("📌 Datos en claro a cifrar (UserInputDTO):", payload);

    // 1) Generar clave AES (256 bits)
    const aesKey = CryptoJS.lib.WordArray.random(32); // 32 bytes = 256 bits

    // 2) Generar IV de 16 bytes
    const iv = CryptoJS.lib.WordArray.random(16);

    // 3) Convertir payload → JSON → UTF8
    const jsonPlain = JSON.stringify(payload);

    // 4) Cifrar con AES-256-CBC (obligatorio para Spring Gateway)
    const encryptedAES = CryptoJS.AES.encrypt(jsonPlain, aesKey, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext;

    // 5) Preparar clave pública ECC (PEM → CryptoKey)
    const cleanPem = backendPublicKeyPem
        .replace("-----BEGIN PUBLIC KEY-----", "")
        .replace("-----END PUBLIC KEY-----", "")
        .replace(/\n/g, "");

    const publicKeyDer = Uint8Array.from(atob(cleanPem), c => c.charCodeAt(0));

    const publicKey = await crypto.subtle.importKey(
        "spki",
        publicKeyDer,
        {
            name: "ECDH",
            namedCurve: "P-256"
        },
        true,
        []
    );

    // 6) Generar llave efímera EC
    const ephKeyPair = await crypto.subtle.generateKey(
        { name: "ECDH", namedCurve: "P-256" },
        true,
        ["deriveKey"]
    );

    // 7) Derivar clave mediante ECDH
    const derivedKeyRaw = await crypto.subtle.deriveBits(
        {
            name: "ECDH",
            public: publicKey
        },
        ephKeyPair.privateKey,
        256
    );

    // 8) Cifrar la AESKey con la clave derivada (ECIES-compliant)
    const derivedKey = CryptoJS.enc.Hex.parse(
        Array.from(new Uint8Array(derivedKeyRaw))
            .map(b => ("0" + b.toString(16)).slice(-2))
            .join("")
    );

    const encryptedAesKey = CryptoJS.AES.encrypt(aesKey.toString(CryptoJS.enc.Hex), derivedKey, {
        iv: CryptoJS.enc.Hex.parse("00000000000000000000000000000000"),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).ciphertext;

    // 9) Exportar clave pública efímera del cliente
    const ephPubKeyRaw = await crypto.subtle.exportKey("raw", ephKeyPair.publicKey);
    const ephPubKeyB64 = btoa(String.fromCharCode(...new Uint8Array(ephPubKeyRaw)));

    // 10) Convertir todo a Base64 estándar (NO url-safe)
    const response = {
        encryptedKey: CryptoJS.enc.Base64.stringify(encryptedAesKey),
        encryptedData: CryptoJS.enc.Base64.stringify(encryptedAES),
        iv: CryptoJS.enc.Base64.stringify(iv),
        ephPublicKey: ephPubKeyB64
    };

    console.log("⬆️ PETICIÓN CIFRADA ENVIADA (al Backend):", response);
    return response;
}
