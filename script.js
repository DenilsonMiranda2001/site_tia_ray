const target = new Date(2026, 7, 29, 19, 0, 0);
const $ = id => document.getElementById(id);

function updateCountdown(){
  const diff = target - new Date();
  if(diff <= 0){
    $('countdown').style.display = 'none';
    $('started').style.display = 'block';
    return;
  }
  const total = Math.floor(diff / 1000);
  $('hours').textContent = String(Math.floor(total / 3600)).padStart(2,'0');
  $('minutes').textContent = String(Math.floor((total % 3600) / 60)).padStart(2,'0');
  $('seconds').textContent = String(total % 60).padStart(2,'0');
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Pequena chuva de confetes ao clicar no CTA, sem bibliotecas externas.
document.querySelector('.cta').addEventListener('click', () => {
  for(let i=0;i<28;i++){
    const piece=document.createElement('i');
    piece.textContent=['✦','★','●','◆'][Math.floor(Math.random()*4)];
    piece.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:55vh;font-size:${10+Math.random()*18}px;z-index:20;pointer-events:none;animation:fall ${1+Math.random()*1.5}s ease-out forwards;`;
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),2600);
  }
});

const style=document.createElement('style');
style.textContent='@keyframes fall{to{transform:translateY(45vh) rotate(540deg);opacity:0}}';
document.head.appendChild(style);