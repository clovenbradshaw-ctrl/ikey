(function() {
  const routes = {
    'home': 'showQRTab',
    'app#create': 'showQRTab',
    'app#view': 'showQRTab',
    'app#ehr': 'showHealthRecordsTab',
    'app#resources': 'showResourcesTab',
    'app#911': 'show911Tab'
  };

  function render(state) {
    const handlerName = routes[state] || routes['home'];
    const fn = window[handlerName];
    if (typeof fn === 'function') {
      fn();
    }
  }

  function go(state) {
    history.pushState({ state }, '', '#' + state);
    if (typeof window.handleRoute === 'function') {
      window.handleRoute();
    } else {
      render(state);
    }
  }

  window.addEventListener('popstate', (e) => {
    const state = (e.state && e.state.state) || location.hash.slice(1) || 'home';
    if (typeof window.handleRoute === 'function') {
      window.handleRoute();
    } else {
      render(state);
    }
  });

  window.router = { render, go, routes };
  const initial = location.hash.slice(1) || 'home';
  history.replaceState({ state: initial }, '', '#' + initial);
  render(initial);
})();
