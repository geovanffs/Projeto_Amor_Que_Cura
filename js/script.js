// js/script.js
// Mais robusto: protege contra elementos ausentes e usa DOMContentLoaded.

(function(){
  // ---- máscaras utilitárias ----
  function maskCPF(v){
    return v.replace(/\D/g,'').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d)/,'$1.$2').replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  }
  function maskPhone(v){
    v = v.replace(/\D/g,'');
    if(v.length <= 10) return v.replace(/^(\d{2})(\d{4})(\d{0,4}).*/,'($1) $2-$3');
    return v.replace(/^(\d{2})(\d{5})(\d{4}).*/,'($1) $2-$3');
  }
  function maskCEP(v){
    return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9);
  }

  // ---- configura formulário (se existir) ----
  function setupFormAndMasks(){
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');
    const form = document.getElementById('formApadrinhamento');

    if(cpf){
      cpf.addEventListener('input', e=>{
        const pos = e.target.selectionStart;
        e.target.value = maskCPF(e.target.value);
        e.target.selectionStart = e.target.selectionEnd = pos;
      });
    }
    if(tel){
      tel.addEventListener('input', e=>{
        const pos = e.target.selectionStart;
        e.target.value = maskPhone(e.target.value);
        e.target.selectionStart = e.target.selectionEnd = pos;
      });
    }
    if(cep){
      cep.addEventListener('input', e=>{
        const pos = e.target.selectionStart;
        e.target.value = maskCEP(e.target.value);
        e.target.selectionStart = e.target.selectionEnd = pos;
      });
    }

    if(form){
      form.addEventListener('submit', function(e){
        // usa validação nativa (required, type=email etc)
        if(!form.checkValidity()){
          form.reportValidity();
          e.preventDefault();
          return;
        }
        e.preventDefault(); // mock submit
        alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
        form.reset();
      });
    }
  }

  // ---- navegação entre seções (single-page) ----
  function setupSectionNavigation(){
    const navLinks = document.querySelectorAll('nav a[data-section]');
    const sections = document.querySelectorAll('main section');

    // CSS de fallback: esconde todas as sections por padrão via JS
    sections.forEach(s => { if(!s.classList.contains('active')) s.style.display = 'none'; });

    if(!navLinks.length || !sections.length) return;

    function activate(id){
      sections.forEach(s=>{
        if(s.id === id){
          s.classList.add('active');
          s.style.display = '';
        } else {
          s.classList.remove('active');
          s.style.display = 'none';
        }
      });
    }

    // inicializa: mantém a que já tem .active ou abre a primeira
    const initial = document.querySelector('main section.active');
    if(initial) activate(initial.id);
    else activate(sections[0].id);

    navLinks.forEach(link=>{
      link.addEventListener('click', e=>{
        e.preventDefault();
        const target = link.getAttribute('data-section');
        if(!target) return;
        const el = document.getElementById(target);
        if(!el) return;
        activate(target);
        // visual feedback
        navLinks.forEach(l=>l.classList.remove('is-active'));
        link.classList.add('is-active');
        // rola até o topo (debaixo do header)
        window.scrollTo({ top: (document.querySelector('header')?.offsetHeight || 0), behavior: 'smooth' });
      });
    });
  }

  // ---- inicialização quando DOM pronto ----
  function init(){
    setupFormAndMasks();
    setupSectionNavigation();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

})();
