function renderVideoTestimonials(){
  const track=document.getElementById('vtTrack');
  const dotsWrap=document.getElementById('vtDots');
  const sec=document.getElementById('video-testimonials');
  if(!track||typeof VIDEO_TESTIMONIALS==='undefined'||!VIDEO_TESTIMONIALS.length){if(sec)sec.style.display='none';return;}

  track.innerHTML=VIDEO_TESTIMONIALS.map((t,i)=>`
    <div class="vt-card">
      <div class="vt-media" data-index="${i}">
        <iframe src="https://player.vimeo.com/video/${t.videoId}?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
        <div class="vt-play-btn"><div class="vt-play-circle"></div></div>
      </div>
      ${t.who?`<div class="vt-name">${t.who}</div>`:''}
    </div>`).join('');

  const leftBtn=document.getElementById('vtPrev');
  const rightBtn=document.getElementById('vtNext');
  const viewport=track.parentElement;
  const players=typeof Vimeo!=='undefined'
    ? Array.from(track.querySelectorAll('iframe')).map(f=>new Vimeo.Player(f))
    : [];

  let index=0;

  function cardWidth(){
    const card=track.querySelector('.vt-card');
    if(!card)return 0;
    const gap=parseFloat(getComputedStyle(track).gap)||20;
    return card.offsetWidth+gap;
  }
  function visibleCount(){
    const vw=viewport.getBoundingClientRect().width;
    const cw=cardWidth();
    return cw?Math.max(1,Math.round(vw/cw)):1;
  }
  function maxIndex(){return Math.max(0,VIDEO_TESTIMONIALS.length-visibleCount())}
  function renderDots(){
    if(!dotsWrap)return;
    dotsWrap.innerHTML='';
    for(let i=0;i<=maxIndex();i++){
      const dot=document.createElement('button');
      dot.className='vt-dot'+(i===index?' is-active':'');
      dot.setAttribute('aria-label',`Go to slide ${i+1}`);
      dot.addEventListener('click',()=>{index=i;update()});
      dotsWrap.appendChild(dot);
    }
  }
  function pauseAll(){players.forEach(p=>p.pause().catch(()=>{}))}
  function update(){
    index=Math.min(Math.max(0,index),maxIndex());
    track.style.transform=`translateX(-${index*cardWidth()}px)`;
    renderDots();
    if(leftBtn)leftBtn.disabled=index<=0;
    if(rightBtn)rightBtn.disabled=index>=maxIndex();
  }

  track.addEventListener('click',(e)=>{
    const playBtn=e.target.closest('.vt-play-btn');
    if(!playBtn)return;
    const media=playBtn.closest('.vt-media');
    const idx=Number(media.dataset.index);
    if(players[idx])players[idx].play().catch(()=>{});
  });

  players.forEach((player,idx)=>{
    const btn=track.querySelector(`.vt-media[data-index="${idx}"] .vt-play-btn`);
    player.on('play',()=>{
      if(btn)btn.style.display='none';
      players.forEach((p,i)=>{if(i!==idx)p.pause().catch(()=>{})});
      index=idx;update();
    });
    player.on('pause',()=>{if(btn)btn.style.display='flex'});
    player.on('ended',()=>{
      const next=idx+1;
      if(next<players.length){index=next;update();players[next].play().catch(()=>{})}
    });
  });

  if(leftBtn)leftBtn.addEventListener('click',()=>{pauseAll();index--;update()});
  if(rightBtn)rightBtn.addEventListener('click',()=>{pauseAll();index++;update()});
  window.addEventListener('resize',update);

  let touchStartX=0,touchDeltaX=0;
  viewport.addEventListener('touchstart',(e)=>{
    touchStartX=e.touches[0].clientX;
    touchDeltaX=0;
    track.style.transition='none';
    pauseAll();
  },{passive:true});
  viewport.addEventListener('touchmove',(e)=>{
    touchDeltaX=e.touches[0].clientX-touchStartX;
    track.style.transform=`translateX(${-(index*cardWidth())+touchDeltaX}px)`;
  },{passive:true});
  viewport.addEventListener('touchend',()=>{
    track.style.transition='';
    const threshold=50;
    if(touchDeltaX<-threshold)index++;
    else if(touchDeltaX>threshold)index--;
    update();
  });

  update();
}

renderVideoTestimonials();
