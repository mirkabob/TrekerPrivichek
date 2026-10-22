let ppc=store.get('ppc',37.8);
$('#cal').value=ppc;
function drawRuler(){
  const rl=$('#rl');rl.innerHTML='';
  $('#calv').textContent=ppc.toFixed(1)+' px на 1 см';
  const cm=30;rl.style.height=(cm*ppc+20)+'px';
  for(let mm=0;mm<=cm*10;mm++){
    const t=document.createElement('div');t.className='t';t.style.top=(mm*ppc/10)+'px';
    t.style.width=mm%10===0?'40px':mm%5===0?'28px':'16px';rl.appendChild(t);
    if(mm%10===0){const l=document.createElement('div');l.className='l';l.style.top=(mm*ppc/10)+'px';l.textContent=mm/10;rl.appendChild(l)}
  }
}
$('#cal').oninput=e=>{ppc=+e.target.value;store.set('ppc',ppc);drawRuler()};
