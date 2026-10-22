let expr='',justEq=false;
const keys=['C','⌫','%','÷','7','8','9','×','4','5','6','−','1','2','3','+','±','0','.','='];
keys.forEach(k=>{const b=document.createElement('button');b.textContent=k;
  if('÷×−+'.includes(k)||k==='%')b.className='op';if(k==='=')b.className='eq';
  b.onclick=()=>press(k);$('#pad').appendChild(b)});
function calc(e){
  try{
    const s=e.replace(/÷/g,'/').replace(/×/g,'*').replace(/−/g,'-').replace(/(\d+\.?\d*)%/g,'($1/100)');
    if(!/^[\d+\-*/().\s]+$/.test(s))return '';
    const v=Function('"use strict";return ('+s+')')();
    if(!isFinite(v))return 'Ошибка';
    return String(Math.round(v*1e10)/1e10);
  }catch(x){return ''}
}
function press(k){
  const last=expr.slice(-1),isOp=c=>'÷×−+'.includes(c);
  if(k==='C'){expr='';justEq=false}
  else if(k==='⌫')expr=expr.slice(0,-1);
  else if(k==='='){const r=calc(expr);if(r&&r!=='Ошибка'){$('#ce').textContent=expr+' =';expr=r;justEq=true;$('#cr').textContent=r;return}$('#cr').textContent=r||'0';return}
  else if(k==='±'){const m=expr.match(/(−?\d+\.?\d*)$/);if(m){expr=expr.slice(0,m.index)+(m[1][0]==='−'?m[1].slice(1):'−'+m[1])}}
  else if(isOp(k)){if(!expr&&k!=='−')return;if(isOp(last))expr=expr.slice(0,-1);expr+=k;justEq=false}
  else{if(justEq&&!isOp(last)&&k!=='%'){expr='';}justEq=false;
    if(k==='.'){const m=expr.match(/\d*\.?\d*$/)[0];if(m.includes('.'))return}
    expr+=k}
  $('#ce').textContent=expr;
  const r=calc(expr);$('#cr').textContent=r||(expr?'…':'0');
}
