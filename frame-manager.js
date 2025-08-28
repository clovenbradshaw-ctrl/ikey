(function(){
  class FrameManager {
    static initParent(){
      window.addEventListener('message', e => {
        const d = e.data;
        if(!d || d.type !== 'frame-resize') return;
        const frame = document.getElementById(d.id);
        if(frame) frame.style.height = d.height + 'px';
      });
    }
    static initChild(id){
      function send(){
        if(window.parent){
          const h = document.body.scrollHeight;
          window.parent.postMessage({type:'frame-resize', id, height:h}, '*');
        }
      }
      window.addEventListener('load', send);
      window.addEventListener('resize', send);
      FrameManager.sendHeight = send;
    }
  }
  window.FrameManager = FrameManager;
})();
