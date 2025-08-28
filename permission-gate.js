// Simple permission gate utility for browser APIs like geolocation
// Returns a promise resolving to { ok, reason, value }
// - ok: boolean indicating permission success
// - reason: optional string describing failure
// - value: optional granted value (e.g., GeolocationPosition)

async function permissionGate(type, options = {}) {
  if (type === 'geolocation') {
    if (!('geolocation' in navigator)) {
      return { ok: false, reason: 'unsupported' };
    }
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
      return { ok: true, value: position };
    } catch (err) {
      let reason = 'error';
      if (typeof err === 'object' && err.code !== undefined) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            reason = 'denied';
            break;
          case err.POSITION_UNAVAILABLE:
            reason = 'unavailable';
            break;
          case err.TIMEOUT:
            reason = 'timeout';
            break;
        }
      }
      return { ok: false, reason };
    }
  }
  return { ok: false, reason: 'unsupported' };
}

window.permissionGate = permissionGate;
