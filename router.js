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
        if(isHome()){
          location.hash = target;
        } else {
          location.href = 'index.html#' + target;
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
