// test-decrypt.js
// npm install eciesjs buffer
const { decrypt } = require('eciesjs');
const { Buffer } = require('buffer');

// --- CONFIGURA ESTOS VALORES con los que imprimiste en consola ---
const privateKeyHex = "a1b39936a791d12fa588d265e7dd0e3a6446deb66ed4630d94448c2d7fe5bf8b";
// El encryptedKey exactamente tal como lo envía el backend (base64)
const encryptedKeyB64 = 'BJem+gbXWC9vYTTCTElX3RdkvyGQaVkAobpCxoNuSt0Sj45pYZGpSVe7AgjvCl+E6+uigad2FjabqQdRGyr4UCeqhM9VNIlFb+42tAIyj4ldEuLtEGDdnzDtMOHrbvQGcYKS3P0J+27jYzVMoAPl0v4dx2kXyoaBdQ2PfL/kzVMY';
// ejemplo: const encryptedKeyB64 = 'BL4PIjI...';
console.log("encryptedKey HEX:");
console.log(Buffer.from(encryptedKeyB64, "base64").toString("hex"));

async function run() {
    try {
        const encBuf = Buffer.from(encryptedKeyB64, 'base64');

        // decrypt(privateKey, encrypted) -> returns aesKey raw bytes (Buffer/Uint8Array)
        const aesKey = decrypt(privateKeyHex, encBuf);
        console.log('AES key length:', aesKey.length);
        console.log('AES key (hex):', Buffer.from(aesKey).toString('hex'));
        console.log('AES key (b64):', Buffer.from(aesKey).toString('base64'));
    } catch (e) {
        console.error('ERROR decrypting in Node:', e);
        if (e && e.stack) console.error(e.stack);
    }
}

run();
