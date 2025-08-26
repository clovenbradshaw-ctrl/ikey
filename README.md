# iKey

Secure personal information with zero-knowledge encryption. Only your QR code can unlock your data.

## About

iKey helps you generate and manage a secure QR code for your personal information. Public details can assist responders, while private data stays encrypted and can only be unlocked with your password.

The QR code itself is static and never changes. When information needs to be revised, new data is saved to the archive while the original QR image remains the same.

## Development

This repository contains the iKey web application and related assets.

## Three-Layer Encryption

The iKey vault uses a three-layer design to protect data:

1. **Public layer** – emergency information is encrypted using the QR code's 256-bit key.
2. **Profile layer** – private details use a key derived from the QR key and profile password via PBKDF2.
3. **Vault layer** – health records are encrypted with a vault password and then wrapped again with the profile key, leaving the vault unreadable even if profile access is compromised.

See `app.js` for the implementation of this architecture.
