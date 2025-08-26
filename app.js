class IKeyApp {
  // Placeholder base class representing existing iKey functionality.
}

// Implements the three-layer encryption architecture used for QR data,
// profile details and the double-wrapped health vault.
class ThreeLayerEncryption {
  // Generate a random 256-bit key encoded as base64
  static generateQrKey() {
    const buf = self.crypto.getRandomValues(new Uint8Array(32));
    return this.arrayBufferToBase64(buf.buffer);
  }

  static arrayBufferToBase64(buffer) {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  static base64ToArrayBuffer(str) {
    return Uint8Array.from(atob(str), c => c.charCodeAt(0)).buffer;
  }

  static async importKey(base64Key) {
    const raw = this.base64ToArrayBuffer(base64Key);
    return await self.crypto.subtle.importKey(
      'raw',
      raw,
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  static async deriveKey(material, salt, iterations) {
    const enc = new TextEncoder();
    const keyMaterial = await self.crypto.subtle.importKey(
      'raw',
      enc.encode(material),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await self.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );

    const raw = await self.crypto.subtle.exportKey('raw', key);
    return this.arrayBufferToBase64(raw);
  }

  static async encryptObject(obj, keyBase64) {
    const key = await this.importKey(keyBase64);
    const iv = self.crypto.getRandomValues(new Uint8Array(12));
    const data = new TextEncoder().encode(JSON.stringify(obj));
    const encrypted = await self.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    return {
      iv: this.arrayBufferToBase64(iv.buffer),
      data: this.arrayBufferToBase64(encrypted)
    };
  }

  static async decryptObject(encObj, keyBase64) {
    const key = await this.importKey(keyBase64);
    const iv = new Uint8Array(this.base64ToArrayBuffer(encObj.iv));
    const data = this.base64ToArrayBuffer(encObj.data);
    const decrypted = await self.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      data
    );
    const decoded = new TextDecoder().decode(decrypted);
    return JSON.parse(decoded);
  }

  // Build encrypted record and return GUID + qrKey
  // Build encrypted record using a single password for both profile and vault
  static async buildRecord(emergencyInfo, privateInfo, healthRecords, password) {
    const guid = self.crypto.randomUUID();
    const qrKey = this.generateQrKey();

    const profileSalt = self.crypto.getRandomValues(new Uint8Array(16));
    const profileKey = await this.deriveKey(qrKey + password, profileSalt, 100000);

    const vaultSalt = self.crypto.getRandomValues(new Uint8Array(16));
    const vaultKey = await this.deriveKey(password, vaultSalt, 200000);

    const publicData = await this.encryptObject(emergencyInfo, qrKey);
    const privateData = await this.encryptObject(privateInfo, profileKey);

    const innerVault = await this.encryptObject(healthRecords, vaultKey);
    innerVault.salt = this.arrayBufferToBase64(vaultSalt.buffer);

    const vault = await this.encryptObject(innerVault, profileKey);

    return {
      guid,
      qrKey,
      storedData: {
        publicData,
        privateData,
        vault,
        profileSalt: this.arrayBufferToBase64(profileSalt.buffer)
      }
    };
  }

  static async unlockPublic(storedData, qrKey) {
    return await this.decryptObject(storedData.publicData, qrKey);
  }

  // Unlock both private info and wrapped vault using a single password
  static async unlockPrivate(storedData, qrKey, password) {
    const profileSalt = new Uint8Array(this.base64ToArrayBuffer(storedData.profileSalt));
    const profileKey = await this.deriveKey(qrKey + password, profileSalt, 100000);
    const privateInfo = await this.decryptObject(storedData.privateData, profileKey);
    const vaultWrapper = await this.decryptObject(storedData.vault, profileKey);
    return { privateInfo, vault: vaultWrapper };
  }

  // Fully unlock the health vault using the same password
  static async unlockVault(storedData, qrKey, password) {
    const profileSalt = new Uint8Array(this.base64ToArrayBuffer(storedData.profileSalt));
    const profileKey = await this.deriveKey(qrKey + password, profileSalt, 100000);
    const vaultWrapper = await this.decryptObject(storedData.vault, profileKey);
    const vaultSalt = new Uint8Array(this.base64ToArrayBuffer(vaultWrapper.salt));
    const vaultKey = await this.deriveKey(password, vaultSalt, 200000);
    return await this.decryptObject({ iv: vaultWrapper.iv, data: vaultWrapper.data }, vaultKey);
  }
}

class UnifiedHealthApp extends IKeyApp {
  constructor() {
    super();
    this.vaultUnlocked = false;
    this.attachments = new Map();
    this.phvData = { sections: {}, attachments: [] };
  }

  async createAttachment(data, type) {
    // Placeholder for attachment creation and upload.
    const guid = self.crypto.randomUUID();
    this.attachments.set(guid, { data, type });
    this.phvData.attachments.push({ guid, type });
    return guid;
  }

  exportVault() {
    return this.phvData;
  }

  importVault(vaultData) {
    if (!vaultData) return;
    this.phvData = vaultData;
  }

  async loadVault(password) {
    // Placeholder for password verification and vault loading.
    if (window.currentBlob && window.currentBlob.vault) {
      this.importVault(window.currentBlob.vault);
    }
    this.vaultUnlocked = true;
    return true;
  }
}

// Expose a global instance for current UI to interact with
window.healthApp = new UnifiedHealthApp();
