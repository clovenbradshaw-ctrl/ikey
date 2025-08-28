# iKey

Secure personal information with zero-knowledge encryption. Only your QR code can unlock your data.

## About

iKey helps you generate and manage a secure QR code for your personal information. Public details can assist responders, while private data stays encrypted and can only be unlocked with your password.

The QR code itself is static and never changes. When information needs to be revised, new data is saved to the archive while the original QR image remains the same.

This section explains what iKey is in everyday terms.

iKey helps you create and manage a secure QR code for your personal information. Basic public details like your name or allergies can be viewed by anyone who scans the code, helping emergency responders know how to assist you. Everything private—like addresses, notes, or medical history—is kept locked away and can only be opened when you enter your password.

The QR code image is permanent. If you need to update your information, the new details are stored in the archive but the QR image stays the same, so you don't need to print a new code every time.

## Development

This section is for people who want to work on the project.

This repository contains the iKey web application and related assets. All of the files that make the iKey website work live here. You can open the `.html` files in a browser to see the pages, and the `.js` files contain the code that powers features like encryption and saving.

### Offline Dependencies

For offline use, place `qrcode.min.js` and `jsQR.min.js` in a `vendor/` directory and ensure they are bundled with the application. The loader will attempt to use these local copies first and fall back to the CDN versions if they are missing.

## Dashboard

This explains the main page you see after logging in.

`dashboard.html` provides a streamlined owner view. After login, one password unlocks both the full profile and the Electronic Health Records (EHR) for sensitive records. This keeps everything simple while still protecting private information.

## Three-Layer Encryption

This section describes how your data stays secure.

The iKey vault uses a three-layer design, similar to putting one locked box inside another:

1. **Public layer** – emergency information is locked with the 256-bit key built into your QR code.
2. **Profile layer** – private details use another key created from the QR key and your password.
3. **Vault layer** – health records get their own key created from the same password and then sealed again with the profile key. Even if someone breaks into your profile, the vault stays safe.

See `app.js` for the implementation of this architecture.

## Auto Save

This section tells you how the site saves your work.

Form inputs are automatically stored in the browser after every change. Each edit also triggers a request to archive.org so the current state of the page is captured by the Wayback Machine. When you type into any form, your changes are instantly saved in your browser so you don't lose anything if the page closes. Each time you edit, the page also pings archive.org's Wayback Machine to capture a snapshot of the current state, creating a historical record of your information.
