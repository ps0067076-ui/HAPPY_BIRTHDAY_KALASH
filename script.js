// envelope intro
const overlay = document.getElementById('envelopeOverlay');
const seal = document.getElementById('seal');
const subText = document.getElementById('subText');
const fullSubtitle = "Every year with you feels like the best chapter yet. This little page is just for you — scroll down, there's more.";

function typeSubtitle(){
  let i = 0;
  subText.textContent = '';
  const t = setInterval(()=>{
    subText.textContent += fullSubtitle.charAt(i);
    i++;
    if(i >= fullSubtitle.length){ clearInterval(t); }
  }, 22);
}

function burstConfetti(){
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#f0a6c1','#fbdbe6','#d1587f','#e4b074','#ffffff'];
  for(let i=0;i<60;i++){
    const p = document.createElement('div');
    p.className = 'confetti-piece';
    p.style.left = Math.random()*100+'vw';
    p.style.background = colors[Math.floor(Math.random()*colors.length)];
    p.style.animationDelay = (Math.random()*0.4)+'s';
    p.style.animationDuration = (2+Math.random()*1.2)+'s';
    p.style.borderRadius = Math.random()>0.5 ? '50%' : '2px';
    wrap.appendChild(p);
    setTimeout(()=> p.remove(), 3600);
  }
}

seal.addEventListener('click', ()=>{
  overlay.classList.add('opened');
  document.body.classList.remove('locked');
  burstConfetti();
  setTimeout(typeSubtitle, 500);
});

// cursor heart trail
let lastTrail = 0;
document.addEventListener('mousemove', (e)=>{
  const now = Date.now();
  if(now - lastTrail < 90) return;
  lastTrail = now;
  const h = document.createElement('div');
  h.className = 'cursor-heart';
  h.textContent = '\u2764';
  h.style.left = e.clientX + 'px';
  h.style.top = e.clientY + 'px';
  document.body.appendChild(h);
  setTimeout(()=> h.remove(), 1000);
});

// love meter
const loveSlider = document.getElementById('loveSlider');
const meterLabel = document.getElementById('meterLabel');
loveSlider.addEventListener('input', ()=>{
  const v = Number(loveSlider.value);
  if(v > 70){
    loveSlider.value = 100;
    loveSlider.classList.add('maxed');
    meterLabel.textContent = 'infinity \u267E\uFE0F — sorry, it won\u2019t go any lower';
  } else if(v > 40){
    meterLabel.textContent = 'so much it scares me a little';
  } else if(v > 15){
    meterLabel.textContent = 'quite a bit, honestly';
  } else {
    meterLabel.textContent = 'keep dragging...';
  }
});

// secret message reveal
const secretBtn = document.getElementById('secretBtn');
const secretMessage = document.getElementById('secretMessage');
secretBtn.addEventListener('click', ()=>{
  secretMessage.classList.toggle('shown');
});

// floating hearts
const floaters = document.getElementById('floaters');
for(let i=0;i<14;i++){
  const s = document.createElement('span');
  s.textContent = '\u2764';
  s.style.left = Math.random()*100+'%';
  s.style.animationDuration = (10+Math.random()*10)+'s';
  s.style.animationDelay = (Math.random()*10)+'s';
  s.style.fontSize = (14+Math.random()*14)+'px';
  floaters.appendChild(s);
}

// scroll reveal for diary notes
const notes = document.querySelectorAll('.note');
const obs = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); }
  });
}, { threshold:0.25 });
notes.forEach(n=>obs.observe(n));

// slideshow (crossfade)
const slideEls = document.querySelectorAll('.slide');
const dotsWrap = document.getElementById('dots');
const captionEl = document.getElementById('slideCaption');
let current = 0;
slideEls.forEach((_,i)=>{
  const d = document.createElement('div');
  d.className = 'dot' + (i===0?' active':'');
  d.addEventListener('click', ()=> goTo(i));
  dotsWrap.appendChild(d);
});
const dotEls = document.querySelectorAll('.dot');
function goTo(i){
  current = (i + slideEls.length) % slideEls.length;
  slideEls.forEach((s,idx)=> s.classList.toggle('active', idx===current));
  dotEls.forEach((d,idx)=> d.classList.toggle('active', idx===current));
  captionEl.textContent = slideEls[current].dataset.caption || '';
}
document.getElementById('nextBtn').addEventListener('click', ()=> goTo(current+1));
document.getElementById('prevBtn').addEventListener('click', ()=> goTo(current-1));
let auto = setInterval(()=> goTo(current+1), 3500);
document.querySelector('.slideshow').addEventListener('mouseenter', ()=> clearInterval(auto));
document.querySelector('.slideshow').addEventListener('mouseleave', ()=> auto = setInterval(()=> goTo(current+1), 3500));
