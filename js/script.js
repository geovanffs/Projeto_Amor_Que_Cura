// js/script.js
// Protege contra elementos ausentes e garante que o DOM esteja pronto.
document.addEventListener('DOMContentLoaded', () => {

  // ---------- Navegação entre seções (single-page) ----------
  const links = Array.from(document.querySelectorAll('nav a[data-section]'));
  const sections = Array.from(document.querySelectorAll('main section'));

  function showSection(id) {
    sections.forEach(sec => {
      if (sec.id === id) sec.classList.add('active');
      else sec.classList.remove('active');
    });
    links.forEach(l => {
      if (l.getAttribute('data-section') === id) l.classList.add('is-active');
      else l.classList.remove('is-active');
    });
    // rola para topo da main (melhora experiência)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (links.length && sections.length) {
    // click nos links
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('data-section');
        if (target) showSection(target);
      });
    });

    // inicial: mostra a primeira section marcada .active no HTML ou 'inicio'
    const initial = document.querySelector('main section.active') || document.getElementById('inicio');
    if (initial) showSection(initial.id);
  }

  // ---------- Máscaras simples para CPF/telefone/cep (UI only) ----------
  function maskCPF(v) {
    return v.replace(/\D/g, '')
            .replace(/(\d{3})(\d)/,'$1.$2')
            .replace(/(\d{3})(\d)/,'$1.$2')
            .replace(/(\d{3})(\d{1,2})$/,'$1-$2');
  }

  function maskPhone(v) {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'');
    return v.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3');
  }

  function maskCEP(v) {
    return v.replace(/\D/g,'').replace(/(\d{5})(\d)/,'$1-$2').slice(0,9);
  }

  // ---------- Configura formulário (se existir) ----------
  const form = document.getElementById('formApadrinhamento');
  if (form) {
    const cpf = document.getElementById('cpf');
    const tel = document.getElementById('telefone');
    const cep = document.getElementById('cep');

    if (cpf) cpf.addEventListener('input', e => e.target.value = maskCPF(e.target.value));
    if (tel) tel.addEventListener('input', e => e.target.value = maskPhone(e.target.value));
    if (cep) cep.addEventListener('input', e => e.target.value = maskCEP(e.target.value));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // simula envio -- coloque aqui fetch se quiser enviar para API
      alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
      form.reset();
      // volta para seção de apadrinhamento (opcional)
      showSection('apadrinhamento');
    });
  }

}); // DOMContentLoaded
