const dial=$('#dial');
['С','В','Ю','З'].forEach((l,i)=>{const b=document.createElement('b');b.textContent=l;b.style.setProperty('--a',i*90+'deg');dial.appendChild(b)});
const dirs=['С','СВ','В','ЮВ','Ю','ЮЗ','З','СЗ'];
function setHead(h){
  h=(h%360+360)%360;
  dial.style.transform='rotate('+(-h)+'deg)';
  $('#deg').textContent=Math.round(h)+'° '+dirs[Math.round(h/45)%8];
}
function onOri(e){
  let h=null;
  if(typeof e.webkitCompassHeading==='number')h=e.webkitCompassHeading;
  else if(e.alpha!==null&&e.absolute)h=360-e.alpha;
  if(h!==null)setHead(h);
}
$('#cbtn').onclick=async()=>{
  try{
    if(typeof DeviceOrientationEvent!=='undefined'&&typeof DeviceOrientationEvent.requestPermission==='function'){
      const r=await DeviceOrientationEvent.requestPermission();
      if(r!=='granted'){$('#cmsg').textContent='Доступ к датчику не дали.';return}
    }
    window.addEventListener('deviceorientationabsolute',onOri,true);
    window.addEventListener('deviceorientation',onOri,true);
    $('#cmsg').textContent='Держи телефон ровно. Для точности пошевели им «восьмёркой».';
    $('#cbtn').style.display='none';
  }catch(e){$('#cmsg').textContent='Компас недоступен на этом устройстве.'}
};
