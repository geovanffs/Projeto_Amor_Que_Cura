// js/script.js
document.addEventListener('DOMContentLoaded', function () {
  // ---------- Navegação entre seções (SPA) ----------
  const navLinks = document.querySelectorAll('nav a[data-section]');
  const sections = document.querySelectorAll('main section');

  function showSection(id) {
    sections.forEach(s => s.classList.remove('active'));
    const target = document.getElementById(id);
    if (target) {
      target.classList.add('active');
      // opcional: rolar ao topo
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function setActiveLink(clickedLink) {
    navLinks.forEach(l => l.classList.remove('is-active'));
    if (clickedLink) clickedLink.classList.add('is-active');
  }

  // liga os cliques dos links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-section');
      if (!targetId) return;
      showSection(targetId);
      setActiveLink(this);
    });
  });

  // mostra a primeira seção por padrão se nenhuma estiver ativa
  const anyActive = Array.from(sections).some(s => s.classList.contains('active'));
  if (!anyActive && sections.length) {
    sections[0].classList.add('active');
    // marca link correspondente (se existir)
    const firstId = sections[0].id;
    const firstLink = document.querySelector(`nav a[data-section="${firstId}"]`);
    if (firstLink) firstLink.classList.add('is-active');
  } else {
    // se já houver uma .active, marca o link correspondente
    sections.forEach(s => {
      if (s.classList.contains('active')) {
        const link = document.querySelector(`nav a[data-section="${s.id}"]`);
        if (link) link.classList.add('is-active');
      }
    });
  }

  // ---------- Máscaras e formulário (seguro: só se existir) ----------
  function maskCPF(v) {
    return v.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  function maskPhone(v) {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) {
      return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim();
    }
    return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  function maskCEP(v) {
    return v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0,9);
  }

  // pega elementos com segurança:
  const cpfEl = document.getElementById('cpf');
  const telEl = document.getElementById('telefone');
  const cepEl = document.getElementById('cep');
  const form = document.getElementById('formApadrinhamento');

  if (cpfEl) {
    cpfEl.addEventListener('input', e => {
      const start = cpfEl.selectionStart;
      cpfEl.value = maskCPF(cpfEl.value);
      // tentativa simples de manter cursor ok
      cpfEl.selectionStart = cpfEl.selectionEnd = start;
    });
  }

  if (telEl) {
    telEl.addEventListener('input', e => {
      const start = telEl.selectionStart;
      telEl.value = maskPhone(telEl.value);
      telEl.selectionStart = telEl.selectionEnd = start;
    });
  }

  if (cepEl) {
    cepEl.addEventListener('input', e => {
      const start = cepEl.selectionStart;
      cepEl.value = maskCEP(cepEl.value);
      cepEl.selectionStart = cepEl.selectionEnd = start;
    });
  }

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      // aqui você mandaria os dados para o servidor (fetch/ajax)
      alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
      form.reset();
      // opcional: voltar à seção início
      // showSection('inicio');
    });
  }
});
