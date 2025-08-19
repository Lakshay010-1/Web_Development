import crypto from "crypto";

// AES-256-GCM
// AES → Advanced Encryption Standard
// 256 → 256-bit key length (32 bytes)
// GCM → Galois/Counter Mode (a mode of operation for AES)

/*
// Salt
// A salt is a random value that’s added when you derive a cryptographic key from a password.

// KDF
// A Key Derivation Function (KDF) is a cryptographic algorithm that takes some input (like a password or a master key) and
// derives a strong, fixed-length key suitable for encryption or signing.
// Types : PBKDF2, scrypt, Argon2, HKDF, etc.

// KDF + Salt
// A KDF almost always takes two inputs:
// Password / Secret → what the user knows.
// Salt → random value, makes every derived key unique even for the same password.
*/

// --- Key management ---
// Advanced Encryption Standard with a 256-bit (32-byte) key.
// A symmetric algorithm → same key for encrypt and decrypt.
function generateAesKey() {
    return crypto.randomBytes(32);
}

// --- Encrypt ---
function encrypt(message) {

    const key = generateAesKey();

    // IV (Initialization Vector)
    // Random “starting value” for encryption, Prevents two identical plaintexts from producing the same ciphertext with the same key.
    // AES-GCM standard IV size = 12 bytes (96 bits).
    const iv = crypto.randomBytes(12);

    // The encryption process.
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

    // Extra data that you want to protect against tampering but don’t need to encrypt.
    // Stored in plaintext but bound to the ciphertext.
    const aad = `t:${Date.now()}`;
    if (aad) cipher.setAAD(Buffer.isBuffer(aad) ? aad : Buffer.from(aad));

    // The scrambled result of encryption.
    // Looks random, but can be decrypted with key + IV (+ tag + AAD if used).
    const ciphertext = Buffer.concat([
        cipher.update(message, 'utf8'),
        cipher.final()
    ]);

    // Unique to AES-GCM (and other AEAD ciphers).
    // 16 bytes usually.
    // Proves that ciphertext, IV, and AAD were not tampered with.
    // If the tag doesn’t match during decryption → error is thrown.
    const authTag = cipher.getAuthTag();

    return {
        key: key.toString('base64'),
        iv: iv.toString('base64'),
        ciphertext: ciphertext.toString('base64'),
        tag: authTag.toString('base64'),
        aad: aad ? Buffer.from(aad).toString('base64') : undefined
    };
}

// --- Decrypt ---
function decrypt(payload) {
    const key = Buffer.from(payload.key, 'base64');
    const iv = Buffer.from(payload.iv, 'base64');
    const authTag = Buffer.from(payload.tag, 'base64');
    const ciphertext = Buffer.from(payload.ciphertext, 'base64');

    // The decryption process
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

    if (payload.aad) decipher.setAAD(Buffer.from(payload.aad, 'base64'));

    decipher.setAuthTag(authTag);

    try {
        const message = Buffer.concat([
            decipher.update(ciphertext),
            decipher.final()
        ]);
        return message.toString('utf8');
    } catch (e) {
        throw new Error("Decryption failed");
    }
}

export { encrypt, decrypt };