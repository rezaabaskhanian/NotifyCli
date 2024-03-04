import elliptic from "elliptic"
//  import crypto from 'crypto-js'
import { Buffer } from "buffer"
 import CryptoJS from 'react-native-crypto-js';

export class ECDHCurve25519keyPairGeneratorService
{
  ellipticCurve25519;
  keyPair;
  basePointPublicKey;
  sharedSecret;

  constructor (aSecret)
  {
    this.ellipticCurve25519 = new elliptic.ec('curve25519');
    this.generateCurve25519KeyPairFromASecret(aSecret);
    this.getPublicKey();
  }
  generateCurve25519KeyPairFromASecret(aSecret)
  {
    if (!this.keyPair)
    {
      this.keyPair = this.ellipticCurve25519.keyFromPrivate(aSecret);
    }
  }
  getPublicKey()
  {
    if (!this.basePointPublicKey)
    {
      this.basePointPublicKey = this.keyPair.getPublic();
    }
    return this.basePointPublicKey;
  }
  computeSharedKey(aPublicKey)
  {
    if (!this.sharedSecret)
    {
      const basePointPublicKey = this.ellipticCurve25519.keyFromPublic(aPublicKey, "hex").getPublic();
      this.sharedSecret = this.keyPair.derive(basePointPublicKey);
    }
    return this.sharedSecret.toString("hex");
  }
  get publicKey()
  {
    return this.basePointPublicKey.encode("hex", false);
  }
}
// export class AES256EncryptionService


// {
//     key;

//     constructor(aKey)
//     {
       
//         this.key = Buffer.from(aKey, "hex");
//         console.log("sharedSecretddd ",this.key)
//     }
//     encrypt(plainText)
//     {
//         const iv = crypto.randomBytes(12);
//         const cipher = crypto.createCipheriv('aes-256-gcm', this.key, iv);

//         const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
//         const tag = cipher.getAuthTag();

//         return {
//             encryptedText: encrypted.toString('hex'),
//             iv: iv.toString('hex'),
//             tag: tag.toString('hex'),
//         };
//     }
//     decrypt(encryptedText, iv, tag)
//     {
//         console.log("decoding ...", CryptoJS)
//         const decipher = crypto.createDecipheriv("aes-256-gcm", this.key, Buffer.from(iv, 'hex'));
//         console.log("decoding ...")
//         decipher.setAuthTag(Buffer.from(tag, 'hex'));


//         const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedText, 'hex')), decipher.final()]);
//         return decrypted.toString('utf8');
//     }
// }


// export class AES256EncryptionService {
//   key;

//   constructor(aKey) {
//       this.key = CryptoJS.enc.Hex.parse(aKey);
//       console.log("sharedSecretddd ", this.key.toString());
//   }

//   encrypt(plainText) {
//       const iv = CryptoJS.lib.WordArray.random(12);
//       const encrypted = CryptoJS.AES.encrypt(plainText, this.key, {
//           iv: iv,
//           mode: CryptoJS.mode.GCM,
//           padding: CryptoJS.pad.NoPadding
//       });
      
//       return {
//           encryptedText: encrypted.ciphertext.toString(CryptoJS.enc.Hex),
//           iv: iv.toString(CryptoJS.enc.Hex),
//           tag: encrypted.toString()
//       };
//   }

//   decrypt(encryptedText, iv, tag) {
//       const cipherParams = CryptoJS.lib.CipherParams.create({
//           ciphertext: CryptoJS.enc.Hex.parse(encryptedText),
//           iv: CryptoJS.enc.Hex.parse(iv),
//           salt: null,
//           key: this.key,
//           mode: CryptoJS.mode.GCM,
//           padding: CryptoJS.pad.NoPadding
//       });
      
//       const decrypted = CryptoJS.AES.decrypt(cipherParams, this.key, {
//           iv: CryptoJS.enc.Hex.parse(iv),
//           tag: tag
//       });

//       return decrypted.toString(CryptoJS.enc.Utf8);
//   }
// }

export class AES256EncryptionService {
  key;

  constructor(aKey) {
    this.key = CryptoJS.enc.Hex.parse(aKey);
    console.log("Shared Secret:", aKey);
  }

  encrypt(plainText) {
    const iv = CryptoJS.lib.WordArray.random(12);
    const encrypted = CryptoJS.AES.encrypt(plainText, this.key, {
      iv: iv,
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.NoPadding
    });
    
    const ciphertext = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
    const tag = encrypted.toString();

    return {
      encryptedText: ciphertext,
      iv: iv.toString(CryptoJS.enc.Hex),
      tag: tag
    };
  }

  decrypt(encryptedText, iv, tag) {
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Hex.parse(encryptedText),
      iv: CryptoJS.enc.Hex.parse(iv),
      salt: null,
      key: this.key,
      mode: CryptoJS.mode.GCM,
      padding: CryptoJS.pad.NoPadding
    });
  
    try {
      const decrypted = CryptoJS.AES.decrypt(cipherParams, this.key, {
        iv: CryptoJS.enc.Hex.parse(iv),
        tag: tag
      });
  
      const decryptedData = decrypted.toString(CryptoJS.enc.Utf8);
      
      // Log the decrypted data for debugging
      console.log("Decrypted Data:", decryptedData);
  
      return decryptedData;
    } catch (error) {
      console.error("Decryption Error:", error.message);
      return null; // or throw an error based on your error handling strategy
    }
  }
}

