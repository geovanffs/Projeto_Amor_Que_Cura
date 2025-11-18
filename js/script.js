// js/script.js
// Lógica robusta: esconde seções por padrão, ativa a clicada, configura máscaras/form.

function maskCPF(v){return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');}
function maskPhone(v){v=v.replace(/\D/g,''); if(v.length<=10) return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3'); return v.replace(/^(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');}
function maskCEP(v){return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9);}

function setupFormAndMasks(){
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('formApadrinhamento');

  if(cpf) cpf.addEventListener('input', e => { const p=e.target.selectionStart; e.target.value=maskCPF(e.target.value); e.target.selectionStart=e.target.selectionEnd=p; });
  if(tel) tel.addEventListener('input', e => { const p=e.target.selectionStart; e.target.value=maskPhone(e.target.value); e.target.selectionStart=e.target.selectionEnd=p; });
  if(cep) cep.addEventListener('input', e => { const p=e.target.selectionStart; e.target.value=maskCEP(e.target.value); e.target.selectionStart=e.target.selectionEnd=p; });

  if(form){
    form.addEventListener('submit', function(e){
      if(!form.checkValidity()){ form.reportValidity(); e.preventDefault(); return; }
      e.preventDefault();
      alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
      form.reset();
    });
  }
}

function setupSectionNavigation(){
  const navLinks = document.querySelectorAll('nav a[data-section]');
  const sections = document.querySelectorAll('main section');

  // garante esconder tudo por padrão (caso CSS falhe)
  sections.forEach(s => { if(!s.classList.contains('active')) s.style.display = 'none'; });

  if(!navLinks.length || !sections.length) return;

  function activateSection(id){
    sections.forEach(s => {
      if(s.id === id){ s.classList.add('active'); s.style.display = ''; }
      else { s.classList.remove('active'); s.style.display = 'none'; }
    });
  }

  const initially = document.querySelector('main section.active');
  if(initially) activateSection(initially.id);
  else if(sections[0]) activateSection(sections[0].id);

  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      if(!target) return;
      const targetEl = document.getElementById(target);
      if(!targetEl) return;
      activateSection(target);
      navLinks.forEach(l=>l.classList.remove('is-active'));
      link.classList.add('is-active');
      window.scrollTo({ top: (document.querySelector('header')?.offsetHeight || 0), behavior: 'smooth' });
    });
  });
}

function init(){
  setupFormAndMasks();
  setupSectionNavigation();
}

if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
