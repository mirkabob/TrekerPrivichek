document.querySelectorAll('#nav button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#nav button,section').forEach(x=>x.classList.remove('on'));
  b.classList.add('on');$('#s-'+b.dataset.s).classList.add('on');
  if(b.dataset.s==='ruler')drawRuler();
});
