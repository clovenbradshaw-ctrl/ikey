(function(){
  async function geolocation(){
    if(!('geolocation' in navigator)){
      return {ok:false, reason:'Geolocation not supported on this device/browser.'};
    }
    const insecure = location.protocol !== 'https:' && location.hostname !== 'localhost';
    if(insecure){
      return {ok:false, reason:'Geolocation requires a secure connection (HTTPS or localhost).'};
    }
    if(navigator.permissions && navigator.permissions.query){
      try{
        const status = await navigator.permissions.query({name:'geolocation'});
        if(status.state === 'denied'){
          return {ok:false, reason:'Location permission denied.'};
        }
      }catch(e){
        // ignore errors and assume prompt
      }
    }
    return {ok:true};
  }
  window.permissionGate = { geolocation };
})();
