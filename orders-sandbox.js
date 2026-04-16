// Minimal JS for Orders sandbox
(function(){
  const backBtn = document.getElementById('back-btn');
  if(backBtn) backBtn.addEventListener('click', ()=>{
    // Return to main screen (index.html)
    window.location.href = 'index.html';
  });

  // Load/save editable fields
  const nameEl = document.getElementById('name-text');
  const lvlEl = document.getElementById('lvl-text');
  try {
    const savedName = localStorage.getItem('orders:name');
    const savedLvl = localStorage.getItem('orders:lvl');
    if(savedName && nameEl) nameEl.textContent = savedName;
    if(savedLvl && lvlEl) lvlEl.textContent = savedLvl;
  } catch(e){/* no-op */}

  function persist(el, key){
    if(!el) return;
    el.addEventListener('input', ()=>{
      try{ localStorage.setItem(key, el.textContent); }catch(e){}
    });
  }
  persist(nameEl, 'orders:name');
  persist(lvlEl, 'orders:lvl');

  // Fame control: exposed helper to set fill percent (0-100)
  const fameFill = document.querySelector('.fame-fill');
  window.setFamePercent = (pct)=>{
    if(!fameFill) return;
    const n = Math.max(0, Math.min(100, Number(pct)||0));
    fameFill.style.width = n + '%';
  };

  // Initialize default fame for demo
  if(typeof window.initFame === 'undefined') window.setFamePercent(40);

  // Dev helper: spawn sample card (placeholder)
  window._dev = window._dev || {};
  window._dev.spawnSample = function(){
    const scroll = document.querySelector('.orders-scroll');
    if(!scroll) return;
    const card = document.createElement('div');
    card.className = 'order-card';
    card.style.margin = '8px 0';
    card.style.padding = '12px';
    card.style.background = 'rgba(255,255,255,0.06)';
    card.style.border = '1px solid rgba(0,0,0,0.12)';
    card.textContent = 'Sample order card — реализация позже';
    scroll.appendChild(card);
    return card;
  };

})();
