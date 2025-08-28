(function(){
  function isHome(){
    const path = location.pathname;
    return path.endsWith('/') || path.endsWith('/index.html');
  }
  window.router = {
    go(target){
      if(target === 'home'){
        if(isHome()){
          location.hash = '';
        } else {
          location.href = 'index.html';
        }
        return;
      }
      if(target.startsWith('app')){
        const normalized = target.replace('?f=', '#');
        if(isHome()){
          location.hash = normalized;
        } else {
          location.href = 'index.html#' + normalized;
        }
        return;
      }
      if(/^https?:/i.test(target)){
        history.pushState(null, '', location.href);
        location.href = target;
        return;
      }
      location.href = target;
    }
  };
})();
