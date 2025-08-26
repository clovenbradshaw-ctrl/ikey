(function(){
  const sizes = { standard: '16px', large: '20px', xlarge: '24px', xxlarge: '32px' };
  const order = Object.keys(sizes);

  window.applyTextSize = function(size) {
    document.documentElement.style.fontSize = sizes[size] || sizes.standard;
  };

  window.changeTextSize = function(delta) {
    const current = localStorage.getItem('ikey_text_size') || 'standard';
    const nextIndex = Math.min(Math.max(order.indexOf(current) + delta, 0), order.length - 1);
    const next = order[nextIndex];
    localStorage.setItem('ikey_text_size', next);
    applyTextSize(next);
  };

  const savedSize = localStorage.getItem('ikey_text_size') || 'standard';
  applyTextSize(savedSize);
})();
