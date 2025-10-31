// Alterna seções
const links = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-section');
    sections.forEach(sec => sec.classList.remove('active'));
    document.getElementById(target).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// Formulário
const form = document.getElementById('formApadrinhamento');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Cadastro enviado com sucesso! Obrigado por se juntar ao projeto 💖');
  form.reset();
});
