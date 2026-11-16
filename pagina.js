const toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#nav'),scrim=document.querySelector('.nav-scrim'),closeMenu=document.querySelector('.nav-close');
function menuState(open,restore=false){toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');nav.classList.toggle('open',open);scrim.hidden=!open;document.body.classList.toggle('menu-open',open);if(open)closeMenu.focus();else if(restore)toggle.focus()}
toggle.addEventListener('click',()=>menuState(toggle.getAttribute('aria-expanded')!=='true'));closeMenu.addEventListener('click',()=>menuState(false,true));scrim.addEventListener('click',()=>menuState(false,true));nav.addEventListener('click',e=>{if(e.target.closest('a'))menuState(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))menuState(false,true)});window.addEventListener('resize',()=>{if(window.innerWidth>700&&nav.classList.contains('open'))menuState(false)});
const more=document.querySelector('.more-button'),extra=document.querySelector('#extra-projects');more.addEventListener('click',()=>{const open=more.getAttribute('aria-expanded')==='true';more.setAttribute('aria-expanded',String(!open));extra.hidden=open;more.innerHTML=open?'Ver mais trabalhos <span>＋</span>':'Mostrar menos <span>−</span>'});
const dialog=document.querySelector('#lightbox');document.querySelectorAll('.project').forEach(button=>button.addEventListener('click',()=>{const img=dialog.querySelector('img');img.src=button.dataset.image;img.alt=button.dataset.caption;dialog.querySelector('p').textContent=button.dataset.caption;dialog.showModal()}));dialog.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});document.querySelector('#year').textContent=new Date().getFullYear();

const contactForm=document.querySelector('#contact-form');
contactForm.addEventListener('submit',event=>{
 event.preventDefault();
 if(!contactForm.reportValidity())return;
 const data=new FormData(contactForm);
 const nome=String(data.get('nome')||'').trim(),telefone=String(data.get('telefone')||'').trim(),email=String(data.get('email')||'').trim(),servico=String(data.get('servico')||'').trim(),mensagem=String(data.get('mensagem')||'').trim();
 const text=['Olá! Gostaria de pedir um orçamento.','','Nome: '+nome,'Telefone: '+(telefone||'Não indicado'),'Email: '+email,'Serviço: '+(servico||'Não indicado'),'','Mensagem: '+mensagem].join('\n');
 const link=document.createElement('a');link.href='https://wa.me/351914136392?text='+encodeURIComponent(text);link.target='_blank';link.rel='noopener noreferrer';document.body.appendChild(link);link.click();link.remove();
});

// Alguns navegadores aguardam pela primeira interação para iniciar vídeo.
const heroVideo=document.querySelector('.hero-video');
if(heroVideo){
 heroVideo.muted=true;heroVideo.defaultMuted=true;heroVideo.loop=true;heroVideo.playsInline=true;
 const startVideo=()=>{if(document.hidden)return;const attempt=heroVideo.play();if(attempt&&typeof attempt.catch==='function')attempt.catch(()=>{});};
 heroVideo.addEventListener('canplay',startVideo);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)startVideo()});
 document.addEventListener('pointerdown',startVideo,{once:true});
 document.addEventListener('keydown',startVideo,{once:true});
 startVideo();
}

const requestDialog=document.querySelector('#pedido');
function openRequest(event){if(event)event.preventDefault();if(!requestDialog.open)requestDialog.showModal()}
document.querySelector('.request-open').addEventListener('click',openRequest);
document.querySelectorAll('a[href="#pedido"]').forEach(a=>a.addEventListener('click',openRequest));
requestDialog.querySelector('.request-close').addEventListener('click',()=>requestDialog.close());
requestDialog.addEventListener('click',event=>{if(event.target===requestDialog)requestDialog.close()});

const rentalDialog=document.querySelector('#reserva'),rentalForm=document.querySelector('#rental-form'),rentalStart=rentalForm.elements.data,rentalDays=rentalForm.elements.dias,rentalEnd=document.querySelector('.rental-end');
let rentalEquipment='';
function localDateString(date){return [date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-')}
function endDate(){const parts=rentalStart.value.split('-').map(Number),days=Number(rentalDays.value);if(parts.length!==3||!Number.isInteger(days)||days<1||days>365)return null;const date=new Date(parts[0],parts[1]-1,parts[2]);date.setDate(date.getDate()+days-1);return date}
function showEnd(){const end=endDate();rentalEnd.textContent=end?'Último dia previsto: '+end.toLocaleDateString('pt-PT')+' (incluindo o dia de início).':''}
document.querySelectorAll('.rental-open').forEach(button=>button.addEventListener('click',()=>{rentalForm.reset();rentalEquipment=button.dataset.equipment;document.querySelector('#reserva-equipment').textContent=rentalEquipment;rentalStart.min=localDateString(new Date());rentalEnd.textContent='';rentalDialog.showModal()}));
rentalDialog.querySelector('.rental-close').addEventListener('click',()=>rentalDialog.close());
rentalDialog.addEventListener('click',event=>{if(event.target===rentalDialog)rentalDialog.close()});
rentalStart.addEventListener('input',showEnd);rentalDays.addEventListener('input',showEnd);
rentalForm.addEventListener('submit',event=>{event.preventDefault();rentalStart.min=localDateString(new Date());if(!rentalForm.reportValidity())return;const end=endDate();if(!end)return;const data=new FormData(rentalForm),start=rentalStart.value.split('-').reverse().join('/');const message=['Olá! Gostaria de pedir uma reserva de equipamento.','','Equipamento: '+rentalEquipment,'Nome: '+String(data.get('nome')).trim(),'Data de início: '+start,'Número de dias: '+rentalDays.value,'Último dia previsto: '+end.toLocaleDateString('pt-PT'),'Local ou observações: '+(String(data.get('observacoes')).trim()||'Não indicado'),'','Aguardo confirmação da disponibilidade e orçamento.'].join('\n');const link=document.createElement('a');link.href='https://wa.me/351914136392?text='+encodeURIComponent(message);link.target='_blank';link.rel='noopener noreferrer';document.body.appendChild(link);link.click();link.remove()});
