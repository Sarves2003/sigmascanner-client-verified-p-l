let curFilter='all';

/* ---------- ICONS ---------- */
const I={
  check:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
  ext:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>',
  copy:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  cal:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  wallet:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></svg>',
  tag:'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.42 0l8.58-8.58a1 1 0 0 0 0-1.42Z"/><circle cx="7" cy="7" r="1.5"/></svg>',
  eye:'<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  sun:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
  moon:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
};

function ini(n){return n.trim().split(' ').map(w=>w[0]||'').join('').toUpperCase().slice(0,2)||'?'}

/* Logo images missing → fall back to the inline SVG wordmark */
function logoErr(img){img.closest('.logo').classList.add('fallback')}

/* ---------- THEME ---------- */
function applyTheme(t){
  document.documentElement.setAttribute('data-theme',t);
  const btn=document.getElementById('themeToggle');
  if(btn)btn.innerHTML=t==='dark'?I.sun:I.moon;
  try{localStorage.setItem('gs-theme',t)}catch(e){}
}
function toggleTheme(){
  const cur=document.documentElement.getAttribute('data-theme')||'light';
  applyTheme(cur==='dark'?'light':'dark');
}

/* ---------- NAV ---------- */
function toggleNav(){
  const open=document.getElementById('navLinks').classList.toggle('open');
  document.getElementById('navToggle').setAttribute('aria-expanded',open);
}
function closeNav(){
  document.getElementById('navLinks').classList.remove('open');
  document.getElementById('navToggle').setAttribute('aria-expanded','false');
}
window.addEventListener('scroll',()=>{
  document.getElementById('topNav').classList.toggle('scrolled',window.scrollY>8);
},{passive:true});

/* ---------- STATS ---------- */
function parseCap(s){
  const m=String(s).replace(/[₹,\s]/g,'').match(/^([\d.]+)(k|l|cr)?$/i);
  if(!m)return 0;
  const n=parseFloat(m[1]),u=(m[2]||'').toLowerCase();
  return n*(u==='cr'?1e7:u==='l'?1e5:u==='k'?1e3:1);
}
function renderStats(){
  const row=document.getElementById('statsRow');
  if(!row)return;
  const all=[...LINKS,...SNAPS];
  const members=new Set(all.map(x=>x.name.trim().toLowerCase())).size;
  const capL=Math.floor(all.reduce((t,x)=>t+parseCap(x.capital),0)/1e5);
  const stats=[
    {n:members,sfx:'',lbl:'Community members'},
    {n:LINKS.length,sfx:'',lbl:'Live verified links'},
    {n:SNAPS.length,sfx:'',lbl:'P&L snapshots shared'},
    {n:capL,pre:'₹',sfx:'L+',lbl:'Capital represented'}
  ];
  row.innerHTML=stats.map(s=>`
    <div class="stat">
      <div class="stat-v">${s.pre||''}<span class="cnum" data-n="${s.n}">0</span>${s.sfx}</div>
      <div class="stat-l">${s.lbl}</div>
    </div>`).join('');
  const obs=new IntersectionObserver(en=>{
    en.forEach(e=>{
      if(!e.isIntersecting)return;
      obs.unobserve(e.target);
      const target=+e.target.dataset.n,t0=performance.now(),dur=900;
      (function step(t){
        const p=Math.min((t-t0)/dur,1),ease=1-Math.pow(1-p,3);
        e.target.textContent=Math.round(target*ease);
        if(p<1)requestAnimationFrame(step);
      })(t0);
    });
  },{threshold:0.4});
  row.querySelectorAll('.cnum').forEach(el=>obs.observe(el));
}

/* ---------- RENDER ---------- */
function metaChips(p){
  let h='';
  if(p.duration)h+=`<span class="chip">${I.cal}${p.duration}</span>`;
  if(p.capital)h+=`<span class="chip">${I.wallet}${p.capital} capital</span>`;
  if(p.segment)h+=`<span class="chip">${I.tag}${p.segment}</span>`;
  return h;
}
function pnlBlock(p){
  if(!p.pnl)return'';
  const neg=/^[-−]/.test(p.pnl);
  return`<div class="pnl-row">
    <div><div class="pnl-lbl">Net P&L</div><div class="pnl-val${neg?' neg':''}">${p.pnl}</div></div>
    ${p.pnlPct?`<div class="pct-pill${neg?' neg':''}">${p.pnlPct}</div>`:''}
  </div>`;
}

function renderLinks(){
  const g=document.getElementById('linksGrid');
  if(!LINKS.length){g.innerHTML='<div class="empty">No portfolio links yet.</div>';return;}
  g.innerHTML=LINKS.map(p=>`
    <div class="lcard fin" data-type="link" data-name="${p.name.toLowerCase()}" id="card-${p.id}">
      <div class="lc-top">
        <div class="ava">${ini(p.name)}</div>
        <div class="lc-id">
          <div class="cname">${p.name}</div>
          <div><span class="vbadge">${I.check} Verified</span></div>
        </div>
      </div>
      <div class="chips">${metaChips(p)}</div>
      ${pnlBlock(p)}
      <div class="cactions">
        <a href="${p.link}" target="_blank" rel="noopener" class="btn btn-solid btn-card">View Live Portfolio ${I.ext}</a>
        <button class="icon-btn" onclick="copyLink('${p.link}',this)" title="Copy link" aria-label="Copy link">${I.copy}</button>
      </div>
    </div>`).join('');
}

function renderSnaps(){
  const g=document.getElementById('snapsGrid');
  if(!SNAPS.length){g.innerHTML='<div class="empty">No snapshots yet.</div>';return;}
  g.innerHTML=SNAPS.map(p=>`
    <div class="scard fin" data-type="snapshot" data-name="${p.name.toLowerCase()}" id="card-${p.id}">
      <div class="sprev" onclick="viewSnap('${p.id}')">
        ${p.image?`<img src="${p.image}" alt="${p.name} verified P&L snapshot" loading="lazy">`:'<div style="display:flex;align-items:center;justify-content:center;height:100%;color:var(--text-3);font-size:0.85rem">No preview</div>'}
        <div class="splbl">${I.check} Verified P&L</div>
      </div>
      <div class="sbody">
        <div class="s-head">
          <div class="ava ava-sm">${ini(p.name)}</div>
          <div>
            <div class="cname">${p.name}</div>
            <div class="s-sub">${[p.duration,p.capital?p.capital+' capital':'',p.date].filter(Boolean).join(' · ')}</div>
          </div>
        </div>
        ${pnlBlock(p)}
        <button class="btn btn-ghost btn-card" onclick="viewSnap('${p.id}')">${I.eye} View Snapshot</button>
      </div>
    </div>`).join('');
}

function renderTestimonials(){
  const g=document.getElementById('testiGrid');
  const sec=document.getElementById('testimonials');
  if(!g||typeof TESTIMONIALS==='undefined'||!TESTIMONIALS.length){if(sec)sec.style.display='none';return;}
  g.innerHTML=TESTIMONIALS.map(t=>`
    <div class="qcard fin">
      <div class="qmark">“</div>
      <div class="qtext">${t.quote}</div>
      <div class="q-foot">
        <div class="ava ava-sm">${ini(t.who)}</div>
        <div class="qwho">${t.who}${t.since?`<span>${t.since}</span>`:''}</div>
      </div>
    </div>`).join('');
}

function render(){
  renderStats();
  renderLinks();
  renderSnaps();
  renderTestimonials();
  applyFilterSearch();
  requestAnimationFrame(()=>{
    document.querySelectorAll('.fin').forEach(el=>{
      const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:0.05});
      obs.observe(el);
    });
  });
}

/* ---------- COPY ---------- */
function copyLink(url,btn){
  navigator.clipboard.writeText(url).then(()=>{
    btn.innerHTML=I.check;setTimeout(()=>btn.innerHTML=I.copy,2000);
    toast('Link copied to clipboard');
  }).catch(()=>toast('Copy failed'));
}

/* ---------- VIEW SNAP ---------- */
function viewSnap(id){
  const it=SNAPS.find(s=>s.id===id);
  if(!it||!it.image)return;
  document.getElementById('viewTitle').textContent=it.name+' — Verified P&L';
  document.getElementById('viewImg').src=it.image;
  document.getElementById('viewMov').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeView(){document.getElementById('viewMov').classList.remove('open');document.body.style.overflow='';}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeView();});

/* ---------- FILTER & SEARCH ---------- */
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

/* ---------- TOAST ---------- */
let tt;
function toast(msg){
  const el=document.getElementById('toast');
  el.textContent=msg;el.classList.add('on');
  clearTimeout(tt);tt=setTimeout(()=>el.classList.remove('on'),2800);
}

/* ---------- BOOT ---------- */
applyTheme(document.documentElement.getAttribute('data-theme')||'dark');
render();
