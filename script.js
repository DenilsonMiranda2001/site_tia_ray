const target = new Date(2026, 7, 29, 19, 0, 0);
const $ = id => document.getElementById(id);
const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function updateCountdown(){
  const diff = target - new Date();
  if(diff <= 0){
    $('countdown').style.display='none';
    $('countdownCaption').textContent='É AGORA. A RESENHA ESTÁ OFICIALMENTE ON.';
    $('started').style.display='block';
    document.title='FURDUNCIN ON 🔥 | TIA RAY';
    return;
  }
  const total=Math.floor(diff/1000);
  $('hours').textContent=String(Math.floor(total/3600)).padStart(2,'0');
  $('minutes').textContent=String(Math.floor((total%3600)/60)).padStart(2,'0');
  $('seconds').textContent=String(total%60).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

function confetti(amount=45){
  if(reducedMotion)return;
  const symbols=['✦','★','●','◆','✹','✧'];
  for(let i=0;i<amount;i++){
    const piece=document.createElement('i');
    piece.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    piece.className='confetti-piece';
    piece.style.left=`${Math.random()*100}vw`;
    piece.style.top=`${42+Math.random()*18}vh`;
    piece.style.fontSize=`${10+Math.random()*20}px`;
    piece.style.animationDuration=`${1+Math.random()*1.8}s`;
    piece.style.setProperty('--drift',`${-120+Math.random()*240}px`);
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),3000);
  }
}

document.querySelector('.cta')?.addEventListener('click',()=>confetti(35));
document.querySelector('#confettiButton')?.addEventListener('click',()=>confetti(70));

const meterButton=$('meterButton'), meterValue=$('meterValue'), meterBar=$('meterBar'), meterLabel=$('meterLabel');
let measuring=false;
meterButton?.addEventListener('click',()=>{
  if(measuring)return;
  measuring=true;
  meterButton.textContent='CALCULANDO...';
  const targetValue=92+Math.floor(Math.random()*9);
  let current=0;
  const timer=setInterval(()=>{
    current+=Math.ceil((targetValue-current)/7);
    if(current>=targetValue){
      current=targetValue;
      clearInterval(timer);
      measuring=false;
      meterButton.textContent='MEDIR DE NOVO ↗';
      confetti(30);
    }
    meterValue.textContent=`${current}%`;
    meterBar.style.width=`${current}%`;
    meterLabel.textContent=current<35?'AQUECENDO':current<70?'A GALERA CHEGOU':current<90?'A RESENHA SUBIU':'NÍVEL: FURDUNCIN ABSURDO';
  },35);
});

const glow=document.querySelector('.cursor-glow');
const finePointer=window.matchMedia?.('(pointer:fine)').matches;
if(glow&&finePointer){
  window.addEventListener('pointermove',e=>{
    glow.style.left=`${e.clientX}px`;
    glow.style.top=`${e.clientY}px`;
    glow.style.opacity='.8';
  },{passive:true});
  document.addEventListener('pointerleave',()=>glow.style.opacity='0');
}

const hero=document.querySelector('.hero');
if(hero&&finePointer&&!reducedMotion){
  window.addEventListener('pointermove',e=>{
    const x=(e.clientX/window.innerWidth-.5)*2;
    const y=(e.clientY/window.innerHeight-.5)*2;
    hero.style.setProperty('--mx',`${x*10}px`);
    hero.style.setProperty('--my',`${y*7}px`);
  },{passive:true});
}

// Entrada cinematográfica: cada bloco aparece quando chega na tela.
const revealItems=document.querySelectorAll('.feature,.rule-list>div,.location-card,.meter-copy,.meter');
if('IntersectionObserver' in window && !reducedMotion){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  }),{threshold:.12});
  revealItems.forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});
}else{
  revealItems.forEach(el=>el.classList.add('revealed'));
}

// Easter egg: três cliques no título.
const title=document.querySelector('#partyTitle'), egg=$('easterEgg');
let taps=0,tapTimer;
title?.addEventListener('click',()=>{
  taps++;
  clearTimeout(tapTimer);
  tapTimer=setTimeout(()=>taps=0,900);
  if(taps===3){
    egg?.classList.add('show');
    confetti(24);
    if(!reducedMotion)title.animate([{transform:'scale(1)'},{transform:'scale(1.04) rotate(-1deg)'},{transform:'scale(1)'}],{duration:500,easing:'ease-out'});
    taps=0;
  }
});

// Toque longo no botão final revela uma mensagem extra no mobile.
let pressTimer;
const finalButton=$('confettiButton');
finalButton?.addEventListener('pointerdown',()=>{
  pressTimer=setTimeout(()=>{egg?.classList.add('show');confetti(55)},700);
});
['pointerup','pointerleave','pointercancel'].forEach(evt=>finalButton?.addEventListener(evt,()=>clearTimeout(pressTimer)));

// Atalho de teclado: F-U-R abre o modo secreto.
let secretKeys='';
window.addEventListener('keydown',e=>{
  if(e.key.length===1){
    secretKeys=(secretKeys+e.key.toLowerCase()).slice(-3);
    if(secretKeys==='fur'){egg?.classList.add('show');confetti(60);}
  }
});

const revealStyle=document.createElement('style');
revealStyle.textContent=`.confetti-piece{position:fixed;z-index:100;pointer-events:none;color:#f5ff3b;animation:confettiFall 1.8s ease-out forwards}@keyframes confettiFall{to{transform:translate(var(--drift),48vh) rotate(720deg);opacity:0}}.hero>*:not(.hero-grid):not(.hero-scanline):not(.disco-orb){transform:translate(var(--mx,0),var(--my,0))}.reveal{opacity:0;transform:translateY(28px);transition:opacity .75s ease,transform .75s cubic-bezier(.2,.8,.2,1)}.reveal.revealed{opacity:1;transform:none}.feature.reveal:nth-child(2),.rule-list>div.reveal:nth-child(2){transition-delay:.08s}.feature.reveal:nth-child(3),.rule-list>div.reveal:nth-child(3){transition-delay:.16s}@media (prefers-reduced-motion:reduce){.reveal{opacity:1;transform:none}}`;
document.head.appendChild(revealStyle);
