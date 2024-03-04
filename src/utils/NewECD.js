import { ec } from 'elliptic';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto-js';

class ECDHCurve25519keyPairGeneratorService {
    constructor(aSecret) {
        this.ellipticCurve25519 = new ec('curve25519');
        this.keyPair = this.generateCurve25519KeyPairFromASecret(aSecret);
    }

    generateCurve25519KeyPairFromASecret(aSecret) {
        return this.ellipticCurve25519.keyFromPrivate(aSecret);
        this.keyPair
    }

    getPublicKey() {
        return this.keyPair.getPublic('hex');
    }

    deriveSharedKey(aPublicKey) {
        return this.keyPair.derive(aPublicKey).toString('hex');
    }
}

class AES256EncryptionService {
    constructor(aKey) {
        this.key = Buffer.from(aKey, 'hex');
    }

    encrypt(plainText) {
        const iv = randomBytes(12);
        const cipher = createCipheriv('aes-256-gcm', this.key, iv);
        const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
        const tag = cipher.getAuthTag();
        return {
            encryptedText: encrypted.toString('hex'),
            iv: iv.toString('hex'),
            tag: tag.toString('hex'),
        };
    }

    decrypt(encryptedText, iv, tag) {
        const decipher = createDecipheriv('aes-256-gcm', this.key, Buffer.from(iv, 'hex'));
        decipher.setAuthTag(Buffer.from(tag, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
        return decrypted.toString('utf8');
    }
}

