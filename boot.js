let bootstrapped = false;

function bootstrap() {
  if (bootstrapped) {
    console.warn('bootstrap() has already been called');
    return;
  }
  bootstrapped = true;

  // Initialize translations if app bundle provides handler
  if (window.appBundle && typeof window.appBundle.init === 'function') {
    window.appBundle.init();
  }

  // Initialize optional modules
  const modules = [
    window.indexPage,
    window.appModule,
    window.sessionModule,
    window.notesPage,
    window.privacyPage
  ];
  modules.forEach(mod => {
    if (mod && typeof mod.init === 'function') {
      mod.init();
    }
  });

  // Bind global router
  if (typeof window.handleRoute === 'function') {
    window.addEventListener('hashchange', window.handleRoute);
    window.handleRoute();
  }
}

window.bootstrap = bootstrap;
document.addEventListener('DOMContentLoaded', bootstrap);
