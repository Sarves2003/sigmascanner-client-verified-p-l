let curFilter='all';

function ini(n){return n.trim().split(' ').map(w=>w[0]||'').join('').toUpperCase().slice(0,2)||'?'}

function render(){
  renderLinks();
  renderSnaps();
  applyFilterSearch();
  requestAnimationFrame(()=>{
    document.querySelectorAll('.fin').forEach(el=>{
      const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:0.05});
      obs.observe(el);
    });
  });
}

function renderLinks(){
  const g=document.getElementById('linksGrid');
  if(!LINKS.length){g.innerHTML='<div class="empty">No portfolio links yet.</div>';return;}
  g.innerHTML=LINKS.map(p=>`
    <div class="lcard fin" data-type="link" data-name="${p.name.toLowerCase()}" id="card-${p.id}">
      <div style="display:flex;align-items:center;gap:13px">
        <div class="ava">${ini(p.name)}</div>
        <div>
          <div class="vbadge">✓ Verified</div>
          <div class="cname">${p.name}</div>
          <div class="cmeta">
            <div class="mi">📅 ${p.duration}</div>
            <div class="mi">💰 ${p.capital}</div>
          </div>
        </div>
      </div>
      <div class="cactions">
        <a href="${p.link}" target="_blank" rel="noopener" class="btn-prim">View Verified Portfolio ↗</a>
        <button class="btn-cp" onclick="copyLink('${p.link}',this)" title="Copy link">📋</button>
      </div>
    </div>`).join('');
}

function renderSnaps(){
  const g=document.getElementById('snapsGrid');
  if(!SNAPS.length){g.innerHTML='<div class="empty">No snapshots yet.</div>';return;}
  g.innerHTML=SNAPS.map(p=>`
    <div class="scard fin" data-type="snapshot" data-name="${p.name.toLowerCase()}" id="card-${p.id}">
      <div class="sprev" onclick="viewSnap('${p.id}')">
        ${p.image?`<img src="${p.image}" alt="${p.name}" loading="lazy">`:'<div style="display:flex;align-items:center;justify-content:center;height:100%;font-size:2rem;color:var(--tm)">📷</div>'}
        <div class="splbl">📸 Snapshot</div>
      </div>
      <div class="sbody">
        <div class="cname">${p.name}</div>
        <div class="cmeta">
          <div class="mi">📅 ${p.duration}</div>
          <div class="mi">💰 ${p.capital}</div>
        </div>
        <button class="btn-view" onclick="viewSnap('${p.id}')">View Snapshot</button>
      </div>
    </div>`).join('');
}

// COPY
function copyLink(url,btn){
  navigator.clipboard.writeText(url).then(()=>{
    btn.textContent='✓';setTimeout(()=>btn.textContent='📋',2000);
    toast('📋 Link copied!');
  }).catch(()=>toast('Copy failed.'));
}

// VIEW SNAP
function viewSnap(id){
  const it=SNAPS.find(s=>s.id===id);
  if(!it||!it.image)return;
  document.getElementById('viewTitle').textContent=it.name+' — Portfolio Snapshot';
  document.getElementById('viewImg').src=it.image;
  document.getElementById('viewMov').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeView(){document.getElementById('viewMov').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeView();});

// FILTER & SEARCH
function applyFilterSearch(){
  const q=document.getElementById('searchQ').value.toLowerCase().trim();
  document.querySelectorAll('[data-type]').forEach(card=>{
    const nm=card.dataset.name.includes(q);
    const tp=curFilter==='all'||card.dataset.type===curFilter;
    card.style.display=(nm&&tp)?'':'none';
  });
}
function doSearch(){applyFilterSearch();}
function doFilter(t,btn){
  curFilter=t;
  document.querySelectorAll('.fbtn').forEach(b=>b.classList.remove('on'));
  btn.classList.add('on');
  applyFilterSearch();
}

// TOAST
let tt;
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;el.classList.add('on');
  clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),2800);
}

// BOOT
render();
