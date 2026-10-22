let habits=store.get('habits',[]);
const key=d=>{const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0')};
const dayAgo=n=>{const d=new Date();d.setDate(d.getDate()-n);return key(d)};
function streak(h){let n=0,i=h.done[dayAgo(0)]?0:1;while(h.done[dayAgo(i)]){n++;i++}return n}
function renderH(){
  const box=$('#hlist');box.innerHTML='';
  if(!habits.length){box.innerHTML='<div class="empty">Пока пусто. Добавь первую привычку выше.</div>';return}
  habits.forEach((h,i)=>{
    const t=h.done[dayAgo(0)],s=streak(h);
    let dots='';for(let d=6;d>=0;d--)dots+='<i class="'+(h.done[dayAgo(d)]?'on':'')+'"></i>';
    const el=document.createElement('div');el.className='habit';
    el.innerHTML='<button class="chk '+(t?'on':'')+'">'+(t?'✓':'')+'</button><div class="hm"><div class="hn"></div><div class="dots">'+dots+'</div><div class="st">Серия: '+s+' дн.</div></div><button class="del" title="Удалить">×</button>';
    el.querySelector('.hn').textContent=h.name;
    el.querySelector('.chk').onclick=()=>{const k=dayAgo(0);h.done[k]?delete h.done[k]:h.done[k]=1;store.set('habits',habits);renderH()};
    el.querySelector('.del').onclick=()=>{if(confirm('Удалить «'+h.name+'»?')){habits.splice(i,1);store.set('habits',habits);renderH()}};
    box.appendChild(el);
  });
}
function addH(){const v=$('#hin').value.trim();if(!v)return;habits.push({name:v,done:{}});$('#hin').value='';store.set('habits',habits);renderH()}
$('#hadd').onclick=addH;$('#hin').onkeydown=e=>{if(e.key==='Enter')addH()};
renderH();
