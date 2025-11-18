// js/script.js
// Máscaras, submit do form (mock) e controle de navegação entre seções.
// Seguro contra elementos ausentes e usa DOMContentLoaded para garantir que o DOM exista.

// ---------- Máscaras utilitárias ----------
function maskCPF(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

function maskPhone(value) {
  value = value.replace(/\D/g, '');
  if (value.length <= 10) {
    return value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
  }
  return value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
}

function maskCEP(value) {
  return value.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0,9);
}

// ---------- Função que configura o formulário (máscaras + submit) ----------
function setupFormAndMasks() {
  const cpf = document.getElementById('cpf');
  const tel = document.getElementById('telefone');
  const cep = document.getElementById('cep');
  const form = document.getElementById('formApadrinhamento');

  if (cpf) {
    cpf.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskCPF(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (tel) {
    tel.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskPhone(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (cep) {
    cep.addEventListener('input', e => {
      const pos = e.target.selectionStart;
      e.target.value = maskCEP(e.target.value);
      e.target.selectionStart = e.target.selectionEnd = pos;
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      // usa validação nativa HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        e.preventDefault();
        return;
      }

      e.preventDefault(); // impedir envio real enquanto não há backend configurado
      alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
      form.reset();
    });
  }
}

// ---------- Controle de navegação entre seções (mostra somente a selecionada) ----------
function setupSectionNavigation() {
  // pega todos os links que têm data-section
  const navLinks = document.querySelectorAll('nav a[data-section]');
  const sections = document.querySelectorAll('main section');

  // se não há seções/links, nada a fazer
  if (!navLinks.length || !sections.length) return;

  // função que ativa a seção com id = targetId e desativa as outras
  function activateSection(targetId) {
    sections.forEach(sec => {
      if (sec.id === targetId) {
        sec.classList.add('active');
        // garantir visibilidade com display/block (caso o CSS não esteja)
        sec.style.display = '';
      } else {
        sec.classList.remove('active');
        // esconder as outras se não quiserem aparecer
        sec.style.display = 'none';
      }
    });
  }

  // inicializar: se houver alguma section com class="active" deixa-a visível,
  // senão ativa a primeira seção encontrada.
  const initiallyActive = document.querySelector('main section.active');
  if (initiallyActive) {
    activateSection(initiallyActive.id);
  } else if (sections[0]) {
    activateSection(sections[0].id);
  }

  // adicionar listeners aos links
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      if (!target) return;

      const targetElem = document.getElementById(target);
      if (!targetElem) return;

      activateSection(target);

      // opcional: rolar para o topo do conteúdo principal (suave)
      window.scrollTo({ top: targetElem.offsetTop - (document.querySelector('header')?.offsetHeight || 0), behavior: 'smooth' });

      // atualizar estado visual do link (classe .is-active)
      navLinks.forEach(l => l.classList.remove('is-active'));
      link.classList.add('is-active');
    });
  });
}

// ---------- Inicialização (garante que o DOM esteja pronto) ----------
function init() {
  setupFormAndMasks();
  setupSectionNavigation();
}

// Se o script estiver em <head> sem defer, aguarda; se defer ou já carregado, roda direto.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
