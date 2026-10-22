let mode='d',hist=[];
function setMode(m){mode=m;$('#bd').className='btn'+(m==='d'?'':' g');$('#bc').className='btn'+(m==='c'?'':' g');$('#res').textContent=m==='d'?'🎲':'🪙'}
$('#bd').onclick=()=>setMode('d');$('#bc').onclick=()=>setMode('c');
$('#roll').onclick=()=>{
  const r=$('#res');let n=0;
  const iv=setInterval(()=>{
    if(mode==='d')r.textContent='⚀⚁⚂⚃⚄⚅'[Math.floor(Math.random()*6)];else r.textContent=Math.random()<.5?'🦅':'🔘';
    if(++n>9){clearInterval(iv);
      let v;
      if(mode==='d'){const x=1+Math.floor(Math.random()*6);r.textContent='⚀⚁⚂⚃⚄⚅'[x-1];v=x}
      else{const h=Math.random()<.5;r.textContent=h?'🦅 Орёл':'🔘 Решка';v=h?'орёл':'решка'}
      hist.unshift(v);hist=hist.slice(0,10);$('#hist').textContent='История: '+hist.join(', ');
    }
  },60);
};
