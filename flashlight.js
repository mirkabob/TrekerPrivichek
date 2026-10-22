const cols=['#ffffff','#fff1b8','#ff4d4d','#4dd0ff','#6dff9a'];
cols.forEach(c=>{const b=document.createElement('b');b.style.background=c;b.onclick=()=>$('#torch').style.background=c;$('#sw').appendChild(b)});
$('#br').oninput=e=>$('#torch').style.filter='brightness('+e.target.value/100+')';
let stream=null;
$('#cam').onclick=async()=>{
  if(stream){stream.getTracks().forEach(t=>t.stop());stream=null;$('#cam').textContent='Включить вспышку камеры';return}
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:'environment'}});
    const t=stream.getVideoTracks()[0];
    await t.applyConstraints({advanced:[{torch:true}]});
    $('#cam').textContent='Выключить вспышку';$('#tmsg').textContent='Вспышка включена.';
  }catch(e){
    if(stream){stream.getTracks().forEach(t=>t.stop());stream=null}
    $('#tmsg').textContent='Вспышка недоступна здесь. Используй экран как фонарь.';
  }
};
