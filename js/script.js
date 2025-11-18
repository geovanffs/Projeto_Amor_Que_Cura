// js/script.js
document.addEventListener('DOMContentLoaded', () => {
  
  // Funções de Máscara
  const maskCPF = (v) => v.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  const maskPhone = (v) => {
    v = v.replace(/\D/g, '');
    if (v.length <= 10) return v.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, '');
    return v.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };
  const maskCEP = (v) => v.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').slice(0, 9);

  // Aplicar máscaras
  const cpfInput = document.getElementById('cpf');
  const phoneInput = document.getElementById('telefone');
  const cepInput = document.getElementById('cep');

  if (cpfInput) cpfInput.addEventListener('input', (e) => e.target.value = maskCPF(e.target.value));
  if (phoneInput) phoneInput.addEventListener('input', (e) => e.target.value = maskPhone(e.target.value));
  if (cepInput) cepInput.addEventListener('input', (e) => e.target.value = maskCEP(e.target.value));

  // Alerta de sucesso
  const form = document.getElementById('formApadrinhamento');
  if (form) {
    form.addEventListener('submit', (e) => {
      // e.preventDefault(); // Se quiser ver o HTML5 validando, pode comentar essa linha
      alert('Dados validados e enviados! Obrigado.');
    });
  }
});
