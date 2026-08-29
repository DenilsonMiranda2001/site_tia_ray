const target = new Date(2026, 7, 29, 19, 0, 0);
const $ = id => document.getElementById(id);

function updateCountdown(){
  const diff = target - new Date();
  if(diff <= 0){
    $('countdown').style.display = 'none';
    $('countdownCaption').textContent = 'A contagem acabou. Agora é vida real.';
    $('started').style.display = 'block';
    return;
  }
  const total = Math.floor(diff / 1000);
  $('hours').textContent = String(Math.floor(total / 3600)).padStart(2,'0');
  $('minutes').textContent = String(Math.floor((total % 3600) / 60)).padStart(2,'0');
  $('seconds').textContent = String(total % 60).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown,1000);

function confetti(amount=45){
  const symbols=['✦','★','●','◆','✹','✧'];
  for(let i=0;i<amount;i++){
    const piece=document.createElement('i');
    piece.textContent=symbols[Math.floor(Math.random()*symbols.length)];
    piece.className='confetti-piece';
    piece.style.left=`${Math.random()*100}vw`;
    piece.style.top=`${45+Math.random()*15}vh`;
    piece.style.fontSize=`${10+Math.random()*20}px`;
    piece.style.animationDuration=`${1+Math.random()*1.8}s`;
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),3000);
  }
}

document.querySelector('.cta')?.addEventListener('click',()=>confetti(35));
document.querySelector('#confettiButton')?.addEventListener('click',()=>confetti(70));

const meterButton=$('meterButton');
const meterValue=$('meterValue');
const meterBar=$('meterBar');
const meterLabel=$('meterLabel');
let measuring=false;
meterButton?.addEventListener('click',()=>{
  if(measuring)return;
  measuring=true;
  meterButton.textContent='CALCULANDO...';
  const targetValue=92+Math.floor(Math.random()*9);
  let current=0;
  const timer=setInterval(()=>{
    current+=Math.ceil((targetValue-current)/7);
    if(current>=targetValue){current=targetValue;clearInterval(timer);measuring=false;meterButton.textContent='MEDIR DE NOVO ↗';confetti(30)}
    meterValue.textContent=`${current}%`;
    meterBar.style.width=`${current}%`;
    meterLabel.textContent=current<35?'AQUECENDO':current<70?'A GALERA CHEGOU':current<90?'A RESENHA SUBIU':'NÍVEL: FURDUNCIN ABSURDO';
  },35);
});

const style=document.createElement('style');
style.textContent=`.confetti-piece{position:fixed;z-index:100;pointer-events:none;color:#f5ff3b;animation:confettiFall 1.8s ease-out forwards}@keyframes confettiFall{to{transform:translateY(48vh) rotate(720deg);opacity:0}}`;
document.head.appendChild(style);

const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.feature,.rule-list>div,.location-card').forEach(el=>{el.classList.add('reveal');revealObserver.observe(el)});

const revealStyle=document.createElement('style');
revealStyle.textContent=`.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s ease,transform .7s ease}.reveal.revealed{opacity:1;transform:none}`;
document.head.appendChild(revealStyle);