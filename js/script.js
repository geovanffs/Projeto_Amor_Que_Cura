document.addEventListener('DOMContentLoaded', () => {
  
  /* ============================
     1. MENU HAMBURGUER (Mobile)
     ============================ */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active'); // Abre/Fecha menu
    });
  }

  /* ============================
     2. MÁSCARAS (Mantidas da Atv 1)
     ============================ */
  const maskCPF = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const maskPhone = (v) => {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const cpfInput = document.getElementById('cpf');
  const phoneInput = document.getElementById('telefone');

  if (cpfInput) cpfInput.addEventListener('input', (e) => e.target.value = maskCPF(e.target.value));
  if (phoneInput) phoneInput.addEventListener('input', (e) => e.target.value = maskPhone(e.target.value));

  /* ============================
     3. MODAL DE FEEDBACK
     ============================ */
  const form = document.getElementById('formApadrinhamento');
  const modal = document.getElementById('modalSuccess');

  if (form && modal) {
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Impede recarregar a página
      modal.style.display = 'flex'; // MOSTRA O MODAL
    });
  }
});

// Função global para fechar modal pelo botão
function fecharModal() {
  const modal = document.getElementById('modalSuccess');
  if (modal) modal.style.display = 'none';
}
