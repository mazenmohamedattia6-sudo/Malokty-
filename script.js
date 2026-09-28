const scenes=[
"ملك…",
"قبل أي كلمة… أنا آسف.",
"إنتي مصدر الأمان ليا، ومصدر الطمأنينة اللي برتاح فيه.",
"إنتي زي النجم الساطع… أي مكان تدخليه بتغطي عليه، ومحدش يقدر ياخد مكانك في الحلاوة والجمال.",
"مافيش زيك في جمالك… ولا في ضحكتك، ولا في شكلك، ولا في أي تفصيلة فيكي.",
"كل ما أشوفك بقول: بسم الله ماشاء الله، إيه الحلاوة دي يا رب! يا بختي بيكي.",
"وأنا بسمعك دلوقتي على الواتس… وبشوفك في كل حتة، وبتخيلك في كل مكان، وبتخيل مواقف بينا.",
"إنتي رجّعتي ليا الشغف في حياتي تاني… بعد ما كان مات تقريبًا.",
"إنتي أحلى من البرشلونة.",
"وأعملك الأكل اللي بتحبيه، وأعملك الهوت شوكليت، ونقف في البلكونة نتكلم ونضحك ونفتكر خناقتنا.",
"بحب تفاصيلك يا بنت المجنونة… يا أم ليلي ويزن، ولادنا إن شاء الله.",
"دايمًا بقول الحمد لله إنك معايا… وإني اخترت صح.",
"وأجهزلك السرير والأطباق، وأدلعك، وأجيبلك كل حاجة حلوة… وبنسى نفسي وأنا معاكي يا كتكوتي.",
"إنتي الحياة… والروح… والأمل… والشمس… والقمر.",
"وعارف إني ضغطت عليكي الفترة اللي فاتت… حقك عليا.",
"فكّي من كل ده… وأنا هعوّضك عن كل حاجة.",
"بحبك يا ملوكتي… أكتر من أي حاجة في حياتي ❤"
];
const $=s=>document.querySelector(s),line=$('#line'),dots=$('#dots');
scenes.forEach(()=>dots.appendChild(document.createElement('i')));
let fast=false,run=0;
const wait=ms=>new Promise(r=>setTimeout(r,fast?ms/6:ms));
document.addEventListener('pointerdown',e=>{if(e.target.tagName!=='BUTTON')fast=true});
document.addEventListener('pointerup',()=>fast=false);
async function play(){
  const id=++run;$('#again').style.display='none';
  const d=dots.children;[...d].forEach(x=>x.classList.remove('on'));
  for(let i=0;i<scenes.length;i++){
    if(id!==run)return;
    const t=scenes[i],last=i===scenes.length-1;
    line.className='';line.classList.toggle('big',i===0);
    line.textContent='';await wait(500);
    line.classList.add('cur');d[i].classList.add('on');
    for(let k=1;k<=t.length;k++){
      line.textContent=t.slice(0,k);
      const ch=t[k-1];
      await wait(ch==='…'||ch==='،'||ch==='.'?380:ch===' '?70:55);
    }
    if(last){line.classList.remove('cur');line.classList.add('big');$('#again').style.display='block';return}
    await wait(1200+t.length*22);
    line.classList.remove('cur');line.classList.add('out');await wait(1100);
  }
}
$('#start').onclick=()=>{const a=$('#song');a.volume=0;a.play().catch(()=>{});let v=0;const fi=setInterval(()=>{v=Math.min(v+.02,.8);a.volume=v;if(v>=.8)clearInterval(fi)},150);$('#intro').classList.add('gone');setTimeout(play,900)};
$('#again').onclick=play;$('#mute').onclick=()=>{const a=$('#song');a.muted=!a.muted;$('#mute').textContent=a.muted?'🔇':'🔊'};
const cv=$('#c'),x=cv.getContext('2d');let W,H,S=[],sh=null;
function rs(){W=cv.width=innerWidth;H=cv.height=innerHeight;S=Array.from({length:Math.min(220,W/5)},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.4+.2,p:Math.random()*6,s:Math.random()*.02+.005}))}
rs();addEventListener('resize',rs);
(function f(){
  x.clearRect(0,0,W,H);
  const g=x.createRadialGradient(W/2,H/2,0,W/2,H/2,Math.max(W,H)*.7);
  g.addColorStop(0,'rgba(120,80,130,.28)');g.addColorStop(1,'rgba(20,18,31,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  for(const s of S){s.p+=s.s;x.globalAlpha=.35+.65*Math.abs(Math.sin(s.p));x.fillStyle='#fff';x.beginPath();x.arc(s.x,s.y,s.r,0,7);x.fill()}
  if(!sh&&Math.random()<.004)sh={x:Math.random()*W,y:Math.random()*H*.4,l:0};
  if(sh){sh.l+=1;x.globalAlpha=Math.max(1-sh.l/50,0);x.strokeStyle='#ecd9c0';x.lineWidth=1.5;x.beginPath();x.moveTo(sh.x-sh.l*9,sh.y+sh.l*4);x.lineTo(sh.x-sh.l*9-60,sh.y+sh.l*4+27);x.stroke();if(sh.l>50)sh=null}
  x.globalAlpha=1;requestAnimationFrame(f);
})();
